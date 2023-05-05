<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClienteForm;
use App\Models\Cliente;
use App\Models\Direccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ClienteController extends Controller
{
    //Método para visualizar todos los clientes
    public function index()
    {
        $clientes = Cliente::with('tipo')
            ->orderBy('tipo_cliente_id', 'asc')
            ->get();

        return Inertia::render('Clientes/Listado', [
            'clientes' => $clientes,
        ]);
    }


    public function create(ClienteForm $request)
    {
        $request->validated();

        $predeterminada = $request->predeterminada;

        //verificar si se ha enviado un archivo antes de intentar guardarlos y asignar las rutas correspondientes al modelo
        if ($request->hasFile('url_escrituras')) {
            $request->file('url_escrituras')->store('public/clientes/escrituras/');
        }
        if ($request->hasFile('url_dni_administrador')) {
            $request->file('url_dni_administrador')->store('public/clientes/dni/');
        }
        if ($request->hasFile('url_cif')) {
            $request->file('url_cif')->store('public/clientes/cif/');
        }
        if ($request->hasFile('url_dni')) {
            $request->file('url_dni')->store('public/clientes/autorizados/');
        }

        //Comprueba que la dirección se haya guardado como predeterminada
        if (Direccion::compruebaDireccion($predeterminada)) {

            DB::transaction(function ()  use ($request) {

                $cliente = Cliente::create([
                    'nombre_fiscal' => $request->nombre_fiscal,
                    'nif' => $request->nif,
                    'nombre_comercial' => $request->nombre_comercial,
                    'tipo_cliente_id' => $request->tipo_cliente_id,
                    'administrador' => $request->administrador,
                    'dni_administrador' => $request->dni_administrador,
                    //proporciona la ruta del archivo de escrituras si se ha enviado un archivo en la solicitud ($request->hasFile('url_escrituras'))
                    // en caso contrario, asigna null. La ruta del archivo se construye utilizando el método asset() para generar la URL completa a partir del nombre de archivo obtenido mediante $request->file('url_escrituras')->hashName()
                    'url_escrituras' => $request->hasFile('url_escrituras') ? asset('storage/clientes/escrituras/' . $request->file('url_escrituras')->hashName()) : null,
                    'url_dni_administrador' =>  $request->hasFile('url_dni_administrador') ? asset('storage/clientes/dni/' . $request->file('url_dni_administrador')->hashName()) : null,
                    'url_cif' => $request->hasFile('url_cif') ? asset('storage/clientes/cif/' . $request->file('url_cif')->hashName()) : null,
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
                    'url_dni' => $request->hasFile('url_dni') ? asset('storage/clientes/autorizados' . $request->file('url_dni')->hashName()) : null,
                ]);
            });

            $clientes = Cliente::latest()->get();

            Session::flash('success', 'Registro guardado con éxito');

            return Inertia::render('Clientes/Listado', ['clientes' => $clientes]);

        } else {

            Session::flash('error', 'La dirección principal del cliente debe ser la predeterminada');
            return back();
        }
    }


    public function showCliente($id)
    {
        $cliente_actual = Cliente::findOrFail($id);

        $cliente_actual->load('direcciones.cliente')
            ->load('telefonos.cliente')
            ->load('autorizados.cliente')
            ->load('tipo.cliente');

        return Inertia::render('Clientes/FichaCliente', [
            'cliente' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'telefonos' => $cliente_actual->telefonos,
            'autorizados' => $cliente_actual->autorizados,
            'tipo' => $cliente_actual->tipo
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
        $query = $request->get('consulta');
        $clientes = Cliente::where('nombre_fiscal', 'like', '%' . $query . '%')
            ->orWhere('nif', 'like', '%' . $query . '%')
            ->get();

        return Inertia::render('Clientes/Listado', [
            'clientes' => $clientes,
            'resultado' => $query
        ]);
    }


    public function update(Request $request, $id)
    {
        // Valida los datos del formulario utilizando las reglas definidas.
        $validatedData = $this->validate($request, [
            'nombre_fiscal' => 'nullable|string',
            'nif' => 'nullable|string|max:9',
            'nombre_comercial' => 'nullable|string',
            'administrador' => 'nullable|string',
            'dni_administrador' => 'nullable|string',
            'url_escrituras' => 'nullable|file|mimes:pdf,xlx,csv,pg,png,jpeg|max:2048',
            'url_dni_administrador' => 'nullable|file|mimes:pdf,xlx,csv,pg,png,jpeg|max:2048',
            'url_cif' => 'nullable|file|mimes:pdf,xlx,csv,pg,png,jpeg|max:2048',
            'anotaciones' => 'nullable|string|max:255',
        ]);

        // Busca el cliente a actualizar por su ID.
        $cliente = Cliente::findOrFail($id);

        //verificar si se ha enviado un archivo antes de intentar guardarlos y asignar las rutas correspondientes al modelo
        if ($request->hasFile('url_escrituras')) {
            $request->file('url_escrituras')->store('public/clientes/escrituras/');
        }
        if ($request->hasFile('url_dni_administrador')) {
            $request->file('url_dni_administrador')->store('public/clientes/dni/');
        }
        if ($request->hasFile('url_cif')) {
            $request->file('url_cif')->store('public/clientes/cif/');
        }

        // Actualiza los campos del cliente con los datos validados del formulario.
        $cliente->nombre_fiscal = $validatedData['nombre_fiscal'];
        $cliente->nif = $validatedData['nif'];
        $cliente->nombre_comercial = $validatedData['nombre_comercial'];
        $cliente->administrador = $validatedData['administrador'];
        $cliente->dni_administrador = $validatedData['dni_administrador'];
        $cliente->url_escrituras = $request->hasFile('url_escrituras') ?  asset('storage/clientes/escrituras/' . $request->file('url_escrituras')->hashName()) : $cliente->url_escrituras;
        $cliente->url_dni_administrador = $request->hasFile('url_dni_administrador') ?  asset('storage/clientes/dni/' . $request->file('url_dni_administrador')->hashName()) : $cliente->url_dni_administrador;
        $cliente->url_cif = $request->hasFile('url_cif') ?  asset('storage/clientes/cif/' . $request->file('url_cif')->hashName()) : $cliente->url_cif;
        $cliente->anotaciones = $validatedData['anotaciones'];

        // Guarda el cliente actualizado en la base de datos.
        $cliente->save();
        
        //carga las direcciones relacionadas con el cliente actual
        $cliente->load('direcciones.cliente')
            ->load('telefonos.cliente')
            ->load('autorizados.cliente')
            ->load('tipo.cliente');
        Session::flash('success', 'Se ha actualizado el registro');

        return Inertia::render('Clientes/FichaCliente', [
            'cliente' => $cliente,
            'direcciones' => $cliente->direcciones,
            'telefonos' => $cliente->telefonos,
            'autorizados' => $cliente->autorizados,
            'tipo' => $cliente->tipo
        ]);
    }


    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();
        $clientes = Cliente::latest()->get();
        Session::flash('success', 'Se ha eliminado el cliente de forma definitiva');

        return Inertia::render('Clientes/Listado', ['clientes' => $clientes]);
    }
}
