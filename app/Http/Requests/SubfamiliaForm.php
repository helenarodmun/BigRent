<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubfamiliaForm extends FormRequest
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
                'descripcion' => 'required|string|max:150',
                'precio_dia' => 'required',
                'fianza' => 'required',
                'familia_id' => 'required'
            ],
            'PUT' => [
                'descripcion' => 'nullable|string|max:150',
                'precio_dia' => 'nullable',
                'fianza' => 'nullable',
                'familia_id' => 'nullable'
            ],
            'GET' => [
                'descripcion' => 'nullable|string|max:150',
                'precio_dia' => 'nullable',
                'fianza' => 'nullable',
                'familia_id' => 'nullable'
            ]
        };
    }
}
