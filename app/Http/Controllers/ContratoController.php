<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Contrato;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratoController extends Controller
{
    public function index($id)
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

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Contrato $contrato)
    {
        //
    }

    public function edit(Contrato $contrato)
    {
        //
    }

    public function update(Request $request, Contrato $contrato)
    {
        //
    }

    public function destroy(Contrato $contrato)
    {
        //
    }
}
