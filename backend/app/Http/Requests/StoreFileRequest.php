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
            'file.required' => 'Le fichier est obligatoire.',
            'file.file' => 'Le champ envoyé doit être un fichier valide.',
            'file.mimes' => 'Formats autorisés : PDF, PNG, JPG.',
            'file.max' => 'Le fichier dépasse la taille maximale autorisée (4 Mo).',
            'file.uploaded' => 'Le fichier n\'a pas pu être uploadé (limite serveur atteinte : upload_max_filesize/post_max_size).',
            'category.required' => 'La catégorie est obligatoire.',
            'category.in' => 'La catégorie doit être l\'une des valeurs suivantes : Identity, Legal, Supporting.',
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
