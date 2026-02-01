<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\ServiceArea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'name' => 'Admin',
            'email' => 'admin@towtruck.com',
            'password' => Hash::make('password'),
        ]);

        $areas = [
            'Port of Spain',
            'San Fernando',
            'Chaguanas',
            'Arima',
            'Point Fortin',
            'Diego Martin',
            'Sangre Grande',
            'Tunapuna',
            'Couva',
            'Marabella',
        ];

        foreach ($areas as $index => $area) {
            ServiceArea::create([
                'name' => $area,
                'is_active' => true,
                'sort_order' => $index,
            ]);
        }
    }
}
