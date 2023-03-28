<?php

namespace App\Http\Controllers;

use App\Http\Requests\TelefonoForm;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TelefonoController extends Controller
{
    public function create(TelefonoForm $request, $id)
    {
        $request->validated();
        $cliente = Cliente::findOrFail($id);
        $telefono = $cliente->telefonos()->create($request->all());
        // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
        $direcciones = Direccion::where('cliente_id', $telefono->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $telefono->cliente;
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $telefono->cliente_id)->latest()->get();
        // Redirige al cliente del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/Update', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos
        ]);
    }

    public function verEdicionTelefono($id)
    {
        //recuperar el cliente por id cliente
        $telefono = Telefono::findOrFail($id);
        $cliente = $telefono->cliente;
        return Inertia::render('Clientes/ActualizaTelefono', [
            'telefonos' => $telefono,
            'clientes' => $cliente->nombre_fiscal
        ]);
    }
    public function verFormTelefono($id)
    {
        $cliente = Cliente::findOrFail($id);
        return Inertia::render('Clientes/NuevoTelefono', [
            'cliente' => $cliente
        ]);
    }
    public function update(TelefonoForm $request, $id)
    {
        // Valida los datos del formulario utilizando las reglas definidas en ClienteUpdateForm.
        $validatedData = $request->validated();
        // Busca el regidtro a actualizar por su ID.
        $telefono = Telefono::findOrFail($id);
        // Actualiza los campos del direccion con los datos validados del formulario.
        $telefono->contacto = $validatedData['contacto'];
        $telefono->via_comunicacion = $validatedData['via_comunicacion'];
        $telefono->tipo = $validatedData['tipo'];
        // Guarda el direccion actualizado en la base de datos.
        $telefono->save();
        // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
        $telefonos = Telefono::where('cliente_id', $telefono->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $telefono->cliente;
        // Recupera todos los telefonos del cliente 
        $direcciones = Direccion::where('cliente_id', $telefono->cliente_id)->latest()->get();
        // Redirige al cliente del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/Update', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos
        ]);
    }

    public function destroy($id)
    {
        //Busca el registro por la id
        $telefono = Telefono::findOrFail($id);

        $telefono->delete();
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $telefono->cliente_id)->latest()->get();
        $direcciones = Direccion::where('cliente_id', $telefono->cliente_id)->latest()->get();
        $cliente = $telefono->cliente;


        return Inertia::render('Clientes/Update', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos
        ]);
    }
}
