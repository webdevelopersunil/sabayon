<?php

namespace App\Http\Requests\Settings;

use App\Concerns\ProfileValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    use ProfileValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge(
            $this->profileRules($this->user()->id),
            [
                'aadhar_no' => ['required', 'string', 'size:12', 'regex:/^[0-9]{12}$/'],
                'mobileno' => ['nullable', 'string', 'max:20'],
                'designation' => ['nullable', 'string', 'max:255'],
                'category' => ['nullable', 'string', 'max:255'],
                'location' => ['nullable', 'string', 'max:255'],
            ]
        );
    }
}
