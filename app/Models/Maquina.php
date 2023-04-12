<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maquina extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'descripcion',
        'referencia',
        'url_manual',
        'url_ficha',
        'subfamilia_id'
    ];

    protected $table = 'maquinas';

    //Relacion N:1 con la tabla subfamilias
    public function subfamilia()
    {
        return $this-> belongsTo(SubFamilia::class);
    }

    //Relación 1:N con la tabla series
    public function series()
    {
        return $this->hasMany(Serie::class);
    }
}
