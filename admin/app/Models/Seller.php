<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Seller extends Model
{


    //
    protected $table = 'sellers';
    public $keyType = 'string';
    public $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'email_address',
        'hash_password',
        'status',
        'last_login_at',
    ];

    public $timestamps = true;

    protected $hidden = [
        'hash_password',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }
    public function info()
    {
        return $this->hasMany(SellerInfo::class, 'seller_id', 'id');
    }

    public function address()
    {
        return $this->hasMany(SellerAddress::class, 'seller_id', 'id');
    }

    public function phones()
    {
        return $this->hasMany(SellerAddress::class, 'seller_id', 'id');
    }

    public function getAuthPassword()
    {
        return $this->hash_pass;
    }
}
