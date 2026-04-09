<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();

        return Inertia::render('admin/users', [
            'users' => $users
        ]);
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->hasRole('admin')) {
            $user->delete();
            return redirect()->back()->with('success', 'You have successfully deleted the user');
        }

        return abort(403);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'in:issuer,admin'],
        ]);

        $user->syncRoles([$validated['role']]);

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user->load('roles'),
        ]);
    }
}
