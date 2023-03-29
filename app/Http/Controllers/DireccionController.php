<?php

namespace App\Http\Controllers;

use App\Http\Requests\DireccionForm;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class DireccionController extends Controller
{
    public function create(DireccionForm $request, $id)
    {
        
        $request->validated();
        $cliente = Cliente::findOrFail($id);
        $direccion = $cliente->direcciones()->create($request->all());
        // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
        $direcciones = Direccion::where('cliente_id', $direccion->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $direccion->cliente;
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $direccion->cliente_id)->latest()->get();
        // Redirige al cliente del usuario actualizado.
        Session::flash('mensaje', 'Se ha creado la dirección de forma correcta');

        return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos
        ]);
    }


    public function verEdicionDireccion($id)
    {     
        //recupera los datos de la dirección a través de la id pasada por url   
        $direccion_actual = Direccion::findOrFail($id);
        //carga el cliente relacionado con la direccion actual
        $direccion_actual->load('cliente.direcciones');
        return Inertia::render('Clientes/ActualizaDireccion', [
            'direccion' => $direccion_actual,
            'cliente' => $direccion_actual->cliente
        ]);
    }
    public function verFormDireccion($id)
    {   
        $cliente = Cliente::findOrFail($id);       
        return Inertia::render('Clientes/NuevaDireccion', [
            'cliente' => $cliente
        ]);
    }

    public function update(DireccionForm $request, $id)
    {
        // Valida los datos del formulario utilizando las reglas definidas en ClienteUpdateForm.
        $validatedData = $request->validated();
        // Busca el regidtro a actualizar por su ID.
        $direccion = Direccion::findOrFail($id);
        // Actualiza los campos del direccion con los datos validados del formulario.
        $direccion->direccion = $validatedData['direccion'];
        $direccion->cp = $validatedData['cp'];
        $direccion->localidad = $validatedData['localidad'];
        $direccion->municipio = $validatedData['municipio'];
        $direccion->provincia = $validatedData['provincia'];
        $direccion->predeterminada = $validatedData['predeterminada'];
        // Guarda el direccion actualizado en la base de datos.
        $direccion->save();
        // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
        $direcciones = Direccion::where('cliente_id', $direccion->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $direccion->cliente;
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $direccion->cliente_id)->latest()->get();
        // Redirige al cliente del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos
        ]);
    }

    public function destroy($id)
    {
        //Busca el registro por la id
        $direccion = Direccion::findOrFail($id);

        $direccion->delete();

        $direcciones = Direccion::where('cliente_id', $direccion->cliente_id)->latest()->get();
        $cliente = $direccion->cliente;
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $direccion->cliente_id)->latest()->get();

         return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos
        ]);
    }
}
