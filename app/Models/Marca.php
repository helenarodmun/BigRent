<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    use HasFactory;

    protected $fillable = [
        'denominacion'
    ];
    protected $table = 'marcas';

    //Relación 1:N con subfamilias
    public function maquinas()
    {
        return $this->hasMany(Maquina::class);
    }
}
