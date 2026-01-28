<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SellerPhone extends Model
{
    //
    protected $table = 'seller_phones';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'seller_id',
        'phone_number',
        'type'
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
