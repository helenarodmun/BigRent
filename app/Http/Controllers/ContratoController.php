<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Contrato;
use App\Models\Serie;
use App\Models\Tienda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratoController extends Controller
{
    public function index()
    {
         
    }

    public function create(Request $request, $id)
    {
        //recupera los datos del cliente a través de la id pasada por url
        $cliente_actual = Cliente::findOrFail($id);
        //carga las direcciones relacionadas con el cliente actual
        $cliente_actual->load('direcciones.cliente');
        $tiendas = Tienda::orderBy('nombre', 'asc');
        $series = Serie::with('maquina')
            ->orderBy('descripcion', 'asc');
        //renderiza la vista, pasando los datos
        return Inertia::render('Contratos/NuevoContrato', [
            'cliente' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'tiendas' => $tiendas,
            'series' => $series
        ]);
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
