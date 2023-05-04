<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarcaForm extends FormRequest
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

                'denominacion' => 'required|string|max:75'
            ],

            'PUT' => [

                'denominacion' => 'nullable|string|max:75'
            ],

            'GET' => [

                'denominacion' => 'nullable|string|max:75'
            ]
        };
    }
}
