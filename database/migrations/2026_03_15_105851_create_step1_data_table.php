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
        Schema::create('step1_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wizard_data_id')->constrained('wizard_data')->cascadeOnDelete();
            $table->string('name');
            $table->string('type');
            $table->string('cpfno');
            $table->date('doj_ongc');
            $table->string('ifsc_code');
            $table->string('designation');
            $table->string('work_center');
            $table->integer('dependants_no');
            $table->string('bank_and_branch');
            $table->string('place_of_posting');
            $table->string('savingaccount_No');
            $table->string('seperation_reason');
            $table->date('date_of_seperation');
            $table->bigInteger('gross_annual_income');
            $table->text('seperation_benefits')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('step1_data');
    }
};
