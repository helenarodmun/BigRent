<?php

use App\Http\Controllers\AutorizadoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\SubfamiliaController;
use App\Http\Controllers\TelefonoController;
use App\Models\Familia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', function(){
    $user = Auth::user();
    return Inertia::render('Welcome', ['user'=> $user]);
});
//////////////////////////// RUTAS CLIENTES ///////////////////////////////////////
Route::get('/clientes',[ClienteController::class,'index'])->middleware('auth');  
Route::post('/clientes',[ClienteController::class,'index'])->middleware('auth');  
Route::get('/verCliente/{id}',[ClienteController::class,'showCliente']);
Route::get('/nuevoCliente', function () {
    return Inertia::render('Clientes/NuevoCliente');
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

////////////////////////// RUTAS AUTORIZADOS //////////////////////////////////////
Route::get('/autorizados/{id}', [AutorizadoController::class, 'verAutorizados']);
Route::get('/nuevoAutorizado/{id}', [AutorizadoController::class, 'verFormAutorizado']);
Route::post('/nuevoAutorizado/{id}', [AutorizadoController::class, 'create']);
Route::put('/editarAutorizado/{id}', [AutorizadoController::class, 'update']);
Route::get('/editarAutorizado/{id}', [AutorizadoController::class, 'verEdicionAutorizado']);
Route::delete('/eliminarAutorizado/{id}', [AutorizadoController::class, 'destroy']);


////////////////////////// RUTAS FAMILIAS //////////////////////////////////////
Route::get('/familias', [FamiliaController::class, 'index']);
Route::get('/nuevaFamilia', function () {
    return Inertia::render('Familias/Nueva');
});
Route::post('/nuevaFamilia',[FamiliaController::class,'create']);
Route::get('/editarFamilia/{id}',[FamiliaController::class,'verEdicionFamilia']);
Route::put('/editarFamilia/{id}',[FamiliaController::class,'update']);
Route::delete('/eliminarFamilia/{id}',[FamiliaController::class,'destroy']);

////////////////////////// RUTAS SUBFAMILIAS //////////////////////////////////////
Route::get('/subfamilias', [SubfamiliaController::class, 'index']);
Route::get('/nuevaSubfamilia', function () {
    $familias = Familia::orderBy('id', 'asc')->get();
    return Inertia::render('Subfamilias/Nueva', [
        'familias' => $familias
    ]);
});
Route::post('/nuevaSubfamilia',[SubfamiliaController::class,'create']);
Route::get('/editarSubfamilia/{id}',[SubfamiliaController::class,'verEdicionSubfamilia']);
Route::put('/editarSubfamilia/{id}',[SubfamiliaController::class,'update']);
Route::delete('/eliminarSubfamilia/{id}',[SubfamiliaController::class,'destroy']);