<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;

class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    public function toResponse($request)
    {
        if ($request->user()->hasRole('issuer')) {
            return redirect()->intended('/issuer')
                ->with('flash', [
                    'type' => 'success',
                    'message' => 'Two-factor authentication successful',
                ]);
        }

        if ($request->user()->hasRole('admin')) {
            return redirect()->intended('/admin')
                ->with('flash', [
                    'type' => 'success',
                    'message' => 'Two-factor authentication successful',
                ]);
        }

        return redirect()->intended('/')
            ->with('flash', [
                'type' => 'success',
                'message' => 'Two-factor authentication successful',
            ]);
    }
}
