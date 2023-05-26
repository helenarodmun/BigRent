<?php

namespace App\Http\Controllers;

use App\Http\Requests\AutorizadoForm;
use App\Models\Autorizado;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AutorizadoController extends Controller
{
    public function create(AutorizadoForm $request, $id)
    {
        $request->validated();

        $cliente = Cliente::findOrFail($id);

        if (Autorizado::noExisteAutorizado($cliente->id, $request->nombre_persona_autorizada, $request->dni)) {

            $autorizado = new Autorizado;

            $autorizado->nombre_persona_autorizada = $request->nombre_persona_autorizada;
            $autorizado->dni = $request->dni;
            $autorizado->notas = $request->notas;
            // verificar si se ha enviado un archivo antes de guardar los archivos y obtener las rutas
            if ($request->hasFile('url_dni')) {
                $request->file('url_dni')->store("public/clientes/$cliente->nombre_fiscal/autorizados/");
            }
            $autorizado->url_dni =  $request->hasFile('url_dni') ? asset("storage/clientes/$cliente->nombre_fiscal/autorizados/" . $request->file('url_dni')->hashName()) : $autorizado->url_dni;
            $autorizado->cliente_id = $cliente->id;

            $autorizado->save();

            $autorizados = Autorizado::where('cliente_id', $autorizado->cliente_id)->latest()->get();
            $cliente = $autorizado->cliente;
            $telefonos = Telefono::where('cliente_id', $autorizado->cliente)->latest()->get();
            $direcciones = Direccion::where('cliente_id', $autorizado->cliente_id)->latest()->get();

            Session::flash('success', 'Registro guardado con éxito');

            return redirect("/editarCliente/$cliente->id");
        } else {
            Session::flash('error', 'Este cliente ya tiene un autorizado con estos datos');
            return back();
        }
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
        $cliente = Cliente::findOrFail($autorizado->cliente_id);

        // verificar si se ha enviado un archivo antes de guardar los archivos y obtener las rutas      
        if ($request->hasFile('url_dni')) {
            $autorizado->url_dni = $request->file('url_dni')->store("public/clientes/$cliente->nombre_fiscal/autorizados/");
        } else {
            $autorizado->url_dni = $autorizado->url_dni; // Mantén la ruta existente en la base de datos
        }

        // Actualiza los campos del autorizado con los datos validados del formulario.
        $autorizado->nombre_persona_autorizada = $validatedData['nombre_persona_autorizada'];
        $autorizado->dni = $validatedData['dni'];
        $autorizado->notas = $validatedData['notas'];
        $autorizado->url_dni =  $request->hasFile('url_dni') ? asset("storage/clientes/$cliente->nombre_fiscal/autorizados/" . $request->file('url_dni')->hashName()) : $autorizado->url_dni;

        // Guarda el autorizado actualizado en la base de datos.
        $autorizado->save();

        // Recupera todos las personas autorizadas del cliente después de guardar el regsitro de autorizado actualizado.
        $autorizados = Autorizado::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        //recupera los datos del cliente
        $cliente = $autorizado->cliente;
        // Recupera todos las direcciones del cliente 
        $direcciones = Direccion::where('cliente_id', $autorizado->cliente_id)->latest()->get();
        // Recupera todos los telefonos del cliente 
        $telefonos = Telefono::where('cliente_id', $autorizado->cliente_id)->latest()->get();

        Session::flash('success', 'Se ha actualizado el registro');

        return redirect("/editarCliente/$cliente->id");
    }


    public function destroy($id)
    {
        $autorizado = Autorizado::findOrFail($id);
        $cliente = $autorizado->cliente;

        // Verificar si el cliente tiene al menos un autorizado
        $numAutorizados = Autorizado::where('cliente_id', $cliente->id)->count();
        if ($numAutorizados <= 1) {
            Session::flash('error', 'Imposible borrar, el cliente debe tener mínimo un autorizado');
            return redirect("/editarCliente/$cliente->id");
        }
        $autorizado->delete();

        Session::flash('success', 'Se ha eliminado el autorizado de forma definitiva');
        return redirect("/editarCliente/$cliente->id");
    }
}
