<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DireccionUpdateForm extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'direccion' => 'nullable|string|max:75',
            'cp' => 'nullable|string|max:5',
            'localidad' => 'nullable|string|max:75',
            'municipio' => 'nullable|string|max:65',
            'provincia' => 'nullable|string|max:65',
            'predeterminada' => 'nullable'

        ];
    }
}
