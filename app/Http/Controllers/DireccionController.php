<?php

namespace App\Http\Controllers;

use App\Http\Requests\DireccionForm;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DireccionController extends Controller
{
  
    public function verEdicionDireccion($id)
    {
        //recuperar el cliente por id cliente
        $direccion = Direccion::findOrFail($id);
        $cliente = $direccion->cliente;
        return Inertia::render('Clientes/ActualizaDireccion', [
            'direcciones' => $direccion,  
            'clientes' => $cliente->nombre_fiscal          
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

        return Inertia::render('Clientes/Update', [
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

        $direcciones = Direccion::latest()->get();

        return Inertia::render('Clientes/Show', ['direcciones' => $direcciones]);
    }
}
