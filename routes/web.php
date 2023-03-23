<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\TelefonoController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//////////////////////////// RUTAS CLIENTES ///////////////////////////////////////
Route::get('/clientes',[ClienteController::class,'index'])->middleware('auth');  
Route::post('/clientes',[ClienteController::class,'index'])->middleware('auth');  
Route::get('/verCliente/{id}',[ClienteController::class,'showCliente']);
Route::get('/nuevoCliente', function () {
    return Inertia::render('Clientes/Create');
});
Route::post('/nuevoCliente',[ClienteController::class,'create']);
Route::get('/editarCliente/{id}',[ClienteController::class,'showClienteEdicion']);
Route::put('/editarCliente/{id}',[ClienteController::class,'update']);
Route::delete('/eliminarCliente/{id}',[ClienteController::class,'destroy']);

/////////////////////////// RUTAS DIRECCIONES /////////////////////////////////////
Route::get('/editarDireccion/{id}', [DireccionController::class, 'verEdicionDireccion']);
Route::put('/editarDireccion/{id}', [DireccionController::class, 'update']);
Route::get('/nuevaDireccion/{id}', [DireccionController::class, 'verFormDireccion']);
Route::post('/nuevaDireccion/{id}', [DireccionController::class, 'create']);
Route::delete('/eliminarDireccion/{id}', [DireccionController::class, 'destroy']);

/////////////////////////// RUTAS TELÉFONOS /////////////////////////////////////////
Route::get('/editarTelefono/{id}', [TelefonoController::class, 'verEdicionTelefono']);
Route::put('/editarTelefono/{id}', [TelefonoController::class, 'update']);
Route::delete('/eliminarTelefono/{id}', [TelefonoController::class, 'destroy']);
Route::get('/nuevoTelefono/{id}', [TelefonoController::class, 'verFormTelefono']);
Route::post('/nuevoTelefono/{id}', [TelefonoController::class, 'create']);




