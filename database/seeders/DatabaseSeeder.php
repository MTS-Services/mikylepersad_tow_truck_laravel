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

        // $areas = [
        //     'Port of Spain',
        //     'San Fernando',
        //     'Chaguanas',
        //     'Arima',
        //     'Point Fortin',
        //     'Diego Martin',
        //     'Sangre Grande',
        //     'Tunapuna',
        //     'Couva',
        //     'Marabella',
        // ];
        $areas = [
            "Port of Spain",
            "Diego Martin",
            "Petit Valley",
            "St. James",
            "Woodbrook",
            "Cocorite",
            "Carenage",
            "Maraval",
            "St. Ann's",
            "Belmont",
            "Laventille",
            "Arima",
            "Arouca",
            "Five Rivers",
            "Tunapuna",
            "Tacarigua",
            "Trincity",
            "Maloney",
            "Sangre Grande",
            "Valencia",
            "Toco",
            "Chaguanas",
            "Charlieville",
            "Enterprise (Chaguanas)",
            "Cunupia",
            "Freeport",
            "Longdenville",
            "Carapichaima",
            "Couva",
            "McBean",
            "California",
            "Preysal",
            "Gasparillo",
            "San Fernando",
            "Marabella",
            "Pointe-à-Pierre",
            "Princes Town",
            "Penal",
            "Debe",
            "La Romaine",
            "Siparia",
            "Fyzabad",
            "La Brea",
            "Point Fortin",
            "Vessigny",
            'Guayaguayare',
            "Moruga"
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
