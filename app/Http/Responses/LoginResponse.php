<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Http\Request;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return redirect()->to('/admin');
        }

        if ($user->hasRole('issuer')) {
            return redirect()->to('/issuer');
        }

        return redirect()->route('home');
    }
}
