<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserAddress extends Model
{
    protected $table = 'user_address';
    public $timestamps = false;
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    //
    protected $fillable = [
        'user_id',
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
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
