<?php

namespace App\Models;

use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha_retirada',
        'fecha_entrega',
        'semanas',
        'dias',
        'importe_total',
        'notas1',
        'notas2',
        'cliente_id',
        'serie_id',
        'direccion_id',
        'autorizado_id'

    ];
    protected $table = 'contratos';
    //relacion 1:1 con la tabla clientes
    public function cliente()
    {
        return $this->HasOne(Cliente::class);
    }
    //relacion 1:1 con la tabla direcciones
    public function direccion()
    {
        return $this->HasOne(Direccion::class);
    }
    //relacion 1:1 con la tabla direcciones
    public function autorizados()
    {
        return $this->HasOne(Autorizado::class);
    }
    //relacion 1:N con la tabla series
    public function series()
    {
        return $this->hasMany(Serie::class);
    }

    //función para calcular las semanas y días a partir de las fechas de retiro y entrega, 
    //descuenta los domingos a partir de la primera semana
    public static function calcularSemanasYDias($fechaInicio, $fechaFin)
    {
        // Crear objetos DateTime a partir de las fechas de retiro y entrega
        $fechaRetirada = new DateTime($fechaInicio);
        $fechaEntrega = new DateTime($fechaFin);
        //de lo contrario, se excluye la fecha de finalización (¿error?)
        $fechaFin = $fechaEntrega->modify('+1 day');
        // Calcular la diferencia entre las fechas en días
        $diferenciaEnDias = $fechaRetirada->diff($fechaEntrega);
        $intervalo = $fechaFin->diff($fechaRetirada);

        // total dias
        $dias = $intervalo->days;

        // crea un período de fecha iterable (P1D equivale a 1 día)
        $intervalo = new DateInterval('P1D');
        //DatePeriod representa un periodo de fechas
        $periodo = new DatePeriod($fechaRetirada, $intervalo, $fechaFin);
        $diasHabiles = 0;
        //saco los fines de semana y los feriados (totala sacar = 4)
        foreach ($periodo as $fecha) {
            //función format Devuelve la fecha formateada según el formato dado, 'N' Representación numérica ISO 8601 del día de la semana
            //comprueba si hay domingos durante el periodo
            if ($fecha->format("N") === '7') {
                continue;
            }
            $diasHabiles++;
        }
        $semanas = intDiv($diasHabiles, 7);
        $dias = $diasHabiles % 7;
        return ['semanas' => $semanas, 'dias' => $dias];
    }
}
