
<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\AdminAuthController;

// ========================================
// HALAMAN PUBLIK
// ========================================

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/peta', function () {
    return view('peta');
})->name('peta');

Route::get('/tentang', function () {
    return view('tentang');
})->name('tentang');


// ========================================
// LOGIN ADMIN - REACT
// ========================================

Route::get('/admin/login', function () {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    return view('welcome');
})->name('admin.login');


// ========================================
// PROSES LOGIN ADMIN
// ========================================

Route::post('/admin/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Email atau password salah.',
        ], 401);
    }

    $request->session()->regenerate();

    if (Auth::user()->role !== 'admin') {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Akun ini bukan administrator.',
        ], 403);
    }

    return response()->json([
        'message' => 'Login berhasil.',
        'redirect' => route('admin.dashboard'),
    ]);
})->name('admin.login.process');


// ========================================
// DASHBOARD ADMIN - REACT
// ========================================

Route::get('/admin/dashboard', function () {
    if (!Auth::check() || Auth::user()->role !== 'admin') {
        return redirect()->route('admin.login');
    }

    return view('welcome');
})->name('admin.dashboard');


// ========================================
// LOGOUT ADMIN
// ========================================

Route::post('/admin/logout', [
    AdminAuthController::class,
    'logout',
])->middleware('auth')->name('admin.logout');
