<?php

namespace App\Http\Controllers;

use App\Http\Requests\TelefonoForm;
use App\Models\Telefono;
use Illuminate\Http\Request;

class TelefonoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(TelefonoForm $request, $id)
    {
        $request->validated();
          //crea un nuevo registro, recibe un array con todos los datos de la solicitud
          $nuevo_telefono = Telefono::create($request->all());
          //Establece el atributo cliente_id con el id del cliente actual
          $nuevo_telefono->cliente_id = $id;
          //obtiene todas las direcciones de la base de datos, pertenecientes al cliente
          // Las direcciones se ordenan por fecha de creación, de forma descendente (los más recientes primero).
          $telefono = Telefono::where('cliente_id', $id)->latest()->get();
  
          return $telefono;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Telefono $telefono)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Telefono $telefono)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Telefono $telefono)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Telefono $telefono)
    {
        //
    }
}
