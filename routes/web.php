<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Ruta para servir la vista principal de la aplicación
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');

// Ruta para registro de usuario
Route::post('/api/register', [RegisterController::class, 'register']);

// Ruta para el login del usuario
Route::post('/api/login', [AuthController::class, 'login']);

// Ruta para obtener la información del usuario autenticado
Route::middleware('auth:sanctum')->get('/api/user', [AuthController::class, 'user']);

// Ruta para el cierre de sesión
Route::post('/api/logout', [AuthController::class, 'logout']);
