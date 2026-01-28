<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserPhone extends Model
{
    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'user_phones';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    //
    protected $fillable = [
        'user_id',
        'phone_number'
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
        return $this->belongsTo(Seller::class, 'user_id', 'id');
    }
}
