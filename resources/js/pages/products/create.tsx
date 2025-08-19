import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem } from '@/types';

interface ProductCreateData {
    categories: string[];
    [key: string]: unknown;
}



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
    { title: 'Create Product', href: '/products/create' },
];

export default function ProductCreate({ categories }: ProductCreateData) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        sku: '',
        price: '',
        cost: '',
        stock_quantity: '0',
        low_stock_threshold: '10',
        category: '',
        is_active: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    const generateSku = () => {
        const prefix = data.name
            .split(' ')
            .map(word => word.substring(0, 2).toUpperCase())
            .join('');
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        setData('sku', `${prefix}-${random}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">➕ Create New Product</h1>
                        <p className="text-sm text-gray-600">Add a new product to your inventory</p>
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
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        className={errors.sku ? 'border-red-500' : ''}
                                        placeholder="Enter SKU"
                                        required
                                    />
                                    <Button type="button" variant="outline" onClick={generateSku}>
                                        Generate
                                    </Button>
                                </div>
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
                            <Link href="/products">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : '✅ Create Product'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}