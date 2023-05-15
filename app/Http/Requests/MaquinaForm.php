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

    
    public function rules(): array
    {
        return match ($this->method()) {

            'POST' => [
                'descripcion' => 'nullable|string|max:150',
                'referencia' => 'nullable|string|max:10',
                'url_manual' => 'nullable|file|mimes:pdf,xlx,csv',
                'url_ficha' => 'nullable|file|mimes:pdf,xlx,csv',
                'url_imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'subfamilia_id' => 'required',
                'marca_id' => 'required'
            ],

            'PUT' => [
                'descripcion' => 'nullable|string|max:150',
                'referencia' => 'nullable|string|max:10',
                'url_manual' => 'nullable|file|mimes:pdf,xlx,csv',
                'url_ficha' => 'nullable|file|mimes:pdf,xlx,csv',
                'url_imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'subfamilia_id' => 'nullable',
                'marca_id' => 'nullable'
            ],

            'GET' => [
                'descripcion' => 'nullable|string|max:150',
                'referencia' => 'nullable|string|max:10',
                'url_manual' => 'nullable|file|mimes:pdf,xlx,csv',
                'url_ficha' => 'nullable|file|mimes:pdf,xlx,csv',
                'url_imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'subfamilia_id' => 'nullable',
                'marca_id' => 'nullable'
            ]
        };
    }
}
