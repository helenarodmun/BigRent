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
        $familias = Familia::orderBy('nombre', 'asc')->paginate(10);

        return Inertia::render('Familias/Listado', [
            'familias' => $familias,
        ]);
    }


    public function create(FamiliaForm $request)
    {
        $request->validated();
        $familia = Familia::create($request->all());
        $familia->save();
        $familias = Familia::orderBy('id', 'asc')->paginate(10);
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


    public function search(Request $request)
    {
        // Se define una función que recibe una solicitud HTTP a través del objeto $request
        // y devuelve una lista de maquinas y una consulta de búsqueda
        // Si la consulta tiene menos de tres caracteres, no se devolverán resultados
        // Se obtiene la consulta de búsqueda del parámetro 'consulta' en la solicitud
        $query = $request->input('consulta');
        // Si la longitud de la consulta es menor que tres, se devuelve una página vacía
        if (strlen($query) > 3) {
            $this->index();
        } else {
            // Se obtienen todas las mauinas que contienen la consulta de búsqueda por dscripcion, subfamilia o referencia
            $familias = Familia::whereHas(function ($queryBuilder) use ($query) {
                $queryBuilder->where('nombre', 'like', '%' . $query . '%');
            })->paginate(10);
            // Se devuelve una página que muestra la lista de maquinas y la consulta de búsqueda
            return Inertia::render('Familias/Listado', [
                'familias' => $familias,
                'resultado' => $query
            ]);
        }
    }


    public function update(FamiliaForm $request, $id)
    {
        $validatedData = $request->validated();
        $familia = Familia::findOrFail($id);
        $familia->nombre = strtoupper($validatedData['nombre']);
        $familia->save();
        $familias = Familia::orderBy('id', 'asc')->paginate(10);
        Session::flash('creacion', 'Se ha actualizado la familia de forma correcta');

        return Inertia::render('Familias/Listado', [
            'familias' => $familias,
        ]);
    }


    public function destroy($id)
    {
        $familia = Familia::findOrFail($id);
        $familia->delete();
        $familias = Familia::orderBy('id', 'asc')->paginate(10);
        Session::flash('borrado', 'Se ha eliminado la família de froma correcta');

        return Inertia::render('Familias/Listado', ['familias' => $familias]);
    }
}
