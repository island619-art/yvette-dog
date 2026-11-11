import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Heart, 
  MapPin, 
  ShoppingBag, 
  Activity, 
  Bell, 
  Lock, 
  Trash2, 
  Edit3, 
  LogOut,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const MyPageView: React.FC = () => {
  const { 
    user, 
    dogs, 
    places, 
    products, 
    posts, 
    vaccinations, 
    hospitalVisits,
    logout, 
    setActiveTab,
    toggleBookmarkPlace,
    toggleSaveProduct
  } = useApp();

  const [notifVaccine, setNotifVaccine] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(true);
  const [notifEvent, setNotifEvent] = useState(false);

  const bookmarkedPlaces = places.filter(p => p.bookmarked);
  const savedProducts = products.filter(p => p.isSaved);
  const myPosts = posts.filter(p => p.authorName === user.nickname);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">My Account & Activity</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">마이페이지</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            내 프로필, 등록한 반려견, 건강 기록 통계 및 관심 장소·상품을 한곳에서 모아보세요.
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5 w-fit"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>로그아웃</span>
        </button>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl || '/src/assets/images/dog_profile_sample_1794379968759.jpg'}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6F9278]"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#26332B]">{user.nickname} 님</h2>
              <span className="text-xs bg-[#6F9278]/10 text-[#6F9278] px-2.5 py-0.5 rounded-full font-bold">
                댕댕패밀리
              </span>
            </div>
            <p className="text-xs text-stone-400">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto justify-around md:justify-end border-stone-100">
          <div className="text-center">
            <span className="text-[11px] text-stone-400 font-medium">등록 반려견</span>
            <p className="text-lg font-black text-[#26332B] mt-0.5">{dogs.length}마리</p>
          </div>
          <div className="text-center">
            <span className="text-[11px] text-stone-400 font-medium">연속 출석</span>
            <p className="text-lg font-black text-[#6F9278] mt-0.5">{user.attendanceDays}일</p>
          </div>
          <div className="text-center">
            <span className="text-[11px] text-stone-400 font-medium">보유 포인트</span>
            <p className="text-lg font-black text-[#F4B183] mt-0.5 font-mono">{user.points}P</p>
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2.5">
        <Lock className="w-4 h-4 text-[#6F9278] shrink-0" />
        <span>
          <strong>개인정보 및 건강 기록 안심 보호:</strong> 회원님의 반려견 진료비 및 처방 기록은 다른 회원에게 절대 공개되지 않으며 브라우저에 안전하게 보관됩니다.
        </span>
      </div>

      {/* Grid: Registered Dogs & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registered Dogs */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#6F9278]" />
              <h3 className="text-sm font-bold text-[#26332B]">내 등록 반려견 ({dogs.length})</h3>
            </div>
            <button
              onClick={() => setActiveTab('dog')}
              className="text-xs text-[#6F9278] font-bold hover:underline"
            >
              + 반려견 관리 이동
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dogs.map(dog => (
              <div
                key={dog.id}
                onClick={() => setActiveTab('dog')}
                className="p-4 rounded-2xl bg-[#F7F3EA]/70 border border-stone-200/60 flex items-center gap-3 cursor-pointer hover:bg-[#F7F3EA] transition-colors"
              >
                <img src={dog.photoUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#26332B] truncate">{dog.name}</h4>
                  <p className="text-[11px] text-stone-500">{dog.breed} · {dog.weight}kg</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{dog.birthDate}생 ({dog.gender})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <Bell className="w-4 h-4 text-[#6F9278]" />
            <h3 className="text-sm font-bold text-[#26332B]">알림 환경설정</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#26332B]">예방접종 예정일 알림</p>
                <p className="text-[10px] text-stone-400">접종 2주 전 사전 푸시 안내</p>
              </div>
              <input
                type="checkbox"
                checked={notifVaccine}
                onChange={e => setNotifVaccine(e.target.checked)}
                className="w-4 h-4 accent-[#6F9278]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#26332B]">커뮤니티 댓글 알림</p>
                <p className="text-[10px] text-stone-400">내 글에 댓글이 달렸을 때</p>
              </div>
              <input
                type="checkbox"
                checked={notifCommunity}
                onChange={e => setNotifCommunity(e.target.checked)}
                className="w-4 h-4 accent-[#6F9278]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#26332B]">이벤트 & 혜택 알림</p>
                <p className="text-[10px] text-stone-400">체험단 및 특가 세일 알림</p>
              </div>
              <input
                type="checkbox"
                checked={notifEvent}
                onChange={e => setNotifEvent(e.target.checked)}
                className="w-4 h-4 accent-[#6F9278]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Places */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#6F9278]" />
            <h3 className="text-sm font-bold text-[#26332B]">관심 장소 스크랩 ({bookmarkedPlaces.length})</h3>
          </div>
          <button
            onClick={() => setActiveTab('places')}
            className="text-xs text-[#6F9278] font-bold hover:underline"
          >
            장소 더 찾아보기 →
          </button>
        </div>

        {bookmarkedPlaces.length === 0 ? (
          <p className="text-xs text-stone-400 py-4 text-center">저장된 관심 장소가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookmarkedPlaces.map(p => (
              <div
                key={p.id}
                className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#26332B] truncate">{p.name}</p>
                  <p className="text-[10px] text-stone-500">{p.region} · {p.category}</p>
                </div>
                <button
                  onClick={() => toggleBookmarkPlace(p.id)}
                  className="p-1 text-rose-500 hover:text-stone-400"
                  title="삭제"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Products */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#6F9278]" />
            <h3 className="text-sm font-bold text-[#26332B]">관심 상품 위시리스트 ({savedProducts.length})</h3>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-xs text-[#6F9278] font-bold hover:underline"
          >
            쇼핑 상품 보기 →
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <p className="text-xs text-stone-400 py-4 text-center">관심상품에 담긴 제품이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {savedProducts.map(pr => (
              <div
                key={pr.id}
                className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#26332B] truncate">{pr.name}</p>
                  <p className="text-[10px] text-stone-500 font-mono">{pr.price.toLocaleString()}원</p>
                </div>
                <button
                  onClick={() => toggleSaveProduct(pr.id)}
                  className="p-1 text-rose-500 hover:text-stone-400"
                  title="삭제"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
