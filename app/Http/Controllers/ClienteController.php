<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteForm;
use App\Http\Requests\ClienteUpdateForm;
use App\Http\Requests\DireccionForm;
use App\Http\Requests\TelefonoForm;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClienteController extends Controller
{
    //Método para visualizar todos los clientes
    public function index()
    {
        //Recuperar todos los clientes de la base de datos
        $clientes = Cliente::latest()->get();

        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
        ]);
    }

    public function create(ClienteForm $requestCliente)
    {
        $requestCliente->validated();
        // $requestDireccion->validated();
        // $requestTelf->validated();
        $requestCliente->merge(['user_id' => Auth::id()]);
        //crea un nuevo registro, el método create recibe un array con todos los datos de la solicitud
        $nuevo_cliente = Cliente::create($requestCliente->all());
        //nueva instancia del controlador de direcciones, para acceder al metodo de creación
        // $direccion_cliente = new DireccionController();
        // $direccion_cliente->create($requestDireccion, $nuevo_cliente->id);

        // $telefono_cliente = new TelefonoController();
        // $telefono_cliente->create($requestTelf, $nuevo_cliente->id);
        //obtiene todas las empresas de la base de datos, incluyendo la información del autorizado
        // Las empresas se ordenan por fecha de creación, de forma descendente (los más recientes primero).
        $clientes = Cliente::latest()->get();
        // Session::flash('', '');
        return Inertia::render('Clientes/Index', ['clientes' => $clientes]);
    }

    public function showClienteActual($id)
    {
        //recupera los datos del cliente a través de la id pasada por url
        $cliente_actual = Cliente::findOrFail($id);
        //carga las direcciones relacionadas con el cliente actual
        $cliente_actual->load('direcciones.cliente');
        //carga los telefonos relacionados con el cliente
        $cliente_actual->load('telefonos.cliente');

        //renderiza la vista, pasando los datos

        return Inertia::render('Cliente/Show', [
            'clientes' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'telefonos' => $cliente_actual->telefonos,
        ]);
    }

    public function update(ClienteUpdateForm $request, $id)
    {
        
        // Valida los datos del formulario utilizando las reglas definidas en ClienteUpdateForm.
        $validatedData = $request->validated();
        // Busca el cliente a actualizar por su ID.
        $cliente = Cliente::findOrFail($id);
        dd($cliente);
        // Actualiza los campos del cliente con los datos validados del formulario.
        $cliente->nombre_fiscal = $validatedData['nombre_fiscal'];
        $cliente->nif = $validatedData['nif'];
        $cliente->nombre_comercial = $validatedData['nombre_comercial'];
        $cliente->tipo = $validatedData['tipo'];
        $cliente->administrador = $validatedData['administrador'];
        $cliente->dni_administrador = $validatedData['dni_administrador'];
        $cliente->url_escrituras = $validatedData['url_escrituras'];
        $cliente->url_dni_administrator = $validatedData['url_dni_administrator'];
        $cliente->url_cif = $validatedData['url_cif'];
        $cliente->anotaciones = $validatedData['anotaciones'];
        // Guarda el cliente actualizado en la base de datos.
        $cliente->save();
        // Recupera todos los clientes después de guardar el cliente actualizado.
        $clientes = Cliente::latest()->get();
        // Redirige al cliente del usuario actualizado.
        // Session::flash('edit', 'Se ha actualizado tú viaje');

        return Inertia::render('Clientes/Index', ['clientes' => $clientes]);
    }

    public function destroy($id)
    {
        //Busca el cliente por la id
        $cliente = Cliente::findOrFail($id);

        //elimina el cliente
        $cliente->delete();
        //recuperación de los clientes después dela eliminación
        $clientes = Cliente::latest()->get();

        return Inertia::render('Clientes/Index', ['clientes' => $clientes]);
    }
}
