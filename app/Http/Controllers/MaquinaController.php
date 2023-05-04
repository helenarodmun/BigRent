<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaquinaForm;
use App\Models\Familia;
use App\Models\Maquina;
use App\Models\Marca;
use App\Models\Subfamilia;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MaquinaController extends Controller
{
    use InteractsWithSockets;

    public function index()
    {
        //Recuperar todos las maquinas de la base de datos
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('descripcion', 'asc')
            ->get();
        $maquinas->load('marca.maquinas');
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }

    public function create(MaquinaForm $request)
    {
        $request->validated();
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

        // Asigna las rutas de los archivos almacenados a los atributos correspondientes del modelo
        $maquina->url_manual = $request->hasFile('url_manual') ? asset('storage/manuales/' . $request->file('url_manual')->hashName()) : null;
        $maquina->url_ficha = $request->hasFile('url_ficha') ? asset('storage/fichas/' . $request->file('url_ficha')->hashName()) : null;
        $maquina->url_imagen = $request->hasFile('url_imagen') ? asset('storage/imagenes/' . $request->file('url_imagen')->hashName()) : null;
        $maquina->subfamilia_id = $request->subfamilia_id;
        $maquina->marca_id = $request->marca_id;
        $maquina->save();
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->get(); // Obtiene todas las máquinas de la base de datos, incluyendo la relación 'subfamilia'
        $maquinas->load('marca.maquinas'); // Carga la relación 'marca.maquinas' para todas las máquinas
        Session::flash('success', 'Se ha creado el registro de forma correcta');
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
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
        dd($request);
        $validatedData = $request->validated();
        $maquina = Maquina::findOrFail($id);
        $maquina->descripcion = $validatedData['descripcion'];
        $maquina->referencia = $validatedData['referencia'];
        $maquina->url_manual = $validatedData['url_manual'];
        $maquina->url_ficha = $validatedData['url_ficha'];
        $maquina->url_imagen = $validatedData['url_imagen'];
        $maquina->save();

        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->get();
        $maquinas->load('marca.maquinas');
        Session::flash('success', 'Se ha actualizado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', [
            'maquinas' => $maquinas,
        ]);
    }

    public function verDatosMaquina($id)
    {
        $maquina = Maquina::findOrFail($id);
        // Puedes cargar relaciones adicionales si es necesario
        $maquina->load('subfamilia', 'marca');
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
            ->get();
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
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->get();
        $maquinas->load('marca.maquinas');
        Session::flash('success', 'Se ha eliminado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', ['maquinas' => $maquinas]);
    }
}
