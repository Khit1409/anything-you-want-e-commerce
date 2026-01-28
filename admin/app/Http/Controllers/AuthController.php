<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthService;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function seller_register(Request $request)
    {
        return app(AuthService::class)->seller_register($request);
    }
    public function user_register(Request $request)
    {
        return app(AuthService::class)->user_register($request);
    }

    public function seller_login(Request $request)
    {
        return app(AuthService::class)->seller_login($request);
    }
    public function user_login(Request $request)
    {
        return app(AuthService::class)->user_login($request);
    }

    public function user_profile()
    {
        return app(AuthService::class)->user_profile();
    }
    public function seller_profile()
    {
        return app(AuthService::class)->seller_profile();
    }
}
