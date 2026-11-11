import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { 
  Search, 
  Bell, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  LogOut,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onOpenAuth,
}) => {
  const { 
    activeTab, 
    setActiveTab, 
    isLoggedIn, 
    user, 
    logout, 
    currentDog, 
    dogs, 
    setSelectedDogId 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dogDropdownOpen, setDogDropdownOpen] = useState(false);

  const navItems: { tab: ActiveTab; label: string }[] = [
    { tab: 'home', label: '홈' },
    { tab: 'dog', label: '우리 아이 관리' },
    { tab: 'health', label: '건강 기록' },
    { tab: 'places', label: '산책·여행' },
    { tab: 'community', label: '커뮤니티' },
    { tab: 'expert', label: '전문가 정보' },
    { tab: 'shop', label: '쇼핑' },
    { tab: 'events', label: '이벤트' },
    { tab: 'support', label: '고객센터' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#26332B]/10 transition-all">
      {/* Top Banner: Emergency & Disclaimer Banner (Quiet, dismissible or slim) */}
      <div className="bg-[#6F9278] text-white text-[12px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block bg-white/20 rounded px-1.5 py-0.2 text-[10px] tracking-wide">NOTICE</span>
        <span>가을 환절기 예방접종 및 진드기 케어 주간! 우리 아이 건강 기록을 점검해보세요.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#6F9278] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                {/* Cute Paw SVG */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 10.5c1.4 0 2.5-1.1 2.5-2.5S13.4 5.5 12 5.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5zm-5 1c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm10 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-1.8 3.5c-.8-.8-1.9-1.2-3.2-1.2s-2.4.4-3.2 1.2c-1.1 1.1-1.4 2.8-.7 4.2.8 1.6 2.4 2.8 3.9 2.8 1.5 0 3.1-1.2 3.9-2.8.7-1.4.4-3.1-.7-4.2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#26332B] font-['Plus_Jakarta_Sans',sans-serif]">
                  댕댕 라이프
                </span>
                <span className="text-[10px] text-[#6F9278] tracking-widest uppercase font-semibold hidden sm:inline">
                  DANGDANG LIFE
                </span>
              </div>
            </button>

            {/* Quick Active Dog Chip */}
            {dogs.length > 0 && currentDog && (
              <div className="relative hidden xl:block ml-2">
                <button
                  onClick={() => setDogDropdownOpen(!dogDropdownOpen)}
                  className="flex items-center gap-2 bg-[#F7F3EA] hover:bg-[#EFE9DC] text-[#26332B] text-xs font-medium py-1.5 px-3 rounded-full border border-[#26332B]/10 transition-colors"
                >
                  <img
                    src={currentDog.photoUrl}
                    alt={currentDog.name}
                    className="w-5 h-5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>{currentDog.name} ({currentDog.breed})</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>
                {dogDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50">
                    <div className="px-3 py-1 text-[11px] text-stone-400 font-medium">반려견 전환</div>
                    {dogs.map(dog => (
                      <button
                        key={dog.id}
                        onClick={() => {
                          setSelectedDogId(dog.id);
                          setDogDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-[#F7F3EA] ${
                          dog.id === currentDog.id ? 'bg-[#F7F3EA] font-semibold text-[#6F9278]' : 'text-[#26332B]'
                        }`}
                      >
                        <img src={dog.photoUrl} alt={dog.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="truncate">{dog.name}</span>
                        <span className="text-[10px] text-stone-400 ml-auto">{dog.gender}</span>
                      </button>
                    ))}
                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setActiveTab('dog');
                          setDogDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#6F9278] hover:bg-stone-50 font-medium"
                      >
                        + 새 반려견 등록
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors relative ${
                    isActive
                      ? 'text-[#6F9278] font-semibold bg-[#6F9278]/10'
                      : 'text-[#26332B]/80 hover:text-[#26332B] hover:bg-stone-100/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#6F9278] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 text-stone-600 hover:text-[#26332B] hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-2"
              title="통합 검색"
              aria-label="통합 검색"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs text-stone-500">검색 (장소, 글, 가이드)</span>
            </button>

            {/* AI Assistant Quick Button */}
            <button
              onClick={() => handleNavClick('ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
                activeTab === 'ai'
                  ? 'bg-[#F4B183] text-[#26332B] ring-2 ring-[#F4B183]/50'
                  : 'bg-[#F7F3EA] text-[#26332B] hover:bg-[#F4B183]/30 border border-[#F4B183]/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4B183]" />
              <span className="hidden sm:inline">AI 도우미</span>
            </button>

            {/* Notifications Trigger */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-stone-600 hover:text-[#26332B] hover:bg-stone-100 rounded-xl transition-colors"
              title="알림"
              aria-label="알림"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F4B183] rounded-full" />
            </button>

            {/* Auth / My Profile */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-[#26332B] transition-colors"
                >
                  <img
                    src={user.avatarUrl || '/src/assets/images/dog_profile_sample_1794379968759.jpg'}
                    alt="프로필"
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-medium hidden md:inline truncate max-w-[80px]">
                    {user.nickname}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden md:inline" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-[#26332B]">{user.nickname} 님</p>
                      <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6F9278]">
                        <span>포인트 {user.points}P</span>
                        <span>·</span>
                        <span>출석 {user.attendanceDays}일째</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('mypage');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#26332B] hover:bg-stone-50 text-left"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                      마이페이지
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#26332B] hover:bg-stone-50 text-left"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6F9278]" />
                      관리자 콘솔
                    </button>
                    <div className="border-t border-stone-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 bg-[#6F9278] hover:bg-[#5b7a63] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors whitespace-nowrap"
              >
                로그인 / 가입
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[100px] z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="bg-white w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="font-bold text-lg text-[#26332B]">전체 서비스 메뉴</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dog Switcher for mobile */}
              {dogs.length > 0 && currentDog && (
                <div className="p-3 bg-[#F7F3EA] rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={currentDog.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-[#26332B]">{currentDog.name}</p>
                      <p className="text-[11px] text-stone-500">{currentDog.breed} · {currentDog.weight}kg</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleNavClick('dog');
                    }}
                    className="text-xs font-semibold text-[#6F9278] bg-white px-2.5 py-1 rounded-lg border border-stone-200"
                  >
                    관리
                  </button>
                </div>
              )}

              {/* Navigation List */}
              <div className="grid grid-cols-1 gap-1">
                {navItems.map(item => (
                  <button
                    key={item.tab}
                    onClick={() => handleNavClick(item.tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      activeTab === item.tab
                        ? 'bg-[#6F9278] text-white font-semibold'
                        : 'text-[#26332B] hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-60">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-stone-100 pt-4 space-y-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-center py-2 text-xs text-stone-500 hover:text-stone-800"
              >
                관리자 콘솔 화면
              </button>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs text-rose-600 bg-rose-50 rounded-xl font-medium"
                >
                  로그아웃
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 text-xs text-white bg-[#6F9278] rounded-xl font-medium"
                >
                  로그인 / 회원가입
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
