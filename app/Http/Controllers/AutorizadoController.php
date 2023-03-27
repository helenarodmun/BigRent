<?php

namespace App\Http\Controllers;

use App\Http\Requests\AutorizadoForm;
use App\Models\Autorizado;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AutorizadoController extends Controller
{

    public function create(AutorizadoForm $request, $id)
    {
        $request->validated();
        $cliente = Cliente::findOrFail($id);
        $autorizado = $cliente->autorizados()->create($request->all());
        $autorizados = Autorizado::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        $cliente = $autorizado->cliente;
        // $telefonos = Telefono::where('cliente_id', $autorizado->cliente)->latest()->get();
        // $direcciones = Direccion::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        return Inertia::render('Clientes/Autorizados', [
            'autorizados' => $autorizados,
            'cliente' => $cliente,
            // 'direcciones' => $direcciones,
            // 'telefonos' => $telefonos
        ]);
    }

    public function verEdicionAutorizado($id)
    {
        $autorizado_actual = Autorizado::findOrFail($id);
        $autorizado_actual->load('cliente.autorizados');
        return Inertia::render('Clientes/ActualizaAutorizado', [
            'autorizado' => $autorizado_actual,
            'cliente' => $autorizado_actual->cliente
        ]);
    }

    public function verAutorizados($id)
    {
        $cliente = Cliente::findOrFail($id);
        $autorizados = $cliente->autorizados;
        return Inertia::render('Clientes/Autorizados', [
            'cliente' => $cliente,
            'autorizados' => $autorizados
        ]);
    }
    public function verFormAutorizado($id)
    {   
        $cliente = Cliente::findOrFail($id);       
        return Inertia::render('Clientes/NuevoAutorizado', [
            'cliente' => $cliente
        ]);
    }
    public function update(AutorizadoForm $request, $id)
    {
        // Valida los datos del formulario utilizando las reglas definidas en AutorizadoForm.
        $validatedData = $request->validated();
        // Busca el regidtro a actualizar por su ID.
        $autorizado = Autorizado::findOrFail($id);
        // Actualiza los campos del autorizado con los datos validados del formulario.
        $autorizado->nombre_persona_autorizada = $validatedData['nombre_persona_autorizada'];
        $autorizado->dni = $validatedData['dni'];
        $autorizado->telefono1 = $validatedData['telefono1'];
        $autorizado->telefono2 = $validatedData['telefono2'];
        $autorizado->anotaciones = $validatedData['anotaciones'];
        $autorizado->url_dni = $validatedData['url_dni'];
        // Guarda el autorizado actualizado en la base de datos.
        $autorizado->save();
        // Recupera todos las personas autorizadas del cliente después de guardar el regsitro de autorizado actualizado.
        $autorizados = Autorizado::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $autorizado->cliente;
        // Recupera todos las direcciones del cliente 
        // $direcciones = Direccion::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        // // Recupera todos los telefonos del cliente 
        // $telefonos = Telefono::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        // Redirige al cliente del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/Autorizados', [
            'autorizados' => $autorizados,
            'cliente' => $cliente,
            // 'direcciones' => $direcciones,
            // 'telefonos' => $telefonos
        ]);
    }

    public function destroy($id)
    {
        //Busca el registro por la id
        $autorizado = Autorizado::findOrFail($id);

        $autorizado->delete();

        $autorizados = Autorizado::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        $cliente = $autorizado->cliente;
        // Recupera todos las direcciones del cliente 
        $direcciones = Direccion::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $autorizado->cliente_id)->latest()->get();

        return Inertia::render('Clientes/Autorizados', [
            'autorizados' => $autorizados,
            'clientes' => $cliente,
            'direcciones' => $direcciones,
            'telefonos' => $telefonos
        ]);
    }
}
