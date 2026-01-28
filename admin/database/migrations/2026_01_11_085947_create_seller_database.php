<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /**
         * =========================
         * SELLER AUTH (BẢO MẬT)
         * =========================
         */
        Schema::create('sellers', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('gen_random_uuid()'));
            $table->string('email_address')->unique('seller_email_index');
            $table->string('hash_password')->nullable(false);
            $table->enum('status', ['active', 'inactive', 'banned'])
                ->default('inactive');
            $table->timestampTz('last_login_at')->nullable();
            $table->timestampsTz();
        });
        /**
         * =========================
         * SELLER INFO (1–1)
         * =========================
         */
        Schema::create('seller_info', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->uuid('seller_id')->nullable(false);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('full_name');
            $table->date('date_of_birth')->nullable();
            $table->foreign('seller_id', 'fk_seller_info_with_seller')
                ->references('id')
                ->on('sellers')
                ->onDelete('cascade');
        });
        /**
         * address 
         */
        Schema::create('seller_address', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->uuid('seller_id')->nullable(false);
            $table->string('province', 255)->nullable(false);
            $table->string('ward', 255)->nullable(false);
            $table->string('address_detail', 255)->nullable(false);
            $table->foreign('seller_id', 'fk_seller_address_with_sellers')->references('id')->on('sellers')->cascadeOnDelete();
        });
        /**
         * phone
         */
        Schema::create('seller_phones', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->uuid('seller_id')->nullable(false);
            $table->string('phone_number', 10)->nullable(false);
            $table->enum('type', ['company', 'individual'])->default('individual');
            $table->foreign('seller_id', 'fk_seller_phone_with_seller')->references('id')->on('sellers')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seller_info');
        Schema::dropIfExists('seller_phones');
        Schema::dropIfExists('seller_address');
        Schema::dropIfExists('sellers');
    }
};
