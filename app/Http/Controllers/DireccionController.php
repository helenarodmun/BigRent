<?php

namespace App\Http\Controllers;

use App\Http\Requests\DireccionForm;
use App\Models\Cliente;
use App\Models\Direccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DireccionController extends Controller
{
    public function index(Cliente $cliente)
    {
        //Recuperar direcciones de un cliente
    

    }
    public function create(DireccionForm $request, $id)
    {
        $request->validated();
        //crea un nuevo registro, recibe un array con todos los datos de la solicitud
        $nueva_direccion = Direccion::create($request->all());
        //Establece el atributo cliente_id con el id del cliente actual
        $nueva_direccion->cliente_id = $id;
        //obtiene todas las direcciones de la base de datos, pertenecientes al cliente
        // Las direcciones se ordenan por fecha de creación, de forma descendente (los más recientes primero).
        $direcciones = Direccion::where('cliente_id', $id)->latest()->get();

        return $direcciones;
    }

    public function verEdicionDireccion($id)
    {
        //recuperar el cliente por id cliente
        $direcciones = Direccion::findOrFail($id);
        return Inertia::render('Clientes/Update', [
            'direcciones' => $direcciones,            
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
        // Recupera todos los direccions después de guardar el direccion actualizado.
        $direcciones = Direccion::latest()->get();
        // Redirige al cliente del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/Show', ['clientes' => $direcciones]);
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
