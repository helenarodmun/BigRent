<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaquinaForm;
use App\Models\Maquina;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MaquinaController extends Controller
{
    use InteractsWithSockets;

    public function index()
    {
        //obtiene id de la tienda a la que pertenece el usuario logueado
        $tienda = Auth::user()->tienda_id;
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('descripcion', 'asc')
            ->paginate(10);
        //obtiene todos los registros que coinciden con la tienda del usuario
        $maquinas->load(['marca.maquinas', 'series' => function ($query) use ($tienda) {
            $query->where('tienda_id', $tienda);
        }]);

        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }


    public function create(MaquinaForm $request)
    {
        $request->validated();

        if (Maquina::noExisteMaquina($request->descripcion, $request->referencia)) {
            $maquina = new Maquina;

            $maquina->descripcion = $request->descripcion;
            $maquina->referencia = $request->referencia;

            // verificar si se ha enviado un archivo antes de guardar los archivos y obtener las rutas
            if ($request->hasFile('url_manual')) {
                $request->file('url_manual')->store('public/manuales');
            }
            if ($request->hasFile('url_ficha')) {
                $request->file('url_ficha')->store('public/fichas');
            }
            if ($request->hasFile('url_imagen')) {
                $request->file('url_imagen')->store('public/imagenes');
            }

            // Asigna las rutas de los archivos almacenados a los atributos correspondientes del modelo si no recibe valos para este campo lo deja en null
            $maquina->url_manual = $request->hasFile('url_manual') ? asset('storage/manuales/' . $request->file('url_manual')->hashName()) : null;
            $maquina->url_ficha = $request->hasFile('url_ficha') ? asset('storage/fichas/' . $request->file('url_ficha')->hashName()) : null;
            $maquina->url_imagen = $request->hasFile('url_imagen') ? asset('storage/imagenes/' . $request->file('url_imagen')->hashName()) : null;

            $maquina->subfamilia_id = $request->subfamilia_id;
            $maquina->marca_id = $request->marca_id;
            $maquina->save();
            //recuperamos todos los registros a mostrar
            $tienda = Auth::user()->tienda_id;
            $maquinas = Maquina::with('subfamilia')
                ->orderBy('descripcion', 'asc')
                ->paginate(10);
            $maquinas->load(['marca.maquinas', 'series' => function ($query) use ($tienda) {
                $query->where('tienda_id', $tienda);
            }]);
            Session::flash('success', 'Se ha creado el registro de forma correcta');

            return Inertia::render('Maquinaria/Listado', [
                'maquinas' => $maquinas,
            ]);
        } else {
            Session::flash('error', 'Ya existe una máquina con ese nombre o número de referencia');
            return back();
        }
    }


    public function verEdicionMaquina($id)
    {
        $maquina_actual = Maquina::findOrFail($id);

        $maquina_actual->load('subfamilia.maquinas');
        $maquina_actual->load('marca.maquinas');

        return Inertia::render('Maquinaria/Actualiza', [
            'maquina' => $maquina_actual,
            'subfamilia' => $maquina_actual->subfamilia,
            'marca' => $maquina_actual->marca
        ]);
    }


    public function update(MaquinaForm $request, $id)
    {
        $validatedData = $request->validated();

        $maquina = Maquina::findOrFail($id);

        // verificar si se ha enviado un archivo antes de guardar los archivos y obtener las rutas
        if ($request->hasFile('url_manual')) {
            $request->file('url_manual')->store('public/manuales');
        }
        if ($request->hasFile('url_ficha')) {
            $request->file('url_ficha')->store('public/fichas');
        }
        if ($request->hasFile('url_imagen')) {
            $request->file('url_imagen')->store('public/imagenes');
        }

        $maquina->descripcion = $validatedData['descripcion'];
        $maquina->referencia = $validatedData['referencia'];

        //si se ha enviado el archivo se almacena, si no se almacena el campo existente
        $maquina->url_manual = $request->hasFile('url_manual') ? asset('storage/manuales/' . $request->file('url_manual')->hashName()) : $maquina->url_manual;
        $maquina->url_ficha = $request->hasFile('url_ficha') ? asset('storage/fichas/' . $request->file('url_ficha')->hashName()) : $maquina->url_ficha;
        $maquina->url_imagen = $request->hasFile('url_imagen') ? asset('storage/imagenes/' . $request->file('url_imagen')->hashName()) : $maquina->url_imagen;

        $maquina->save();

        //recuperamos todos los registros a mostrar
        $tienda = Auth::user()->tienda_id;
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('descripcion', 'asc')
            ->paginate(10);
        $maquinas->load(['subfamilia.maquinas', 'marca.maquinas', 'series' => function ($query) use ($tienda) {
            $query->where('tienda_id', $tienda);
        }]);

        Session::flash('success', 'Se ha actualizado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }


    public function verDatosMaquina($id)
    {
        $tienda = Auth::user()->tienda_id;
        //recuperamos el registro de la maquina y los valores correspondientes a sus relaciones con otras tablas
        $maquina = Maquina::findOrFail($id);
        $maquina->load(['subfamilia.maquinas', 'marca.maquinas', 'series' => function ($query) use ($tienda) {
            $query->where('tienda_id', $tienda);
        }]);

        return Inertia::render('Maquinaria/VistaMaquina', [
            'maquina' => $maquina,
        ]);
    }


    public function destroy($id)
    {
        try {
            $maquina = Maquina::findOrFail($id);
            $maquina->delete();
            //recuperamos todos los registros a mostrar
            $tienda = Auth::user()->tienda_id;
            $maquinas = Maquina::with('subfamilia')
                ->orderBy('descripcion', 'asc')
                ->paginate(10);
            $maquinas->load(['marca.maquinas', 'series' => function ($query) use ($tienda) {
                $query->where('tienda_id', $tienda);
            }]);
            Session::flash('success', 'Se ha eliminado la máquina de forma correcta');
            return Inertia::render('Maquinaria/Listado', ['maquinas' => $maquinas]);
        } catch (\Exception $e) {
            if ($e->getCode() == "23000")
                Session::flash('error', 'Imposible eliminar, existen registros relacionados');
            return back();
        }
    }
}
