<?php

namespace App\Http\Services;

class ProductService
{
    protected string $seller_id;

    public function __construct()
    {
        $this->seller_id = app(JwtService::class)->auth()->id();
    }

    public static function  get_for_seller() {}
}
