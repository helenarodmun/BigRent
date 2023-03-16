<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteForm;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        $clientes = Cliente::latest()
            ->get();
      
        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(ClienteForm $request)
    {        
            $request->validated();
            $request->merge(['user_id' => Auth::id()]);
            //crea un nuevo registro, el método create recibe un array con todos los datos de la solicitud
            Cliente::create($request->all());
            //obtiene todas las empresas de la base de datos, incluyendo la información del autorizado
            // Las empresas se ordenan por fecha de creación, de forma descendente (los más recientes primero).
            $clientes = Cliente::latest()
                ->get();
            // Session::flash('', '');
            return Inertia::render('Clientes/Index', ['clientes' => $clientes]);
        
    }

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClienteForm $request, $id)
    {
        // Valida los datos del formulario utilizando las reglas definidas en TravelForm.
        $validatedData = $request->validated();
        // Busca el viaje a actualizar por su ID.
        $cliente = Cliente::findOrFail($id);
        // Actualiza los campos del viaje con los datos validados del formulario.
        $cliente->origin = $validatedData['origin'];
        $cliente->destination = $validatedData['destination'];
        $cliente->date = $validatedData['date'];
        $cliente->hour = $validatedData['hour'];
        $cliente->seats = $validatedData['seats'];
        $cliente->price = $validatedData['price'];
        // Guarda el viaje actualizado en la base de datos.
        $cliente->save();
        // Recupera todos los viajes del usuario después de guardar el viaje actualizado.
        $clientes = Cliente::latest()
                    ->get();
        // Redirige al perfil del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/Index', ['clientes' => $clientes]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
}
