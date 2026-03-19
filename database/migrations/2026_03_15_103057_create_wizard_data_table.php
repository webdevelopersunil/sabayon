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
        Schema::create('wizard_data', function (Blueprint $table) {
            $table->id();
            $table->string('request_no')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('step')->default(1);
            $table->string('selected_beneficiary')->nullable();
            $table->enum('status', ['Complete', 'Draft'])->default('Draft');
            $table->enum('hr_status', ['Approved', 'Under-Process','Rejected','Returned','Draft'])->default('Draft');
            $table->enum('trust_admin_payment_status', ['Payment-Rejected', 'Payment-Released'])->nullable();
            $table->text('hr_updates')->nullable();
            $table->text('trust_admin_updates')->nullable();
            $table->text('finance_admin_updates')->nullable();
            $table->text('hr_details')->nullable();
            $table->text('trust_admin_details')->nullable();
            $table->text('finance_admin_details')->nullable();
            $table->boolean('sent_to_finance')->default(false);
            $table->boolean('sent_to_trust_admin')->default(false);
            $table->string('hr_attchament')->nullable();
            $table->string('sahayog_number')->nullable();
            $table->string('work_center')->nullable();
            $table->string('disha_file_no')->nullable();
            $table->timestamp('returned_at')->nullable();
            $table->bigInteger('amount_received')->nullable();
            $table->bigInteger('amount_demanded')->nullable();
            $table->bigInteger('amount_approved')->nullable();
            $table->string('level')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wizard_data');
    }
};
