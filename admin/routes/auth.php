<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    /**
     * 
     */
    Route::prefix('register')->group(function () {
        Route::post('seller', [AuthController::class, 'seller_register'])->name('seller-register');
        Route::post('user', [AuthController::class, 'user_register'])->name('user-register');
    });
    /**
     * 
     */
    Route::prefix('login')->group(function () {
        Route::post('seller', [AuthController::class, 'seller_login'])->name('seller-login');
        Route::post('user', [AuthController::class, 'user_login'])->name('user-login');
    });
    /**
     * 
     */
    Route::prefix('profile')->group(function () {
        Route::get('user', [AuthController::class, 'user_profile'])->name('user-profile');
        Route::get('seller', [AuthController::class, 'seller_profile'])->name('seller-profile');
    });
});
