<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\ServiceArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DriverDashboardController extends Controller
{
    public function index()
    {
        $driver = Auth::guard('driver')->user();
        
        $serviceAreas = ServiceArea::active()->get()->map(function ($area) {
            return [
                'id' => $area->id,
                'name' => $area->name,
            ];
        });

        return Inertia::render('Driver/Dashboard', [
            'driver' => [
                'id' => $driver->id,
                'name' => $driver->name,
                'email' => $driver->email,
                'phone_number' => $driver->phone_number,
                'service_area_id' => $driver->service_area_id,
                'service_area' => $driver->serviceArea?->name,
                'is_online' => $driver->is_online,
            ],
            'serviceAreas' => $serviceAreas,
        ]);
    }

    public function toggleOnline(Request $request)
    {
        $driver = Auth::guard('driver')->user();
        $driver->update([
            'is_online' => !$driver->is_online,
        ]);

        return back()->with('success', 'Status updated successfully.');
    }

    public function updateProfile(Request $request)
    {
        $driver = Auth::guard('driver')->user();

        $validated = $request->validate([
            'phone_number' => 'required|string|max:20',
            'service_area_id' => 'required|exists:service_areas,id',
        ]);

        $driver->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }
}
