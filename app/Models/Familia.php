<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Familia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];
    protected $table = 'familias';

    //Relación 1:N con subfamilias
    public function subfamilias()
    {
        return $this->hasMany(SubFamilia::class);
    }
}
