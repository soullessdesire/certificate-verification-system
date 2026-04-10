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
        Schema::create('certificates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('course');
            $table->timestamp('issued_at');
            $table->unsignedBigInteger('issued_by');
            $table->string('hash')->unique();
            $table->enum('status', ['valid', 'revoked']);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('issued_by')->references('id')->on('users')->cascadeOnDelete();
            $table->index(['hash']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
