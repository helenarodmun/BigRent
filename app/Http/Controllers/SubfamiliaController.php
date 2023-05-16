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
        //manda mensaje de error si los valores son negativos
        if ($request->precio_dia <= 0 || $request->fianza < 0) {
            Session::flash('error', 'debe introducir un número mayor que 0');
            return back();
        }
        $subfamilia = Subfamilia::create($request->all());

        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBY('descripcion', 'asc')
            ->paginate(10);
        Session::flash('success', 'Se ha creado la subfamilia de forma correcta');

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


    public function update(SubfamiliaForm $request, $id)
    {
        $validatedData = $request->validated();

        $subfamilia = Subfamilia::findOrFail($id);
        //manda mensaje de error si los valores son negativos
        if ($request->precio_dia <= 0 || $request->fianza < 0) {
            Session::flash('error', 'debe introducir un número mayor que 0');
            return back();
        }
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
