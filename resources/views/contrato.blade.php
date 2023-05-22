<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Documento</title>
</head>
<body>
    <p>Fecha del contrato: {{$contrato->fecha_entrega}}
    <p>ID contrato: {{$contrato->id}}
    <h1>CONTRATO DE ALQUILER</h1>
    <p>CLIENTE: {{$cliente->nombre_fiscal}}</p>
    <p>NIF CLIENTE: {{$cliente->nif}}</p>
    <p>DIRECCIÓN CLIENTE: {{$direccion_predeterminada->direccion ,'-', $direccion_predeterminada->cp ,'-', $direccion_predeterminada->municipio ,'-', $direccion_predeterminada->provincia}}</p>
    <p>PERSONA AUTORIZADA: {{$autorizado->nombre_persona_autorizada}}</p>
    <p>DIRECCIÓN CONTRATO: {{$direccion->direccion ,'-', $direccion->cp ,'-', $direccion->municipio ,'-', $direccion_predeterminada->provincia}}</p>
    <p>CONTACTO: {{$telefono->contacto}}</p>
    <p>MÁQUINA CONTRATADAE: {{$maquina->descripcion}}</p>
    <p>NÚMERO DE SERIE: {{$serie->numero_serie}}</p>
    <p>FECHA INICIO: {{$contrato->fecha_retirada}}</p>
    <p>FECHA FIN: {{$contrato->fecha_entrega}}</p>
    <p>NÚMERO DIAS: {{$contrato->dias}}</p>
    <p>IMPORTE FIANZA: {{$subfamilia->fianza}} €</p>
    <p>IMPORTE ALQUILER: {{$subfamilia->precio_dia}} €/día</p>
    <p>TOTAL ALQUILER: {{$contrato->importe_total}} €</p>
    <p>ESTADO ARTÍCULO - OBSERVACIONES: {{$contrato->notas1}}</p>
    <p>OBSERVACIONES CONTRATO: {{$contrato->notas2 || ''}}</p>
</body>
</html>