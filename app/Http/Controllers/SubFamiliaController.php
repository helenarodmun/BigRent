<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubFamiliaForm;
use App\Models\Familia;
use App\Models\SubFamilia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SubfamiliaController extends Controller
{
    public function index()
    {
        //Recuperar todos las familias de la base de datos
        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBy('descripcion', 'asc')
            ->get();
        return Inertia::render('Subfamilias/Listado', [
            'subfamilias' => $subfamilias,
        ]);
    }

    public function create(SubfamiliaForm $request)
    {
        $request->validated();

        $subfamilia = Subfamilia::create($request->all());
        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBY('descripcion', 'asc')
            ->get();
        Session::flash('edicion', 'Se ha creado la subfamilia de forma correcta');

        return Inertia::render('Subfamilias/Listado', [
            'subfamilias' => $subfamilias,
        ]);
    }


    public function verEdicionSubfamilia($id)
    {
        $subfamilia_actual = Subfamilia::findOrFail($id);
        $familias = Familia::orderBy('id', 'asc')->get();
        return Inertia::render('Subfamilias/Actualiza', [
            'subfamilia' => $subfamilia_actual,
            'familias' => $familias
        ]);
    }

    public function update(SubfamiliaForm $request, $id)
    {
        $validatedData = $request->validated();
        $subfamilia = Subfamilia::findOrFail($id);
        $subfamilia->descripcion = $validatedData['descripcion'];
        $subfamilia->precio_semana = $validatedData['precio_semana'];
        $subfamilia->precio_dia = $validatedData['precio_dia'];
        $subfamilia->fianza = $validatedData['fianza'];

        $subfamilia->save();

        $subfamilias = Subfamilia::with('familia')
        ->orderBy('familia_id', 'asc')
        ->orderBY('descripcion', 'asc')
        ->get();
        Session::flash('creacion', 'Se ha actualizado la subfamilia de forma correcta');
        return Inertia::render('Subfamilias/Listado', [
            'subfamilias' => $subfamilias,
        ]);
    }


    public function destroy($id)
    {
        $subfamilia = Subfamilia::findOrFail($id);
        $subfamilia->delete();
        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBY('descripcion', 'asc')
            ->get();
        Session::flash('borrado', 'Se ha eliminado la subfamilia de forma correcta');
        return Inertia::render('Subfamilias/Listado', ['subfamilias' => $subfamilias]);
    }
}
