<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClienteForm extends FormRequest
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

                'nombre_fiscal' => 'nullable|string',
                'nif' => 'nullable|string|max:9',
                'nombre_comercial' => 'required|string',
                'tipo' => 'required|string',
                'administrador' => 'required|string',
                'dni_administrador' => 'required|string',
                'url_escrituras' => 'nullable|string',
                'url_dni_administrador' => 'nullable|string',
                'url_cif' => 'nullable|string',
                'anotaciones' => 'nullable|string|max:255',
                'direccion' => 'required|string|max:75',
                'cp' => 'required|string|max:5',
                'localidad' => 'required|string|max:75',
                'municipio' => 'required|string|max:65',
                'provincia' => 'required|string|max:65',
                'predeterminada' => 'nullable',
                'telefono' => 'required|string|max:9',
                'email' => 'nullable|string|email|max:255'
            ],

            'PUT' => [

                'nombre_fiscal' => 'nullable|string',
                'nif' => 'nullable|string|max:9',
                'nombre_comercial' => 'nullable|string',
                'tipo' => 'nullable',
                'administrador' => 'nullable|string',
                'dni_administrador' => 'nullable|string',
                'url_escrituras' => 'nullable|string',
                'url_dni_administrador' => 'nullable|string',
                'url_cif' => 'nullable|string',
                'anotaciones' => 'nullable|string|max:255',
                'direccion' => 'nullable|string|max:75',
                'cp' => 'nullable|string|max:5',
                'localidad' => 'nullable|string|max:75',
                'municipio' => 'nullable|string|max:65',
                'provincia' => 'nullable|string|max:65',
                'predeterminada' => 'nullable',
                'telefono' => 'nullable|string|max:9',
                'email' => 'nullable|string|email|max:255'
            ],
            'GET' => [

                'nombre_fiscal' => 'nullable|string',
                'nif' => 'nullable|string|max:9',
                'nombre_comercial' => 'nullable|string',
                'tipo' => 'nullable',
                'administrador' => 'nullable|string',
                'dni_administrador' => 'nullable|string',
                'url_escrituras' => 'nullable|string',
                'url_dni_administrador' => 'nullable|string',
                'url_cif' => 'nullable|string',
                'anotaciones' => 'nullable|string|max:255',
                'direccion' => 'nullable|string|max:75',
                'cp' => 'nullable|string|max:5',
                'localidad' => 'nullable|string|max:75',
                'municipio' => 'nullable|string|max:65',
                'provincia' => 'nullable|string|max:65',
                'predeterminada' => 'nullable',
                'telefono' => 'nullable|string|max:9',
                'email' => 'nullable|string|email|max:255'
            ]
        };
    }
}
