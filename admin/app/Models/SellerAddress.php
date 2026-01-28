<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SellerAddress extends Model
{
    protected $table = 'seller_address';
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = false;
    //
    protected $fillable = [
        'seller_id',
        'province',
        'ward',
        'address_detail'
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }
    public function seller()
    {
        return $this->belongsTo(Seller::class, 'seller_id', 'id');
    }
}
