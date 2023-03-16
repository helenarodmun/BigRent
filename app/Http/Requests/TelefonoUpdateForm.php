<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TelefonoUpdateForm extends FormRequest
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
            'telefono' => 'nullable|string|max:9',
            'email' => 'nullable|string|email|max:255'
        ];
    }
}
