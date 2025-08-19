import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface DashboardData {
    dailyStats: {
        sales_count: number;
        revenue: number;
        items_sold: number;
    };
    monthlyStats: {
        sales_count: number;
        revenue: number;
    };
    lowStockProducts: Array<{
        id: number;
        name: string;
        stock_quantity: number;
        low_stock_threshold: number;
    }>;
    topProducts: Array<{
        name: string;
        price: number;
        total_sold: number;
        total_revenue: number;
    }>;
    recentSales: Array<{
        id: number;
        sale_number: string;
        total_amount: number;
        created_at: string;
        user: {
            name: string;
        };
        items: Array<{
            quantity: number;
        }>;
    }>;
    salesChartData: Array<{
        date: string;
        sales: number;
    }>;
    inventoryStats: {
        total_products: number;
        low_stock_count: number;
        out_of_stock_count: number;
        total_value: number;
    };
    userPermissions: {
        canManageProducts: boolean;
        canProcessSales: boolean;
        canViewReports: boolean;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    dailyStats,
    monthlyStats,
    lowStockProducts,
    topProducts,
    recentSales,
    salesChartData,
    inventoryStats,
    userPermissions,
}: DashboardData) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🏪 POS Dashboard</h1>
                        <p className="text-sm text-gray-600">Monitor your business performance at a glance</p>
                    </div>
                    
                    {userPermissions.canProcessSales && (
                        <Link href="/pos">
                            <Button size="lg" className="px-6">
                                💳 Open POS
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Daily Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ${dailyStats.revenue.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-3xl">💰</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {dailyStats.sales_count} transactions today
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Items Sold</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {dailyStats.items_sold}
                                </p>
                            </div>
                            <div className="text-3xl">📦</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Across {dailyStats.sales_count} sales
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    ${monthlyStats.revenue.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-3xl">📈</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {monthlyStats.sales_count} sales this month
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sales Chart */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">📊 Sales Trend (Last 7 Days)</h3>
                        <div className="flex items-end space-x-2 h-32">
                            {salesChartData.map((data, index) => {
                                const maxSales = Math.max(...salesChartData.map(d => d.sales));
                                const height = maxSales > 0 ? (data.sales / maxSales) * 100 : 0;
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="bg-blue-500 rounded-t w-full hover:bg-blue-600 transition-colors"
                                            style={{ height: `${Math.max(height, 2)}%` }}
                                            title={`${data.date}: $${data.sales}`}
                                        />
                                        <span className="text-xs mt-2 text-gray-600">{data.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">🏆 Top Selling Products</h3>
                        <div className="space-y-3">
                            {topProducts.length > 0 ? (
                                topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                        <div>
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-xs text-gray-500">${product.price} each</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm">{product.total_sold} sold</p>
                                            <p className="text-xs text-green-600">
                                                ${product.total_revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No sales data available</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Low Stock Alert */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">⚠️ Low Stock Alert</h3>
                            {userPermissions.canManageProducts && (
                                <Link href="/products">
                                    <Button variant="outline" size="sm">
                                        Manage Products
                                    </Button>
                                </Link>
                            )}
                        </div>
                        <div className="space-y-3">
                            {lowStockProducts.length > 0 ? (
                                lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                        <span className="font-medium text-sm">{product.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                {product.stock_quantity} left
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                (threshold: {product.low_stock_threshold})
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">All products are well stocked! 🎉</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Sales */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">🧾 Recent Sales</h3>
                            <Link href="/sales">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentSales.length > 0 ? (
                                recentSales.map((sale) => (
                                    <div key={sale.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                        <div>
                                            <p className="font-medium text-sm">{sale.sale_number}</p>
                                            <p className="text-xs text-gray-500">
                                                {sale.user.name} • {sale.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm">${sale.total_amount}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(sale.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent sales</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Inventory Overview */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">📊 Inventory Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{inventoryStats.total_products}</div>
                            <div className="text-sm text-gray-600">Total Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.low_stock_count}</div>
                            <div className="text-sm text-gray-600">Low Stock</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{inventoryStats.out_of_stock_count}</div>
                            <div className="text-sm text-gray-600">Out of Stock</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                ${inventoryStats.total_value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Inventory Value</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {userPermissions.canProcessSales && (
                            <Link href="/pos">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                    <span className="text-2xl">💳</span>
                                    <span>Process Sale</span>
                                </Button>
                            </Link>
                        )}
                        
                        {userPermissions.canManageProducts && (
                            <Link href="/products/create">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                    <span className="text-2xl">➕</span>
                                    <span>Add Product</span>
                                </Button>
                            </Link>
                        )}
                        
                        <Link href="/sales">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <span className="text-2xl">📋</span>
                                <span>View Sales</span>
                            </Button>
                        </Link>
                        
                        {userPermissions.canManageProducts && (
                            <Link href="/products">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                    <span className="text-2xl">📦</span>
                                    <span>Manage Products</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}