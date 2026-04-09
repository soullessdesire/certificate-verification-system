<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class SignupResponse implements RegisterResponseContract
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
