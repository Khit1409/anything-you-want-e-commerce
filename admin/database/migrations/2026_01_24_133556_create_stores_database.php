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
         * =========================
         * STORES (1 SELLER – N STORE)
         * =========================
         */
        Schema::create('stores', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('gen_random_uuid()'));

            $table->uuid('seller_id')->nullable(false);
            $table->string('store_code')->unique();
            $table->timestampsTz();
            $table->foreign('seller_id', 'fk_store_with_seller')
                ->references('id')
                ->on('sellers')
                ->cascadeOnDelete();
        });

        /**
         * =========================
         * STORE INFO (1–1)
         * =========================
         */
        Schema::create('store_info', function (Blueprint $table) {

            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->uuid('store_id');
            $table->text('avatar')->nullable();
            $table->text('thumbnail')->nullable();
            $table->text('description')->nullable();
            $table->string('phone_number', 15);
            $table->string('email_address');
            $table->foreign('store_id')
                ->references('id')
                ->on('stores')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_info');
        Schema::dropIfExists('stores');
    }
};
