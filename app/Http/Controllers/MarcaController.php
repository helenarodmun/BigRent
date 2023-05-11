<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarcaForm;
use App\Models\Marca;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MarcaController extends Controller
{

    public function index()
    {
        $marcas = Marca::orderBy('denominacion', 'asc')->paginate(10);

        return Inertia::render('Marcas/Listado', [
            'marcas' => $marcas,
        ]);
    }


    public function create(MarcaForm $request)
    {
        $request->validated();

        $marca = Marca::create($request->all());
        $marca->save();

        $marcas = Marca::orderBy('denominacion', 'asc')->paginate(10);
        Session::flash('success', 'Se ha creado la familia de forma correcta');

        return Inertia::render('Marcas/Listado', [
            'marcas' => $marcas,
        ]);
    }


    public function verEdicionMarca($id)
    {
        $marca_actual = Marca::findOrFail($id);

        return Inertia::render('Marcas/Actualiza', [
            'marca' => $marca_actual
        ]);
    }


    public function update(MarcaForm $request, $id)
    {
        $validatedData = $request->validated();

        $marca = marca::findOrFail($id);
        $marca->denominacion = strtoupper($validatedData['denominacion']);
        $marca->save();

        $marcas = Marca::orderBy('id', 'asc')->paginate(10);
        Session::flash('update', 'Se ha actualizado la familia de forma correcta');

        return Inertia::render('Marcas/Listado', [
            'marcas' => $marcas,
        ]);
    }


    public function destroy($id)
    {
        $marca = Marca::findOrFail($id);
        $marca->delete();
        
        $marcas = Marca::orderBy('id', 'asc')->paginate(10);
        Session::flash('success', 'Se ha eliminado la família de froma correcta');
        
        return Inertia::render('Marcas/Listado', ['marcas' => $marcas]);
    }
}
