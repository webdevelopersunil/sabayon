<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('verification_otps', function (Blueprint $table) {
            $table->id();

            // Relation (optional but recommended)
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();

            // OTP data
            $table->string('otp', 6);
            $table->timestamp('expired_at');
            $table->integer('time_limit')->comment('Seconds validity');

            // Status tracking
            $table->boolean('is_used')->default(false);
            $table->timestamp('used_at')->nullable();

            // Meta (optional but useful)
            $table->string('type')->default('login'); // login, register, reset
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->integer('attempts')->default(0);

            // Soft delete instead of custom delete_at
            $table->softDeletes();

            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'otp']);
            $table->index('expired_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_otps');
    }
};