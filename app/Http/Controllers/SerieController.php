<?php

namespace App\Http\Controllers;

use App\Http\Requests\SerieForm;
use App\Models\Serie;
use App\Models\Tienda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SerieController extends Controller
{

    public function index()
    {
        $series = Serie::with('maquina')
            ->orderBy('maquina_id', 'asc')
            ->orderBy('numero_serie', 'asc')
            ->get();

        return Inertia::render('Series/Listado', [
            'series' => $series,
        ]);
    }


    public function create(SerieForm $request)
    {
        $request->validated();

        $serie = Serie::create($request->all());

        $series = Serie::with('maquina')
            ->orderBy('maquina_id', 'asc')
            ->orderBy('numero_serie', 'asc')
            ->get();
        $tiendas = Tienda::get();
        Session::flash('edicion', 'Se ha creado la serie de forma correcta');

        return Inertia::render('Series/Listado', [
            'series' => $series,
            'tiendas' => $tiendas
        ]);
    }


    public function verEdicionSerie($id)
    {
        $serie_actual = Serie::findOrFail($id);

        $maquina = $serie_actual->maquina;

        return Inertia::render('Series/Actualiza', [
            'serie' => $serie_actual,
            'maquina' => $maquina
        ]);
    }


    public function update(SerieForm $request, $id)
    {
        $validatedData = $request->validated();

        $serie = Serie::findOrFail($id);

        $serie->horometro = $validatedData['horometro'];
        $serie->hora_inicio = $validatedData['hora_inicio'];
        $serie->numero_serie = $validatedData['numero_serie'];
        $serie->disponible = $validatedData['disponible'];
        $serie->save();

        $series = Serie::with('maquina')
            ->orderBy('maquina_id', 'asc')
            ->orderBY('numero_serie', 'asc')
            ->get();
        Session::flash('creacion', 'Se ha actualizado la serie de forma correcta');

        return Inertia::render('Series/Listado', [
            'series' => $series,
        ]);
    }


    public function search(Request $request)
    {
        // Se define una función que recibe una solicitud HTTP a través del objeto $request
        // y devuelve una lista de series y una consulta de búsqueda
        // Si la consulta tiene menos de tres caracteres, no se devolverán resultados
        // Se obtiene la consulta de búsqueda del parámetro 'consulta' en la solicitud
        $query = $request->input('consulta');
        // Si la longitud de la consulta es menor que tres, se devuelve una página vacía
        if (strlen($query) < 3) {
            return Inertia::render('Series/Listado', [
                'series' => [],
                'resultado' => null
            ]);
        }
        // Se obtienen todas las series que contienen la consulta de búsqueda en su número de serie,
        // o cuya máquina asociada tiene una descripción que contiene la consulta de búsqueda
        $series = Serie::with('maquina')
            ->whereHas('maquina', function ($queryBuilder) use ($query) {
                $queryBuilder->where('descripcion', 'like', '%' . $query . '%');
            })
            ->orWhere('numero_serie', 'like', '%' . $query . '%')
            ->get();

        // Se devuelve una página que muestra la lista de series y la consulta de búsqueda
        return Inertia::render('Series/Listado', [
            'series' => $series,
            'resultado' => $query
        ]);
    }


    public function destroy($id)
    {
        $serie = Serie::findOrFail($id);
        $serie->delete();
        
        $series = Serie::with('maquina')
            ->orderBy('maquina_id', 'asc')
            ->orderBY('numero_serie', 'asc')
            ->get();
        Session::flash('borrado', 'Se ha eliminado la serie de forma correcta');

        return Inertia::render('Series/Listado', ['series' => $series]);
    }
}
