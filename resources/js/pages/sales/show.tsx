import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface SaleItem {
    id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    product: {
        name: string;
        sku: string;
    };
}

interface Sale {
    id: number;
    sale_number: string;
    user: {
        name: string;
        email: string;
    };
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    amount_paid: number;
    change_given: number;
    payment_method: string;
    status: string;
    notes: string | null;
    created_at: string;
    items: SaleItem[];
}

interface SaleShowData {
    sale: Sale;
    [key: string]: unknown;
}

export default function SaleShow({ sale }: SaleShowData) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sales', href: '/sales' },
        { title: sale.sale_number, href: `/sales/${sale.id}` },
    ];

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

    const totalItems = sale.items.reduce((sum, item) => sum + item.quantity, 0);

    const printReceipt = () => {
        // This would typically integrate with a receipt printer
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Sale ${sale.sale_number}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🧾 {sale.sale_number}</h1>
                        <p className="text-sm text-gray-600">
                            Processed on {new Date(sale.created_at).toLocaleDateString()} at {' '}
                            {new Date(sale.created_at).toLocaleTimeString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                                {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Button onClick={printReceipt} variant="outline">
                            🖨️ Print Receipt
                        </Button>
                        <Link href="/sales">
                            <Button variant="outline">← Back to Sales</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sale Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">🛍️ Items Purchased</h2>
                            
                            <div className="space-y-3">
                                {sale.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                            <p className="text-sm text-gray-500">{item.product.sku}</p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <div className="font-medium">
                                                {item.quantity} × ${item.unit_price} = ${item.total_price.toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ${item.unit_price} each
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {sale.notes && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">📝 Notes</h4>
                                    <p className="text-sm text-gray-600">{sale.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sale Summary & Details */}
                    <div className="space-y-6">
                        {/* Payment Summary */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">💰 Payment Summary</h2>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-medium">${sale.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (8%):</span>
                                    <span className="font-medium">${sale.tax_amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span>Total:</span>
                                    <span>${sale.total_amount.toFixed(2)}</span>
                                </div>
                                
                                <div className="pt-3 border-t space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Method:</span>
                                        <div className="flex items-center">
                                            <span className="mr-1">{getPaymentMethodIcon(sale.payment_method)}</span>
                                            <span className="font-medium">
                                                {sale.payment_method.charAt(0).toUpperCase() + sale.payment_method.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Amount Paid:</span>
                                        <span className="font-medium">${sale.amount_paid.toFixed(2)}</span>
                                    </div>
                                    {sale.change_given > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Change Given:</span>
                                            <span className="font-medium text-green-600">${sale.change_given.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sale Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">ℹ️ Sale Information</h2>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sale Number</label>
                                    <p className="text-sm text-gray-900 font-mono">{sale.sale_number}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cashier</label>
                                    <p className="text-sm text-gray-900">{sale.user.name}</p>
                                    <p className="text-xs text-gray-500">{sale.user.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                                    <p className="text-sm text-gray-900">
                                        {new Date(sale.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(sale.created_at).toLocaleTimeString()}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Total Items</label>
                                    <p className="text-sm text-gray-900">{totalItems} items</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
                            <div className="space-y-3">
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start"
                                    onClick={printReceipt}
                                >
                                    🖨️ Print Receipt
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start" 
                                    onClick={() => navigator.clipboard.writeText(sale.sale_number)}
                                >
                                    📋 Copy Sale Number
                                </Button>
                                <Link href="/pos" className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        💳 Process New Sale
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .print-area, .print-area * {
                            visibility: visible;
                        }
                        .print-area {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                    }
                `
            }} />
        </AppLayout>
    );
}