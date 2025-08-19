<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // POS System
    Route::get('/pos', [PosController::class, 'index'])->name('pos.index');
    
    // Products Management
    Route::resource('products', ProductController::class);
    
    // Sales Management
    Route::resource('sales', SaleController::class)->except(['edit', 'update', 'destroy']);
    Route::get('/sales/create', [SaleController::class, 'create'])->name('sales.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';