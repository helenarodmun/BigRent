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
            ->paginate(10);

        return Inertia::render('Series/Listado', [
            'series' => $series,
        ]);
    }


    public function create(SerieForm $request)
    {
        $request->validated();
        if (Serie::noExisteSerie($request->numero_serie)) {
            $serie = Serie::create($request->all());

            $series = Serie::with('maquina')
                ->orderBy('maquina_id', 'asc')
                ->orderBy('numero_serie', 'asc')
                ->paginate(10);
            $tiendas = Tienda::get();
            Session::flash('success', 'Se ha creado la serie de forma correcta');

            return Inertia::render('Series/Listado', [
                'series' => $series,
                'tiendas' => $tiendas
            ]);
        } else {
            Session::flash('error', 'Ya existe una serie con esa numeración');
            return back();
        }
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
            ->paginate(10);
        Session::flash('success', 'Se ha actualizado la serie de forma correcta');

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
            ->paginate(10);
        Session::flash('borrado', 'Se ha eliminado la serie de forma correcta');

        return Inertia::render('Series/Listado', ['series' => $series]);
    }
}
