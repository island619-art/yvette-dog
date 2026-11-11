import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertArticle, ExpertCategory } from '../../types';
import { 
  BookOpen, 
  Clock, 
  ShieldAlert, 
  UserCheck, 
  X, 
  Share2, 
  ChevronRight, 
  Award,
  Sparkles
} from 'lucide-react';

const CATEGORIES: ('전체' | ExpertCategory)[] = [
  '전체',
  '강아지 건강관리',
  '예방접종',
  '사료 및 영양',
  '행동 및 훈련',
  '견종별 특징',
  '노령견 관리',
  '초보 견주 가이드',
];

export const ExpertView: React.FC = () => {
  const { 
    expertArticles, 
    selectedArticleId, 
    setSelectedArticleId, 
    selectedExpertCategory, 
    setSelectedExpertCategory 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>(selectedExpertCategory || '전체');

  const filteredArticles = expertArticles.filter(a => {
    if (activeCategory !== '전체' && a.category !== activeCategory) return false;
    return true;
  });

  const selectedArticle = expertArticles.find(a => a.id === selectedArticleId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="pb-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Veterinary & Behavioral Insights</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">반려견 전문가 칼럼</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            현직 수의사, 공인 행동교정 트레이너, 펫 영양학 박사가 전하는 믿을 수 있는 양육 지침서입니다.
          </p>
        </div>

        {/* Vet Verification Badge */}
        <div className="flex items-center gap-2 p-3 bg-[#F7F3EA] rounded-2xl border border-stone-200 text-xs text-[#26332B]">
          <Award className="w-4 h-4 text-[#6F9278]" />
          <span>전문 수의사 및 자격 인증 칼럼니스트 집필</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedExpertCategory(cat === '전체' ? null : cat);
            }}
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

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredArticles.map(art => (
          <article
            key={art.id}
            onClick={() => setSelectedArticleId(art.id)}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-[#6F9278]/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#26332B] shadow-xs">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime} 소요
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span className="font-semibold text-stone-700">{art.author}</span>
                  <span>·</span>
                  <span className="text-[11px]">{art.authorTitle}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>발행일: {art.createdAt}</span>
              <span className="text-[#6F9278] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                전체 읽기 <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl relative border border-stone-200 my-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticleId(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-[#6F9278] uppercase">{selectedArticle.category}</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#26332B] mt-1 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-stone-500 mt-3 pb-4 border-b border-stone-100">
                <span className="font-bold text-[#26332B]">{selectedArticle.author}</span>
                <span>({selectedArticle.authorTitle})</span>
                <span>·</span>
                <span>{selectedArticle.createdAt}</span>
                <span>·</span>
                <span>{selectedArticle.readTime} 완독</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-stone-100">
              <img
                src={selectedArticle.image}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Medical Disclaimer Banner */}
            {selectedArticle.medicalDisclaimer && (
              <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>의료 정보 면책 공지:</strong> 본 콘텐츠는 일반적인 반려견 생활 및 건강 관리를 돕기 위해 작성된 정보입니다. 개별 반려견의 연령, 기저질환, 알러지 반응에 따라 처치법이 달라질 수 있으며, 질병 진단이나 치료 처방은 반드시 동물병원 수의사의 정밀 검진을 거쳐야 합니다.
                </p>
              </div>
            )}

            {/* Content Paragraphs */}
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p className="font-semibold text-stone-800 bg-[#F7F3EA] p-4 rounded-2xl border border-stone-200/60">
                💡 {selectedArticle.summary}
              </p>
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('칼럼 주소가 복사되었습니다.');
                }}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>공유하기</span>
              </button>
              <button
                onClick={() => setSelectedArticleId(null)}
                className="px-5 py-2.5 bg-[#6F9278] text-white text-xs font-bold rounded-xl hover:bg-[#5a7c63]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
