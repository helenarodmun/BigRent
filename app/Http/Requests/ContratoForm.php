<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContratoForm extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return match ($this->method()) {

            'POST' => [
                'fecha_retirada' => 'required|date',
                'fecha_entrega' => 'required|date',
                'dias' => 'nullable',
                'importe_total' => 'nullable',
                'notas1' => 'required',
                'notas2' => 'nullable',
                'cliente_id' => 'required',
                'serie_id' => 'required',
                'direccion_id' => 'required',
                'autorizado_id' => 'required',
                'telefono_id' => 'required',
                'correo' => 'nullable'
            ],

            'PUT' => [

                'fecha_retirada' => 'nullable|date',
                'fecha_entrega' => 'nullable|date',
                'dias' => 'nullable',
                'importe_total' => 'nullable',
                'notas1' => 'nullable',
                'notas2' => 'nullable',
                'cliente_id' => 'nullable',
                'serie_id' => 'nullable',
                'direccion_id' => 'nullable',
                'autorizado_id' => 'nullable',
                'telefono_id' => 'nullable',
                'correo' => 'nullable'
            ],

            'GET' => [

                'fecha_retirada' => 'nullable|date',
                'fecha_entrega' => 'nullable|date',
                'dias' => 'required',
                'importe_total' => 'nullable',
                'notas1' => 'nullable',
                'notas2' => 'nullable',
                'cliente_id' => 'nullable',
                'serie_id' => 'nullable',
                'direccion_id' => 'nullable',
                'autorizado_id' => 'nullable',
                'telefono_id' => 'nullable',
                'correo' => 'nullable'
            ]
        };
    }
}
