<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index(Request $request)
    {
        $query = Product::active()->where('stock_quantity', '>', 0);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->where('category', $request->get('category'));
        }

        $products = $query->select('id', 'name', 'sku', 'price', 'stock_quantity', 'category')
            ->orderBy('name')
            ->get();
        
        $categories = Product::active()
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');
        
        return Inertia::render('pos/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}