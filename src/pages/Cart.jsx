import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cart, clearCart } = useCart();

    const subtotal = cart.totalPrice;
    const shipping = cart.totalItems > 0 ? 15 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

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
                        Your Cart
                    </h1>
                    <p className="text-gray-400">
                        {cart.totalItems > 0
                            ? `${cart.totalItems} ${cart.totalItems === 1 ? 'item' : 'items'} in your cart`
                            : 'Your cart is empty'}
                    </p>
                </motion.div>

                {cart.totalItems > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {cart.items.map((item) => (
                                        <CartItem key={item.id} item={item} />
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Clear Cart Button */}
                            <div className="mt-6 pt-6 border-t border-gold/10">
                                <button
                                    onClick={clearCart}
                                    className="text-gray-400 hover:text-crimson transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Clear entire cart
                                </button>
                            </div>
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

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gold/10 pt-4">
                                        <div className="flex justify-between text-off-white font-semibold text-lg">
                                            <span>Total</span>
                                            <span className="text-gold">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button to="/checkout" variant="primary" size="lg" fullWidth>
                                    Proceed to Checkout
                                </Button>

                                <p className="text-gray-500 text-xs text-center mt-4">
                                    Secure checkout powered by Avenge
                                </p>

                                {/* Continue Shopping */}
                                <div className="mt-6 pt-6 border-t border-gold/10 text-center">
                                    <Link
                                        to="/products"
                                        className="text-gold hover:text-gold-light transition-colors text-sm"
                                    >
                                        ← Continue Shopping
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-charcoal flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="font-display text-3xl text-off-white mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any fragrances yet.
                            Explore our collection and discover your signature scent.
                        </p>
                        <Button to="/products" variant="primary" size="lg">
                            Explore Collection
                        </Button>
                    </motion.div>
                )}
            </div>
        </main>
    );
};

export default Cart;
