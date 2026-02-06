<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\ServiceArea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index(Request $request)
    {
        $query = Driver::with('serviceArea')
            ->approved()
            ->orderByRaw('is_online DESC')
            ->orderBy('name');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('area') && $request->input('area') !== 'all') {
            $query->whereHas('serviceArea', function ($q) use ($request) {
                $q->where('name', $request->input('area'));
            });
        }

        $drivers = $query->paginate(9)->through(function ($driver) {
            return [
                'id' => $driver->id,
                'name' => $driver->name,
                'phone_number' => $driver->phone_number,
                'service_area' => $driver->serviceArea?->name,
                'is_online' => $driver->is_online,
                'avatar_url' => $driver->avatar_url,
                'avatar' => $driver->avatar,
            ];
        });

        $serviceAreas = ServiceArea::where('is_active', true)
            ->orderBy('name')
            ->pluck('name');

        $stats = [
            'total_drivers' => Driver::approved()->count(),
            'online_drivers' => Driver::approved()->online()->count(),
            'total_areas' => ServiceArea::where('is_active', true)->count(),
        ];

        return Inertia::render('Public/Directory', [
            'drivers' => $drivers,
            'serviceAreas' => $serviceAreas,
            'stats' => $stats,
            'filters' => [
                'search' => $request->input('search', ''),
                'area' => $request->input('area', 'all'),
            ],
        ]);
    }
}
