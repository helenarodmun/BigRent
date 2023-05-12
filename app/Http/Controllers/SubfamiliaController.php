<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubfamiliaForm;
use App\Models\Familia;
use App\Models\Subfamilia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SubfamiliaController extends Controller
{

    public function index()
    {
        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBy('descripcion', 'asc')
            ->paginate(10);

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
            ->paginate(10);
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
            $subfamilias = Subfamilia::with('familia')
                ->whereHas('familia', function ($queryBuilder) use ($query) {
                    $queryBuilder->where('nombre', 'like', '%' . $query . '%');
                })
                ->orWhere('descripcion', 'like', '%' . $query . '%')
                ->paginate(10);

            // Se devuelve una página que muestra la lista de maquinas y la consulta de búsqueda
            return Inertia::render('Maquinaria/Listado', [
                'subfamilias' => $subfamilias,
                'resultado' => $query
            ]);
        }
    }


    public function update(SubfamiliaForm $request, $id)
    {
        $validatedData = $request->validated();

        $subfamilia = Subfamilia::findOrFail($id);

        $subfamilia->descripcion = $validatedData['descripcion'];
        $subfamilia->precio_dia = $validatedData['precio_dia'];
        $subfamilia->fianza = $validatedData['fianza'];
        $subfamilia->save();

        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBY('descripcion', 'asc')
            ->paginate(10);
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
            ->paginate(10);
        Session::flash('borrado', 'Se ha eliminado la subfamilia de forma correcta');

        return Inertia::render('Subfamilias/Listado', ['subfamilias' => $subfamilias]);
    }
}
