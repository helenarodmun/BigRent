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
Route::get('/welcomereact', function () {
    $user = new User();
    $user->name = "Mr. Bean";
    return Inertia::render('Welcome', ['user' => $user]);
    });

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/create',function(){
    return Inertia::render('Clientes/Create');
    });
    
Route::post('/create',[ClienteController::class,'create']);
Route::get('/index',[ClienteController::class,'index']);
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
