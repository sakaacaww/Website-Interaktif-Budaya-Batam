
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// =========================
// HALAMAN PUBLIK
// =========================

Route::get('/', function () {
    return view('welcome');
});

Route::get('/peta', function () {
    return view('peta');
});

Route::get('/tentang', function () {
    return view('peta');
});

// =========================
// LOGIN ADMIN - REACT
// =========================

Route::get('/admin/login', function () {
    return view('welcome');
})->name('admin.login');

// PROSES LOGIN ADMIN
Route::post('/admin/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Email atau password salah.',
        ], 422);
    }

    $request->session()->regenerate();

    if (Auth::user()->role !== 'admin') {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Akun ini bukan akun administrator.',
        ], 403);
    }

    return response()->json([
        'message' => 'Login berhasil.',
        'redirect' => '/admin/dashboard',
    ]);
})->name('admin.login.process');

// =========================
// HALAMAN ADMIN - REACT
// =========================

Route::middleware('auth')->group(function () {

    // DASHBOARD ADMIN
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
