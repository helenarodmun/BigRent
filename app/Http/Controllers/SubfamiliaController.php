<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubfamiliaForm;
use App\Models\Subfamilia;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SubfamiliaController extends Controller
{

    public function index()
    {
        $subfamilias = Subfamilia::with('familia')
            ->orderBy('familia_id', 'asc')
            ->orderBy('descripcion', 'asc')
            ->paginate(15);

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
        Subfamilia::create($request->all());

        Session::flash('success', 'Se ha creado la subfamilia de forma correcta');
         return redirect("/subfamilias");
    }


    public function verEdicionSubfamilia($id)
    {
        $subfamilia_actual = Subfamilia::findOrFail($id);
        $familia = $subfamilia_actual->familia;

        return Inertia::render('Subfamilias/Actualiza', [
            'subfamilia' => $subfamilia_actual,
            'familia' => $familia
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

        Session::flash('success', 'Se ha actualizado la subfamilia de forma correcta');
        return redirect("/subfamilias");
    }


    public function destroy($id)
    {
        try {
            $subfamilia = Subfamilia::findOrFail($id);
            $subfamilia->delete();
            Session::flash('success', 'Se ha eliminado la subfamilia de forma correcta');
            return redirect("/subfamilias");
        } catch (\Exception $e) {
            if ($e->getCode() == "23000")
                Session::flash('error', 'Imposible eliminar, existen registros relacionados');
            return back();
        }
    }
}
