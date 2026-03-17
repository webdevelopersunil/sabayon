<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('cpf_no')->nullable();


            $table->string('aadhar_no')->unique()->nullable();
            $table->string('employee_type')->nullable(); //--need to remove this column later, can be derived from other data points or can be part of familydata
            $table->string('date_of_joining_ongc')->nullable();
            $table->text('aadhar_pic')->nullable();
            $table->string('designation')->nullable();
            $table->string('epf_no')->unique()->nullable();
            $table->text('principle_emp_undertaking')->nullable();
            
            $table->json('familydata')->nullable();
            $table->string('location')->nullable(); // need to remove this column later, can be derived from familydata or can be part of familydata
            $table->string('mobileno')->unique()->nullable(); // need to remove this column later, can be derived from familydata or can be part of familydata
            $table->timestamp('email_mobile_verified_at')->nullable();
            $table->boolean('admin_verified')->default('0');
            $table->timestamp('rejected_at')->nullable();
            $table->string('adminrejected_remarks')->nullable();
            $table->decimal('previous_taken_amount', 10, 2)->nullable();
            $table->string('category')->nullable();
            $table->timestamp('profile_updated_last')->nullable();


            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
