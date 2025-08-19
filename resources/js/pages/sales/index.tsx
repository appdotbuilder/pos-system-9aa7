import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem } from '@/types';

interface Sale {
    id: number;
    sale_number: string;
    user: {
        name: string;
    };
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    payment_method: string;
    status: string;
    created_at: string;
    items: Array<{
        quantity: number;
    }>;
}

interface SalesData {
    sales: {
        data: Sale[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            per_page: number;
            to: number;
            total: number;
        };
    };
    filters: {
        start_date?: string;
        end_date?: string;
        status?: string;
        payment_method?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sales', href: '/sales' },
];

export default function SalesIndex({ sales, filters }: SalesData) {
    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const params: Record<string, string> = {};
        
        formData.forEach((value, key) => {
            if (value) {
                params[key] = value.toString();
            }
        });
        
        router.get('/sales', params, { preserveState: true });
    };

    const clearFilters = () => {
        router.get('/sales');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'refunded':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'cash':
                return '💵';
            case 'card':
                return '💳';
            case 'digital':
                return '📱';
            default:
                return '💰';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🧾 Sales History</h1>
                        <p className="text-sm text-gray-600">View and manage all sales transactions</p>
                    </div>
                    <Link href="/pos">
                        <Button size="lg" className="px-6">
                            💳 New Sale
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleFilter} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <Input
                                    name="start_date"
                                    type="date"
                                    defaultValue={filters.start_date}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">End Date</label>
                                <Input
                                    name="end_date"
                                    type="date"
                                    defaultValue={filters.end_date}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <select
                                    name="status"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={filters.status}
                                >
                                    <option value="">All Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Payment Method</label>
                                <select
                                    name="payment_method"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={filters.payment_method}
                                >
                                    <option value="">All Methods</option>
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="digital">Digital</option>
                                </select>
                            </div>
                            
                            <div className="flex items-end gap-2">
                                <Button type="submit">Filter</Button>
                                <Button type="button" variant="outline" onClick={clearFilters}>
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Sales Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">
                            Sales Transactions ({sales.meta.total} total)
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sale Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cashier
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sales.data.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {sale.sale_number}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>
                                                {new Date(sale.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(sale.created_at).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {sale.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {sale.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ${sale.total_amount.toFixed(2)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Tax: ${sale.tax_amount.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <span className="mr-1">
                                                    {getPaymentMethodIcon(sale.payment_method)}
                                                </span>
                                                {sale.payment_method.charAt(0).toUpperCase() + sale.payment_method.slice(1)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                                                {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link href={`/sales/${sale.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {sales.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">🧾</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No sales found</h3>
                            <p className="text-gray-500 mb-4">
                                {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                                    ? 'No sales match your current filters.'
                                    : 'No sales have been recorded yet.'}
                            </p>
                            {!Object.keys(filters).some(key => filters[key as keyof typeof filters]) && (
                                <Link href="/pos">
                                    <Button>Process First Sale</Button>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {sales.meta.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {sales.links.find(link => link.label === '&laquo; Previous')?.url && (
                                    <Link href={sales.links.find(link => link.label === '&laquo; Previous')?.url || ''}>
                                        <Button variant="outline">Previous</Button>
                                    </Link>
                                )}
                                {sales.links.find(link => link.label === 'Next &raquo;')?.url && (
                                    <Link href={sales.links.find(link => link.label === 'Next &raquo;')?.url || ''}>
                                        <Button variant="outline">Next</Button>
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{sales.meta.from}</span> to{' '}
                                        <span className="font-medium">{sales.meta.to}</span> of{' '}
                                        <span className="font-medium">{sales.meta.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {sales.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || ''}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${
                                                    index === 0 ? 'rounded-l-md' : ''
                                                } ${
                                                    index === sales.links.length - 1 ? 'rounded-r-md' : ''
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}