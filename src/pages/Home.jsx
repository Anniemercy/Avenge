import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const Home = () => {
    const featuredProducts = productsData.products.filter(p => p.featured).slice(0, 4);
    const bestsellers = productsData.products.filter(p => p.bestseller).slice(0, 3);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-deep-brown" />

                {/* Animated Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Gradient Orbs */}
                <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-crimson/10 rounded-full blur-[120px]" />

                {/* Content */}
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-gold/80 uppercase tracking-[0.3em] text-sm mb-6"
                        >
                            Luxury Fragrances
                        </motion.p>

                        {/* Brand Name */}
                        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-6">
                            <span className="text-gradient">AVENGE</span>
                        </h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-2xl md:text-3xl lg:text-4xl text-off-white font-display italic mb-4"
                        >
                            Unleash the Scent of Power
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg mb-10"
                        >
                            Discover fragrances that command attention. Each bottle holds a story of
                            bold elegance, mysterious allure, and uncompromising luxury.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button to="/products" variant="primary" size="lg">
                                Shop Now
                            </Button>
                            <Button to="/products" variant="outline" size="lg">
                                Explore Collection
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex flex-col items-center gap-2 text-gray-400"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* Featured Products Section */}
            <section className="section bg-black">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                            Signature Collection
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-4">
                            Featured Fragrances
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our most coveted scents, crafted for those who demand excellence.
                        </p>
                    </motion.div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button to="/products" variant="secondary" size="lg">
                            View All Fragrances
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className="section bg-gradient-to-b from-charcoal to-black overflow-hidden">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] bg-gradient-to-br from-gold/20 to-crimson/20 rounded-2xl overflow-hidden">
                                <div className="w-full h-full bg-charcoal flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                                            <span className="font-display text-4xl font-bold text-black">A</span>
                                        </div>
                                        <p className="text-gold uppercase tracking-[0.3em] text-sm">Est. 2020</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 border border-gold/30 rounded-full" />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold/20 rounded-full" />
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                                Our Story
                            </p>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-6">
                                Born from Boldness
                            </h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Avenge was founded on a revolutionary belief: fragrance should be an
                                    extension of your power. We don't create perfumes—we craft weapons
                                    of confidence.
                                </p>
                                <p>
                                    Each scent in our collection is meticulously designed by master
                                    perfumers who understand that true luxury lies in the details.
                                    We source the rarest ingredients from around the world, combining
                                    ancient techniques with modern innovation.
                                </p>
                                <p>
                                    When you wear Avenge, you don't just smell extraordinary—you
                                    become unforgettable.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Button to="/about" variant="outline">
                                    Discover More
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bestsellers Section */}
            <section className="section bg-black">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                            Most Loved
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-4">
                            Bestsellers
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The fragrances that have captured hearts and commanded presence worldwide.
                        </p>
                    </motion.div>

                    {/* Bestsellers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {bestsellers.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-r from-charcoal via-deep-brown to-charcoal">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center py-12"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mb-6">
                            Ready to Command Attention?
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                            Join the ranks of those who refuse to be ordinary.
                            Discover your signature Avenge scent today.
                        </p>
                        <Button to="/products" variant="primary" size="xl">
                            Shop the Collection
                        </Button>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Home;
