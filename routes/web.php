
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/peta', function () {
    return view('peta');
});

Route::get('/tentang', function () {
    return view('peta');
});