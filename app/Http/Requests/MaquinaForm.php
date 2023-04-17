<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaquinaForm extends FormRequest
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
                'referencia' => 'required|string|max:10',
                'url_manual' => 'nullable|string',
                'url_ficha' => 'nullable|string',
                'url_imagen' => 'nullable|string',
                'subfamilia_id' => 'required',
                'marca_id' => 'required'
            ],

            'PUT' => [
                'descripcion' => 'nullable|string|max:150',
                'referencia' => 'nullable|string|max:10',
                'url_manual' => 'nullable|string',
                'url_ficha' => 'nullable|string',
                'url_imagen' => 'nullable|string',
                'subfamilia_id' => 'nullable',
                'marca_id' => 'nullable'
            ],
            
            'GET' => [
                'descripcion' => 'nullable|string|max:150',
                'referencia' => 'nullable|string|max:10',
                'url_manual' => 'nullable|string',
                'url_ficha' => 'nullable|string',
                'url_imagen' => 'nullable|string',
                'subfamilia_id' => 'nullable',
                'marca_id' => 'nullable'
            ]
        };
    }
}
