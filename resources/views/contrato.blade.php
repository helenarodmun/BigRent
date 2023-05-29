<?php

	

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contrato de arrendamiento</title>
	
	
<?php
$naranja 		= "#F3B465";	
$naranja_claro	= "#FDEFCC";	

$azul	 		= "#3A5185";	
$azul_claro		= "#E5F8FF";	
$azul_claro_firma="#C6E2F8";	

$rojo			= "#E74A53";	
$rojo_claro		= "#FBE1D4";	
$rojo_claro_firma="#F5C8C5";	

$verde_claro	= "#F7FFED";	
$verde_claro	= "#DCF2C2";	

?>
	
<style>
	body {
		font-family: Impact, Haettenschweiler, 'Franklin Gothic Bold', 'Arial Black', 'sans-serif';
	}
	.div_logo {
		border: 0px solid #f00;
		padding: 5px;
		background-color: <?= $naranja ?>	
	}
		.div_logo .img {
			border: 0px solid #f00;
			width: 100px;
			display: inline-block;
			vertical-align: top;
		}
		.div_logo .rectangulo {
			border: 0px solid #000;
			height: 7px;
			width: 300px;
			background: #fff;
			display: inline-block;
			vertical-align: top;
			margin-top: 59px;
		}
		.div_logo .titulo {
			border: 0px solid #000;
			font-size: 0.99rem;
			font-weight: bold;;
			color: #fff;
			display: inline-block;
			vertical-align: top;
			margin-top: 52px;
			
			
		}
	.display_inline {
		display: inline-block
	}
	.derecha {
		text-align: right;
	}
	.izquierda {
		text-align: left;
	}
	.div_barras_maquina {
		border: 0px solid #00f;
		padding-top: 20px;
	}
	.div_informacion {
		font-size: 0.4rem;
	}
	
	
	.d_50 {
		border: 0px solid #000;
		width: 49.6%;
	}
	
	.d_100 {
		width: 100%;
		border: 1px solid #0f0
	}
	
	.linea_separacion {
		height: 3px;
		width: 100%;
		background: <?= $naranja ?>;
		margin: 3px 0px;
	}
	.d_1 {
		border: 0px solid rgba(255,0,0,0.2);
		padding: 15px 0px;
	}
	.fecha_titulo {
		color: <?= $naranja ?>;
		font-weight: bold;
		font-size: 0.65rem;
	}
	
	.fecha_valor {
		color: <?= $rojo ?>;
		font-weight: bold;
		font-size: 0.85rem;
	}
	
	.linea_datos {
		border: 0px solid #0f0;
		padding: 4px 0px;
	}
	.titulo {
		font-size: 0.7rem;
		color: #000;
		vertical-align: top;
		margin-top: 5px;
	}
	.valor {
		font-size: 0.9rem;
		color: #000;
		font-weight: 700;
		padding: 3px 7px 2px;
		vertical-align: top;
	}
	.div_firmas {
		border: 0px solid #f00;
		width: 100%;
	}
	.div_firma {
		width: 100%;
	}
	.div_firmas > div {
		vertical-align: top;
		width: 47%;
	}
	.cuadro_firma {
		height: 80px;
		padding: 5px;
		font-size: 0.8rem;
	}
	.datos_firma {
		color: #fff;
		padding: 5px;
		font-weight: bold;
		font-size: 0.6rem;
	}
	.datos_firma > div {
		vertical-align: top;
		max-height: 10px;
		font-size: 0.8rem;
	}
	
	.cuadro_final {
		border: 0px solid #f00;
		margin-top: 10px;
		font-size: 0.8rem;
	}
	
	.cuadro_final .titulo_barras {
		font-size: 0.6rem;
	}
	.cuadro_final .barras{
		border: 0px solid #f00;
	}
	.cuadro_final .total{
		border: 0px solid #f00;
	}
	.precio_1 {
		font-size: 1rem;
		color: #fff;
		padding: 5px 7px 7px;
		min-width: 160px;
	}
	.precio_2 {
		font-size: 2rem;
		font-weight: bold;
		color: #fff;
		padding: 5px 7px;
		min-width: 160px;
	}
	
	.condiciones_legales {
		margin-top: 200px;
		font-size: 0.7rem;
		text-align: justify
	}
	
</style>	

</head>
<body>
	<div class="div_logo">
		<div class="img">
			<img src="../resources/img/big_rent_contracto.png" width="100px">
		</div>
		<div class="rectangulo">
		</div>
		<div class="titulo">
			CONTRACTO DE ARRENDAMIENTO
		</div>

		
		
		
	</div>
    <div class="d_1">
		<div class="d_50 display_inline">
			<span class="fecha_titulo">FECHA:</span>
