<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BudayaController;
use App\Http\Controllers\Api\CategoryController;

// API Data Budaya
Route::apiResource('budayas', BudayaController::class);

// API Kategori
Route::apiResource('categories', CategoryController::class);