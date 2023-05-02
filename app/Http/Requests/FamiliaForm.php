<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FamiliaForm extends FormRequest
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

                'nombre' => 'required|string|max:75'
            ],

            'PUT' => [

                'nombre' => 'nullable|string|max:75'
            ],

            'GET' => [

                'nombre' => 'nullable|string|max:75'
            ]
        };
    }
}
