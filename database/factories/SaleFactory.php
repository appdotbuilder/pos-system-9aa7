<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Sale>
     */
    protected $model = Sale::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 10, 500);
        $taxAmount = $subtotal * 0.08; // 8% tax
        $totalAmount = $subtotal + $taxAmount;
        $amountPaid = $this->faker->randomFloat(2, $totalAmount, $totalAmount + 50);
        $changeGiven = $amountPaid - $totalAmount;
        
        return [
            'sale_number' => $this->generateSaleNumber(),
            'user_id' => User::factory(),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'amount_paid' => $amountPaid,
            'change_given' => $changeGiven,
            'payment_method' => $this->faker->randomElement(['cash', 'card', 'digital']),
            'status' => $this->faker->randomElement(['completed', 'cancelled', 'refunded']),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Generate a unique sale number.
     *
     * @return string
     */
    protected function generateSaleNumber(): string
    {
        return 'SALE-' . date('Ymd') . '-' . str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT);
    }

    /**
     * Indicate that the sale is completed.
     */
    public function completed(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'completed',
            ];
        });
    }

    /**
     * Indicate that the sale is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'cancelled',
            ];
        });
    }

    /**
     * Indicate that the sale is refunded.
     */
    public function refunded(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'refunded',
            ];
        });
    }
}