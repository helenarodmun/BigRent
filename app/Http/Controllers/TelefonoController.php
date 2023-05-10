<?php

namespace App\Http\Controllers;

use App\Http\Requests\TelefonoForm;
use App\Models\Autorizado;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class TelefonoController extends Controller
{
    public function create(TelefonoForm $request, $id)
    {
        $request->validated();
        $cliente = Cliente::findOrFail($id);

        if(Telefono::noExisteContacto($cliente->id, $request->contacto)){
            $telefono = $cliente->telefonos()->create($request->all());

            // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
            $direcciones = Direccion::where('cliente_id', $telefono->cliente_id)->latest()->get();
            //recupera los datos del cliente
            $cliente = $telefono->cliente;
            // Recupera todos los telefonos del cliente 
            $telefonos = Telefono::where('cliente_id', $telefono->cliente_id)->latest()->get();
            $autorizados = Autorizado::where('cliente_id', $telefono->cliente_id)->latest()->get();
            
            // Redirige al cliente del usuario actualizado.
            Session::flash('success', 'Se han guardado los datos de forma correcta');
    
            return Inertia::render('Clientes/ActualizaCliente', [
                'direcciones' => $direcciones,
                'clientes' => $cliente,
                'telefonos' => $telefonos,
                'autorizados' => $autorizados
            ]);
        }else{
            Session::flash('error', 'Ya existe el contacto asociado al cliente');
            return back();
        }
       
    }


    public function verEdicionTelefono($id)
    {
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
        $validatedData = $request->validated();

        $telefono = Telefono::findOrFail($id);

        $telefono->contacto = $validatedData['contacto'];
        $telefono->via_comunicacion = $validatedData['via_comunicacion'];
        $telefono->tipo = $validatedData['tipo'];
        $telefono->save();

        $telefonos = Telefono::where('cliente_id', $telefono->cliente_id)->latest()->get();
        $cliente = $telefono->cliente;
        $direcciones = Direccion::where('cliente_id', $telefono->cliente_id)->latest()->get();
        $autorizados = Autorizado::where('cliente_id', $telefono->cliente_id)->latest()->get();

        // Redirige al cliente del usuario actualizado.
        Session::flash('success', 'Se han actualizado los datos de contacto');

        return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos,
            'autorizados' => $autorizados
        ]);
    }


    public function destroy($id)
    {
        $telefono = Telefono::findOrFail($id);
        $telefono->delete();
        
        $telefonos = Telefono::where('cliente_id', $telefono->cliente_id)->latest()->get();
        $direcciones = Direccion::where('cliente_id', $telefono->cliente_id)->latest()->get();
        $cliente = $telefono->cliente;
        $autorizados = Autorizado::where('cliente_id', $telefono->cliente_id)->latest()->get();

        Session::flash('success', 'Se han eliminado los datos');

        return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos,
            'autorizados' => $autorizados
        ]);
    }
}
