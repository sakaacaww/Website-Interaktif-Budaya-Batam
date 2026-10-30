
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

// =========================
// HALAMAN PUBLIK - REACT
// =========================

Route::get('/', fn () => view('welcome'));
Route::get('/peta', fn () => view('welcome'));
Route::get('/tentang', fn () => view('welcome'));

// =========================
// LOGIN ADMIN - REACT
// =========================

Route::get('/admin/login', function () {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return redirect('/admin/dashboard');
    }

    return view('welcome');
})->name('admin.login');

// PROSES LOGIN ADMIN
Route::post('/admin/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
    ]);

    // Periksa akun di database aktif.
    $user = User::where('email', $credentials['email'])->first();

    logger()->info('LOGIN CHECK', [
        'email_received' => $credentials['email'],
        'user_found' => $user !== null,
        'database' => config('database.connections.mysql.database'),
    ]);

    if (!$user) {
        return response()->json([
            'message' => 'Akun dengan email tersebut tidak ditemukan.',
        ], 422);
    }

    // Pastikan akun memiliki role admin.
    if ($user->role !== 'admin') {
        return response()->json([
            'message' => 'Akun ini bukan akun administrator.',
        ], 403);
    }

    // Verifikasi email dan password.
    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Password tidak sesuai.',
        ], 422);
    }

    // Buat sesi login baru.
    $request->session()->regenerate();

    return response()->json([
        'message' => 'Login berhasil.',
        'redirect' => '/admin/dashboard',
    ]);
})->name('admin.login.process');

// =========================
// HALAMAN ADMIN
// =========================

Route::middleware('auth')->group(function () {

    // DASHBOARD
    Route::get('/admin/dashboard', function () {
        abort_unless(
            Auth::user()->role === 'admin',
            403,
            'Akses khusus administrator.'
        );

        return view('welcome');
    })->name('admin.dashboard');

    // KELOLA DATA TEMPAT
    Route::get('/admin/tempat', function () {
        abort_unless(
            Auth::user()->role === 'admin',
            403,
            'Akses khusus administrator.'
        );

        return view('welcome');
    })->name('admin.tempat');

    // KELOLA KATEGORI
    Route::get('/admin/kategori', function () {
        abort_unless(
            Auth::user()->role === 'admin',
            403,
            'Akses khusus administrator.'
        );

        return view('welcome');
    })->name('admin.kategori');

    // LOGOUT ADMIN
    Route::post('/admin/logout', function (Request $request) {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    })->name('admin.logout');
});
