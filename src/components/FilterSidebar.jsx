import { motion } from 'framer-motion';

const FilterSidebar = ({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    sortBy,
    onSortChange,
    productCount,
    onClearFilters
}) => {
    const priceRanges = [
        { label: 'All Prices', value: 'all' },
        { label: 'Under $250', value: '0-250' },
        { label: '$250 - $300', value: '250-300' },
        { label: '$300 - $350', value: '300-350' },
        { label: 'Over $350', value: '350+' }
    ];

    const sortOptions = [
        { label: 'Featured', value: 'featured' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
        { label: 'Rating', value: 'rating' },
        { label: 'Name: A-Z', value: 'name-asc' }
    ];

    const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all';

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-72 shrink-0"
        >
            <div className="bg-charcoal rounded-xl border border-gold/10 p-6 sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-semibold text-off-white">
                        Filters
                    </h3>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="text-sm text-gold hover:text-gold-light transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* Product Count */}
                <p className="text-gray-400 text-sm mb-6">
                    {productCount} {productCount === 1 ? 'fragrance' : 'fragrances'} found
                </p>

                {/* Category Filter */}
                <div className="mb-8">
                    <h4 className="text-off-white font-medium mb-4 uppercase tracking-wider text-sm">
                        Category
                    </h4>
                    <div className="space-y-2">
                        <button
                            onClick={() => onCategoryChange('all')}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ${selectedCategory === 'all'
                                    ? 'bg-gold text-black font-medium'
                                    : 'text-gray-300 hover:bg-gold/10 hover:text-gold'
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => onCategoryChange(category)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gold text-black font-medium'
                                        : 'text-gray-300 hover:bg-gold/10 hover:text-gold'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                    <h4 className="text-off-white font-medium mb-4 uppercase tracking-wider text-sm">
                        Price Range
                    </h4>
                    <div className="space-y-2">
                        {priceRanges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => onPriceRangeChange(range.value)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ${priceRange === range.value
                                        ? 'bg-gold text-black font-medium'
                                        : 'text-gray-300 hover:bg-gold/10 hover:text-gold'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort Options */}
                <div>
                    <h4 className="text-off-white font-medium mb-4 uppercase tracking-wider text-sm">
                        Sort By
                    </h4>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '20px'
                        }}
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </motion.aside>
    );
};

export default FilterSidebar;
