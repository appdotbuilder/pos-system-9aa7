import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

export default function Welcome() {
    return (
        <AppShell>
            <Head title="POS System - Modern Point of Sale Solution" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🏪 Modern POS System
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Streamline your business operations with our comprehensive Point of Sale solution. 
                            Manage products, process sales, track inventory, and generate insights with ease.
                        </p>
                        
                        <div className="flex gap-4 justify-center">
                            <Link href="/login">
                                <Button size="lg" className="px-8 py-3 text-lg">
                                    🚀 Get Started
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                    📝 Sign Up Free
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold mb-3">Product Management</h3>
                            <p className="text-gray-600 mb-4">
                                Add, edit, and organize your products with detailed information, pricing, and inventory tracking.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• SKU and barcode support</li>
                                <li>• Category organization</li>
                                <li>• Stock level monitoring</li>
                                <li>• Bulk import/export</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">💳</div>
                            <h3 className="text-xl font-semibold mb-3">Fast Sales Processing</h3>
                            <p className="text-gray-600 mb-4">
                                Process transactions quickly with our intuitive POS interface designed for speed and accuracy.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Multiple payment methods</li>
                                <li>• Real-time inventory updates</li>
                                <li>• Receipt generation</li>
                                <li>• Tax calculations</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-3">Role-Based Access</h3>
                            <p className="text-gray-600 mb-4">
                                Secure your business with granular user permissions and role management.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Administrator controls</li>
                                <li>• Cashier operations</li>
                                <li>• Inventory manager access</li>
                                <li>• Audit trails</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3">Inventory Tracking</h3>
                            <p className="text-gray-600 mb-4">
                                Monitor stock levels, set low inventory alerts, and optimize your supply chain.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Real-time stock updates</li>
                                <li>• Low stock alerts</li>
                                <li>• Inventory valuation</li>
                                <li>• Stock movement history</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold mb-3">Sales Analytics</h3>
                            <p className="text-gray-600 mb-4">
                                Generate comprehensive reports and visualize sales trends to make data-driven decisions.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Daily/monthly reports</li>
                                <li>• Top-selling products</li>
                                <li>• Revenue tracking</li>
                                <li>• Performance metrics</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-semibold mb-3">Mobile Responsive</h3>
                            <p className="text-gray-600 mb-4">
                                Access your POS system from any device with our modern, responsive interface.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Touch-friendly design</li>
                                <li>• Tablet optimized</li>
                                <li>• Offline capabilities</li>
                                <li>• Cloud synchronization</li>
                            </ul>
                        </div>
                    </div>

                    {/* Mock Dashboard Preview */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                        <h2 className="text-2xl font-bold text-center mb-8">📋 Dashboard Preview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-blue-50 rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-blue-600">$12,450</div>
                                <div className="text-sm text-gray-600">Today's Sales</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-green-600">156</div>
                                <div className="text-sm text-gray-600">Items Sold</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-purple-600">1,234</div>
                                <div className="text-sm text-gray-600">Products</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-orange-600">23</div>
                                <div className="text-sm text-gray-600">Low Stock</div>
                            </div>
                        </div>
                        
                        {/* Mock Chart */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">📊 Sales Trend (Last 7 Days)</h3>
                            <div className="flex items-end space-x-2 h-32">
                                {[65, 45, 78, 52, 89, 67, 92].map((height, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-500 rounded-t flex-1 opacity-80 hover:opacity-100 transition-opacity"
                                        style={{ height: `${height}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* User Roles */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-8">🎯 Perfect for Every Role</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-4xl mb-4">👑</div>
                                <h3 className="text-xl font-semibold mb-3">Administrator</h3>
                                <p className="text-gray-600">
                                    Full system control with access to all features, reports, and user management.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-4xl mb-4">💼</div>
                                <h3 className="text-xl font-semibold mb-3">Cashier</h3>
                                <p className="text-gray-600">
                                    Focused on sales processing with access to POS interface and basic reports.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold mb-3">Inventory Manager</h3>
                                <p className="text-gray-600">
                                    Product and inventory management with stock control and supplier relations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business? 🚀</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of businesses that trust our POS system to manage their operations efficiently.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                    ✨ Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                    🔑 Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}