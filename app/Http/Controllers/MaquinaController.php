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
            'subfamilias' => $maquina_actual->subfamilia,
            'marcas' => $maquina_actual->marca
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

        Session::flash('update', 'Se ha actualizado la máquina de forma correcta');
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


    public function search(Request $request)
    {
        // Se define una función que recibe una solicitud HTTP a través del objeto $request
        // y devuelve una lista de maquinas y una consulta de búsqueda
        // Si la consulta tiene menos de tres caracteres, no se devolverán resultados
        // Se obtiene la consulta de búsqueda del parámetro 'consulta' en la solicitud
        $query = $request->input('consulta');
        // Si la longitud de la consulta es menor que tres, se devuelve una página vacía
        if (strlen($query) < 3) {
            return Inertia::render('Maquinaria/Listado', [
                'maquinas' => [],
                'resultado' => null
            ]);
        }
        // Se obtienen todas las mauinas que contienen la consulta de búsqueda por dscripcion, subfamilia o referencia
        $maquinas = Maquina::with('subfamilia')
            ->whereHas('subfamilia', function ($queryBuilder) use ($query) {
                $queryBuilder->where('descripcion', 'like', '%' . $query . '%');
            })
            ->orWhere('referencia', 'like', '%' . $query . '%')
            ->orWhere('descripcion', 'like', '%' . $query . '%')
            ->paginate(10);

        // Se devuelve una página que muestra la lista de maquinas y la consulta de búsqueda
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
            'resultado' => $query
        ]);
    }


    public function destroy($id)
    {
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
    }
}
