<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserInfo extends Model
{

    protected $primaryKey = 'id';
    protected $table = 'user_info';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;
    //
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'full_name',
        'avatar',
        'date_of_birth',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function  user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
