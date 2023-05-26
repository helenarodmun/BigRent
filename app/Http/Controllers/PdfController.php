<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use App\Models\Direccion;
use App\Models\Telefono;
use PDF;
use Picqer\Barcode\BarcodeGeneratorSVG;



class PdfController extends Controller
{
	
	public static function generaDocumentoContrato($id)
    {

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;

        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($cliente->id);
        $correo = Telefono::where('via_comunicacion', 'C')->first()->contacto;
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $referencia = $maquina->referencia;
        $subfamilia = $maquina->subfamilia;
        $nombreArchivo = $cliente->nombrefiscal;
		
        $barcodeGenerator = new BarcodeGeneratorSVG();
        $codigoReferencia = $barcodeGenerator->getBarcode($referencia, $barcodeGenerator::TYPE_CODE_128);

        $codigoNumSerie = $barcodeGenerator->getBarcode($maquina, $barcodeGenerator::TYPE_CODE_128);

        $codigoFianza = $barcodeGenerator->getBarcode($subfamilia->fianza, $barcodeGenerator::TYPE_CODE_128);

        $pdf = \PDF::loadView('contrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'correo',
         'autorizado', 'direccion', 'telefono', 'maquina', 'referencia','subfamilia', 'serie', 'codigoReferencia', 'codigoNumSerie','codigoFianza'));

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
        $referencia = $maquina->referencia;
        $barcodeData = $maquina->referencia;

        $pdf = \PDF::loadView('contrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'autorizado', 'direccion', 'telefono', 'maquina','referencia', 'subfamilia', 'serie', 'barcodeData'));
        return $pdf->save("contratos/$cliente->nombre_fiscal-$contrato->id.pdf");
    }

    public function generaDocumentoFIN($id)
    {

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;

        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($cliente->id);
        $correo = Telefono::where('via_comunicacion', 'C')->first()->contacto;
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $nombreArchivo = $cliente->nombrefiscal;
        $referencia = $maquina->referencia;

        $pdf = \PDF::loadView('fincontrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'correo','autorizado', 'direccion', 'telefono', 'maquina', 'referencia', 'subfamilia', 'serie'));
        // $pdf->save("contratos/$cliente->nombre_fiscal-$contrato->id.pdf");
        return $pdf->stream();
    }
}
