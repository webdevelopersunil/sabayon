<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultPassword = Hash::make('ongc123');
        $now = now();

        $admins = [
            ['name' => 'Agartala', 'email' => 'Agartala@ongc.co.in', 'username' => 'Agartala', 'designation' => 'HR-ER', 'location' => 'Agartala'],
            ['name' => 'Ahmedabad', 'email' => 'Ahmedabad@ongc.co.in', 'username' => 'Ahmedabad', 'designation' => 'HR-ER', 'location' => 'Ahmedabad'],
            ['name' => 'Ankleshwar', 'email' => 'Ankleshwar@ongc.co.in', 'username' => 'Ankleshwar', 'designation' => 'HR-ER', 'location' => 'Ankleshwar'],
            ['name' => 'Bokaro', 'email' => 'Bokaro@ongc.co.in', 'username' => 'Bokaro', 'designation' => 'HR-ER', 'location' => 'Bokaro'],
            ['name' => 'Cambay', 'email' => 'Cambay@ongc.co.in', 'username' => 'Cambay', 'designation' => 'HR-ER', 'location' => 'Cambay'],
            ['name' => 'Chennai', 'email' => 'Chennai@ongc.co.in', 'username' => 'Chennai', 'designation' => 'HR-ER', 'location' => 'Chennai'],
            ['name' => 'Dehradun', 'email' => 'Dehradun@ongc.co.in', 'username' => 'Dehradun', 'designation' => 'HR-ER', 'location' => 'Dehradun'],
            ['name' => 'Delhi', 'email' => 'Delhi@ongc.co.in', 'username' => 'Delhi', 'designation' => 'HR-ER', 'location' => 'Delhi'],
            ['name' => 'Goa', 'email' => 'Goa@ongc.co.in', 'username' => 'Goa', 'designation' => 'HR-ER', 'location' => 'Goa'],
            ['name' => 'Hazira', 'email' => 'Hazira@ongc.co.in', 'username' => 'Hazira', 'designation' => 'HR-ER', 'location' => 'Hazira'],
            ['name' => 'Hyderabad', 'email' => 'Hyderabad@ongc.co.in', 'username' => 'Hyderabad', 'designation' => 'HR-ER', 'location' => 'Hyderabad'],
            ['name' => 'Jodhpur', 'email' => 'Jodhpur@ongc.co.in', 'username' => 'Jodhpur', 'designation' => 'HR-ER', 'location' => 'Jodhpur'],
            ['name' => 'Jorhat', 'email' => 'Jorhat@ongc.co.in', 'username' => 'Jorhat', 'designation' => 'HR-ER', 'location' => 'Jorhat'],
            ['name' => 'Karaikal', 'email' => 'Karaikal@ongc.co.in', 'username' => 'Karaikal', 'designation' => 'HR-ER', 'location' => 'Karaikal'],
            ['name' => 'Kolkata', 'email' => 'Kolkata@ongc.co.in', 'username' => 'Kolkata', 'designation' => 'HR-ER', 'location' => 'Kolkata'],
            ['name' => 'Mehsana', 'email' => 'Mehsana@ongc.co.in', 'username' => 'Mehsana', 'designation' => 'HR-ER', 'location' => 'Mehsana'],
            ['name' => 'Mumbai', 'email' => 'Mumbai@ongc.co.in', 'username' => 'Mumbai', 'designation' => 'HR-ER', 'location' => 'Mumbai'],
            ['name' => 'Nazira', 'email' => 'Nazira@ongc.co.in', 'username' => 'Nazira', 'designation' => 'HR-ER', 'location' => 'Nazira'],
            ['name' => 'Panvel', 'email' => 'Panvel@ongc.co.in', 'username' => 'Panvel', 'designation' => 'HR-ER', 'location' => 'Panvel'],
            ['name' => 'Rajamundary', 'email' => 'Rajamundary@ongc.co.in', 'username' => 'Rajamundary', 'designation' => 'HR-ER', 'location' => 'Rajamundary'],
            ['name' => 'Sibsagar', 'email' => 'Sibsagar@ongc.co.in', 'username' => 'Sibsagar', 'designation' => 'HR-ER', 'location' => 'Sibsagar'],
            ['name' => 'Silchar', 'email' => 'Silchar@ongc.co.in', 'username' => 'Silchar', 'designation' => 'HR-ER', 'location' => 'Silchar'],
            ['name' => 'Uran', 'email' => 'Uran@ongc.co.in', 'username' => 'Uran', 'designation' => 'HR-ER', 'location' => 'Uran'],
            ['name' => 'Vadodra', 'email' => 'Vadodra@ongc.co.in', 'username' => 'Vadodra', 'designation' => 'HR-ER', 'location' => 'Vadodra'],
        ];

        foreach ($admins as &$admin) {
            $admin['password'] = $defaultPassword;
            $admin['created_at'] = $now;
            $admin['updated_at'] = $now;
        }

        Admin::insert($admins);
    }
}