<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'iPhone 15 Pro',
                'description' => 'Latest Apple iPhone with Pro features',
                'sku' => 'IPH-15-PRO-001',
                'price' => 999.99,
                'cost' => 650.00,
                'stock_quantity' => 25,
                'low_stock_threshold' => 5,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Samsung Galaxy S24',
                'description' => 'Premium Android smartphone',
                'sku' => 'SAM-S24-001',
                'price' => 899.99,
                'cost' => 580.00,
                'stock_quantity' => 30,
                'low_stock_threshold' => 5,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'MacBook Air M3',
                'description' => '13-inch laptop with M3 chip',
                'sku' => 'MBA-M3-13-001',
                'price' => 1299.99,
                'cost' => 850.00,
                'stock_quantity' => 15,
                'low_stock_threshold' => 3,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Nike Air Max 270',
                'description' => 'Comfortable running shoes',
                'sku' => 'NIK-AM270-001',
                'price' => 149.99,
                'cost' => 75.00,
                'stock_quantity' => 50,
                'low_stock_threshold' => 10,
                'category' => 'Footwear',
                'is_active' => true,
            ],
            [
                'name' => 'Levi\'s 501 Jeans',
                'description' => 'Classic straight-leg jeans',
                'sku' => 'LEV-501-001',
                'price' => 79.99,
                'cost' => 35.00,
                'stock_quantity' => 8,
                'low_stock_threshold' => 10,
                'category' => 'Clothing',
                'is_active' => true,
            ],
            [
                'name' => 'Starbucks Pike Place Coffee',
                'description' => 'Medium roast ground coffee, 1lb bag',
                'sku' => 'SBX-PP-1LB-001',
                'price' => 12.99,
                'cost' => 6.50,
                'stock_quantity' => 100,
                'low_stock_threshold' => 20,
                'category' => 'Food & Beverage',
                'is_active' => true,
            ],
            [
                'name' => 'Wireless Bluetooth Headphones',
                'description' => 'Noise-cancelling over-ear headphones',
                'sku' => 'WBH-NC-001',
                'price' => 199.99,
                'cost' => 120.00,
                'stock_quantity' => 3,
                'low_stock_threshold' => 5,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Organic Green Tea',
                'description' => 'Premium organic green tea, 20 bags',
                'sku' => 'OGT-20-001',
                'price' => 8.99,
                'cost' => 4.50,
                'stock_quantity' => 75,
                'low_stock_threshold' => 15,
                'category' => 'Food & Beverage',
                'is_active' => true,
            ],
            [
                'name' => 'Desk Lamp LED',
                'description' => 'Adjustable LED desk lamp with USB charging',
                'sku' => 'DL-LED-USB-001',
                'price' => 45.99,
                'cost' => 22.00,
                'stock_quantity' => 20,
                'low_stock_threshold' => 5,
                'category' => 'Home & Office',
                'is_active' => true,
            ],
            [
                'name' => 'Yoga Mat Premium',
                'description' => 'Non-slip yoga mat with carrying strap',
                'sku' => 'YM-PREM-001',
                'price' => 39.99,
                'cost' => 18.00,
                'stock_quantity' => 2,
                'low_stock_threshold' => 8,
                'category' => 'Sports & Fitness',
                'is_active' => true,
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}