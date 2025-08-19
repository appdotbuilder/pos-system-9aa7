import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    cost: number;
    stock_quantity: number;
    low_stock_threshold: number;
    category: string | null;
    is_active: boolean;
    is_low_stock: boolean;
    created_at: string;
    updated_at: string;
}

interface ProductShowData {
    product: Product;
    [key: string]: unknown;
}

export default function ProductShow({ product }: ProductShowData) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/products' },
        { title: product.name, href: `/products/${product.id}` },
    ];

    const profitMargin = product.price > 0 ? (((product.price - product.cost) / product.price) * 100) : 0;
    const markup = product.cost > 0 ? (((product.price - product.cost) / product.cost) * 100) : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {product.is_active ? 'Active' : 'Inactive'}
                            </span>
                            {product.is_low_stock && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    ⚠️ Low Stock
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Link href={`/products/${product.id}/edit`}>
                            <Button>✏️ Edit Product</Button>
                        </Link>
                        <Link href="/products">
                            <Button variant="outline">← Back to Products</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Product Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">📋 Product Information</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                                </div>

                                {product.description && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                                        <p className="mt-1 text-sm text-gray-900 font-mono">{product.sku}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {product.category ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {product.category}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">No category</span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Created</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(product.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Profitability */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">💰 Pricing & Profitability</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                                        <p className="mt-1 text-2xl font-bold text-green-600">${product.price}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cost Price</label>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">${product.cost}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Profit per Unit</label>
                                        <p className="mt-1 text-lg font-medium text-blue-600">
                                            ${(product.price - product.cost).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Profit Margin</label>
                                        <p className="mt-1 text-xl font-bold text-purple-600">
                                            {profitMargin.toFixed(1)}%
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Markup</label>
                                        <p className="mt-1 text-xl font-bold text-indigo-600">
                                            {markup.toFixed(1)}%
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Total Inventory Value</label>
                                        <p className="mt-1 text-lg font-medium text-green-600">
                                            ${(product.stock_quantity * product.cost).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Stats */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">📦 Inventory Status</h2>
                            
                            <div className="space-y-4">
                                <div className="text-center p-4 rounded-lg bg-blue-50">
                                    <div className="text-3xl font-bold text-blue-600">{product.stock_quantity}</div>
                                    <div className="text-sm text-blue-700">Units in Stock</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Low Stock Threshold:</span>
                                        <span className="font-medium">{product.low_stock_threshold}</span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${
                                                product.is_low_stock ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                            style={{
                                                width: `${Math.min((product.stock_quantity / (product.low_stock_threshold * 2)) * 100, 100)}%`
                                            }}
                                        ></div>
                                    </div>

                                    {product.is_low_stock && (
                                        <div className="text-xs text-red-600 font-medium">
                                            ⚠️ Stock is running low!
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Retail Value:</span>
                                        <span className="font-medium">
                                            ${(product.stock_quantity * product.price).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Cost Value:</span>
                                        <span className="font-medium">
                                            ${(product.stock_quantity * product.cost).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold pt-2 border-t">
                                        <span className="text-gray-900">Potential Profit:</span>
                                        <span className="text-green-600">
                                            ${(product.stock_quantity * (product.price - product.cost)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
                            <div className="space-y-3">
                                <Link href={`/products/${product.id}/edit`}>
                                    <Button variant="outline" className="w-full justify-start">
                                        ✏️ Edit Product
                                    </Button>
                                </Link>
                                <Link href="/pos" className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        💳 Add to POS
                                    </Button>
                                </Link>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start" 
                                    onClick={() => navigator.clipboard.writeText(product.sku)}
                                >
                                    📋 Copy SKU
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}