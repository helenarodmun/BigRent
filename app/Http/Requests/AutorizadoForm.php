<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AutorizadoForm extends FormRequest
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

                'nombre_persona_autorizada' => 'required|string|max:75',
                'dni' => 'required|string|max:9',
                'notas' => 'nullable|string|max:150',
                'url_dni' => 'nullable|file|mimes:pdf,xlx,csv,jpg,png,jpeg|max:2048'
            ],

            'PUT' => [

                'nombre_persona_autorizada' => 'nullable|string|max:75',
                'dni' => 'nullable|string|max:9',
                'notas' => 'nullable|string|max:150',
                'url_dni' => 'nullable|file|mimes:pdf,xlx,csv,jpg,png,jpeg|max:2048'
            ],

            'GET' => [

                'nombre_persona_autorizada' => 'nullable|string|max:75',
                'dni' => 'nullable|string|max:9',
                'notas' => 'nullable|string|max:150',
                'url_dni' => 'nullable|file|mimes:pdf,xlx,csv,jpg,png,jpeg|max:2048'
            ]
        };
    }
}
