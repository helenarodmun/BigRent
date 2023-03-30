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
         $familias = Familia::latest()->get();

         return Inertia::render('Familias/Listado', [
             'familias' => $familias,
         ]);
    }
    
    public function create(FamiliaForm $request)
    {
        $request->validate();
        $familia = Familia::create($request->all());
        $familias = Familia::latest()->get();
        Session::flash('edicion', 'Se ha creado la familia de forma correcta');

        return Inertia::render('Familias/Listado', [
            'familias' => $familias,
        ]);


    }

    
    public function verEdicionFamilia($id)
    {
        $familia_actual = Familia::findOrrFail($id);
        return Inertia::render('Familias/Actualiza', [
            'familia' => $familia_actual
        ]);
    }

    public function update(FamiliaForm $request, $id)
    {
        $validatedData = $request->validated();
        $familia = Familia::findOrFail($id);
        $familia->nombre = $validatedData['nombre'];

        $familia->save();

        $familias = Familia::latest()->get();
        Session::flash('creacion', 'Se ha actualizado la familia de forma correcta');
         return Inertia::render('Familias/Listado', [
             'familias' => $familias,
         ]);

    }

    
    public function destroy($id)
    {
        $familia = Familia::findOrFail($id);
        $familia->delete();
        $familias = Familia::latest()->get();
        Session::flash('borrado', 'Se ha eliminado la família de froma correcta');
        return Inertia::render('Familias/Listado', ['familias'=> $familias]);
    }
    
}
