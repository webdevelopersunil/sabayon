<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SahayogStep1Request extends FormRequest
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
        $noHtml = 'not_regex:/<[^>]*>/';

        return [
            'date_of_seperation' => 'nullable|date|before_or_equal:today',
            'work_center' => [
                'required', 'string', 'max:255', $noHtml, 'regex:/^[A-Za-z0-9\s\-,.&()]+$/'
            ],
            'place_of_posting' => [
                'required', 'string', 'max:255', $noHtml, 'regex:/^[A-Za-z0-9\s\-,.&()]+$/'
            ],
            'seperation_reason' => [
                'nullable', 'string', 'max:500', $noHtml
            ],
            'bank_and_branch' => [
                'required', 'string', 'max:255', $noHtml, 'regex:/^[A-Za-z0-9\s\-,.&()]+$/'
            ],
            'seperation_benefits' => [
                'nullable', 'string', 'max:500', $noHtml
            ],
            'savingaccount_No' => [ 'required', 'digits_between:5,20' ],
            'dependants_no' => 'required|integer|min:0|max:10',
            'ifsc_code' => [
                'required', 'string', 'regex:/^[A-Z]{4}0[A-Z0-9]{6}$/'
            ],
            'gross_annual_income' => 'required|numeric|min:0',
        ];
    }

    /**
     * Custom messages for validation.
     */
    public function messages(): array
    {
        return [
            '*.not_regex' => 'HTML tags are not allowed.',
        ];
    }
}