<?php

use App\Http\Controllers\AutorizadoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\SubfamiliaController;
use App\Http\Controllers\MaquinaController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\SerieController;
use App\Http\Controllers\TelefonoController;
use App\Models\Familia;
use App\Models\Maquina;
use App\Models\Marca;
use App\Models\Subfamilia;
use App\Models\Tienda;
use App\Models\TipoCliente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', function () {
    $user = Auth::user();
    return Inertia::render('Welcome', ['user' => $user]);
});
//////////////////////////// RUTAS CLIENTES ///////////////////////////////////////
Route::get('/clientes', [ClienteController::class, 'index'])->middleware('auth');
Route::post('/clientes', [ClienteController::class, 'index'])->middleware('auth');
Route::get('/verCliente/{id}', [ClienteController::class, 'showCliente']);
Route::get('/nuevoCliente', function () {
    $tipos_cliente = TipoCliente::with('confDias')->orderBy('id', 'asc')->get();
    return Inertia::render('Clientes/NuevoCliente', [
        'tipos_cliente' => $tipos_cliente
    ]);
});
Route::post('/nuevoCliente', [ClienteController::class, 'create']);
Route::get('/editarCliente/{id}', [ClienteController::class, 'showClienteEdicion']);
Route::put('/editarCliente/{id}', [ClienteController::class, 'update']);
Route::delete('/eliminarCliente/{id}', [ClienteController::class, 'destroy']);
Route::get('/clientes/buscar', [ClienteController::class, 'search']);

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
Route::post('/nuevaFamilia', [FamiliaController::class, 'create']);
Route::get('/editarFamilia/{id}', [FamiliaController::class, 'verEdicionFamilia']);
Route::put('/editarFamilia/{id}', [FamiliaController::class, 'update']);
Route::delete('/eliminarFamilia/{id}', [FamiliaController::class, 'destroy']);

////////////////////////// RUTAS SUBFAMILIAS //////////////////////////////////////
Route::get('/subfamilias', [SubfamiliaController::class, 'index']);

Route::get('/nuevaSubfamilia', function () {
    $familias = Familia::orderBy('id', 'asc')->get();
    return Inertia::render('Subfamilias/Nueva', [
        'familias' => $familias
    ]);
});
Route::post('/nuevaSubfamilia', [SubfamiliaController::class, 'create']);
Route::get('/editarSubfamilia/{id}', [SubfamiliaController::class, 'verEdicionSubfamilia']);
Route::put('/editarSubfamilia/{id}', [SubfamiliaController::class, 'update']);
Route::delete('/eliminarSubfamilia/{id}', [SubfamiliaController::class, 'destroy']);

////////////////////////// RUTAS MARCAS //////////////////////////////////////
Route::get('/marcas', [MarcaController::class, 'index']);
Route::get('/nuevaMarca', function () {
    return Inertia::render('Marcas/Nueva');
});
Route::post('/nuevaMarca', [MarcaController::class, 'create']);
Route::get('/editarMarca/{id}', [MarcaController::class, 'verEdicionMarca']);
Route::put('/editarMarca/{id}', [MarcaController::class, 'update']);
Route::delete('/eliminarMarca/{id}', [MarcaController::class, 'destroy']);

////////////////////////// RUTAS MÁQUINAS //////////////////////////////////////
Route::get('/maquinas', [MaquinaController::class, 'index']);
Route::get('/nuevaMaquina', function () {
    $subfamilias = Subfamilia::orderBy('descripcion', 'asc')->get();
    $familias = Familia::orderBy('nombre', 'asc')->get();
    $marcas = Marca::orderBy('denominacion', 'asc')->get();
    return Inertia::render('Maquinaria/Nueva', [
        'subfamilias' => $subfamilias,
        'familias' => $familias,
        'marcas' => $marcas
    ]);
});
Route::post('/nuevaMaquina', [MaquinaController::class, 'create']);
Route::get('/editarMaquina/{id}', [MaquinaController::class, 'verEdicionMaquina']);
Route::post('/editarMaquina/{id}', [MaquinaController::class, 'update']);
Route::delete('/eliminarMaquina/{id}', [MaquinaController::class, 'destroy']);
Route::get('/verFicha/{id}', [MaquinaController::class, 'verDatosMaquina']);
Route::get('/maquinas/buscar', [MaquinaController::class, 'search']);
////////////////////////// RUTAS SERIES //////////////////////////////////////
Route::get('/series', [SerieController::class, 'index']);
Route::get('/nuevaSerie', function () {
    $subfamilias = Subfamilia::orderBy('id', 'asc')->get();
    $familias = Familia::orderBy('id', 'asc')->get();
    $maquinas = Maquina::orderBy('id', 'asc')->get();
    $tiendas = Tienda::orderBy('id', 'asc')->get();
    return Inertia::render('Series/Nueva', [
        'maquinas' => $maquinas,
        'subfamilias' => $subfamilias,
        'familias' => $familias,
        'tiendas' => $tiendas
    ]);
});
Route::post('/nuevaSerie', [SerieController::class, 'create']);
Route::get('/editarSerie/{id}', [SerieController::class, 'verEdicionSerie']);
Route::put('/editarSerie/{id}', [SerieController::class, 'update']);
Route::delete('/eliminarSerie/{id}', [SerieController::class, 'destroy']);
Route::get('/series/buscar', [SerieController::class, 'search']);

//////////////////////// RUTAS CONTRATOS /////////////////////////////////////
Route::get('/nuevoContrato/{id}', [ContratoController::class, 'verFormContrato']);
Route::get('/contrato/confirmar', [ContratoController::class, 'confirmarContrato']);
Route::post('/contrato/confirmar', [ContratoController::class, 'confirmarContrato']);
Route::post('/nuevoContrato', [ContratoController::class, 'create']);
Route::get('/listarContratos/{id}', [ContratoController::class, 'verListadoContratos']);
Route::get('/verContrato/{id}', [ContratoController::class, 'verContrato']);
Route::get('/cerrarContrato/{id}', [ContratoController::class, 'cerrarContrato']);
