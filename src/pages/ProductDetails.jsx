import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const product = productsData.products.find(p => p.id === parseInt(id));
    const relatedProducts = productsData.products
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 3);

    if (!product) {
        return (
            <main className="min-h-screen pt-24 bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-4xl text-off-white mb-4">Product Not Found</h1>
                    <p className="text-gray-400 mb-6">The fragrance you're looking for doesn't exist.</p>
                    <Button to="/products" variant="primary">
                        Browse Collection
                    </Button>
                </div>
            </main>
        );
    }

    const handleQuantityChange = (delta) => {
        const newQty = quantity + delta;
        if (newQty >= 1 && newQty <= 10) {
            setQuantity(newQty);
        }
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <main className="min-h-screen pt-24 bg-black">
            {/* Breadcrumb */}
            <div className="container py-6">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-gold transition-colors">Collection</Link>
                    <span>/</span>
                    <span className="text-gold">{product.name}</span>
                </nav>
            </div>

            {/* Product Section */}
            <section className="section pt-0">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="aspect-square bg-charcoal rounded-2xl overflow-hidden border border-gold/10">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Badges */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                {product.bestseller && (
                                    <span className="px-4 py-2 bg-gold text-black text-sm font-bold uppercase tracking-wider rounded-full">
                                        Bestseller
                                    </span>
                                )}
                                {product.featured && (
                                    <span className="px-4 py-2 bg-crimson text-white text-sm font-bold uppercase tracking-wider rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            {/* Category */}
                            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-2">
                                {product.category}
                            </p>

                            {/* Name */}
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-600'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-400">{product.rating} / 5.0</span>
                            </div>

                            {/* Price */}
                            <p className="text-gold text-4xl font-bold mb-6">
                                ${product.price}
                            </p>

                            {/* Description */}
                            <p className="text-gray-400 leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Fragrance Notes */}
                            <div className="bg-charcoal rounded-xl p-6 border border-gold/10 mb-8">
                                <h3 className="font-display text-lg font-semibold text-off-white mb-4">
                                    Fragrance Notes
                                </h3>

                                <div className="space-y-4">
                                    {/* Top Notes */}
                                    <div>
                                        <p className="text-gold text-sm uppercase tracking-wider mb-2">Top Notes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.notes.top.map((note) => (
                                                <span key={note} className="px-3 py-1 bg-gold/10 text-off-white text-sm rounded-full">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Heart Notes */}
                                    <div>
                                        <p className="text-crimson text-sm uppercase tracking-wider mb-2">Heart Notes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.notes.heart.map((note) => (
                                                <span key={note} className="px-3 py-1 bg-crimson/10 text-off-white text-sm rounded-full">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Base Notes */}
                                    <div>
                                        <p className="text-silver text-sm uppercase tracking-wider mb-2">Base Notes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.notes.base.map((note) => (
                                                <span key={note} className="px-3 py-1 bg-white/5 text-off-white text-sm rounded-full">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-gold/30 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-12 h-12 flex items-center justify-center text-off-white hover:text-gold hover:bg-gold/10 transition-colors disabled:opacity-30"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="w-16 text-center text-off-white font-medium text-lg">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= 10}
                                        className="w-12 h-12 flex items-center justify-center text-off-white hover:text-gold hover:bg-gold/10 transition-colors disabled:opacity-30"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="flex-1"
                                >
                                    {isAdded ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Added to Cart
                                        </span>
                                    ) : (
                                        'Add to Cart'
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="section bg-charcoal">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                                You May Also Like
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-off-white">
                                Related Fragrances
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductDetails;
