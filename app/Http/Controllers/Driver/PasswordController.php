<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $driver = Auth::guard('driver')->user();

        if (!Hash::check($request->current_password, $driver->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'The provided password does not match your current password.',
            ]);
        }

        $driver->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password changed successfully.');
    }
}
