<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Contrato;
use App\Models\Serie;
use App\Models\Tienda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContratoController extends Controller
{
    public function index()
    {
         
    }

    public function create(Request $request, $id)
    {
    }

    public function store(Request $request)
    {
        //
    }

    public function verFormContrato($id)
    {
        
        //recupera los datos del cliente a través de la id pasada por url
        $cliente_actual = Cliente::findOrFail($id);
        //carga las direcciones relacionadas con el cliente actual
        $cliente_actual->load('direcciones.cliente');
        //carga la relación maquina en la consulta
        $series = Serie::with(['maquina' => function($query) {
            $query->orderBy('descripcion', 'asc');
        }])
        //filtra los resultados por el id de la tienda asociada al usuario autenticado
            ->where('tienda_id', Auth::user()->tienda_id)
        //filtra los resultados para mostrar solo las máquinas que están disponibles para alquilar
            ->where('disponible', true)
            ->get();
        //renderiza la vista, pasando los datos
        return Inertia::render('Contratos/NuevoContrato', [
            'cliente' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'series' => $series
        ]);
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
