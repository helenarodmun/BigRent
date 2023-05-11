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
        'dias',
        'importe_total',
        'notas1',
        'notas2',
        'cliente_id',
        'serie_id',
        'direccion_id',
        'autorizado_id',
        'telefono_id'

    ];
    protected $table = 'contratos';

    //relacion 1:1 con la tabla clientes
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    //relacion 1:1 con la tabla direcciones
    public function direccion()
    {
        return $this->belongsTo(Direccion::class);
    }

    //relacion 1:1 con la tabla telefonos
    public function telefono()
    {
        return $this->belongsTo(Telefono::class);
    }

    //relacion 1:1 con la tabla direcciones
    public function autorizado()
    {
        return $this->belongsTo(Autorizado::class);
    }

    //relacion 1:N con la tabla series
    public function serie()
    {
        return $this->belongsTo(Serie::class);
    }

    /**
     * Calcula los días de alquiler entre dos fechas utilizando la configuración del cliente.
     *
     * @param string $fechaInicio La fecha de inicio del alquiler en formato Y-m-d.
     * @param string $fechaFin La fecha de fin del alquiler en formato Y-m-d.
     * @param stdClass $configuracionCliente La configuración del cliente como objeto con las columnas 'laborables', 'sabados' y 'domingos'.
     * @return int Los días de alquiler según la configuración del cliente.
     */
    public static function calcularDiasDeAlquiler($fechaInicio, $fechaFin, $configuracionCliente)
    {
        // Convierte las fechas a objetos DateTime para poder manejarlas.
        $fechaInicio = new DateTime($fechaInicio);
        $fechaFin = new DateTime($fechaFin);

        // Inicializa el contador de días de alquiler en uno ya que se puede alquilar sólo un día.
        $diasDeAlquiler = 0;

        // Crea un intervalo de un día para iterar entre las fechas de inicio y fin.
        $intervalo = DateInterval::createFromDateString('1 day');
        $periodo = new DatePeriod($fechaInicio, $intervalo, $fechaFin);

        // Itera sobre cada fecha del periodo.
        foreach ($periodo as $fecha) {
            // Obtiene el número de día de la semana (1 = Lunes, 7 = Domingo).
            $dia = $fecha->format('N');

            // Determina si el día actual es hábil según la configuración del cliente.
            $esDiaHabil = true;
            switch ($dia) {
                case 6: // Sábado
                    $esDiaHabil = $configuracionCliente->sabados;
                    break;
                case 7: // Domingo
                    $esDiaHabil = $configuracionCliente->domingos;
                    break;
                default: // Lunes a viernes
                    $esDiaHabil = $configuracionCliente->laborables;
                    break;
            }
            // Si el día actual es hábil, incrementa el contador de días de alquiler.
            if ($esDiaHabil) {
                $diasDeAlquiler++;
            }
        }

        // Retorna el número de días de alquiler.
        return $diasDeAlquiler;
    }
}
