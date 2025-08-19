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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('sale_number')->unique()->comment('Unique sale transaction number');
            $table->foreignId('user_id')->constrained();
            $table->decimal('subtotal', 10, 2)->comment('Subtotal before tax');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Tax amount');
            $table->decimal('total_amount', 10, 2)->comment('Total sale amount');
            $table->decimal('amount_paid', 10, 2)->comment('Amount paid by customer');
            $table->decimal('change_given', 10, 2)->default(0)->comment('Change given to customer');
            $table->enum('payment_method', ['cash', 'card', 'digital'])->default('cash')->comment('Payment method used');
            $table->enum('status', ['completed', 'cancelled', 'refunded'])->default('completed')->comment('Sale status');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->index('sale_number');
            $table->index('user_id');
            $table->index('status');
            $table->index('payment_method');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};