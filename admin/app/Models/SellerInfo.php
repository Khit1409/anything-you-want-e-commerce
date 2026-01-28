<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SellerInfo extends Model
{
    //
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'seller_info';

    protected $fillable = [
        'seller_id',
        'last_name',
        'full_name',
        'first_name',
        'date_of_birth'
    ];

    public $timestamps = false;

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
