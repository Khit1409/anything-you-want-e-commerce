<?php

namespace App\Http\Services;

use App\Http\Helper\Http;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Cookie;
use stdClass;

class JwtService
{
    private string $jwt_key;
    private ?stdClass $decoded = null;

    public function __construct()
    {
        $this->jwt_key = config('jwt.key');
    }

    public function auth(string $role)
    {
        $token_name =  (string) $role . "_access_token";
        $jwt = Cookie::get($token_name);
        if (!$jwt) return Http::notfound(['message' => 'Token not found cant be is not login or token expire!', 'success' => false, 'timestamp' => now()]);
        $this->decoded = JWT::decode($jwt, new Key($this->jwt_key, 'HS256'));
        return $this;
    }

    public function id()
    {
        if (!$this->decoded) return Http::notfound(['message' => 'Decode token from cookie is failed!', 'success' => false, 'timestamp' => now()]);
        return $this->decoded->uid;
    }
}
