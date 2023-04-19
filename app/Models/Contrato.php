<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha',
        'fecha_retirada',
        'fecha_entrega',
        'importe_total',
        'notas1',
        'notas2'

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
    
        // Calcular la diferencia entre las fechas en días
        $diferenciaEnDias = $fechaRetirada->diff($fechaEntrega)->days;
    
        // Calcular el número de semanas y días a partir de la diferencia en días
        $semanas = intdiv($diferenciaEnDias, 7);
        $dias = $diferenciaEnDias % 7;
    
        // Descontar los domingos a partir de la primera semana completa de alquiler
        if ($semanas >= 1) {
            $diasRestantes = $diferenciaEnDias - ($semanas * 7);
            if ($diasRestantes >= 1 && $fechaRetirada->format('w') === '0') {
                $diasRestantes--;
            }
            $semanasConDescuentoDomingos = $semanas + (($diasRestantes + $dias) > 0 ? 1 : 0);
        } else {
            $semanasConDescuentoDomingos = 0;
            if ($dias >= 1 && $fechaRetirada->format('w') === '0') {
                $dias--;
            }
        }
    
        return ['semanas' => $semanasConDescuentoDomingos, 'dias' => $dias];
    }
    
}
