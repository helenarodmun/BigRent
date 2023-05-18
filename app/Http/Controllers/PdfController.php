<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use App\Models\Direccion;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PDF;

class PdfController extends Controller
{

    public static function generaDocumentoContrato($id)
    {

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;

        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($cliente->id);
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $nombreArchivo = $cliente->nombrefiscal;

        $pdf = \PDF::loadView('contrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'autorizado', 'direccion', 'telefono', 'maquina', 'subfamilia', 'serie'));

        return $pdf->stream();
    }


    public function guardaDocumentoFin($id)
    {

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;

        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($cliente->id);
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $nombreArchivo = $cliente->nombrefiscal;

        $pdf = \PDF::loadView('contrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'autorizado', 'direccion', 'telefono', 'maquina', 'subfamilia', 'serie'));
        return $pdf->save("contratos/$cliente->nombre_fiscal-$contrato->id.pdf");
    }

    public function generaDocumentoFIN($id)
    {

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;

        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($cliente->id);
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $nombreArchivo = $cliente->nombrefiscal;

        $pdf = \PDF::loadView('fincontrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'autorizado', 'direccion', 'telefono', 'maquina', 'subfamilia', 'serie'));
        $pdf->save("contratos/$cliente->nombre_fiscal-$contrato->id.pdf");
        return $pdf->stream();
    }
}
