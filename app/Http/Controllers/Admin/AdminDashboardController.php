<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_drivers' => Driver::count(),
            'approved_drivers' => Driver::approved()->count(),
            'pending_drivers' => Driver::where('is_approved', false)->count(),
            'online_drivers' => Driver::approved()->online()->count(),
        ];

        $recentDrivers = Driver::with('serviceArea')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($driver) {
                return [
                    'id' => $driver->id,
                    'name' => $driver->name,
                    'email' => $driver->email,
                    'phone_number' => $driver->phone_number,
                    'service_area' => $driver->serviceArea?->name,
                    'is_approved' => $driver->is_approved,
                    'is_online' => $driver->is_online,
                    'created_at' => $driver->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentDrivers' => $recentDrivers,
        ]);
    }
}
