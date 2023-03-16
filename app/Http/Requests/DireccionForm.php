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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'direccion' => 'required|string|max:75',
            'cp' => 'required|string|max:5',
            'localidad' => 'required|string|max:75',
            'municipio' => 'required|string|max:65',
            'provincia' => 'required|string|max:65',
            'predeterminada' => 'nullable',
            'cliente_id' => 'required|exists:clientes,id'

        ];
    }
}
