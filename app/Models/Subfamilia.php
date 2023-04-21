<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subfamilia extends Model
{
    use HasFactory;

    protected $fillable = [
        'descripcion',
        'precio_dia',
        'fianza',
        'familia_id'
    ];
protected $table = 'subfamilias';
    //Relación de N:1 con la tabla familias
    public function familia()
    {
        return $this->belongsTo(Familia::class);
    }
    //Relación 1:N con la tabla maquinas
    public function maquinas()
    {
        return $this->hasMany((Maquina::class));
    }
}
