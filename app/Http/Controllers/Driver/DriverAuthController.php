<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\ServiceArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DriverAuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Driver/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('driver')->attempt($credentials, $request->boolean('remember'))) {
            $driver = Auth::guard('driver')->user();

            if (!$driver->is_approved) {
                Auth::guard('driver')->logout();
                return back()->withErrors([
                    'email' => 'Your account is pending approval.',
                ])->onlyInput('email');
            }

            $request->session()->regenerate();
            return redirect()->intended(route('driver.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function showRegister()
    {
        $serviceAreas = ServiceArea::active()->get()->map(function ($area) {
            return [
                'id' => $area->id,
                'name' => $area->name,
            ];
        });

        return Inertia::render('Driver/Register', [
            'serviceAreas' => $serviceAreas,
        ]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:drivers',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'required|string|max:20',
            'service_area_id' => 'required|exists:service_areas,id',
        ]);

        $driver = Driver::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'],
            'service_area_id' => $validated['service_area_id'],
            'is_approved' => false,
            'is_online' => false,
        ]);

        return redirect()->route('driver.login')->with('success', 'Registration successful! Please wait for admin approval.');
    }

    public function logout(Request $request)
    {
        Auth::guard('driver')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('driver.login');
    }
}
