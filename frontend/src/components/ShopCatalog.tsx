import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../data/products';
import { Plus, Search, ArrowUpDown, Eye, Info } from 'lucide-react';

interface ShopCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'combos' && !item.isComboKit) return false;
        if (selectedCategory !== 'combos' && item.category !== selectedCategory) return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSku) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop-section" className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EAE6DD]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B7C6E] font-medium mb-2">
              <span>Catalog & Inventory</span>
              <span aria-hidden="true">·</span>
              <span>Individual Items & Sets</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#181B1A] font-normal tracking-tight">
              Shop All Products
            </h2>
            <p className="mt-2 text-sm text-[#5A635E] font-light max-w-xl">
              All items are available individually as well as in bundled combo sets. Provisional prices can be edited in the Admin Catalog.
            </p>
          </div>

          {/* Search Bar & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#5A635E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pimple patches, nasal strips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs bg-[#FAF9F5] border border-[#EAE6DD] rounded-md text-[#181B1A] placeholder-[#5A635E]/60 focus:outline-none focus:border-[#4B5B4E] transition-colors"
              />
            </div>

            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5A635E] absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-8 pr-8 py-2 text-xs bg-[#FAF9F5] border border-[#EAE6DD] rounded-md text-[#181B1A] focus:outline-none focus:border-[#4B5B4E] transition-colors appearance-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Segmented Navigation) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'skincare-patches', label: 'Facial Patches & Masks' },
            { id: 'breathing', label: 'Nasal & Breathing' },
            { id: 'footcare', label: 'Foot Pads' },
            { id: 'body-patches', label: 'Comfort Patches' },
            { id: 'combos', label: 'Combo Kits' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id as ProductCategory)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-[#181B1A] text-[#FAF9F5] shadow-sm'
                  : 'bg-[#F3EFE7] text-[#5A635E] hover:text-[#181B1A] hover:bg-[#EAE6DD]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F3EFE7]/40 rounded-lg border border-[#EAE6DD] p-8">
            <p className="text-sm text-[#5A635E]">No products found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#181B1A] text-[#FAF9F5] text-xs uppercase tracking-wider rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-[#FAF9F5] rounded-lg border border-[#EAE6DD] flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group"
                >
                  {/* Product Card Image Container */}
                  <div
                    className="relative aspect-[4/3] bg-[#EAE6DD]/30 cursor-pointer overflow-hidden"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Unboxed Badge / Estimated Price Tag */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {product.badge && (
                        <span className="bg-[#FAF9F5]/95 backdrop-blur-xs text-[10px] tracking-wider uppercase font-semibold text-[#181B1A] px-2 py-0.5 rounded border border-[#EAE6DD]">
                          {product.badge}
                        </span>
                      )}
                      {product.isProvisionalPrice && (
                        <span className="bg-[#EBF1EC] text-[10px] tracking-wider uppercase font-semibold text-[#4B5B4E] px-2 py-0.5 rounded border border-[#8A9D8E]/30 flex items-center gap-1">
                          <Info className="w-2.5 h-2.5" />
                          Provisional Price
                        </span>
                      )}
                    </div>

                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-[#FAF9F5] text-[#181B1A] text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3 h-3" />
                        Details
                      </span>
                    </div>
                  </div>

                  {/* Product Metadata & Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Unboxed Meta */}
                      <div className="flex items-center gap-2 text-[11px] text-[#6B7C6E]">
                        <span className="uppercase tracking-wider font-medium">{product.packSize}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[10px]">{product.sku}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-lg text-[#181B1A] hover:text-[#4B5B4E] cursor-pointer transition-colors leading-snug line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#5A635E] line-clamp-2 font-light leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price baseline & Add action */}
                    <div className="pt-3 border-t border-[#EAE6DD]/70 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-semibold text-[#181B1A] tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {product.isProvisionalPrice && (
                          <span className="text-[10px] text-[#6B7C6E] block -mt-0.5">Provisional</span>
                        )}
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#181B1A] hover:bg-[#303734] text-[#FAF9F5] text-[11px] uppercase tracking-wider font-semibold rounded transition-all active:scale-95 shrink-0"
                        aria-label={`Add ${product.name} to bag`}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
