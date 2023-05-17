<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use App\Models\Direccion;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
Use PDF;

class PdfController extends Controller
{
    
    public function generaDocumentoContrato($id) {
       
        $contrato = Contrato::findOrFail($id);

    $cliente = $contrato->cliente;
    
    $direccion_predeterminada=Direccion::buscaDireccionPredeterminada($cliente->id);
    $direccion = $contrato->direccion;
    $telefono = $contrato->telefono;
    $autorizado = $contrato->autorizado;
    $serie = $contrato->serie;
    $maquina = $serie->maquina;
    $subfamilia = $maquina->subfamilia;
 $nombreArchivo = $cliente->nombrefiscal ;
 
    $pdf = \PDF::loadView('contrato', compact('contrato','cliente','direccion_predeterminada', 'autorizado','direccion','telefono','maquina', 'subfamilia', 'serie'));
    $pdf->save("contratos/$cliente->nombre_fiscal-$contrato->id.pdf");
return $pdf->stream();


}
}
