<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use App\Models\Direccion;
use App\Models\Telefono;
use PDF;
use Picqer\Barcode\BarcodeGeneratorSVG;
use Illuminate\Support\Facades\Auth;


class PdfController extends Controller
{
	
	public static function generaDocumentoContrato($id)
    {
        $usuario = Auth::user();

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;
        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($cliente->id);
        $correo = Telefono::where('via_comunicacion', 'C')->first()->contacto;
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $numero_serie = str_replace(' ', '', $serie->numero_serie);
		
        $referencia = $maquina->referencia;
        $subfamilia = $maquina->subfamilia;
        $nombreArchivo = $cliente->nombrefiscal;
		
        $barcodeGenerator = new BarcodeGeneratorSVG();
        $codigoReferencia = $barcodeGenerator->getBarcode($referencia, $barcodeGenerator::TYPE_CODE_128);

        $codigoNumSerie = $barcodeGenerator->getBarcode($numero_serie, $barcodeGenerator::TYPE_CODE_128);

        $codigoFianza = $barcodeGenerator->getBarcode($subfamilia->fianza, $barcodeGenerator::TYPE_CODE_128);

        $codigoAlquilerDias = $barcodeGenerator->getBarcode($subfamilia->precio_dia, $barcodeGenerator::TYPE_CODE_128);

        $pdf = \PDF::loadView('contrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'correo',
         'autorizado', 'direccion', 'telefono', 'maquina', 'referencia','subfamilia', 'serie', 'codigoReferencia', 'codigoNumSerie','codigoFianza', 'codigoAlquilerDias', 'usuario'));

        return $pdf->stream();
    }


    public function guardaDocumentoFin($id)
    {

        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;
        $nombreUsuario = $user->username; 
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

        $usuario = Auth::user();
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

        $barcodeGenerator = new BarcodeGeneratorSVG();
        $codigoReferencia = $barcodeGenerator->getBarcode($referencia, $barcodeGenerator::TYPE_CODE_128);
        $codigoFianza = $barcodeGenerator->getBarcode($subfamilia->fianza, $barcodeGenerator::TYPE_CODE_128);
        $codigoAlquilerDias = $barcodeGenerator->getBarcode($subfamilia->precio_dia, $barcodeGenerator::TYPE_CODE_128);
		
		
        $pdf = \PDF::loadView('fincontrato', compact('contrato', 'cliente', 'direccion_predeterminada', 'correo','autorizado', 'direccion', 'telefono', 'maquina', 'referencia', 'subfamilia', 'serie', 'usuario', 'codigoReferencia','codigoFianza', 'codigoAlquilerDias'));
        // $pdf->save("contratos/$cliente->nombre_fiscal-$contrato->id.pdf");
        return $pdf->stream();
    }
}
