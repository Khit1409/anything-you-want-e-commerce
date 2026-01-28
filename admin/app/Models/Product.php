<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

/**
 * Product MongoDB Model
 *
 * @property array{
 *   name: string,
 *   description: string,
 *   price: float,
 *   sale: float
 * } $info
 *
 * @property int $stock
 *
 * @property array{
 *   seller_id: string,
 *   store_id: string
 * } $owner
 *
 * @property array{
 *   thumbnail: string,
 *   img_details: string[]
 * } $images
 *
 * @property string[] $tags
 *
 * @property string|null $brand
 *
 * @property array<int, array{
 *   sku: string,
 *   stock: int,
 *   attributes: array<int, array{
 *     attr_name: string,
 *     attr_value: array<int, array{
 *       value_name: string,
 *       value_stock: int
 *     }>
 *   }>
 * }> $variants
 *
 * @property string[] $ship_support
 *
 * @property int $total_rating
 *
 * @property array<int, array{
 *   rating: int,
 *   comment: string,
 *   reviewer_email: string,
 *   reviewer_name: string,
 *   comment_at: \Carbon\Carbon
 * }> $reviews
 *
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 */
class Product extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products';

    protected $fillable = [
        'info',
        'stock',
        'owner',
        'images',
        'tags',
        'brand',
        'variants',
        'ship_support',
        'total_rating',
        'reviews',
    ];

    protected $casts = [
        'info'         => 'array',
        'owner'        => 'array',
        'images'       => 'array',
        'tags'         => 'array',
        'variants'     => 'array',
        'ship_support' => 'array',
        'reviews'      => 'array',
        'total_rating' => 'integer',
        'stock'        => 'integer',
        'created_at'   => 'datetime',
        'updated_at'   => 'datetime',
    ];
}
