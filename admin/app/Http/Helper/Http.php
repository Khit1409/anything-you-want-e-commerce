<?php

namespace App\Http\Helper;

class Http
{
    /**
     * Summary of error
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function error(array $data)
    {
        return response()->json($data, 404);
    }
    public static function success(array $data)
    {
        return response()->json($data, 200);
    }
    public static function notfound(array $data)
    {
        return response()->json($data, 401);
    }
    public static function warning(array $data)
    {
        return response()->json($data, 302);
    }
    public static function server_error(array $data)
    {
        return response()->json($data, 500);
    }
}
