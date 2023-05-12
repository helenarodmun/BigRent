<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarcaForm;
use App\Models\Marca;
use Illuminate\Http\Request;
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


    public function search(Request $request)
    {
        // Se define una función que recibe una solicitud HTTP a través del objeto $request
        // y devuelve una lista de maquinas y una consulta de búsqueda
        // Si la consulta tiene menos de tres caracteres, no se devolverán resultados
        // Se obtiene la consulta de búsqueda del parámetro 'consulta' en la solicitud
        $query = $request->input('consulta');
        // Si la longitud de la consulta es menor que tres, se devuelve una página vacía
        if (strlen($query) < 3) {
            $this->index();
        } else {
            // Se obtienen todas las mauinas que contienen la consulta de búsqueda por dscripcion, subfamilia o referencia
            $marcas = Marca::whereHas(function ($queryBuilder) use ($query) {
                $queryBuilder->where('denominacion', 'like', '%' . $query . '%');
            })->paginate(10);
            // Se devuelve una página que muestra la lista de maquinas y la consulta de búsqueda
            return Inertia::render('Marcas/Listado', [
                'marcas' => $marcas,
                'resultado' => $query
            ]);
        }
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
