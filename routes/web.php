<?php

use App\Http\Controllers\ClienteController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/create',function(){
    return Inertia::render('Clientes/Create');
    });

Route::get('/clientes',[ClienteController::class,'index']);  
Route::post('/clientes',[ClienteController::class,'index']);  
Route::get('/nuevoCliente', function () {
    return Inertia::render('Clientes/Create');
});
Route::post('/nuevoCliente',[ClienteController::class,'create']);
Route::get('/cliente/{id}',[ClienteController::class,'showClienteActual']);
// Route::get('/verCliente', function () {
//     return Inertia::render('Clientes/Update');
// });
Route::get('/verCliente/{id}',[ClienteController::class,'showCliente', DireccionController::class, 'ShowDirecciones']);
Route::get('/editarCliente/{id}',[ClienteController::class,'showClienteEdicion']);
Route::put('/editarCliente/{id}',[ClienteController::class,'update']);

Route::delete('/eliminarCliente/{id}',[ClienteController::class,'destroy']);
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
