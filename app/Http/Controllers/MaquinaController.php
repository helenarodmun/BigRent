<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaquinaForm;
use App\Models\Familia;
use App\Models\Maquina;
use App\Models\Subfamilia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MaquinaController extends Controller
{
    public function index()
    {
        //Recuperar todos las familias de la base de datos
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->orderBy('marca', 'asc')
            ->get();
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }

    public function create(MaquinaForm $request)
    {
        $request->validated();
        $maquina = Maquina::create($request->all());
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->orderBY('marca', 'asc')
            ->get();
        Session::flash('edicion', 'Se ha creado la máquina de forma correcta');

        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }


    public function verEdicionMaquina($id)
    {
        $maquina_actual = Maquina::findOrFail($id);
        $subfamilias = Subfamilia::orderBy('id', 'asc')->get();
        return Inertia::render('Maquinaria/Actualiza', [
            'maquina' => $maquina_actual,
            'subfamilias' => $subfamilias
        ]);
    }

    public function update(MaquinaForm $request, $id)
    {
        $validatedData = $request->validated();
        $maquina = Maquina::findOrFail($id);
        $maquina->marca = $validatedData['marca'];
        $maquina->descripcion = $validatedData['descripcion'];
        $maquina->referencia = $validatedData['referencia'];
        $maquina->url_manual = $validatedData['url_manual'];
        $maquina->url_ficha = $validatedData['url_ficha'];
        $maquina->url_imagen = $validatedData['url_imagen'];

        $maquina->save();

        $maquinas = Maquina::with('subfamilia')
        ->orderBy('subfamilia_id', 'asc')
        ->orderBY('marca', 'asc')
        ->get();
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
            ->orderBY('marca', 'asc')
            ->get();
        Session::flash('borrado', 'Se ha eliminado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', ['maquinas' => $maquinas]);
    }
}


