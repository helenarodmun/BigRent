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
        return [

            'nombre_fiscal' => 'nullable|string',
            'nif' => 'nullable|string|max:9',
            'nombre_comercial' => 'required|string',
            'tipo' => 'required',
            'administrador' => 'required|string',
            'dni_administrador' => 'required|string',
            'url_escrituras' => 'nullable|string',
            'url_dni_administrador' => 'nullable|string',
            'url_cif' => 'nullable|string',
            'anotaciones' => 'nullable|string|max:255'

        ];
    }
}
