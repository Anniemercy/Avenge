import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import productsData from '../data/products.json';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Get filter values from URL or use defaults
    const selectedCategory = searchParams.get('category') || 'all';
    const priceRange = searchParams.get('price') || 'all';
    const sortBy = searchParams.get('sort') || 'featured';

    // Get unique categories
    const categories = [...new Set(productsData.products.map(p => p.category))];

    // Update filter handlers
    const handleCategoryChange = (category) => {
        const newParams = new URLSearchParams(searchParams);
        if (category === 'all') {
            newParams.delete('category');
        } else {
            newParams.set('category', category);
        }
        setSearchParams(newParams);
    };

    const handlePriceRangeChange = (range) => {
        const newParams = new URLSearchParams(searchParams);
        if (range === 'all') {
            newParams.delete('price');
        } else {
            newParams.set('price', range);
        }
        setSearchParams(newParams);
    };

    const handleSortChange = (sort) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', sort);
        setSearchParams(newParams);
    };

    const handleClearFilters = () => {
        setSearchParams({});
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...productsData.products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by price range
        if (priceRange !== 'all') {
            switch (priceRange) {
                case '0-250':
                    result = result.filter(p => p.price < 250);
                    break;
                case '250-300':
                    result = result.filter(p => p.price >= 250 && p.price <= 300);
                    break;
                case '300-350':
                    result = result.filter(p => p.price > 300 && p.price <= 350);
                    break;
                case '350+':
                    result = result.filter(p => p.price > 350);
                    break;
            }
        }

        // Sort products
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'featured':
            default:
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        return result;
    }, [selectedCategory, priceRange, sortBy]);

    return (
        <main className="min-h-screen pt-24 bg-black">
            {/* Header */}
            <section className="py-12 bg-gradient-to-b from-charcoal to-black">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                            Our Collection
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-4">
                            Luxury Fragrances
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our complete range of premium fragrances, each crafted to make
                            a statement of power and elegance.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products Section */}
            <section className="section pt-8">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-charcoal border border-gold/30 rounded-lg text-off-white hover:border-gold transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters & Sorting
                            </button>
                        </div>

                        {/* Filter Sidebar */}
                        <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
                            <FilterSidebar
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                                priceRange={priceRange}
                                onPriceRangeChange={handlePriceRangeChange}
                                sortBy={sortBy}
                                onSortChange={handleSortChange}
                                productCount={filteredProducts.length}
                                onClearFilters={handleClearFilters}
                            />
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-charcoal flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-display text-2xl text-off-white mb-2">
                                        No fragrances found
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        Try adjusting your filters to find what you're looking for.
                                    </p>
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-gold hover:text-gold-light transition-colors"
                                    >
                                        Clear all filters
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Products;
