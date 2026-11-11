import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DogRegistrationForm } from '../dog/DogRegistrationForm';
import { DogModal } from '../modals/DogModal';
import { 
  Heart, 
  MapPin, 
  Activity, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Star, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ShoppingBag, 
  Flame,
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    setActiveTab, 
    dogs, 
    currentDog, 
    selectedDogId, 
    setSelectedDogId,
    places, 
    posts, 
    expertArticles, 
    products, 
    vaccinations,
    performAttendanceCheck,
    user
  } = useApp();

  const [showInlineRegister, setShowInlineRegister] = useState(false);
  const [isDogModalOpen, setIsDogModalOpen] = useState(false);
  const [attendanceNotice, setAttendanceNotice] = useState<string | null>(null);

  // Calculate age helper
  const calculateAge = (birthDateString: string) => {
    if (!birthDateString) return '';
    const birth = new Date(birthDateString);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years <= 0) return `${Math.max(1, months)}개월`;
    return `${years}세 ${months > 0 ? `${months}개월` : ''}`.trim();
  };

  const handleAttendance = () => {
    const res = performAttendanceCheck();
    setAttendanceNotice(res.message);
    setTimeout(() => setAttendanceNotice(null), 3500);
  };

  const upcomingVaccine = vaccinations.find(v => v.dogId === selectedDogId && !v.isCompleted);

  return (
    <div className="space-y-16 sm:space-y-24 animate-in fade-in duration-300 pb-12">
      {/* SECTION 2: HERO VISUAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3EA] to-[#FAF8F5] pt-10 pb-16 sm:pb-24 border-b border-[#26332B]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#6F9278] text-xs font-bold border border-[#6F9278]/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F4B183]" />
                <span>반려견 통합 라이프스타일 플랫폼</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-[#26332B] tracking-tight leading-[1.15]">
                우리 강아지의 행복한 하루,<br />
                <span className="text-[#6F9278]">댕댕 라이프</span>와 함께
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                건강관리부터 산책, 여행, 커뮤니티까지!<br className="hidden sm:inline" />
                반려견과 함께하는 모든 순간을 더 스마트하고 특별하게 만들어보세요.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    if (dogs.length === 0) {
                      setShowInlineRegister(true);
                    } else {
                      setActiveTab('dog');
                    }
                  }}
                  className="px-6 py-3.5 bg-[#6F9278] hover:bg-[#5b7a63] text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                  <span>우리 강아지 등록하기</span>
                </button>

                <button
                  onClick={() => setActiveTab('places')}
                  className="px-6 py-3.5 bg-white hover:bg-stone-50 text-[#26332B] border border-stone-200 font-bold text-sm rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#6F9278]" />
                  <span>산책 장소 찾아보기</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex items-center gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6F9278]" />
                  <span>다견 가정 복수 프로필 지원</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6F9278]" />
                  <span>로컬 데이터베이스 안심 보관</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/10]">
                <img
                  src="/src/assets/images/hero_dog_park_1794379968344.jpg"
                  alt="공원에서 뛰어노는 행복한 강아지들"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between">
                  <span>가평 북한강 잔디 놀이터 산책로</span>
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px]">
                    오늘의 추천 코스
                  </span>
                </div>
              </div>

              {/* Floating Mini Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 max-w-xs animate-in slide-in-from-bottom-3 duration-500">
                <div className="w-10 h-10 rounded-xl bg-[#6F9278]/15 flex items-center justify-center text-[#6F9278]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#26332B]">실시간 건강 스케줄러</p>
                  <p className="text-[11px] text-stone-400">예방접종 및 체중 변화 알림</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK SERVICE MENU (6 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Quick Services</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">빠른 서비스 메뉴</h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            원하시는 반려견 라이프 케어 서비스를 원클릭으로 이용해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: '1', title: '우리 아이 등록', sub: '프로필 & 신체기록', icon: Heart, tab: 'dog', color: 'bg-rose-50 text-rose-600' },
            { id: '2', title: '예방접종 관리', sub: '백신 일정 & 알림', icon: Calendar, tab: 'health', color: 'bg-emerald-50 text-emerald-700' },
            { id: '3', title: '건강 기록', sub: '병원비 & 체중그래프', icon: Activity, tab: 'health', color: 'bg-blue-50 text-blue-700' },
            { id: '4', title: '산책 장소 찾기', sub: '동반 카페 & 운동장', icon: MapPin, tab: 'places', color: 'bg-amber-50 text-amber-700' },
            { id: '5', title: '견주 커뮤니티', sub: '일상 자랑 & 질문', icon: Users, tab: 'community', color: 'bg-purple-50 text-purple-700' },
            { id: '6', title: 'AI 반려견 도우미', sub: '실시간 생활상담', icon: Sparkles, tab: 'ai', color: 'bg-orange-50 text-orange-600' },
          ].map(service => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.tab as any)}
                className="bg-white p-5 rounded-3xl border border-stone-200/80 hover:border-[#6F9278] hover:shadow-md transition-all text-left group flex flex-col justify-between h-36"
              >
                <div className={`w-11 h-11 rounded-2xl ${service.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[10px] text-stone-400 mt-0.5">{service.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: OUR DOG DASHBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6F9278]/15 flex items-center justify-center text-[#6F9278]">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#26332B]">우리 아이 대시보드</h2>
                <p className="text-xs text-stone-400">등록된 반려견의 신체 정보와 예정된 건강 일정을 확인하세요.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowInlineRegister(!showInlineRegister)}
                className="px-3.5 py-2 bg-[#F7F3EA] hover:bg-[#ede6d8] text-[#26332B] text-xs font-bold rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>강아지 등록하기</span>
              </button>
              <button
                onClick={() => setActiveTab('dog')}
                className="px-3.5 py-2 bg-[#6F9278] hover:bg-[#5b7a63] text-white text-xs font-bold rounded-xl transition-colors"
              >
                전체 관리 화면
              </button>
            </div>
          </div>

          {/* Inline Dog Registration Form if opened */}
          {showInlineRegister && (
            <div className="pb-4">
              <DogRegistrationForm
                onSuccess={() => setShowInlineRegister(false)}
              />
            </div>
          )}

          {/* Dogs List / Selected Dog Card */}
          {currentDog ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Dog Profile Card */}
              <div className="lg:col-span-7 bg-[#FAF8F5] p-5 sm:p-6 rounded-3xl border border-stone-200/80 flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={currentDog.photoUrl}
                  alt={currentDog.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-[#6F9278] shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="space-y-3 flex-1 text-center sm:text-left w-full">
                  <div className="flex items-center justify-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-[#26332B]">{currentDog.name}</h3>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          currentDog.gender === '남아' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          {currentDog.gender}
                        </span>
                      </div>
                      <p className="text-xs text-[#6F9278] font-bold mt-0.5">{currentDog.breed}</p>
                    </div>

                    {/* Multi dog switcher if more than 1 dog */}
                    {dogs.length > 1 && (
                      <select
                        value={selectedDogId}
                        onChange={e => setSelectedDogId(e.target.value)}
                        className="bg-white border border-stone-200 text-xs font-bold text-[#26332B] rounded-xl px-2.5 py-1.5 shadow-xs"
                      >
                        {dogs.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                      <span className="text-[10px] text-stone-400 block">나이</span>
                      <span className="font-bold text-[#26332B]">{calculateAge(currentDog.birthDate)}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                      <span className="text-[10px] text-stone-400 block">체중</span>
                      <span className="font-bold text-[#26332B] font-mono">{currentDog.weight} kg</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/60">
                      <span className="text-[10px] text-stone-400 block">중성화</span>
                      <span className="font-bold text-[#6F9278]">{currentDog.isNeutered ? '완료' : '미실시'}</span>
                    </div>
                  </div>

                  {currentDog.allergies && currentDog.allergies.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl">
                      <span className="font-bold">알러지 주의:</span>
                      <span>{currentDog.allergies.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Health Status Column */}
              <div className="lg:col-span-5 space-y-3">
                <div
                  onClick={() => setActiveTab('health')}
                  className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#6F9278] cursor-pointer transition-all shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-400 font-medium">다음 예방접종 일정</span>
                      <p className="text-xs font-bold text-[#26332B]">
                        {upcomingVaccine ? `${upcomingVaccine.name} (${upcomingVaccine.nextDate})` : '모든 접종 완료 (다음 주기 확인)'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#6F9278] group-hover:translate-x-1 transition-all" />
                </div>

                <div
                  onClick={() => setActiveTab('health')}
                  className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#6F9278] cursor-pointer transition-all shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-400 font-medium">체중 및 병원 방문 기록</span>
                      <p className="text-xs font-bold text-[#26332B]">
                        정기 체중 변화 그래프 및 진료비 내역 확인
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#6F9278] group-hover:translate-x-1 transition-all" />
                </div>

                <div
                  onClick={() => setActiveTab('ai')}
                  className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#F4B183]/40 hover:border-[#F4B183] cursor-pointer transition-all shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F4B183]/30 text-[#26332B] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#F4B183]" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#6F9278] font-bold">AI 맞춤 생활 도우미</span>
                      <p className="text-xs font-bold text-[#26332B]">
                        {currentDog.name} 맞춤 산책 시간 & 사료량 상담
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#26332B] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-3">
              <p className="text-sm font-bold text-[#26332B]">등록된 반려견이 없습니다.</p>
              <p className="text-xs text-stone-400">우리 아이를 등록하고 맞춤 일상 관리를 시작해 보세요!</p>
              <button
                onClick={() => setShowInlineRegister(true)}
                className="px-5 py-2.5 bg-[#6F9278] text-white text-xs font-bold rounded-xl"
              >
                강아지 등록하기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: RECOMMENDED PLACES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Spotlights</span>
            <h2 className="text-2xl font-black text-[#26332B] mt-0.5">산책·동반 여행 추천</h2>
            <p className="text-xs text-stone-500">주말에 우리 댕댕이와 함께 가기 좋은 검증된 동반 핫플레이스입니다.</p>
          </div>
          <button
            onClick={() => setActiveTab('places')}
            className="text-xs text-[#6F9278] font-bold hover:underline flex items-center gap-1"
          >
            전체 장소 검색하기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.slice(0, 3).map(place => (
            <div
              key={place.id}
              onClick={() => setActiveTab('places')}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-[#6F9278]/50 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#26332B]">
                    {place.category}
                  </span>
                  <span
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      place.isVerified ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                    }`}
                  >
                    {place.isVerified ? '현장확인' : '추천샘플'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6F9278] font-bold">{place.region}</span>
                    <span className="text-amber-500 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {place.rating}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                <span>{place.allowedSizes.join(', ')}</span>
                <span className="text-[#6F9278] font-bold">상세보기 →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: COMMUNITY STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Community Buzz</span>
            <h2 className="text-2xl font-black text-[#26332B] mt-0.5">견주 커뮤니티 인기글</h2>
            <p className="text-xs text-stone-500">실시간으로 올라오는 우리 아이 자랑과 건강·훈련 조언을 확인하세요.</p>
          </div>
          <button
            onClick={() => setActiveTab('community')}
            className="text-xs text-[#6F9278] font-bold hover:underline flex items-center gap-1"
          >
            커뮤니티 글쓰기 & 더보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map(post => (
            <div
              key={post.id}
              onClick={() => setActiveTab('community')}
              className="bg-white rounded-3xl p-6 border border-stone-200 hover:border-[#6F9278]/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6F9278] font-bold bg-[#6F9278]/10 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-stone-400">{post.createdAt}</span>
                </div>

                <h3 className="text-base font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>

                {post.image && (
                  <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-stone-100">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-400">
                <span className="font-semibold text-stone-600">{post.authorName} ({post.authorDogName})</span>
                <div className="flex items-center gap-3">
                  <span className="text-rose-600 font-bold">♥ {post.likes}</span>
                  <span>댓글 {post.comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: EXPERT GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Professional Insights</span>
            <h2 className="text-2xl font-black text-[#26332B] mt-0.5">반려견 전문가 정보</h2>
            <p className="text-xs text-stone-500">수의사 및 전문 훈련사가 감수한 검증된 양육 칼럼입니다.</p>
          </div>
          <button
            onClick={() => setActiveTab('expert')}
            className="text-xs text-[#6F9278] font-bold hover:underline flex items-center gap-1"
          >
            칼럼 전체보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertArticles.slice(0, 3).map(art => (
            <div
              key={art.id}
              onClick={() => setActiveTab('expert')}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-[#6F9278]/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#26332B]">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-stone-400 font-medium">{art.author} ({art.authorTitle})</span>
                  <h3 className="text-sm font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                <span>{art.readTime} 소요</span>
                <span className="text-[#6F9278] font-bold">읽기 →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 & 9: SHOPPING & EVENT ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Curated Shop Preview */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold text-[#6F9278]">Pet Shop Curation</span>
              <h3 className="text-base font-bold text-[#26332B]">추천 건강 간식 & 용품</h3>
            </div>
            <button
              onClick={() => setActiveTab('shop')}
              className="text-xs text-[#6F9278] font-bold hover:underline"
            >
              쇼핑관 전체보기 →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.slice(0, 2).map(prod => (
              <div
                key={prod.id}
                onClick={() => setActiveTab('shop')}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:bg-[#F7F3EA] transition-colors cursor-pointer flex gap-3"
              >
                <img src={prod.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#6F9278] font-bold">{prod.brand}</span>
                    <h4 className="text-xs font-bold text-[#26332B] truncate">{prod.name}</h4>
                  </div>
                  <p className="text-xs font-extrabold text-[#26332B] font-mono">
                    {prod.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-400 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
            ※ 현재 쇼핑 기능은 큐레이션 샘플 단계이며, 결제 모듈 연동 전까지 주문은 시뮬레이션으로 진행됩니다.
          </p>
        </div>

        {/* Daily Attendance Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#6F9278] to-[#55765e] rounded-3xl p-6 sm:p-7 text-white shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
                DAILY STAMP
              </span>
              <span className="text-xs text-white/80 font-mono">
                보유 {user.points}P
              </span>
            </div>
            <h3 className="text-lg font-black">매일 출석체크하고 댕댕 포인트 적립!</h3>
            <p className="text-xs text-white/80 mt-1 leading-relaxed">
              연속 7일 출석 시 보너스 500P 추가 적립. 우리 강아지의 하루를 기록하고 혜택도 받아가세요.
            </p>
          </div>

          {attendanceNotice && (
            <div className="p-3 bg-white text-emerald-800 rounded-xl text-xs font-bold">
              {attendanceNotice}
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleAttendance}
              className="w-full py-3 bg-[#F4B183] hover:bg-[#eb9d69] text-[#26332B] font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              오늘 출석 스탬프 찍기 (+50P)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
