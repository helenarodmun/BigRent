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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return match ($this->method()) {

            'POST' => [

                'nombre_persona_autorizada' => 'required|string|max:75',
                'dni' => 'required|string|max:9',
                'telefono1' => 'required|string|max:9',
                'telefono2' => 'required|string|max:9',
                'anotaciones' => 'required|string|max:150',
                'url_dni' => 'nullable'
            ],

            'PUT' => [
                
                'nombre_persona_autorizada' => 'nullable|string|max:75',
                'dni' => 'nullable|string|max:9',
                'telefono1' => 'nullable|string|max:9',
                'telefono2' => 'nullable|string|max:9',
                'anotaciones' => 'nullable|string|max:150',
                'url_dni' => 'nullable'
            ],
            
            'GET' => [
                
                'nombre_persona_autorizada' => 'nullable|string|max:75',
                'dni' => 'nullable|string|max:9',
                'telefono1' => 'nullable|string|max:9',
                'telefono2' => 'nullable|string|max:9',
                'anotaciones' => 'nullable|string|max:150',
                'url_dni' => 'nullable'
            ]
        };
    }
}
