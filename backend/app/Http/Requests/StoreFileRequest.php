<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreFileRequest extends FormRequest
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
            'file' => 'required|file|mimes:pdf,png,jpg|max:4000',
            'category' => 'required|in:Identity,Legal,Supporting',
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'The file field is required.',
            'file.file' => 'The uploaded field must be a valid file.',
            'file.mimes' => 'Allowed formats: PDF, PNG, JPG.',
            'file.max' => 'The file exceeds the maximum allowed size (4 MB).',
            'file.uploaded' => 'The file could not be uploaded (server limit reached: upload_max_filesize/post_max_size).',
            'category.required' => 'The category field is required.',
            'category.in' => 'The category must be one of the following values: Identity, Legal, Supporting.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
