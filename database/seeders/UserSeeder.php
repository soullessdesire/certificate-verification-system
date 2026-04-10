<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $issuerRole = Role::firstOrCreate(['name' => 'issuer']);
        Role::firstOrCreate(['name' => 'employer']);

        // Create 1 admin user
        User::factory()
            ->count(1)
            ->create()
            ->each(fn ($user) => $user->assignRole($adminRole));

        // Create 5 issuer users
        User::factory()
            ->count(5)
            ->create()
            ->each(fn ($user) => $user->assignRole($issuerRole));
    }
}
