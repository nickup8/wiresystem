<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorageRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'rack' => ['required', 'string', 'max:255'],
            'zone_id' => ['required', 'numeric', 'gt:0'],
            'start_level' => ['required', 'numeric', 'gt:0'],
            'level_count' => ['required', 'numeric', 'gt:0'],
            'start_storage' => ['required', 'numeric', 'gt:0'],
            'finish_storage' => ['required', 'numeric', 'gt:0'],
        ];
    }
}
