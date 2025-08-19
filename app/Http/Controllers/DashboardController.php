<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Get today's data
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();
        
        // Daily statistics
        $dailyStats = [
            'sales_count' => Sale::whereDate('created_at', $today)->where('status', 'completed')->count(),
            'revenue' => Sale::whereDate('created_at', $today)->where('status', 'completed')->sum('total_amount'),
            'items_sold' => SaleItem::whereHas('sale', function ($query) use ($today) {
                $query->whereDate('created_at', $today)->where('status', 'completed');
            })->sum('quantity'),
        ];
        
        // Monthly statistics
        $monthlyStats = [
            'sales_count' => Sale::where('created_at', '>=', $thisMonth)->where('status', 'completed')->count(),
            'revenue' => Sale::where('created_at', '>=', $thisMonth)->where('status', 'completed')->sum('total_amount'),
        ];
        
        // Low stock products
        $lowStockProducts = Product::lowStock()->active()->take(5)->get();
        
        // Top selling products (last 30 days)
        $topProducts = DB::table('sale_items')
            ->join('products', 'sale_items.product_id', '=', 'products.id')
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->where('sales.created_at', '>=', Carbon::now()->subDays(30))
            ->where('sales.status', 'completed')
            ->select(
                'products.name',
                'products.price',
                DB::raw('SUM(sale_items.quantity) as total_sold'),
                DB::raw('SUM(sale_items.total_price) as total_revenue')
            )
            ->groupBy('products.id', 'products.name', 'products.price')
            ->orderBy('total_sold', 'desc')
            ->take(5)
            ->get();
        
        // Recent sales
        $recentSales = Sale::with('user', 'items')
            ->latest()
            ->take(5)
            ->get();
        
        // Sales chart data (last 7 days)
        $salesChartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $sales = Sale::whereDate('created_at', $date)->where('status', 'completed')->sum('total_amount');
            $salesChartData[] = [
                'date' => $date->format('M j'),
                'sales' => $sales,
            ];
        }
        
        // Inventory status
        $inventoryStats = [
            'total_products' => Product::active()->count(),
            'low_stock_count' => Product::lowStock()->active()->count(),
            'out_of_stock_count' => Product::where('stock_quantity', 0)->active()->count(),
            'total_value' => Product::active()->selectRaw('SUM(stock_quantity * cost) as total')->value('total') ?? 0,
        ];
        
        return Inertia::render('dashboard', [
            'dailyStats' => $dailyStats,
            'monthlyStats' => $monthlyStats,
            'lowStockProducts' => $lowStockProducts,
            'topProducts' => $topProducts,
            'recentSales' => $recentSales,
            'salesChartData' => $salesChartData,
            'inventoryStats' => $inventoryStats,
            'userPermissions' => [
                'canManageProducts' => $user->canManageProducts(),
                'canProcessSales' => $user->canProcessSales(),
                'canViewReports' => $user->canViewReports(),
            ],
        ]);
    }
}