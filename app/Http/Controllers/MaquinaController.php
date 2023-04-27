<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaquinaForm;
use App\Models\Familia;
use App\Models\Maquina;
use App\Models\Marca;
use App\Models\Subfamilia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MaquinaController extends Controller
{
    public function index()
    {
        //Recuperar todos las maquinas de la base de datos
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('descripcion', 'asc')
            ->get();
            $maquinas->load('marca.maquinas');
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }

    public function create(MaquinaForm $request)
    {
        $request->validated();
        $manual = $request->url_manual;
        dd($_FILES[$manual]['name'],
        $_FILES[$manual]['tmp_name'],
        $_FILES[$manual]['type'],
        $_FILES[$manual]['size'],
        $_FILES[$manual]['error']);
        $maquina = Maquina::create([
            'descripcion' => $request->descripcion,
            'referencia' => $request->referencia,
            'url_manual' => $request->url_manual,
            'url_ficha' => $request->url_ficha,
            'url_imagen' => $request->url_imagen,
            'subfamilia_id' => $request->subfamilia_id,
            'marca_id' => $request->marca_id
        ]);
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->get();
            $maquinas->load('marca.maquinas');
        Session::flash('edicion', 'Se ha creado la máquina de forma correcta');

        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }


    public function verEdicionMaquina($id)
    {
        $maquina_actual = Maquina::findOrFail($id);
        $maquina_actual->load('subfamilia.maquinas');
        $maquina_actual->load('marca.maquinas');
        return Inertia::render('Maquinaria/Actualiza', [
            'maquina' => $maquina_actual,
            'subfamilias' => $maquina_actual->subfamilia,
            'marcas' => $maquina_actual->marca
        ]);
    }

    public function update(MaquinaForm $request, $id)
    {
        $validatedData = $request->validated();
        $maquina = Maquina::findOrFail($id);
        $maquina->descripcion = $validatedData['descripcion'];
        $maquina->referencia = $validatedData['referencia'];
        $maquina->url_manual = $validatedData['url_manual'];
        $maquina->url_ficha = $validatedData['url_ficha'];
        $maquina->url_imagen = $validatedData['url_imagen'];

        $maquina->save();

        $maquinas = Maquina::with('subfamilia')
        ->orderBy('subfamilia_id', 'asc')
        ->get();
        $maquinas->load('marca.maquinas');
        Session::flash('creacion', 'Se ha actualizado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }


    public function destroy($id)
    {
        $maquina = Maquina::findOrFail($id);
        $maquina->delete();
        $maquinas = Maquina::with('subfamilia')
        ->orderBy('subfamilia_id', 'asc')
        ->get();
        $maquinas->load('marca.maquinas');
        Session::flash('borrado', 'Se ha eliminado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', ['maquinas' => $maquinas]);
    }
}


