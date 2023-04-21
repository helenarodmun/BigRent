<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfiguracionDia extends Model
{
    use HasFactory;

    protected $fillable = [
        'laborables',
        'sabados',
        'domingoa'
    ];

    protected $table = 'configuraciones:dias';

    //relación tabla tipos_cliente
    public function tipoCliente()
    {
        return $this->belongsTo(TipoCliente::class);
    }

}
