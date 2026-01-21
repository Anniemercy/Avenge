import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex gap-4 md:gap-6 p-4 bg-charcoal rounded-xl border border-gold/10 hover:border-gold/20 transition-colors"
        >
            {/* Product Image */}
            <Link to={`/products/${item.id}`} className="shrink-0">
                <div className="w-20 h-24 md:w-28 md:h-36 rounded-lg overflow-hidden bg-dark-surface">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </Link>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <Link
                        to={`/products/${item.id}`}
                        className="font-display text-lg md:text-xl font-semibold text-off-white hover:text-gold transition-colors"
                    >
                        {item.name}
                    </Link>
                    <p className="text-gold/70 text-xs uppercase tracking-widest mt-1">
                        {item.category}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm">Qty:</span>
                        <div className="flex items-center border border-gold/30 rounded-lg">
                            <button
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center text-off-white hover:text-gold hover:bg-gold/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>

                            <span className="w-10 text-center text-off-white font-medium">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                disabled={item.quantity >= 10}
                                className="w-8 h-8 flex items-center justify-center text-off-white hover:text-gold hover:bg-gold/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Increase quantity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex items-center justify-between md:gap-8">
                        <span className="text-gold text-xl font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-crimson transition-colors"
                            aria-label="Remove item"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CartItem;