<?php
$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

 
$fecha_contrato = e($contrato->created_at);
$dia_semana = date("w", strtotime($fecha_contrato));
$dia = date("d", strtotime($fecha_contrato));
$mes = date("m", strtotime($fecha_contrato));
$mes_ano = date("n", strtotime($fecha_contrato));
$ano = date("Y", strtotime($fecha_contrato));

			
//echo "<br>".$dia." / ".$mes." / ".$ano."------".$mes_ano;
$fecha_contrato = $dias[$dia_semana].", ".$dia." de ".$meses[$mes_ano-1]. " de ".$ano ;	
?>	
			
			
			
		<span class="fecha_valor"><?php echo strtolower($fecha_contrato); ?></span>
		</div>
		<div class="d_50 display_inline derecha">
			<span class="fecha_titulo">Nº DE CONTRATO:</span>
			<?php 
			$n_contrato = substr("000000000000000".e($contrato->id) , -15);?>
			
			<span class="fecha_valor"><?= $n_contrato ?></span>
		</div>
	</div>
	
	<div class="linea_separacion"></div>
	<!------- Datos cliente ------->
			<div class="linea_datos">
				<div class="titulo display_inline">CLIENTE:</div>
				<div class="valor display_inline" style="width: 437px; background-color: <?= $naranja_claro ?>;">
					<?= e($cliente->nombre_fiscal) ?> &nbsp;
				</div>

				<div class="titulo display_inline">CIF:</div>
				<div class="valor display_inline" style="width: 150px; background-color: <?= $naranja_claro ?>;">
					<?= e($cliente->nif) ?> &nbsp;
				</div>
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">DOMICILIO:</div>
				<div class="valor display_inline" style="width: 620px; background-color: <?= $naranja_claro ?>;">
					<?= e($direccion_predeterminada->direccion ,'-', $direccion_predeterminada->cp ,'-', $direccion_predeterminada->municipio ,'-', $direccion_predeterminada->provincia) ?> &nbsp;
				</div>
			</div>
			<div class="linea_datos">
				<div class="titulo display_inline">NOTAS:</div>
				<div class="valor display_inline" style="width: 640px; background-color: <?= $naranja_claro ?>;">
					&nbsp; 
				</div>
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">TLF:</div>
				<div class="valor display_inline" style="width: 150px; background-color: <?= $naranja_claro ?>;">
					<?= e($telefono->contacto) ?> &nbsp;
				</div>

				<div class="titulo display_inline">TLF:</div>
				<div class="valor display_inline" style="width: 150px; background-color: <?= $naranja_claro ?>;">
					&nbsp; 
				</div>

				<div class="titulo display_inline">MAIL:</div>
				<div class="valor display_inline" style="width: 260px; background-color: <?= $naranja_claro ?>;">
					<?= e($correo) ?> &nbsp;
				</div>
			</div>

	
	<!------- ____________ ------->
	<div class="linea_separacion"></div>
	<!------- Datos contracto ------->
			<div class="linea_datos">
				<div class="titulo display_inline">OBRA/DESTINO:</div>
				<div class="valor display_inline" style="width: 596px; background-color: <?= $azul_claro ?>;">
				<?= e($direccion->direccion ,'-', $direccion->cp ,'-', $direccion->municipio ,'-', $direccion_predeterminada->provincia) ?>	 &nbsp;
				</div>
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">DIRECCIÓN:</div>
				<div class="valor display_inline" style="width: 618px; background-color: <?= $azul_claro ?>;">
				<?= e($direccion->direccion ,'-', $direccion->cp ,'-', $direccion->municipio ,'-', $direccion_predeterminada->provincia) ?>	 &nbsp;
				</div>
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">PEDIDO POR:</div>
				<div class="valor display_inline" style="width: 411px; background-color: <?= $azul_claro ?>;">
				<?= e($autorizado->nombre_persona_autorizada)." - ".e($autorizado->dni) ?> &nbsp;	
				</div>
				
				<div class="titulo display_inline">TLF:</div>
				<div class="valor display_inline" style="width: 150px; background-color: <?= $azul_claro ?>;">
				&nbsp; 
				</div>
				
			</div>

	
	<!------- ____________ ------->
	<div class="linea_separacion"></div>
	<!------- Fecha contracto ------->
			<div class="linea_datos">
				<div class="titulo display_inline">FECHA SALIDA:</div>
				<div class="valor display_inline" style="width: 145px; background-color: <?= $rojo_claro ?>;">
					<?= e($contrato->fecha_retirada) ?> &nbsp;
				</div>
				
				<div class="titulo display_inline">FECHA ESTIMADA DE ENTREGA:</div>
				<div class="valor display_inline" style="width: 145px; background-color: <?= $rojo_claro ?>;">
					<?= e($contrato->fecha_entrega) ?> &nbsp;
				</div>
				
				<div class="titulo display_inline">DÍAS:</div>
				<div class="valor display_inline" style="width: 58px; background-color: <?= $rojo_claro ?>;">
					<?= e($contrato->dias) ?> &nbsp;
				</div>
			</div>
	
	
	<!------- ____________ ------->
	<div class="linea_separacion"></div>
	<!------- Datos maquina ------->
			<div class="linea_datos">
				<div class="titulo display_inline">MAQUINA A ALQUILAR:</div>
				<div class="valor display_inline" style="width: 560px; background-color: <?= $verde_claro ?>;">
					<?= e($maquina->descripcion) ?> &nbsp;
				</div>
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">NÚMERO DE SERIE / HOROMETRO / MÁTRICULA:</div>
				<div class="valor display_inline" style="width: 418px; background-color: <?= $verde_claro ?>;">
					<?= e($serie->numero_serie) ?> &nbsp;
				</div>
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">FIANZA:</div>
				<div class="valor display_inline" style="width: 132px; background-color: <?= $verde_claro ?>;">
					25,00 € &nbsp;
				</div>
				
				<div class="titulo display_inline">PRECIO POR DÍA:</div>
				<div class="valor display_inline" style="width: 132px; background-color: <?= $verde_claro ?>;">
					10,00 €  &nbsp;
				</div>
				
				<div class="titulo display_inline">PRECIO HORA EX.:</div>
				<div class="valor display_inline" style="width: 132px; background-color: <?= $verde_claro ?>;">
					# # # # #
				</div>
				
			</div>

			<div class="linea_datos">
				<div class="titulo display_inline">NOTAS/OBSERVACIONES:</div>
			</div>
			<div class="linea_datos">
				<div class="valor display_inline" style="width: 688px; height: 80px; background-color: <?= $verde_claro ?>;">
					<?= e($contrato->notas2 || '') ?> &nbsp; 
				</div>
				<div class="div_barras_maquina" style="background-color: <?= $verde_claro ?>;">
					<div class="d_50 display_inline" align="center">	
						<img src="data:image/svg+xml;base64,{{ base64_encode($codigoReferencia) }}">										
					</div>
					<div class="d_50 display_inline" align="center">

						<img src="data:image/svg+xml;base64,{{ base64_encode($codigoNumSerie) }}" alt="Código de Barras">	
						
					</div>
				</div>
			</div>

	
	<!------- ____________ ------->
	<div class="linea_separacion"></div>
	<!------- Información ------->
	
