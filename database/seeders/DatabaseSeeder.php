<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\AdminSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
        ]);

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

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']],
                $role
            );
        }

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['name' => $permission['name']],
                $permission
            );
        }

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
                DB::table('permission_role')->updateOrInsert(
                    ['role_id' => $roleId, 'permission_id' => $permMap[$permissionName]->id],
                    ['created_at' => now(), 'updated_at' => now()]
                );
            }
        }

        $password = bcrypt('welcome@123');

        $user = User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User One',
                'cpf_no' => '111111',
                'password' => $password,
            ]
        );

        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin One',
                'cpf_no' => '222222',
                'password' => $password,
            ]
        );

        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'cpf_no' => '333333',
                'password' => $password,
            ]
        );

        DB::table('role_user')->updateOrInsert(
            ['user_id' => $user->id, 'role_id' => $roleMap['user']->id],
            ['created_at' => now(), 'updated_at' => now()]
        );

        DB::table('role_user')->updateOrInsert(
            ['user_id' => $admin->id, 'role_id' => $roleMap['admin']->id],
            ['created_at' => now(), 'updated_at' => now()]
        );

        DB::table('role_user')->updateOrInsert(
            ['user_id' => $superAdmin->id, 'role_id' => $roleMap['super-admin']->id],
            ['created_at' => now(), 'updated_at' => now()]
        );
    }
}
