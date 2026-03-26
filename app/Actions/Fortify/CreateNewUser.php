<?php

namespace App\Actions\Fortify;

use App\Models\Role;
use App\Models\User;
use App\Concerns\ProfileValidationRules;
use Illuminate\Support\Facades\Validator;
use App\Concerns\PasswordValidationRules;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'mobileno' => ['required', 'string', 'max:15'],
            'epf_no' => ['nullable', 'string', 'regex:/^[a-zA-Z0-9]{3}\/[a-zA-Z0-9]{3}\/[a-zA-Z0-9]{6}\/[a-zA-Z0-9]{2}$/'],
            'aadhar_no' => ['required', 'string', 'size:12'],
            'location' => ['required', 'string', 'max:255'],
            'aadhar_pic' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'principle_emp_undertaking' => ['required', 'file', 'mimes:jpeg,png,jpg,pdf', 'max:2048'],
            'password' => $this->passwordRules(),
            'password_confirmation' => ['required', 'same:password'],
            'employee_type' => ['required', 'string', 'in:retired'],
        ])->validate();

        $aadharPicPath = isset($input['aadhar_pic']) 
            ? $input['aadhar_pic']->store('uploads/aadhar', 'public') 
            : null;
            
        $undertakingPath = isset($input['principle_emp_undertaking']) 
            ? $input['principle_emp_undertaking']->store('uploads/undertakings', 'public') 
            : null;

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'mobileno' => $input['mobileno'],
            'epf_no' => $input['epf_no'] ?? null,
            'aadhar_no' => $input['aadhar_no'],
            'location' => $input['location'],
            'aadhar_pic' => $aadharPicPath,
            'principle_emp_undertaking' => $undertakingPath,
            'password' => bcrypt($input['password']), // ⚠️ important
            'employee_type' => $input['employee_type'],
        ]);

        $user->roles()->syncWithoutDetaching([
            Role::where('name', 'user')->value('id')
        ]);

        return $user;

    }
}