<div class="div_informacion">
<p>
* LA UTILIZACIÓN DE LA MÁQUINA ES DE 8HR/DÍA, EL EXCESO EN USO SE COBRARÁ PROPORCIONALMENTE A SU PRECIO DÍA.
</br>
* LOS TRANSPORTES DE LAS MÁQUINAS, CARGAS Y DESCARGAS, ASÍ COMO LOS CONSUMOS DE COMBUSTIBLES, ACEITES, FILTROS Y OTROS, SON POR CUENTA DEL ARRENDATARIO.	
</br>
* LAS MÁQUINAS UTILIZADAS EN HORMIGONES O MEZCLAS ASFÁLTICAS, DEBERAN LIMPIARSE DESPUÉS DE SU USO.	
</br>
* COMPROMISO CON EL MEDIOAMBIENTE: EN CONCEPTO DE TRATAMIENTO DE RESIDUOS TÓXICOS SE COBRARÁ UNA TASA DE RESIDUOS POR MÁQUINA Y CONTRATO.	
</br>
* EN CUMPLIMIENTO DE LAS EXIGENCIAS ESTABLECIDAS POR LA NORMATIVA DE PREVENCIÓN DE RIESGOS LABORALES, LA EMPRESA HACE ENTREGA DEL MANUAL DE INSTRUCCIONES DEL EQUIPO ALQUILADO DE FORMA	
</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DIGITAL ENVIANDOLO EN PDF AL CORREO DE LA EMPRESA.
</br>
* AL RECIBIR LA MERCANCIA, EL CLIENTE QUEDARÁ TÁCTICAMENTE CONFORME CON LAS CONDICIONES GENERALES DE ALQUILER QUE SE ADJUNTAN CON ESTE CONTRATO DE ARRENDAMIENTO	
</p>
</div>
	<!------- ____________ ------->
	
	<!------- Block firma ------->
<div class="div_firmas ">
	<div class="d_50 display_inline" align="left">
		<div class="div_firma">
			<div class="cuadro_firma" align="left" style="background: <?= $azul_claro_firma ?>">
				FIRMA CLIENTE / AUTORIZADO
			</div>
			<div align="left" class="datos_firma" style="background: <?= $azul ?>">
				<div class="display_inline" align="left"><?= e($autorizado->nombre_persona_autorizada) ?>&nbsp;</div>
				<div class="display_inline" align="right" style="float: right"><?= e($autorizado->dni) ?>&nbsp;</div>

			</div>
		</div>
	</div>

	<div class="d_50 display_inline " align="right" style="float: right">
		<div class="div_firma">
			<div class="cuadro_firma" align="left" style="background: <?= $rojo_claro_firma ?>">
				FIRMA BIGMAT
			</div>
			<div align="left" class="datos_firma" style="background: <?= $rojo ?>">
				<div class="display_inline" align="left">Vendedor</div>
				<div class="display_inline" align="right" style="float: right">&nbsp;</div>

			</div>
		</div>
	</div>

</div>

	
	<!------- ____________ ------->
	
<div class="cuadro_final">
	<div class="barras display_inline" style=" vertical-align: top">
		<div>
			<span class="titulo_barras">FIANZA</span><br>
			<img src="data:image/svg+xml;base64,{{ base64_encode($codigoFianza) }}" alt="Código de Barras">
		</div>
		<div>
			<span class="titulo_barras">DIA</span><br>
			<img src="data:image/svg+xml;base64,{{ base64_encode($codigoAlquilerDias) }}" alt="Código de Barras">
		</div>
	</div>
	
	<div class="total display_inline" style="float: right; vertical-align: bottom; margin-top: 50px;">
		<div align="right" style="vertical-align: top">
			<div class="display_inline" style="vertical-align: middle">PRECIO ESTIMADO POR FECHAS SELECIONAS:</div>
			<div class="precio_1 display_inline" style="background: <?= $azul ?>"><?= number_format(e($contrato->importe_total), 2) ?> €</div>
		</div>
	
		<?php
			$precio_fianza = number_format(e($subfamilia->fianza), 2); //number_format(e($subfamilia->fianza), 2)
			$euros = floor($precio_fianza); // Obtiene la parte entera (euros)
			if (strlen($euros) == 4){
				$euros = substr($euros , 0, 1).".".substr($euros , -3);
			}
			$centimos = substr($precio_fianza , -2); // Obtiene los céntimos
				
				
		?>
		<div align="right" style="vertical-align: top">
			<div class="display_inline" style="vertical-align: middle">PRECIO FIANZA:</div>
			<div class="precio_2 display_inline" style="background: <?= $rojo ?>"><?= $euros ?>,<span class="centimos"><?= $centimos ?></span> €</div>
		</div>
	
	</div>
	
