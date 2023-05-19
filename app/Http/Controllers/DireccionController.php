<?php

namespace App\Http\Controllers;

use App\Http\Requests\DireccionForm;
use App\Models\Autorizado;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class DireccionController extends Controller
{

    public function create(DireccionForm $request, $id)
    {
        $request->validated();
if($request['predeterminada'] == null){
    Session::flash('error', 'debe seleccionjar el tipo de dirección');

}else{
    $cliente = Cliente::findOrFail($id);

    $direccion = new Direccion;

    $direccion->direccion = $request['direccion'];
    $direccion->cp = $request['cp'];
    $direccion->localidad = $request['localidad'];
    $direccion->municipio = $request['municipio'];
    $direccion->provincia = $request['provincia']; 
    $direccion->cliente_id = $cliente->id;       
    $direccion->predeterminada = $request['predeterminada'];
  
    // Guarda el direccion actualizado en la base de datos.
    $direccion->save();


    // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
    $direcciones = Direccion::where('cliente_id', $direccion->cliente_id)->latest()->get();
    //recupera los datos del cliente
    $cliente = $direccion->cliente;
    // Recupera todos los telefonos del cliente 
    $telefonos = Telefono::where('cliente_id', $direccion->cliente_id)->latest()->get();
    $autorizados = Autorizado::where('cliente_id', $direccion->cliente_id)->latest()->get();
    
    // Redirige al cliente del usuario actualizado.
    Session::flash('success', 'Se ha creado la dirección de forma correcta');

    return Inertia::render('Clientes/ActualizaCliente', [
        'direcciones' => $direcciones,
        'clientes' => $cliente,
        'telefonos' => $telefonos,
        'autorizados' => $autorizados
    ]);
}
      
    }


    public function verEdicionDireccion($id)
    {
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
        $validatedData = $request->validated();

        $direccion = Direccion::findOrFail($id);

        // Actualiza los campos del direccion con los datos validados del formulario.
        $direccion->direccion = $validatedData['direccion'];
        $direccion->cp = $validatedData['cp'];
        $direccion->localidad = $validatedData['localidad'];
        $direccion->municipio = $validatedData['municipio'];
        $direccion->provincia = $validatedData['provincia'];        
        $direccion->predeterminada = $validatedData['predeterminada'];
        $direccion->save();
        // Recupera todos los direcciones del cliente después de guardar el regsitro de direccion actualizado.
        $direcciones = Direccion::where('cliente_id', $direccion->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $direccion->cliente;
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $direccion->cliente_id)->latest()->get();
        $autorizados = Autorizado::where('cliente_id', $direccion->cliente_id)->latest()->get();

        // Redirige al cliente del usuario actualizado.
        Session::flash('success', 'Se ha creado la dirección de forma correcta');

        return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos,
            'autorizados' => $autorizados
        ]);
    }


    public function destroy($id)
    {
        //Busca el registro por la id
        $direccion = Direccion::findOrFail($id);

        // Comprueba si se puede eliminar la dirección
        if ($direccion->compruebaDireccion($direccion->predeterminada)) {
            Session::flash('error', 'No se puede eliminar la dirección predeterminada');
        } else {
            $direccion->delete();
        }

        $direcciones = Direccion::where('cliente_id', $direccion->cliente_id)->latest()->get();
        $cliente = $direccion->cliente;
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $direccion->cliente_id)->latest()->get();
        $autorizados = Autorizado::where('cliente_id', $direccion->cliente_id)->latest()->get();  

        Session::flash('success', 'Se ha eliminado la dirección de forma correcta');

        return Inertia::render('Clientes/ActualizaCliente', [
            'direcciones' => $direcciones,
            'clientes' => $cliente,
            'telefonos' => $telefonos,
            'autorizados' => $autorizados
        ]);
    }
}
