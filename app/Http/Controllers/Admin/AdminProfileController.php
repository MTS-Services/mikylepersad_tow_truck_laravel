<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminProfileUpdateRequest;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminProfileController extends Controller
{
    public function edit(): Response
    {
        /** @var Admin $admin */
        $admin = Auth::guard('admin')->user();

        return Inertia::render('Admin/Profile', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ],
        ]);
    }

    public function update(AdminProfileUpdateRequest $request): RedirectResponse
    {
        $admin = Auth::guard('admin')->user();
        assert($admin instanceof Admin);

        $admin->update($request->validated());

        return to_route('admin.profile.edit')->with('success', 'Profile updated successfully.');
    }
}
