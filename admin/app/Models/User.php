<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{

    protected $primaryKey = 'id';
    public $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    protected $fillable = [
        'status',
        'email_address',
        'hash_password',
        'last_login_at'
    ];
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
        return $this->hasOne(UserInfo::class, 'user_id', 'id');
    }

    public function address()
    {
        return $this->hasMany(UserAddress::class, 'user_id', 'id');
    }

    public function phones()
    {
        return $this->hasMany(UserAddress::class, 'user_id', 'id');
    }
}
