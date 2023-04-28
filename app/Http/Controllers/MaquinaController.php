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

        // Guardar los archivos en el almacenamiento y obtener las rutas
        $rutaManual = $request->file('url_manual')->storeAs('storage/public/manuales', $request->file('url_manual')->getClientOriginalName());
        $rutaFicha = $request->file('url_ficha')->storeAs('storage/public/fichas', $request->file('url_ficha')->getClientOriginalName());
        $rutaImagen = $request->file('url_imagen')->storeAs('storage/public/imagenes', $request->file('url_imagen')->getClientOriginalName());

        $maquina->url_manual = url($rutaManual);
        $maquina->url_ficha = url($rutaFicha);
        $maquina->url_imagen = url($rutaImagen);
        $maquina->subfamilia_id = $request->subfamilia_id;
        $maquina->marca_id = $request->marca_id;
        $maquina->save();
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->get();
        $maquinas->load('marca.maquinas');
        Session::flash('edicion', 'Se ha creado la máquina de forma correcta');

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
        Session::flash('creacion', 'Se ha actualizado la máquina de forma correcta');
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

    public function destroy($id)
    {
        $maquina = Maquina::findOrFail($id);
        $maquina->delete();
        $maquinas = Maquina::with('subfamilia')
            ->orderBy('subfamilia_id', 'asc')
            ->get();
        $maquinas->load('marca.maquinas');
        Session::flash('borrado', 'Se ha eliminado la máquina de forma correcta');
        return Inertia::render('Maquinaria/Listado', ['maquinas' => $maquinas]);
    }
}
