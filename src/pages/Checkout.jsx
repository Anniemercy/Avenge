import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: ''
    });

    const subtotal = cart.totalPrice;
    const shipping = cart.totalItems > 0 ? 15 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setOrderPlaced(true);
        clearCart();
        setIsSubmitting(false);
    };

    if (cart.totalItems === 0 && !orderPlaced) {
        return (
            <main className="min-h-screen pt-24 bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-4xl text-off-white mb-4">Your cart is empty</h1>
                    <p className="text-gray-400 mb-6">Add some fragrances before checking out.</p>
                    <Button to="/products" variant="primary">
                        Browse Collection
                    </Button>
                </div>
            </main>
        );
    }

    if (orderPlaced) {
        return (
            <main className="min-h-screen pt-24 bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto p-8"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="font-display text-4xl text-off-white mb-4">Order Placed!</h1>
                    <p className="text-gray-400 mb-8">
                        Thank you for your order. You will receive a confirmation email shortly.
                    </p>
                    <Button to="/" variant="primary">
                        Return to Home
                    </Button>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 bg-black">
            <div className="container py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-4">
                        Checkout
                    </h1>
                    <p className="text-gray-400">Complete your order</p>
                </motion.div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form Fields */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Shipping Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-charcoal rounded-xl border border-gold/10 p-6"
                            >
                                <h2 className="font-display text-xl font-semibold text-off-white mb-6">
                                    Shipping Information
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm text-gray-400 mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="123 Main Street"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="NY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="10001"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white focus:border-gold focus:outline-none transition-colors"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                            <option>Australia</option>
                                            <option>Germany</option>
                                            <option>France</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-charcoal rounded-xl border border-gold/10 p-6"
                            >
                                <h2 className="font-display text-xl font-semibold text-off-white mb-6">
                                    Payment Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                            placeholder="4242 4242 4242 4242"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">CVC</label>
                                            <input
                                                type="text"
                                                name="cardCVC"
                                                value={formData.cardCVC}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-xs mt-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Your payment information is secure and encrypted
                                </p>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-charcoal rounded-xl border border-gold/10 p-6 sticky top-24"
                            >
                                <h2 className="font-display text-xl font-semibold text-off-white mb-6">
                                    Order Summary
                                </h2>

                                {/* Items */}
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-20 rounded-lg overflow-hidden bg-dark-surface shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-off-white font-medium text-sm">{item.name}</h4>
                                                <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                                <p className="text-gold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gold/10 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gold/10 pt-3">
                                        <div className="flex justify-between text-off-white font-semibold text-lg">
                                            <span>Total</span>
                                            <span className="text-gold">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    disabled={isSubmitting}
                                    className="mt-6"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        `Place Order - $${total.toFixed(2)}`
                                    )}
                                </Button>

                                <Link
                                    to="/cart"
                                    className="block text-center text-gold hover:text-gold-light transition-colors text-sm mt-4"
                                >
                                    ← Back to Cart
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Checkout;
