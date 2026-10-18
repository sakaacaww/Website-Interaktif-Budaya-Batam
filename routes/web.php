<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/peta', function () {
    return view('welcome');
});

Route::get('/tentang', function () {
    return view('welcome');
});

Route::get('/admin/login', function () {
    return view('welcome');
});

Route::get('/admin/dashboard', function () {
    return view('welcome');
});

Route::get('/admin/tempat/create', function () {
    return view('welcome');
});

Route::get('/admin/tempat/edit/{id?}', function () {
    return view('welcome');
});