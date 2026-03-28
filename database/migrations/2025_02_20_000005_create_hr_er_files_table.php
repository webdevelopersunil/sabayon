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
        Schema::create('hr_er_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wizard_data_id')->constrained('wizard_data')->cascadeOnDelete();
            $table->string('file_path');
            $table->text('hr_updates')->nullable();
            $table->string('file_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hr_er_files');
    }
};