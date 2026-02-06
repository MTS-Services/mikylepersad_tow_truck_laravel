<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceArea;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceAreaController extends Controller
{
    public function index(Request $request)
    {
        $query = ServiceArea::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $serviceAreas = $query->orderBy('name')
            ->paginate(12)
            ->appends($request->only('search'))
            ->through(function (ServiceArea $area) {
                return [
                    'id' => $area->id,
                    'name' => $area->name,
                    'is_active' => $area->is_active,
                    'created_at_formatted' => $area->created_at->format('F j, Y g:i A'),
                ];
            });

        return Inertia::render('Admin/ServiceAreas', [
            'serviceAreas' => $serviceAreas,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        ServiceArea::create([
            'name' => $validated['name'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Service area created successfully.');
    }

    public function update(Request $request, ServiceArea $serviceArea)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $serviceArea->update([
            'name' => $validated['name'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Service area updated successfully.');
    }

    public function destroy(ServiceArea $serviceArea)
    {
        $serviceArea->delete();

        return back()->with('success', 'Service area removed successfully.');
    }
}
