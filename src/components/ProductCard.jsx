import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from './Button';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <Link
                to={`/products/${product.id}`}
                className="block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative overflow-hidden rounded-xl bg-charcoal border border-gold/10 hover:border-gold/30 transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                        {/* Placeholder while loading */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-charcoal animate-pulse flex items-center justify-center">
                                <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                            </div>
                        )}

                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'
                                } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Quick Add Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                            className="absolute bottom-4 left-4 right-4"
                        >
                            <Button
                                variant="primary"
                                size="sm"
                                fullWidth
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </motion.div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.bestseller && (
                                <span className="px-3 py-1 bg-gold text-black text-xs font-bold uppercase tracking-wider rounded-full">
                                    Bestseller
                                </span>
                            )}
                            {product.featured && !product.bestseller && (
                                <span className="px-3 py-1 bg-crimson text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Category */}
                        <p className="text-gold/70 text-xs uppercase tracking-widest mb-2">
                            {product.category}
                        </p>

                        {/* Name */}
                        <h3 className="font-display text-xl font-semibold text-off-white mb-2 group-hover:text-gold transition-colors">
                            {product.name}
                        </h3>

                        {/* Short Description */}
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {product.shortDescription}
                        </p>

                        {/* Price & Rating */}
                        <div className="flex items-center justify-between">
                            <span className="text-gold text-xl font-semibold">
                                ${product.price}
                            </span>

                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-gray-300 text-sm">{product.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
