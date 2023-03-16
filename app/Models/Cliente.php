<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'nombre_fiscal',
        'nif',
        'nombre_comercial',
        'tipo',
        'administrador',
        'dni_administrador'
    ];
}
