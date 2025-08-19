import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
}

interface ProductEditData {
    product: Product;
    categories: string[];
    [key: string]: unknown;
}



export default function ProductEdit({ product, categories }: ProductEditData) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/products' },
        { title: product.name, href: `/products/${product.id}` },
        { title: 'Edit', href: `/products/${product.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        sku: product.sku,
        price: product.price.toString(),
        cost: product.cost.toString(),
        stock_quantity: product.stock_quantity.toString(),
        low_stock_threshold: product.low_stock_threshold.toString(),
        category: product.category || '',
        is_active: product.is_active ? 1 : 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">✏️ Edit Product</h1>
                        <p className="text-sm text-gray-600">Update product information and inventory</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <Input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                    placeholder="Enter product name"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    placeholder="Enter product description"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* SKU */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SKU (Stock Keeping Unit) *
                                </label>
                                <Input
                                    type="text"
                                    value={data.sku}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    className={errors.sku ? 'border-red-500' : ''}
                                    placeholder="Enter SKU"
                                    required
                                />
                                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select or enter category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Or enter new category"
                                    className="mt-2"
                                />
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price ($) *
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className={errors.price ? 'border-red-500' : ''}
                                    placeholder="0.00"
                                    required
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            {/* Cost */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cost ($) *
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.cost}
                                    onChange={(e) => setData('cost', e.target.value)}
                                    className={errors.cost ? 'border-red-500' : ''}
                                    placeholder="0.00"
                                    required
                                />
                                {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
                                {data.price && data.cost && parseFloat(data.price) > 0 && parseFloat(data.cost) > 0 && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Markup: {(((parseFloat(data.price) - parseFloat(data.cost)) / parseFloat(data.cost)) * 100).toFixed(1)}%
                                    </p>
                                )}
                            </div>

                            {/* Stock Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock Quantity *
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={data.stock_quantity}
                                    onChange={(e) => setData('stock_quantity', e.target.value)}
                                    className={errors.stock_quantity ? 'border-red-500' : ''}
                                    placeholder="0"
                                    required
                                />
                                {errors.stock_quantity && <p className="text-red-500 text-sm mt-1">{errors.stock_quantity}</p>}
                            </div>

                            {/* Low Stock Threshold */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Low Stock Threshold *
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={data.low_stock_threshold}
                                    onChange={(e) => setData('low_stock_threshold', e.target.value)}
                                    className={errors.low_stock_threshold ? 'border-red-500' : ''}
                                    placeholder="10"
                                    required
                                />
                                {errors.low_stock_threshold && <p className="text-red-500 text-sm mt-1">{errors.low_stock_threshold}</p>}
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(data.is_active)}
                                        onChange={(e) => setData('is_active', e.target.checked ? 1 : 0)}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Product is active</span>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                            <Link href={`/products/${product.id}`}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : '✅ Update Product'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}