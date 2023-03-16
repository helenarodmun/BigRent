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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'telefono' => 'required|string|max:9',
            'email' => 'nullable|string|email|max:255',
            'cliente_id' => 'required|exists:clientes, id'
        ];
    }
}
