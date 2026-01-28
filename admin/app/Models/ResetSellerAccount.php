<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ResetSellerAccount extends Model
{
    //
    protected $table = 'reset_seller_accounts';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;
    public $incrementing = false;

    protected $fillable = [
        'email_address',
        'reset_token'
    ];

    protected $hidden = [
        'reset_token'
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}
