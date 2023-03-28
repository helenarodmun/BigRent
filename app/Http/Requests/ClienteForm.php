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
                'tipo_cliente' => 'required|string',
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
                'contacto' => 'required|string|max:255',
                'via_comunicacion' => 'required|string',
                'tipo' => 'required|string'
            ],

            'PUT' => [

                'nombre_fiscal' => 'nullable|string',
                'nif' => 'nullable|string|max:9',
                'nombre_comercial' => 'nullable|string',
                'tipo_cliente' => 'nullable',
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
                'contacto' => 'nullable|string|max:255',
                'via_comunicacion' => 'nullable|string',
                'tipo' => 'nullable|string'
            ],
            'GET' => [

                'nombre_fiscal' => 'nullable|string',
                'nif' => 'nullable|string|max:9',
                'nombre_comercial' => 'nullable|string',
                'tipo_cliente' => 'nullable',
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
                'contacto' => 'nullable|string|max:255',
                'via_comunicacion' => 'nullable|string',
                'tipo' => 'nullable|string'
            ]
        };
    }
}
