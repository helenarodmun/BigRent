<?php

namespace App\Http\Controllers;

use App\Http\Requests\FamiliaForm;
use App\Models\Familia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class FamiliaController extends Controller
{
    public function index()
    {
        //Recuperar todos las familias de la base de datos
        $familias = Familia::orderBy('nombre', 'asc')->get();

        return Inertia::render('Familias/Listado', [
            'familias' => $familias,
        ]);
    }

    public function create(FamiliaForm $request)
    {
        $request->validated();
        $familia = Familia::create($request->all());
        $familia->save();
        $familias = Familia::orderBy('id', 'asc')->get();
        Session::flash('edicion', 'Se ha creado la familia de forma correcta');

        return Inertia::render('Familias/Listado', [
            'familias' => $familias,
        ]);
    }

    public function verEdicionFamilia($id)
    {
        $familia_actual = Familia::findOrFail($id);
        return Inertia::render('Familias/Actualiza', [
            'familia' => $familia_actual
        ]);
    }

    public function update(FamiliaForm $request, $id)
    {
        $validatedData = $request->validated();
        $familia = Familia::findOrFail($id);
        $familia->nombre = strtoupper($validatedData['nombre']);

        $familia->save();

        $familias = Familia::orderBy('id', 'asc')->get();
        Session::flash('creacion', 'Se ha actualizado la familia de forma correcta');
        return Inertia::render('Familias/Listado', [
            'familias' => $familias,
        ]);
    }

    public function destroy($id)
    {
        $familia = Familia::findOrFail($id);
        $familia->delete();
        $familias = Familia::orderBy('id', 'asc')->get();
        Session::flash('borrado', 'Se ha eliminado la família de froma correcta');
        return Inertia::render('Familias/Listado', ['familias' => $familias]);
    }
}
