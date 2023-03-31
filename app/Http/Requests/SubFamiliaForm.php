<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubFamiliaForm extends FormRequest
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
                'descripcion' => 'required|string|max:150',
                'precio_semana' => 'required',
                'precio_dia' => 'required',
                'fianza' => 'required',
                'familia_id' => 'required'
            ],
            'PUT' => [
                'descripcion' => 'nullable|string|max:150',
                'precio_semana' => 'nullable',
                'precio_dia' => 'nullable',
                'fianza' => 'nullable',
                'familia_id' => 'nullable'
            ],
            'GET' => [
                'descripcion' => 'nullable|string|max:150',
                'precio_semana' => 'nullable',
                'precio_dia' => 'nullable',
                'fianza' => 'nullable',
                'familia_id' => 'nullable'
            ]
        }; 
    }
}
