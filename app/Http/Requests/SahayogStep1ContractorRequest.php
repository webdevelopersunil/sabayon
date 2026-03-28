<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SahayogStep1ContractorRequest extends FormRequest
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

            'pan' => [
                'nullable', 'string', 'max:10', $noHtml, 'regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/'
            ],
            'contractor_name' => [
                'required', 'string', 'max:500', $noHtml
            ],
            'work_years_contact' => [
                'required', 'integer', 'min:0'
            ],
            'total_years_in_ongc_different_contact' => [
                'required', 'integer', 'min:0'
            ],
            'funding_source' => [
                'required', 'string', 'max:500', $noHtml
            ],




            'date_of_seperation' => 'nullable|date|before_or_equal:today',
            'work_center' => [
                'required', 'string', 'max:255', $noHtml, 'regex:/^[A-Za-z0-9\s\-,.&()]+$/'
            ],
            'bank_and_branch' => [
                'required', 'string', 'max:255', $noHtml, 'regex:/^[A-Za-z0-9\s\-,.&()]+$/'
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