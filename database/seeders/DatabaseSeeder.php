<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'user', 'description' => 'Can create/view/update own requests'],
            ['name' => 'admin', 'description' => 'Can manage and view all requests'],
            ['name' => 'super-admin', 'description' => 'Can manage roles and permissions'],
        ];

        $permissions = [
            ['name' => 'user.dashboard', 'description' => 'User Dashboard'],
            ['name' => 'user.sahayog_requests.create', 'description' => 'Create sahayog request'],
            ['name' => 'user.sahayog_requests.history', 'description' => 'View him/her request history'],
            ['name' => 'user.sahayog_requests.view', 'description' => 'View own request details'],

            ['name' => 'admin.dashboard.view', 'description' => 'View admin dashboard'],
            ['name' => 'admin.users.view', 'description' => 'View user verification page'],
            ['name' => 'admin.sahayog_requests.view', 'description' => 'View admin sahayog request list'],

            ['name' => 'create-role', 'description' => 'Create new roles'],
            ['name' => 'assign-permissions', 'description' => 'Assign permissions to roles'],
            ['name' => 'assign-role', 'description' => 'Assign roles to users'],
        ];

        DB::table('roles')->insert($roles);
        DB::table('permissions')->insert($permissions);

        $roleMap = collect(DB::table('roles')->get())->keyBy('name');
        $permMap = collect(DB::table('permissions')->get())->keyBy('name');

        $rolePermissions = [
            ['role' => 'user', 'permissions' => ['user.sahayog_requests.create', 'user.sahayog_requests.history', 'user.sahayog_requests.view']],
            ['role' => 'admin', 'permissions' => ['admin.dashboard.view', 'admin.users.view', 'admin.sahayog_requests.view']],
            ['role' => 'super-admin', 'permissions' => ['create-role', 'assign-permissions', 'assign-role']],
        ];

        foreach ($rolePermissions as $entry) {
            $roleId = $roleMap[$entry['role']]->id;
            foreach ($entry['permissions'] as $permissionName) {
                DB::table('permission_role')->insert([
                    'role_id' => $roleId,
                    'permission_id' => $permMap[$permissionName]->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $password = bcrypt('welcome@123');

        $user = User::factory()->create([
            'name' => 'User One',
            'email' => 'user@example.com',
            'password' => $password,
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin One',
            'email' => 'admin@example.com',
            'password' => $password,
        ]);

        $superAdmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => $password,
        ]);

        DB::table('role_user')->insert([
            ['user_id' => $user->id, 'role_id' => $roleMap['user']->id, 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => $admin->id, 'role_id' => $roleMap['admin']->id, 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => $superAdmin->id, 'role_id' => $roleMap['super-admin']->id, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
