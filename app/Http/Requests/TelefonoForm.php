<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TelefonoForm extends FormRequest
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

                'contacto' => 'required|string|max:255',
                'via_comunicacion' => 'required|string',
                'tipo' => 'required|string'
            ],

            'PUT' => [

                'contacto' => 'nullable|string|max:255',
                'via_comunicacion' => 'nullable|string',
                'tipo' => 'nullable|string'
            ]
        };
    }
}
