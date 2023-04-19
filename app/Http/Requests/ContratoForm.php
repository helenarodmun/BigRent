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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return match ($this->method()) {

            'POST' => [

                'fecha_retirada' => 'required|date',
                'fecha_entrega' => 'required|date',
                'importe_total' => 'nullable',
                'notas1' => 'required',
                'notas2' => 'required',
                'cliente_id' => 'required',
                'serie_id' => 'required',
                'direccion_id' => 'required',
                'autorizado_id' => 'required'
            ],

            'PUT' => [
                
                'fecha_retirada' => 'nullable',
                'fecha_entrega' => 'nullable|time',
                'importe_total' => 'nullable',
                'notas1' => 'nullable',
                'notas2' => 'nullable',
                'cliente_id' => 'nullable',
                'serie_id' => 'nullable',
                'direccion_id' => 'nullable',
                'autorizado_id' => 'nullable'
            ],
            
            'GET' => [
                
                'fecha_retirada' => 'nullable',
                'fecha_entrega' => 'nullable|time',
                'importe_total' => 'nullable',
                'notas1' => 'nullable',
                'notas2' => 'nullable',
                'cliente_id' => 'nullable',
                'serie_id' => 'nullable',
                'direccion_id' => 'nullable',
                'autorizado_id' => 'nullable'
            ]
        };
    }
}
