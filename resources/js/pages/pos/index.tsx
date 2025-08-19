import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock_quantity: number;
    category: string | null;
}

interface CartItem extends Product {
    quantity: number;
    total: number;
}

interface PosData {
    products: Product[];
    categories: string[];
    filters: {
        search?: string;
        category?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Point of Sale', href: '/pos' },
];

export default function PosIndex({ products, categories, filters }: PosData) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'digital'>('cash');
    const [amountPaid, setAmountPaid] = useState('');
    const [notes, setNotes] = useState('');

    const { setData, post, processing, errors } = useForm({
        items: [] as Array<{ product_id: number; quantity: number }>,
        payment_method: 'cash',
        amount_paid: 0,
        notes: '',
    });

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock_quantity) {
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
                        : item
                ));
            }
        } else {
            setCart([...cart, { ...product, quantity: 1, total: product.price }]);
        }
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product && newQuantity <= product.stock_quantity) {
            setCart(cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
                    : item
            ));
        }
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * 0.08; // 8% tax
    const total = subtotal + taxAmount;
    const change = parseFloat(amountPaid) - total;

    const handleSearch = () => {
        router.get('/pos', { search: searchTerm, category: selectedCategory }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
        router.get('/pos', { search: searchTerm, category: category || undefined }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Please add items to cart');
            return;
        }

        if (parseFloat(amountPaid) < total) {
            alert('Insufficient payment amount');
            return;
        }

        setData({
            items: cart.map(item => ({ product_id: item.id, quantity: item.quantity })),
            payment_method: paymentMethod,
            amount_paid: parseFloat(amountPaid),
            notes: notes,
        });

        post(route('sales.store'), {
            onSuccess: () => {
                clearCart();
                setAmountPaid('');
                setNotes('');
            },
        });
    };

    useEffect(() => {
        if (total > 0 && paymentMethod === 'cash') {
            // Suggest rounded amount for cash payments
            const suggestedAmount = Math.ceil(total);
            if (!amountPaid) {
                setAmountPaid(suggestedAmount.toString());
            }
        }
    }, [total, paymentMethod, amountPaid]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point of Sale" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Products Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl font-bold mb-4">🛍️ Products</h2>
                        
                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <Button onClick={handleSearch}>Search</Button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Button
                                variant={selectedCategory === '' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleCategoryFilter('')}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleCategoryFilter(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => addToCart(product)}
                                >
                                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{product.sku}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-green-600">${product.price}</span>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                            {product.stock_quantity} left
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No products found matching your criteria
                            </div>
                        )}
                    </div>
                </div>

                {/* Cart Section */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">🛒 Cart</h2>
                            {cart.length > 0 && (
                                <Button variant="outline" size="sm" onClick={clearCart}>
                                    Clear
                                </Button>
                            )}
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">${item.price} each</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock_quantity}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            ×
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {cart.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Cart is empty
                            </div>
                        )}

                        {/* Cart Summary */}
                        {cart.length > 0 && (
                            <div className="space-y-2 border-t pt-4">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (8%):</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Payment Section */}
                    {cart.length > 0 && (
                        <div className="bg-white rounded-lg shadow p-4">
                            <h3 className="font-bold mb-4">💳 Payment</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Payment Method */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { value: 'cash', label: 'Cash', icon: '💵' },
                                            { value: 'card', label: 'Card', icon: '💳' },
                                            { value: 'digital', label: 'Digital', icon: '📱' },
                                        ].map((method) => (
                                            <Button
                                                key={method.value}
                                                type="button"
                                                variant={paymentMethod === method.value ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setPaymentMethod(method.value as 'cash' | 'card' | 'digital')}
                                            >
                                                <span className="mr-1">{method.icon}</span>
                                                {method.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Amount Paid */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Amount Paid</label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min={total}
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(e.target.value)}
                                        required
                                    />
                                    {change >= 0 && amountPaid && (
                                        <p className="text-sm text-green-600 mt-1">
                                            Change: ${change.toFixed(2)}
                                        </p>
                                    )}
                                    {change < 0 && amountPaid && (
                                        <p className="text-sm text-red-600 mt-1">
                                            Insufficient payment
                                        </p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                                    <Input
                                        type="text"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add notes..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={processing || change < 0}
                                >
                                    {processing ? 'Processing...' : '✅ Complete Sale'}
                                </Button>

                                {errors.items && (
                                    <p className="text-sm text-red-600">{errors.items}</p>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}