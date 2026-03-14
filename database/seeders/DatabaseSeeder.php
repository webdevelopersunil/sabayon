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
            ['name' => 'create-self-request', 'description' => 'Create own request'],
            ['name' => 'view-self-request', 'description' => 'View own request'],
            ['name' => 'update-self-request', 'description' => 'Update own request'],
            ['name' => 'update-request-status', 'description' => 'Update status of requests'],
            ['name' => 'view-any-requests', 'description' => 'View all requests'],
            ['name' => 'create-role', 'description' => 'Create new roles'],
            ['name' => 'assign-permissions', 'description' => 'Assign permissions to roles'],
            ['name' => 'assign-role', 'description' => 'Assign roles to users'],
        ];

        DB::table('roles')->insert($roles);
        DB::table('permissions')->insert($permissions);

        $roleMap = collect(DB::table('roles')->get())->keyBy('name');
        $permMap = collect(DB::table('permissions')->get())->keyBy('name');

        $rolePermissions = [
            ['role' => 'user', 'permissions' => ['create-self-request', 'view-self-request', 'update-self-request']],
            ['role' => 'admin', 'permissions' => ['update-request-status', 'view-any-requests']],
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
