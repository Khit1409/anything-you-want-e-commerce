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
        Schema::create('reset_seller_accounts', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->string('email_address', 255)->unique('seller_email_address_index')->nullable(false);
            $table->text('reset_token')->nullable(false);
            $table->foreign('email_address', 'fk_reset_user_account_with_seller')->references('email_address')->on('sellers')->cascadeOnDelete();
            $table->timestampsTz();
        });
        Schema::create('reset_user_accounts', function (Blueprint $table) {
            $table->uuid('id')->primary(true)->default(DB::raw('gen_random_uuid()'));
            $table->string('email_address', 255)->unique('user_email_address_index')->nullable(false);
            $table->text('reset_token')->nullable(false);
            $table->foreign('email_address', 'fk_reset_user_account_with_user')->references('email_address')->on('users')->cascadeOnDelete();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reset_seller_accounts');
        Schema::dropIfExists('reset_user_accounts');
    }
};
