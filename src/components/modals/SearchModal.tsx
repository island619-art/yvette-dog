import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, MapPin, MessageSquare, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    places, 
    posts, 
    expertArticles, 
    products, 
    setActiveTab, 
    setSelectedArticleId 
  } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedPlaces = places.filter(
      p => p.name.toLowerCase().includes(q) || p.region.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
    const matchedPosts = posts.filter(
      p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q))
    );
    const matchedArticles = expertArticles.filter(
      a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
    const matchedProducts = products.filter(
      pr => pr.name.toLowerCase().includes(q) || pr.tags.some(t => t.toLowerCase().includes(q))
    );

    return {
      places: matchedPlaces,
      posts: matchedPosts,
      articles: matchedArticles,
      products: matchedProducts,
      totalCount: matchedPlaces.length + matchedPosts.length + matchedArticles.length + matchedProducts.length,
    };
  }, [query, places, posts, expertArticles, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="장소, 산책로, 커뮤니티 글, 수의사 칼럼, 상품 검색..."
            className="w-full text-base bg-transparent focus:outline-none text-[#26332B] placeholder:text-stone-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold text-stone-500 hover:bg-stone-100 rounded-lg"
          >
            닫기 (ESC)
          </button>
        </div>

        {/* Quick keywords if query is empty */}
        {!query && (
          <div className="py-6 text-stone-500 text-xs">
            <p className="font-semibold text-stone-700 mb-2">인기 추천 검색어</p>
            <div className="flex flex-wrap gap-2">
              {['슬개골 탈구', '가평 애견카페', '서울숲 산책', '유기농 간식', '초인종 짖음 훈련', '예방접종 주기'].map(keyword => (
                <button
                  key={keyword}
                  onClick={() => setQuery(keyword)}
                  className="px-3 py-1.5 bg-[#F7F3EA] hover:bg-[#eae3d4] text-[#26332B] rounded-full text-xs font-medium transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {results && (
          <div className="overflow-y-auto mt-4 space-y-6 pr-1 divide-y divide-stone-100">
            {results.totalCount === 0 ? (
              <div className="py-12 text-center text-stone-400 text-xs">
                <p className="text-base font-semibold text-stone-600 mb-1">검색 결과가 없습니다</p>
                <p>다른 검색어를 입력하시거나 철자를 확인해 보세요.</p>
              </div>
            ) : null}

            {/* Places Results */}
            {results.places.length > 0 && (
              <div className="pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#6F9278] uppercase mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>산책·여행 장소 ({results.places.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.places.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveTab('places');
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-[#F7F3EA]/70 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors">{p.name}</p>
                        <p className="text-[11px] text-stone-400">{p.region} · {p.category}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#6F9278] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Expert Articles */}
            {results.articles.length > 0 && (
              <div className="pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#6F9278] uppercase mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>전문가 정보 ({results.articles.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.articles.map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setSelectedArticleId(a.id);
                        setActiveTab('expert');
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-[#F7F3EA]/70 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors">{a.title}</p>
                        <p className="text-[11px] text-stone-400">{a.category} · {a.author} ({a.authorTitle})</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#6F9278] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Community Posts */}
            {results.posts.length > 0 && (
              <div className="pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#6F9278] uppercase mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>커뮤니티 이야기 ({results.posts.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.posts.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveTab('community');
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-[#F7F3EA]/70 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors">{p.title}</p>
                        <p className="text-[11px] text-stone-400">{p.category} · 작성자: {p.authorName}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#6F9278] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            {results.products.length > 0 && (
              <div className="pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#6F9278] uppercase mb-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>추천 쇼핑 상품 ({results.products.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.products.map(pr => (
                    <button
                      key={pr.id}
                      onClick={() => {
                        setActiveTab('shop');
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-[#F7F3EA]/70 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors">{pr.name}</p>
                        <p className="text-[11px] text-stone-400">{pr.brand} · {pr.price.toLocaleString()}원</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#6F9278] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
