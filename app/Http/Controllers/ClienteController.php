<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteForm;
use App\Http\Requests\DireccionForm;
use App\Http\Requests\TelefonoForm;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ClienteController extends Controller
{
    //Método para visualizar todos los clientes
    public function index()
    {
        //Recuperar todos los clientes de la base de datos
        $clientes = Cliente::latest()->get();

        return Inertia::render('Clientes/Listado', [
            'clientes' => $clientes,
        ]);
    }

    public function create(ClienteForm $request)
    {
        $request->validated();
        $predeterminada = $request->predeterminada;

        if(Direccion::compruebaDireccion($predeterminada)) {

            DB::transaction(function ()  use ($request) {
                $cliente = Cliente::create([
                    'nombre_fiscal' => $request->nombre_fiscal,
                    'nif' => $request->nif,
                    'nombre_comercial' => $request->nombre_comercial,
                    'tipo_cliente' => $request->tipo_cliente,
                    'administrador' => $request->administrador,
                    'dni_administrador' => $request->dni_administrador,
                    'url_escrituras' => $request->url_escrituras,
                    'url_dni_administrador' => $request->url_dni_administrador,
                    'url_cif' => $request->url_cif,
                    'anotaciones' => $request->anotaciones
                ]);
                $cliente->direcciones()->create([
                    'direccion' => $request->direccion,
                    'cp' => $request->cp,
                    'localidad' => $request->localidad,
                    'municipio' => $request->municipio,
                    'provincia' => $request->provincia,
                    'predeterminada' => $request->predeterminada
                ]);
                $cliente->telefonos()->create([
                    'contacto' => $request->contacto,
                    'via_comunicacion' => $request->via_comunicacion,
                    'tipo' => $request->tipo
                ]);
                $cliente->autorizados()->create([
                    'nombre_persona_autorizada' => $request->nombre_persona_autorizada,
                    'dni' => $request->dni,
                    'notas' => $request->notas,
                    'url_dni' => $request->url_dni
                ]);
            });

            $clientes = Cliente::latest()->get();
            Session::flash('creacion', 'Datos guardados con éxito');
            return Inertia::render('Clientes/Listado', ['clientes' => $clientes]);
        } else {
            Session::flash('errorCreacion', 'La dirección principal del cliente debe ser la predeterminada');
            return back();
        }
    }

    public function showCliente($id)
    {
        //recupera los datos del cliente a través de la id pasada por url
        $cliente_actual = Cliente::findOrFail($id);
        //carga las direcciones relacionadas con el cliente actual
        $cliente_actual->load('direcciones.cliente');
        //carga los telefonos relacionados con el cliente
        $cliente_actual->load('telefonos.cliente');
         //carga los autorizados relacionados con el cliente
         $cliente_actual->load('autorizados.cliente');
        //renderiza la vista, pasando los datos
        return Inertia::render('Clientes/FichaCliente', [
            'clientes' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'telefonos' => $cliente_actual->telefonos,
            'autorizados' => $cliente_actual->autorizados,
        ]);
    }

    public function showClienteEdicion($id)
    {
        //recupera los datos del cliente a través de la id pasada por url
        $cliente_actual = Cliente::findOrFail($id);
        //carga las direcciones relacionadas con el cliente actual
        $cliente_actual->load('direcciones.cliente');
        //carga los telefonos relacionados con el cliente
        $cliente_actual->load('telefonos.cliente');
        $cliente_actual->load('autorizados.cliente');
        //renderiza la vista, pasando los datos
        return Inertia::render('Clientes/ActualizaCliente', [
            'clientes' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'telefonos' => $cliente_actual->telefonos,
            'autorizados' => $cliente_actual->autorizados,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get('q');
        $clientes = Cliente::where('nombre_fiscal', 'like', '%'.$query.'%')
                            ->orWhere('nif', 'like', '%'.$query.'%')
                            ->get();

        return Inertia::render('Clientes/Busqueda', [
            'clientes' => $clientes,
            'resultado' => $query
        ]);
    }

    public function update(ClienteForm $request, $id)
    {

        // Valida los datos del formulario utilizando las reglas definidas en ClienteUpdateForm.
        $validatedData = $request->validated();
        // Busca el cliente a actualizar por su ID.
        $cliente = Cliente::findOrFail($id);
        // Actualiza los campos del cliente con los datos validados del formulario.
        $cliente->nombre_fiscal = $validatedData['nombre_fiscal'];
        $cliente->nif = $validatedData['nif'];
        $cliente->nombre_comercial = $validatedData['nombre_comercial'];
        $cliente->tipo_cliente = $validatedData['tipo_cliente'];
        $cliente->administrador = $validatedData['administrador'];
        $cliente->dni_administrador = $validatedData['dni_administrador'];
        $cliente->url_escrituras = $validatedData['url_escrituras'];
        $cliente->url_dni_administrador = $validatedData['url_dni_administrador'];
        $cliente->url_cif = $validatedData['url_cif'];
        $cliente->anotaciones = $validatedData['anotaciones'];
        // Guarda el cliente actualizado en la base de datos.
        $cliente->save();

        // Redirige al cliente del usuario actualizado.
        Session::flash('edicion', 'Se ha actualizado el cliente');
        //carga las direcciones relacionadas con el cliente actual
        $cliente->load('direcciones.cliente');
        //carga los telefonos relacionados con el cliente
        $cliente->load('telefonos.cliente');
        $cliente->load('autorizados.cliente');
        //renderiza la vista, pasando los datos
        return Inertia::render('Clientes/FichaCliente', [
            'clientes' => $cliente,
            'direcciones' => $cliente->direcciones,
            'telefonos' => $cliente->telefonos,
            'autorizados' => $cliente->autorizados
        ]);
    }


    public function destroy($id)
    {
        //Busca el cliente por la id
        $cliente = Cliente::findOrFail($id);

        //elimina el cliente
        $cliente->delete();
        //recuperación de los clientes después dela eliminación
        $clientes = Cliente::latest()->get();
        Session::flash('borrado', 'Se ha eliminado el cliente de forma definitiva');
        return Inertia::render('Clientes/Listado', ['clientes' => $clientes]);
    }
}
