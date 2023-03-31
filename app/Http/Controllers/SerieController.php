<?php

namespace App\Http\Controllers;

use App\Http\Requests\SerieForm;
use App\Models\Maquina;
use App\Models\Serie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SerieController extends Controller
{
    public function index()
    {
        //Recuperar todos las familias de la base de datos
        $series = Serie::with('maquina')
            ->orderBy('maquina_id', 'asc')
            ->orderBy('numero_serie', 'asc')
            ->get();
        return Inertia::render('Maquinaria/Listado', [
            'series' => $series,
        ]);
    }

    public function create(SerieForm $request)
    {
        $request->validated();
        $serie = Serie::create($request->all());
        $series = Serie::with('maquina')
            ->orderBy('maquina_id', 'asc')
            ->orderBY('numero_serie', 'asc')
            ->get();
        Session::flash('edicion', 'Se ha creado la serie de forma correcta');

        return Inertia::render('Series/Listado', [
            'series' => $series,
        ]);
    }


    public function verEdicionSeries($id)
    {
        $serie_actual = Serie::findOrFail($id);
        $maquinas = Maquina::orderBy('id', 'asc')->get();
        return Inertia::render('Series/Actualiza', [
            'serie' => $serie_actual,
            'maquinas' => $maquinas
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
        $serie->maquina_id = $validatedData['maquina_id'];

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
