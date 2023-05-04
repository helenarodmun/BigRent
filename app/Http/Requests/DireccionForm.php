<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DireccionForm extends FormRequest
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

                'direccion' => 'required|string|max:75',
                'cp' => 'required|string|max:5',
                'localidad' => 'required|string|max:75',
                'municipio' => 'required|string|max:65',
                'provincia' => 'required|string|max:65',
                'predeterminada' => 'nullable'
            ],

            'PUT' => [

                'direccion' => 'nullable|string|max:75',
                'cp' => 'nullable|string|max:5',
                'localidad' => 'nullable|string|max:75',
                'municipio' => 'nullable|string|max:65',
                'provincia' => 'nullable|string|max:65',
                'predeterminada' => 'nullable'
            ],

            'GET' => [

                'direccion' => 'nullable|string|max:75',
                'cp' => 'nullable|string|max:5',
                'localidad' => 'nullable|string|max:75',
                'municipio' => 'nullable|string|max:65',
                'provincia' => 'nullable|string|max:65',
                'predeterminada' => 'nullable'
            ]
        };
    }
}
