<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\DriverManagementController;
use App\Http\Controllers\Admin\ServiceAreaController;
use App\Http\Controllers\Driver\DriverAuthController;
use App\Http\Controllers\Driver\DriverDashboardController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, 'index'])->name('home');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');
    });

    Route::middleware('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/drivers', [DriverManagementController::class, 'index'])->name('drivers.index');
        Route::post('/drivers', [DriverManagementController::class, 'store'])->name('drivers.store');
        Route::put('/drivers/{driver}', [DriverManagementController::class, 'update'])->name('drivers.update');
        Route::post('/drivers/{driver}/approve', [DriverManagementController::class, 'approve'])->name('drivers.approve');
        Route::delete('/drivers/{driver}', [DriverManagementController::class, 'destroy'])->name('drivers.destroy');
        Route::get('/service-areas', [ServiceAreaController::class, 'index'])->name('service-areas.index');
        Route::post('/service-areas', [ServiceAreaController::class, 'store'])->name('service-areas.store');
        Route::put('/service-areas/{serviceArea}', [ServiceAreaController::class, 'update'])->name('service-areas.update');
        Route::delete('/service-areas/{serviceArea}', [ServiceAreaController::class, 'destroy'])->name('service-areas.destroy');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
    });
});

Route::prefix('driver')->name('driver.')->group(function () {
    Route::middleware('guest:driver')->group(function () {
        Route::get('/login', [DriverAuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [DriverAuthController::class, 'login'])->name('login.post');
        Route::get('/register', [DriverAuthController::class, 'showRegister'])->name('register');
        Route::post('/register', [DriverAuthController::class, 'register'])->name('register.post');
    });

    Route::middleware('driver')->group(function () {
        Route::get('/dashboard', [DriverDashboardController::class, 'index'])->name('dashboard');
        Route::post('/toggle-online', [DriverDashboardController::class, 'toggleOnline'])->name('toggle-online');
        Route::patch('/update-profile', [DriverDashboardController::class, 'updateProfile'])->name('update-profile');
        Route::post('/logout', [DriverAuthController::class, 'logout'])->name('logout');
    });
});


include __DIR__.'/settings.php';
