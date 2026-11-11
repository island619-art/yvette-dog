import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Heart, HelpCircle, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, resetAllData } = useApp();

  const handleResetData = () => {
    if (window.confirm('샘플 및 입력 데이터를 초기 기본 상태로 복원하시겠습니까?')) {
      resetAllData();
      alert('초기 데이터로 재설정되었습니다.');
    }
  };

  return (
    <footer className="bg-[#26332B] text-stone-300 pt-16 pb-24 lg:pb-16 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#6F9278] flex items-center justify-center text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 10.5c1.4 0 2.5-1.1 2.5-2.5S13.4 5.5 12 5.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5zm-5 1c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm10 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-1.8 3.5c-.8-.8-1.9-1.2-3.2-1.2s-2.4.4-3.2 1.2c-1.1 1.1-1.4 2.8-.7 4.2.8 1.6 2.4 2.8 3.9 2.8 1.5 0 3.1-1.2 3.9-2.8.7-1.4.4-3.1-.7-4.2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                댕댕 라이프
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              우리 강아지의 모든 일상을 한곳에서.<br />
              건강 기록, 산책과 동반 여행, 지혜로운 견주 커뮤니티까지 반려견과의 행복한 삶을 함께 설계합니다.
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <p>주식회사 댕댕라이프 · 대표: 김댕댕 · 사업자등록번호: 214-88-01923</p>
              <p>통신판매업신고: 제2026-서울강남-0418호 · 서울시 강남구 테헤란로 152</p>
              <p>제휴 및 비즈니스 문의: <span className="text-[#F4B183]">partner@dangdang.life</span></p>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">서비스 메뉴</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('dog')} className="hover:text-white transition-colors">
                  우리 아이 관리
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('health')} className="hover:text-white transition-colors">
                  예방접종 & 건강기록
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('places')} className="hover:text-white transition-colors">
                  반려견 동반 장소 찾기
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('community')} className="hover:text-white transition-colors">
                  견주 커뮤니티
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-white transition-colors">
                  AI 반려견 도우미
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Expert & Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">정보 & 고객지원</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('expert')} className="hover:text-white transition-colors">
                  수의사 & 훈련사 칼럼
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-white transition-colors">
                  반려견 추천 쇼핑
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-white transition-colors">
                  이벤트 및 출석체크
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('support')} className="hover:text-white transition-colors">
                  자주 묻는 질문 (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-[#6F9278] transition-colors">
                  관리자 콘솔
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Customer Center & Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">고객센터</h4>
            <p className="text-xl font-bold text-[#F4B183] font-['Plus_Jakarta_Sans',sans-serif]">1588-4282</p>
            <p className="text-xs text-stone-400">
              운영시간: 평일 09:30 - 18:00<br />
              (점심시간 12:30 - 13:30, 주말/공휴일 휴무)
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetData}
                className="inline-flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-white bg-stone-800/80 hover:bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors"
                title="로컬 저장소 초기 데이터로 리셋"
              >
                <RefreshCw className="w-3 h-3" />
                샘플 데이터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* Medical & Legal Disclaimer Banner */}
        <div className="mt-8 p-4 bg-stone-900/60 rounded-2xl border border-stone-800 flex items-start gap-3 text-xs text-stone-400">
          <Shield className="w-4 h-4 text-[#F4B183] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-stone-300">수의학적 판단 및 의료 정보 면책 안내</p>
            <p className="leading-relaxed">
              댕댕 라이프에서 제공하는 건강 가이드, 예방접종 안내 및 AI 도우미 답변은 반려견 생활 관리를 위한 일반적인 참고 정보입니다. 질병의 확진, 수의학적 처치 및 응급 상황 시에는 반드시 면허를 갖춘 수의사의 대면 진료 및 처방을 받으시기 바랍니다. 현재 입력된 건강 기록은 브라우저의 로컬 환경에 안전하게 보관됩니다.
            </p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">서비스 이용약관</span>
            <span>·</span>
            <span className="hover:text-stone-400 cursor-pointer font-semibold text-stone-400">개인정보처리방침</span>
            <span>·</span>
            <span className="hover:text-stone-400 cursor-pointer">위치기반서비스 이용약관</span>
          </div>
          <p>© 2026 DANGDANG LIFE Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
