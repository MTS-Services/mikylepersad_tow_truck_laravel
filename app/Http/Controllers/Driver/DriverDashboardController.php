<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\ServiceArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
                'avatar' => $driver->avatar,
                'email' => $driver->email,
                'phone_number' => $driver->phone_number,
                'service_area_id' => $driver->service_area_id,
                'service_area' => $driver->serviceArea?->name,
                'is_online' => $driver->is_online,
                'avatar_url' => $driver->avatar_url,
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
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'service_area_id' => 'required|exists:service_areas,id',
            'avatar' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:2048',
        ]);

        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            if ($driver->avatar) {
                Storage::disk('public')->delete($driver->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('drivers', 'public');
        }
        $driver->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }
}
