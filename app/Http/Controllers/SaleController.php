<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Sale::with('user', 'items.product');

        // Date range filter
        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->get('start_date'));
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->get('end_date'));
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Payment method filter
        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->get('payment_method'));
        }

        $sales = $query->latest()->paginate(20);
        
        return Inertia::render('sales/index', [
            'sales' => $sales,
            'filters' => $request->only(['start_date', 'end_date', 'status', 'payment_method']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::active()
            ->where('stock_quantity', '>', 0)
            ->select('id', 'name', 'sku', 'price', 'stock_quantity')
            ->get();
        
        return Inertia::render('pos/index', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $validatedData = $request->validated();
            
            // Calculate totals
            $subtotal = 0;
            $items = [];
            
            foreach ($validatedData['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Check stock availability
                if ($product->stock_quantity < $item['quantity']) {
                    return back()->withErrors([
                        'items' => "Insufficient stock for {$product->name}. Available: {$product->stock_quantity}",
                    ]);
                }
                
                $unitPrice = $product->price;
                $totalPrice = $unitPrice * $item['quantity'];
                $subtotal += $totalPrice;
                
                $items[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ];
                
                // Reduce stock
                $product->reduceStock($item['quantity']);
            }
            
            // Calculate tax (8%)
            $taxAmount = $subtotal * 0.08;
            $totalAmount = $subtotal + $taxAmount;
            
            // Validate payment amount
            if ($validatedData['amount_paid'] < $totalAmount) {
                return back()->withErrors([
                    'amount_paid' => 'Amount paid is insufficient.',
                ]);
            }
            
            $changeGiven = $validatedData['amount_paid'] - $totalAmount;
            
            // Create sale
            $sale = Sale::create([
                'sale_number' => Sale::generateSaleNumber(),
                'user_id' => auth()->id(),
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'amount_paid' => $validatedData['amount_paid'],
                'change_given' => $changeGiven,
                'payment_method' => $validatedData['payment_method'],
                'status' => 'completed',
                'notes' => $validatedData['notes'] ?? null,
            ]);
            
            // Create sale items
            foreach ($items as $item) {
                SaleItem::create([
                    'sale_id' => $sale->id,
                    ...$item,
                ]);
            }
            
            return redirect()->route('sales.show', $sale)
                ->with('success', 'Sale completed successfully.');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load('user', 'items.product');
        
        return Inertia::render('sales/show', [
            'sale' => $sale,
        ]);
    }
}