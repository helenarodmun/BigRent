<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SerieForm extends FormRequest
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

                'horometro' => 'required',
                'hora_inicio' => 'nullable|time',
                'numero_serie' => 'required',
                'disponible' => 'required',
                'maquina_id' => 'required',
                'tienda_id' => 'required'
            ],

            'PUT' => [
                
                'horometro' => 'nullable',
                'hora_inicio' => 'nullable|time',
                'numero_serie' => 'nullable',
                'disponible' => 'nullable',
                'maquina_id' => 'nullable',
                'tienda_id' => 'nullable'
            ],
            
            'GET' => [
                
                'horometro' => 'nullable',
                'hora_inicio' => 'nullable|time',
                'numero_serie' => 'nullable',
                'disponible' => 'nullable',
                'maquina_id' => 'nullable',
                'tienda_id' => 'nullable'
            ]
        };
    }
}
