import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  AlertCircle, 
  X, 
  Check, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES: ('전체' | ProductCategory)[] = [
  '전체',
  '사료',
  '간식',
  '장난감',
  '산책용품',
  '위생용품',
  '건강관리용품',
];

export const ShopView: React.FC = () => {
  const { products, toggleSaveProduct, cartCount, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    if (activeCategory !== '전체' && p.category !== activeCategory) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product.id);
    setToastMessage(`'${product.name}' 장바구니에 담겼습니다.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#26332B] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="pb-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Curated Pet Goods</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">반려견 맞춤 쇼핑</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            수의사 및 영양학 전문가가 검증한 프리미엄 자연식, 유기농 간식 및 안전 산책용품 큐레이션입니다.
          </p>
        </div>

        {/* Payment Integration Status Notice Banner */}
        <div className="p-3 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 max-w-md">
          <div className="flex items-center gap-1.5 font-bold text-[#26332B] mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>쇼핑몰 결제 서비스 연동 상태 안내</span>
          </div>
          <p className="text-[11px] leading-relaxed text-stone-500">
            현재 PG 결제 API 연결 전 시범 운영 단계입니다. 상품 상세 정보 확인 및 관심상품 저장 기능만 활성화되어 있습니다.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-[#6F9278] text-white border-[#6F9278] shadow-xs'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-[#6F9278]/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-square bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#26332B] shadow-xs">
                  {product.category}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleSaveProduct(product.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-600 hover:text-rose-500 transition-colors shadow-xs"
                  aria-label="관심상품"
                >
                  <Heart
                    className={`w-4 h-4 ${product.isSaved ? 'fill-rose-500 text-rose-500' : ''}`}
                  />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-[#6F9278] font-bold">{product.brand}</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-base font-extrabold text-[#26332B] font-mono">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-stone-400 line-through font-mono">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold pt-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount})</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="w-full py-2 bg-stone-100 hover:bg-[#6F9278] hover:text-white text-[#26332B] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>장바구니 담기</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-stone-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#6F9278]">{selectedProduct.brand}</span>
                <h3 className="text-lg font-bold text-[#26332B] mt-0.5">{selectedProduct.name}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-[#26332B] font-mono">
                    {selectedProduct.price.toLocaleString()}원
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono">
                      {selectedProduct.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl text-xs text-stone-600 leading-relaxed border border-stone-200/60">
                {selectedProduct.description}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#F7F3EA] text-stone-700 text-[11px] rounded-lg font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Realistic Sample Notice */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  본 상품은 댕댕 라이프 큐레이션 샘플 데이터입니다. 실제 결제 및 배송 주문 기능은 추후 정식 상용 쇼핑몰 연동 시 활성화됩니다.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
                <button
                  onClick={() => toggleSaveProduct(selectedProduct.id)}
                  className={`p-3 rounded-xl border flex items-center justify-center transition-colors ${
                    selectedProduct.isSaved
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-stone-50 border-stone-200 text-stone-600'
                  }`}
                  aria-label="관심상품"
                >
                  <Heart className={`w-5 h-5 ${selectedProduct.isSaved ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#6F9278] hover:bg-[#5a7c63] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  장바구니 담기 (체험)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
