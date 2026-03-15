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
        Schema::create('step2_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wizard_data_id')->constrained('wizard_data')->cascadeOnDelete();
            $table->string('name');
            $table->enum('relationship', [
                'Spouse','Child','Sister','Father','Mother','Brother','Father in Law','Mother-in-Law','Sister in Law (Husband sister for DOD)'
            ]);
            $table->boolean('is_editable')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('step2_data');
    }
};
