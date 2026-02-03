<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DriverMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::guard('driver')->check()) {
            return redirect()->route('driver.login');
        }

        $driver = Auth::guard('driver')->user();
        // if (!$driver->is_approved) {
        //     Auth::guard('driver')->logout();
        //     return redirect()->route('driver.login')->with('error', 'Your account is pending approval.');
        // }

        return $next($request);
    }
}