</div>	
	
	<br>
	<br>


	
	
    <h1>CONTRATO DE ALQUILER</h1>
    
    <p>FECHA CONTRATO: {{$contrato->created_at}}
    <p>ID CONTRATO: {{$contrato->id}}
    <p>CLIENTE: {{$cliente->nombre_fiscal}}</p>
    <p>NIF CLIENTE: {{$cliente->nif}}</p>
    <p>DIRECCIÓN CLIENTE: {{$direccion_predeterminada->direccion ,'-', $direccion_predeterminada->cp ,'-', $direccion_predeterminada->municipio ,'-', $direccion_predeterminada->provincia}}</p>
    <p>CORREO: {{$correo}}</p>
    <p>PERSONA AUTORIZADA: {{$autorizado->nombre_persona_autorizada}}</p>
    <p>DNI AUTORIZADO: {{$autorizado->dni}}</p>
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
    <p>REFERENCIA: {{$maquina->referencia}}</p>








<div class="condiciones_legales">
<p><strong>CONDICIONES  DE ALQUILER (BIGRENT)</strong><br>
  <strong>1. Objeto del contrato e intervinientes. </strong>El presente  contrato de naturaleza mercantil, tiene por objeto la cesión por el arrendador,  en régimen de arrendamiento, de la maquinaria identificada en las condiciones  particulares. El arrendador, legítimo titular de los bienes objeto del presente  contrato, cede su uso y disfrute en correcto estado de funcionamiento y con  todos sus accesorios al arrendatario, que los recibe con entera conformidad y  se compromete a no realizar actos de cesión, traspaso o subrogación salvo con  previo consentimiento por escrito del arrendador, corriendo por cuenta del  arrendatario cuantos gastos se originen como consecuencia del incumplimiento de  dichos compromisos <br>
  <strong>2. Duración. 2.1. Con fecha de devolución  pactada. </strong>La  duración del período de alquiler se inicia el día en que se efectúa la entrega  o puesta a disposición del material por el arrendador al arrendatario y  finaliza en la fecha pactada para la devolución y entrega de la maquinaria  arrendada. Las fechas convenidas de comienzo y final del contrato sólo podrán  ser modificadas por acuerdo expreso entre las partes. No obstante, el contrato  podrá resolverse unilateralmente por una cualquiera de las dos partes como  consecuencia del incumplimiento de las obligaciones tipificadas para la otra en  las Condiciones Particulares o en las Condiciones Generales. De mutuo acuerdo,  las partes podrán prorrogar la duración del contrato de arrendamiento fijando  una nueva fecha para la devolución de la maquinaria arrendada. Si las partes  acordaran prorrogar el contrato de arrendamiento y no fijarán una nueva fecha  para la devolución de la maquinaria arrendada, la duración del contrato se  determinará conforme a lo establecido en la estipulación 2.2. 2.2 Sin fecha de  devolución pactada. En el caso en el que no se pacte fecha de devolución de la  maquinaria arrendada, la duración del periodo de alquiler se fi ja en UN (1)  día natural a contar desde el día en que se efectúa la entrega o puesta a  disposición del material arrendado por el arrendador al arrendatario.  Trascurrido el plazo establecido en el párrafo precedente, el Contrato se  prorrogará automáticamente por iguales periodos de UN (1) día natural, salvo  que cualquiera de las partes con un plazo de preaviso mínimo de UN (1) día,  manifieste a la otra parte, por escrito y por cualquier medio que deje  constancia de la recepción por el destinatario, su voluntad de rescindir el  contrato.<br>
  <strong>3. Responsabilidad contractual. </strong>Desde el momento de  su entrega las máquinas y accesorios quedan fuera de la responsabilidad del  arrendador, asumiendo el arrendatario todos los riesgos por su deterioro,  pérdida total o parcial cualquiera que sea la causa, incluso el robo, así como  la responsabilidad por la totalidad de los daños y perjuicios, materiales y  corporales, que puedan ser causados por dicha maquinaria, o con la misma y sus  accesorios, a terceros, personas o cosas, durante la vigencia del contrato,  dado que los bienes arrendados no están bajo el control del arrendador. El  arrendatario no podrá realizar reclamación o descuento por lucro cesante o  similar, salvo el caso de falta de cumplimiento de las obligaciones del  arrendador. Una vez comunicada la voluntad de finalizar el arrendamiento por  parte de la arrendataria, y hasta el momento en el que se produzca la retirada  efectiva de las máquinas por parte del arrendador, o cualquiera de sus agentes  autorizados, será responsabilidad del arrendatario mantener la correcta  custodia y vigilancia de las mismas, pudiendo ser reclamados por parte del  arrendador cualquier daño ocasionado en los bienes arrendados hasta su  retirada. <br>
  <strong>4. Precio, gastos e impuestos. </strong>El precio del  alquiler y la forma de pago fi jadas de común acuerdo por las partes y  establecidas en las condiciones particulares del contrato, se aceptan  libremente por las partes y constituyen un compromiso indisoluble e  inalterable. Las condiciones económicas están pactadas para una utilización  máxima de ocho horas por día de trabajo. En el supuesto de sobrepasar las 8  horas de utilización fi jadas contractualmente, el arrendatario abonará un  suplemento de precio proporcional al horario extra que se produjera, pudiendo  el arrendador controlar la duración de la jornada de la forma que estime  oportuna. Para jornadas que excedan de 8 horas de duración se deberá pasar  comunicación al arrendador a fi n de prever la conservación y mantenimiento de  la máquina. Serán siempre por cuenta del arrendatario, y facturados por  partidas independientes, los gastos de transporte, carga y descarga del  material al comienzo y a la finalización del contrato, así como el seguro acordado,  el IVA, y los demás impuestos, nacionales, autonómicos y locales,  correspondientes a todos los conceptos enumerados.<br>
  <strong>5. Transporte, entrega, traslado y  devolución. </strong>El  transporte del material arrendado, así como los gastos de carga y descarga,  serán siempre a cargo del arrendatario, pudiendo el arrendador encargarse de  estos servicios si así los solicita el arrendatario. Cuando el arrendatario se  encargue del transporte de la maquinaria arrendada, éste se realizará bajo su  entera responsabilidad. La maquinaria objeto del contrato será entregada por el  arrendador al arrendatario en el lugar convenido por las partes que se indica  en las condiciones particulares y no podrá trasladarse del lugar estipulado sin  previa autorización escrita del arrendador, siendo por cuenta y riesgo del  arrendatario todos los gastos que por dicho motivo se originen. Al final del  arrendamiento, la máquina, equipos y accesorios, serán devueltos al arrendador  de la forma acordada, en las mismas condiciones en que fueron entregados salvo  el desgaste normal motivado por el uso. <br>
  <strong>6. Sustitución de las máquinas. </strong>El arrendador,  durante todo el tiempo de duración del contrato, y manteniendo los demás pactos  convenidos, se reserva el derecho de sustituir las máquinas arrendadas por  otras de similares características y con capacidad suficiente para realizar el  trabajo concertado, siendo por su cuenta los gastos que dicha sustitución  genere. Si la sustitución fuera a requerimiento del arrendatario, serán por su  cuenta los gastos originados por el cambio. <br>
  <strong>7. Obligaciones del arrendatario. 7.1.  Utilización. </strong>Las  máquinas, equipos y accesorios alquilados se destinarán, única y exclusivamente  para los fi nes que han sido contratados y en el lugar indicado, con absoluto  sometimiento a las normas generales de seguridad y salud vigentes.<br>
  <strong>7.2.  Usos Vetados. </strong>Queda prohibida toda utilización que no sea acorde con el uso  y características propias del material alquilado (entendiendo por estas  últimas, aquellas para las que la máquina ha sido concebida dentro de sus  propias limitaciones). Toda utilización que no esté de acuerdo con el uso y  características propias del material alquilado dará derecho al arrendador a  rescindir el contrato de alquiler y a exigir la devolución del material, que se  efectuará de forma inmediata al recibo de su petición.<br>
  <strong>7.3. Personal. </strong>El arrendatario  empleará personal debidamente instruido y con las licencias necesarias para el  manejo de las máquinas, conociendo las operaciones relativas a su  funcionamiento, mantenimiento y seguridad, así como el manual de instrucciones  del fabricante y las recomendaciones del arrendador, comprometiéndose a no  utilizar personas bajo la influencia de bebidas alcohólicas o de sustancias  estupefacientes. <br>
  <strong>7.4. Revisiones y Mantenimiento del  material. </strong>El  arrendatario vendrá obligado diariamente a realizar las verificaciones y puesta  a punto de los niveles y otros líquidos de las máquinas y sus accesorios,  comprobando y manteniendo los elementos necesarios y convenientes, conforme a  las indicaciones del fabricante y del arrendador, incluyendo la presión de aire  recomendada para los neumáticos, si los tuviera. A los fines establecidos en el  párrafo precedente, el arrendatario utilizará los elementos suministrados o  recomendados por el arrendador para evitar mezclas y riesgos de confusión. El  tiempo destinado a dichas revisiones no dará lugar a descuento en el precio del  alquiler. Queda totalmente prohibido el uso de combustibles inadecuados o no  autorizados legalmente. Los daños, averías y sanciones que se deriven por el  uso inadecuado de los mismos, serán por cuenta del arrendatario. En el supuesto  de que por causa imputable a la arrendataria durante la utilización de la  máquina, BigMat resultara sancionada, BigMat se reserva el derecho a repercutir  a la arrendataria dicha sanción económica, sin que quepa causa alguna de  exoneración de responsabilidad por parte de la arrendataria. Asimismo, BigMat  se reserva la capacidad de decidir de manera unilateral el modo de pago de la  sanción. Este régimen se extenderá a cualesquiera otras infracciones  tributarias derivadas de la misma. Las consecuencias derivadas de la  inobservancia de las limitaciones y prohibiciones de uso que se establezcan en  la normativa aplicable por parte del arrendatario, serán directamente repercutibles  al mismo sin que quepa causa alguna de exoneración de responsabilidad. El  arrendatario se hará cargo de todas las averías provocadas por la utilización  negligente de la maquinaria. <br>
  <strong>7.5. Neumáticos. </strong>Todos los gastos  que se ocasionen en la maquinaria arrendada como consecuencia de pinchazos o  rotura de los neumáticos serán de cuenta del arrendatario. <br>
  <strong>7.6. Limitación de reparar. </strong>Exceptuando las  revisiones y operaciones de mantenimiento anteriormente mencionadas, el  arrendatario no podrá sustituir o modificar total ni parcialmente el material  alquilado o cualquiera de sus componentes, sin la previa autorización escrita  del arrendador. <br>
  <strong>7.7. Aviso de las averías. </strong>El arrendatario  deberá notificar al arrendador, dentro de las veinticuatro (24) horas de haberse  producido, cualquier avería o funcionamiento incorrecto del material alquilado,  dejando inmediatamente de utilizar la máquina si fuera previsible, posible o  probable un riesgo que entrañara peligro para la seguridad y salud de las  personas encargadas de la máquina, o que se hallaren dentro de su ámbito de  funcionamiento. No se admiten por parte del arrendador reclamación de daños,  pérdidas o lucro cesante por causa de avería mecánica o fallo eléctrico. <br>
  <strong>7.8. Inspecciones. </strong>El arrendatario  permitirá al personal autorizado por el arrendador en todo momento, realizar  cuantas visitas de inspección o control sean pre cisas. Si la negativa  infundada del arrendatario pudiera dar lugar a un peligro para la seguridad de  las personas o cosas, dicho incumplimiento contractual daría lugar a la  resolución anticipada del contrato. <br>
  <strong>7.9. Depósito de garantía. </strong>En garantía del  cumplimento de las obligaciones asumidas por el arrendatario en el presente  contrato, las partes podrán acordar la prestación de un depósito o aval. En  caso que así se acuerde, el depósito o aval se calculará en función del valor  del material alquilado y de todos los gastos que la operación comporte al  mismo, sin excepción (montaje y desmontaje, en su caso, seguro, riesgos,  responsabilidades y demás, extensivo al propio alquiler no satisfecho), así  como los derivados de un cálculo de las repercusiones que pudiera producir el  impago del arrendamiento, los intereses y riesgos de todo orden.<br>
  Dicho depósito se devolverá cuando se haya  pagado la totalidad de los alquileres, así como cualesquiera otros conceptos  establecidos en el contrato, o bien se liquidará con el finiquito de la deuda  establecida, y siempre y cuando el arrendador confirme que el arrendatario ha  devuelto la máquina y sus accesorios en el estado convenido y no existan  obligaciones pendientes de cumplimiento. El arrendatario abona al arrendador,  la cantidad que fi gura en las condiciones particulares, como garantía del fi  el cumplimiento de las obligaciones contraídas. El depósito no podrá aplicarse  al pago de cualquiera de las rentas, ni constituirá dispensa alguna para el  arrendatario del íntegro cumplimiento de sus obligaciones. <br>
  <strong>7.10. Compromiso con el medio ambiente. </strong>En caso de que el  arrendador lo estime conveniente, y en todo caso cuando exista obligación legal  de hacerlo, cobrará al arrendatario en concepto de tratamiento de residuos  tóxicos una tasa de residuos por máquina y contrato. <br>
  <strong>7.11. Combustible. </strong>Durante el período  de vigencia del Contrato, el aprovisionamiento de combustible y la verificación  de su nivel serán responsabilidad del Arrendatario, como actividades inherentes  al control y funcionamiento de las máquinas. BigMat ofrece el servicio, previa  petición del arrendatario, de gestión de Reabastecimiento de Combustible, en los  términos indicados por los proveedores de combustible con los que trabaja  habitualmente BigMat, quienes podrán proveer el suministro de combustible para  la Maquinaria. Estas compañías terceras serán responsables de proveer  combustible y su entrega, de acuerdo con la información suministrada por el  Arrendatario en lo que se refi ere a su uso. Los proveedores de combustible no  tienen relación alguna con BigMat en los aspectos vinculados a la circulación  del producto y la determinación del arrendatario como usuario final de gasóleo  bonificado. En caso de optar por el servicio de intermediación en el  reabastecimiento de combustible, BigMat se encargará de la externalización de  la prestación del servicio en empresas de distribución de combustibles y  carburantes con las que trabaja habitualmente. En este caso el combustible será  facturado por BigMat conforme las tarifas de precios informadas en cada momento  por la empresa. <br>
  <strong>7.12. Impuesto Electricidad. </strong>Este contrato tiene  por objeto el alquiler de maquinaria, por lo que en el caso de ser un servicio  integral y respecto a los equipos que puedan ser considerados como fábricas de  electricidad por la normativa de Impuestos Especiales, será el Arrendador el  considerado a todos los efectos como fabricante y por este motivo, estará  obligado a repercutir el Impuesto sobre la Electricidad que legalmente  corresponda. Por el contrario, si el servicio no es un alquiler integral, será  el Arrendatario el considerado a todos los efectos como fabricante y por este  motivo, estará obligado a registrarse y cumplir con las obligaciones  administrativas y tributarias asociadas a la producción de Electricidad.<br>
  <strong>8. Obligaciones del arrendador. 8.1.  Reparaciones. </strong>El  arrendador se obliga a reparar, con la mayor rapidez posible, las averías notificadas  en tiempo y forma por el arrendatario, de conformidad con estas condiciones  generales, que se produzcan como consecuencia inmediata de los desgastes por el  uso normal del material arrendado. En relación con tales reparaciones, mientras  las mismas tengan una duración inferior a veinticuatro horas, se estimarán como  un mantenimiento normal de la maquinaria, sin derecho a deducción alguna del  precio del arriendo. Si en opinión del arrendador, tal operación pudiera  superar dicho plazo desde el momento del aviso de avería, o bien no fuera  aconsejable realizarla, sustituirá el material averiado, en la medida de lo  posible, por otro de la misma capacidad y especificaciones generales. La  imposibilidad de sustituir momentáneamente algunos de los elementos arrendados,  no dará por si misma lugar a la resolución del contrato, pero en ese caso se  reducirá proporcionalmente la renta por el tiempo tardado durante la  sustitución del elemento averiado. <br>
  <strong>8.2. Mantenimiento. </strong>Serán por cuenta  del arrendador todos los lubricantes, aceites, grasas, ácido y electrolito,  necesarios para el mantenimiento.<br>
  <strong>9. Seguros. </strong><br>
  <strong>9.1 Arrendador. </strong>El arrendatario es  responsable de la utilización del material alquilado y de todos los daños  sufridos por el mismo. <br>
  A) Seguro de daños propios a la  maquinaria: BigMat tiene suscrita una póliza con una aseguradora en la que se  garantizan EXCLUSIVAMENTE los daños propios de las máquinas, registrados de  manera accidental, como consecuencia de: Incendio y su extinción; impacto  directo del rayo; explosión externa y ajena al funcionamiento de la máquina;  hundimiento o desprendimiento del terreno; hechos derivados de la naturaleza;  riesgos catastróficos amparados por el Consorcio de Compensación de Seguros;  actos vandálicos; golpes; vuelcos; robo. En ningún caso existirá cobertura para  los siniestros registrados como consecuencia de hurto, pérdida o extravío de la  máquina o de alguna de sus piezas, ni para la negligencia inexcusable, culpa  grave o mal uso por el operario del cliente, siendo estas circunstancias  verificadas y analizadas por el perito en el correspondiente informe pericial.  Aquellos siniestros registrados durante el transporte, la carga y la descarga  efectuados por el arrendatario, serán responsabilidad directa del cliente.  Serán de aplicación, para la cobertura de cada uno de los siniestros  registrados, las mismas exclusiones e inclusiones que las señaladas en la  póliza. Cualquier siniestro registrado por una causa no señalada con  anterioridad, será responsabilidad directa del arrendatario, quien abonará al  arrendador el importe correspondiente a la reparación o sustitución de la  máquina siniestrada. <br>
  B) Seguro de circulación: Las máquinas  matriculadas que sean aptas y estén autorizadas para circular por la vía  pública, de acuerdo al RD 1507/2008, tienen suscritas el Seguro Obligatorio de  Circulación, que garantiza aquellos daños causados a terceros con motivo de  hechos derivados de la circulación. Por hechos de la circulación se entienden  los riesgos derivados de los vehículos a motor en los siguientes espacios: <br>
  a) Garajes y  aparcamientos <br>
  b) Vías o terrenos  públicos o privados APTOS para la circulación tanto urbanos como interurbanos <br>
  c) Vías o terrenos  que sin ser aptos para circulación sean de uso común Se EXCLUYE la  consideración de hecho de la circulación los derivados de la realización de  tareas industriales o agrícolas por vehículos a motor especialmente destinados  para ello. <br>
  La utilización de vehículos industriales  en el desarrollo de su actividad para la que están destinadas, no es un hecho  de la circulación salvo que circulen por las vías arriba indicadas en los  puntos a), b) y c) Si la máquina alquilada fuese destinada a trabajar en  aeropuertos, debe de ser comunicado este hecho a BigMat, para que en el caso  que corresponda, se contrate la garantía adicional de aeropuertos. Se prohíbe  la circulación de las plataformas, en zona de vía pública ya que no son  vehículos destinados a tal efecto, debiendo ser transportadas al lugar de  trabajo y en su devolución con los medios adecuados. Será requisito  indispensable para el trabajo con plataformas dentro de área urbana o zonas de  uso común, poseer los permisos expedidos por las autoridades competentes para  tal fin. <br>
  C) Seguro de Responsabilidad Civil:<br>
  BigMat tiene suscrita una póliza de  Responsabilidad Civil para hacer frente EXCLUSIVAMENTE a las reclamaciones de  terceros derivadas de daños provocados por FALLO o ERROR de la máquina  arrendada (entendido fallo o error como partes defectuosas y anomalías  eléctricas o mecánicas) SIN operario de BigMat, una vez analizado por el perito  correspondiente y emitido informe pericial que así lo atestigüe y siempre  dentro de los límites y condiciones de la póliza. Esta misma póliza, dentro de  sus términos y condiciones (excluyendo el dolo en todo caso), cubrirá las  reclamaciones de terceros derivadas de daños provocados por la máquina de  BigMat cuando ésta sea alquilada y manejada CON operario de BigMat. <br>
  <strong>9.2. Arrendatario. </strong>La obligación del  arrendador de asegurar el vehículo matriculado apto y autorizado para la  circulación, no exime al arrendatario de contratar una póliza de  responsabilidad civil que garantice su propia actividad empresarial. Dado que  habitualmente la maquinaria y los vehículos son arrendados "desnudos" (sin  operario BigMat) y son manejados por personal del arrendatario, éste se encuentra  obligado a asegurar la Responsabilidad Civil derivada de la utilización de los  mismos y de su propia actividad, y a cumplir la normativa legal que tengan  establecidos los Ministerios de Industria y de Trabajo u organismos  equivalentes, así como las medidas de seguridad, de prevención y licencias que  fueran necesarias. El arrendatario se obliga por tanto a contratar por su  cuenta y a su cargo los oportunos seguros de: A) Daños a la máquina por el  valor real de la misma y a sus accesorios y complementos por los riesgos no  cubiertos en la póliza contratada por BigMat, arriba indicados. B) Los riesgos  y las responsabilidades frente a terceros, ya sean bienes o personas, derivadas  de su actividad industrial durante el tiempo de duración del contrato, de  conformidad con lo establecido en las presentes Condiciones Generales. <br>
  <strong>9.3 Franquicias. </strong>En caso de  ocurrencia de un siniestro amparado por las condiciones señaladas, el  arrendatario deberá abonar a BigMat: - Máquinas con un valor de compra unitario  superior a 6.000 Euros: 10% del importe del siniestro, con un mínimo de 6.000  Euros. En caso de que el siniestro tenga un coste inferior a 6.000 Euros el  arrendatario abonará el coste del siniestro. - Máquinas con un valor de compra  unitario inferior a 6.000 Euros: el valor de reparación o reposición de la  máquina. - Los daños causados a buques tendrán una franquicia de 12.000 Euros.<br>
  <strong>9.4  Seguros de obra. </strong>En aquellas obras en las que BigMat actúe como  subcontratista y alquile la maquinaria con operario de BigMat, el arrendatario  deberá informar al arrendador de los preceptivos seguros de Todo Riesgo  Construcción y Montaje existentes para ser incluido como asegurado adicional y  con renuncia expresa de repetición contra BigMat por parte de dicha  aseguradora, siendo el arrendatario responsable de las consecuencias que de  dicha omisión se deriven. <br>
  <strong>9.5 Declaración de caso de siniestro. </strong>En caso de  siniestro de daños propios o a terceros, el arrendatario se compromete a: Tomar  todas las medidas posibles para proteger los intereses del arrendador y de su  compañía de seguros, en definitiva no agravar en ningún caso el riesgo.  Informar al arrendador dentro de un plazo de 48 horas siguientes a la  ocurrencia del siniestro vía fax, e-mail o carta certificada, indicando el  mayor nº de datos del incidente ocurrido. En caso de robo o actos vandálicos,  presentar la denuncia dentro de las 24 horas siguientes a la ocurrencia del  siniestro, haciendo constar las circunstancias, fecha, hora y lugar del  incidente, así como la identificación completa del material. Remitir a BigMat  dentro de los tres días siguientes, todos los originales de los documentos que  se hayan establecido (copias de las denuncias, etc.).<br>
  El alquiler se cobrará hasta la fecha de  comunicación del siniestro. El material no será jamás abandonado fuera de las  horas de trabajo sin protección contra el robo, tal como guardarlo en lugar  cubierto y encerrado, encadenado, retirando las lanzas de las máquinas  remolcables y las llaves y papeles oficiales guardado aparte de las mismas, etc.  Toda falta en este sentido comportará la pérdida de la garantía de renuncia a  reclamar. <br>
  <strong>10. Causas de resolución del Contrato. </strong>El contrato se  extinguirá en los supuestos siguientes: (a) Por el transcurso del plazo de  duración del Contrato en los términos establecidos en la cláusula 2. (b) Por  mutuo acuerdo de las partes. (c) Por incumplimiento de las obligaciones de pago  del arrendatario, en cuyo caso el presente documento sirve como autorización  expresa del arrendatario para que el arrendador proceda a la retirada de la  maquinaria y accesorios arrendados, cualquiera que sea el lugar donde ese  material se encuentre. En todo caso el arrendatario estará obligado a abonar la  totalidad del precio del arrendamiento vencido y no pagado, con sus intereses  moratorios correspondientes. Igualmente serán de cuenta del arrendatario los  gastos en que incurra el arrendador por la retirada de la máquina y sus  accesorios. <br>
  <strong>11. Ley aplicable y jurisdicción. </strong>El presente  Contrato se regirá e interpretará conforme a la legislación española. Con  expresa renuncia a cualquier otro fuero que pudiera corresponder a las partes,  todas las controversias que surjan con relación a este contrato quedarán  sometidas a los Tribunales de Madrid. <br>
  <strong>12. Código de Conducta y Política  Anticorrupción. </strong>El  arrendatario declara que ha leído, conoce y entiende el contenido y los valores  éticos establecidos en el Código de Conducta y en la Política Anticorrupción  del arrendador publicados en la página web  (https://BigMatrentals.com/la-compania/nuestro-compromiso). El arrendatario se  compromete a no realizar ninguna práctica que de alguna manera resulte o pueda  resultar en una vulneración de leyes o normativas aplicables en materia de  corrupción, así como en lo dispuesto en el Código de Conducta y Política  Anticorrupción del arrendador</p>


</div>





</body>
</html>