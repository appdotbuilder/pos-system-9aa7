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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->string('sku')->unique()->comment('Stock keeping unit');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->decimal('cost', 10, 2)->default(0)->comment('Product cost');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->integer('low_stock_threshold')->default(10)->comment('Low stock alert threshold');
            $table->string('category')->nullable()->comment('Product category');
            $table->boolean('is_active')->default(true)->comment('Product status');
            $table->string('image_path')->nullable()->comment('Product image path');
            $table->timestamps();
            
            $table->index('name');
            $table->index('sku');
            $table->index('category');
            $table->index('is_active');
            $table->index(['is_active', 'stock_quantity']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};