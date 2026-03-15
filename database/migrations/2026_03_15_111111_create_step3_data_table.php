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
        Schema::create('step3_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wizard_data_id')->constrained('wizard_data')->cascadeOnDelete();
            $table->bigInteger('requested_amount');
            $table->json('other_details')->nullable();
            $table->bigInteger('eligible_amount');
            $table->string('financialoptions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('step3_data');
    }
};
