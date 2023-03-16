<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    use HasFactory;

    protected $fillable = [
        'telefono',
        'email',
    ];
    
    //Relación N:1 con la tabla clientes
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
