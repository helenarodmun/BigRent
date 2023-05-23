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
        $marcas = Marca::orderBy('denominacion', 'asc')->paginate(15);

        return Inertia::render('Marcas/Listado', [
            'marcas' => $marcas,
        ]);
    }


    public function create(MarcaForm $request)
    {
        try {
            $request->validated();
            $marca = Marca::create($request->all());
            $marca->save();
            
            Session::flash('success', 'Se ha creado la familia de forma correcta');
            return redirect("/marcas");;
        } catch (\Exception $e) {
            if ($e->getCode() == "23000")
                Session::flash('error', 'Imposible eliminar, existen registros relacionados');
            return back();
        }
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

        Session::flash('success', 'Se ha actualizado la familia de forma correcta');
        return redirect("/marcas");
    }


    public function destroy($id)
    {
        $marca = Marca::findOrFail($id);
        $marca->delete();

        Session::flash('success', 'Se ha eliminado la família de froma correcta');
        return redirect("/marcas");
    }
}
