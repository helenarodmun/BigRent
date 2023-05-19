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
        if ($request['via_comunicacion'] === null || $request['tipo'] === null ) {
            Session::flash('error', 'Debe seleccionar todos los campos');
        } else {
        $cliente = Cliente::findOrFail($id);

        if(Telefono::noExisteContacto($cliente->id, $request->contacto)){
            $telefono = $cliente->telefonos()->create($request->all());
            //recupera los datos del cliente
            $cliente = $telefono->cliente;
            // Redirige al cliente del usuario actualizado.
            Session::flash('success', 'Se han guardado los datos de forma correcta');
    
            return redirect("/editarCliente/$cliente->id");
        }else{
            Session::flash('error', 'Ya existe el contacto asociado al cliente');
            return back();
        } 
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
        $cliente = $telefono->cliente;

        // Redirige al cliente del usuario actualizado.
        Session::flash('success', 'Se han actualizado los datos de contacto');
        return redirect("/editarCliente/$cliente->id");
    }


    public function destroy($id)
    {
        $telefono = Telefono::findOrFail($id);
        $cliente = $telefono->cliente;
    
        // Verificar si el cliente tiene al menos un teléfono
        $numTelefonos = Telefono::where('cliente_id', $cliente->id)->count();
        if ($numTelefonos <= 1) {
            Session::flash('error', 'Imposible borrar, el cliente debe tener mínimo un dato de contacto');
            return redirect("/editarCliente/$cliente->id");
        }
    
        $telefono->delete();
    
        Session::flash('success', 'Se han eliminado los datos');
        return redirect("/editarCliente/$cliente->id");
    }
}
