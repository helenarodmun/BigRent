<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContratoForm;
use App\Models\Autorizado;
use App\Models\Cliente;
use App\Models\Contrato;
use App\Models\Direccion;
use App\Models\Familia;
use App\Models\Maquina;
use App\Models\Serie;
use App\Models\Subfamilia;
use App\Models\Tienda;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContratoController extends Controller
{
    public function confirmarContrato(ContratoForm $request)
    {
        $data = $request->validated();
        $cliente = Cliente::findOrFail($data['cliente_id']);
        $direccion = Direccion::findOrFail($data['direccion_id']);
        $autorizado = Autorizado::findOrFail($data['autorizado_id']);
        $serie = Serie::findOrFail($data['serie_id']);
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $semanas_dias = Contrato::calcularSemanasYDias($data['fecha_retirada'], $data['fecha_entrega']);
        $importe_alquiler = $subfamilia->precio_dia * $semanas_dias['dias'] + $subfamilia->precio_semana * $semanas_dias['semanas'];
        $importeTotal = $subfamilia->fianza + $importe_alquiler;
        $contrato = [
            'fecha_retirada' => $data['fecha_retirada'],
            'fecha_entrega' => $data['fecha_entrega'],
            'semanas' => $semanas_dias['semanas'],
            'dias' => $semanas_dias['dias'],
            'importe_total' => $importeTotal,
            'notas1' => $data['notas1'],
            'notas2' => $data['notas2'],
            'cliente_id' => $data['cliente_id'],
            'serie_id' => $data['serie_id'],
            'direccion_id' => $data['direccion_id'],
            'autorizado_id' => $data['autorizado_id']
        ];
        return Inertia::render('Contratos/ConfirmarContrato', [
            'cliente' => $cliente,
            'direccion' => $direccion,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie,
            'importe_alquiler' => $importe_alquiler
        ]);
    }


    public function create(ContratoForm $request)
    {
        $data = $request->validated(); // Validar los datos del formulario
        // Obtener la subfamilia de la serie
        $serie = Serie::findOrFail($data['serie_id']);
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        // Calcular las semanas y días a partir de las fechas de inicio y fin
        $semanas_dias = Contrato::calcularSemanasYDias($data['fecha_retirada'], $data['fecha_entrega']);
        // Calcular el importe total según los precios y fianzas de la subfamilia
        $importeTotal = $subfamilia->fianza + $subfamilia->precio_dia * $semanas_dias['dias'] + $subfamilia->precio_semana * $semanas_dias['semanas'];
        //cambia el estado de disponibilidad
        $serie->disponible = 0;
        // Crear el contrato en la base de datos
        $contrato = Contrato::create([
            'fecha_retirada' => $data['fecha_retirada'],
            'fecha_entrega' => $data['fecha_entrega'],
            'semanas' => $semanas_dias['semanas'],
            'dias' => $semanas_dias['dias'],
            'importe_total' => $importeTotal,
            'notas1' => $data['notas1'],
            'notas2' => $data['notas2'],
            'cliente_id' => $data['cliente_id'],
            'serie_id' => $data['serie_id'],
            'direccion_id' => $data['direccion_id'],
            'autorizado_id' => $data['autorizado_id']
        ]);
        dd($contrato);
        // Devolver la vista con el contrato creado y los cálculos de semanas y días
        return Inertia::render('Contratos/VistaContrato', [
            'contrato' => $contrato,
            'importe' => $importeTotal
        ]);
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
        $cliente_actual->load('direcciones.cliente')->load('autorizados.cliente');

        //carga la relación maquina en la consulta
        $series = Serie::with(['maquina' => function ($query) {
            $query->orderBy('descripcion', 'asc');
        }])
            //filtra los resultados por el id de la tienda asociada al usuario autenticado
            ->where('tienda_id', Auth::user()->tienda_id)
            //filtra los resultados para mostrar solo las máquinas que están disponibles para alquilar
            ->where('disponible', true)
            ->get();
        $subfamilias = Subfamilia::orderBy('id', 'asc')->get();
        $familias = Familia::orderBy('id', 'asc')->get();
        $maquinas = Maquina::orderBy('id', 'asc')->get();
        //renderiza la vista, pasando los datos
        return Inertia::render('Contratos/NuevoContrato', [
            'cliente' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'series' => $series,
            'autorizados' => $cliente_actual->autorizados,
            'familias' => $familias,
            'subfamilias' => $subfamilias,
            'maquinas' => $maquinas
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
