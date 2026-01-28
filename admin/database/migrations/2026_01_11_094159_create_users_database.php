<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * bảng bảo mật người dùng
         */
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->string('email_address', 255)->nullable(false)->unique('user_email_index');
            $table->string('hash_password')->nullable(false);
            $table->enum('status', ['active', 'inactive', 'banned'])->default('active');
            $table->timestampTz('last_login_at')->nullable();
            $table->timestampsTz();
        });
        /**
         * thông tin cá nhân người dùng
         */
        Schema::create('user_info', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->string('first_name', 255)->nullable(false);
            $table->string('last_name', 255)->nullable(false);
            $table->string('full_name', 255)->nullable(false);
            $table->text('avatar')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->uuid('user_id')->nullable(false);
            $table->foreign('user_id', 'fk_user_info_with_user')->references('id')->on('users')->cascadeOnDelete();
        });
        /**
         * user_address
         * Bảng riêng cho địa chỉ người dùng
         */
        Schema::create('user_address', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->uuid('user_id')->nullable(false);
            $table->string('province', 255)->nullable(false);
            $table->string('ward', 255)->nullable(false);
            $table->string('address_detail', 255)->nullable(false);
            $table->foreign('user_id', 'fk_user_address_with_users')->references('id')->on('users')->cascadeOnDelete();
        });
        /**
         * user phone number
         */
        Schema::create('user_phones', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->uuid('user_id')->nullable(false);
            $table->string('phone_number', 10)->nullable(false);
            $table->foreign('user_id', 'fk_user_phone_with_user')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_info');
        Schema::dropIfExists('user_phones');
        Schema::dropIfExists('user_address');
        Schema::dropIfExists('users');
    }
};
