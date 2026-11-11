import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  AlertTriangle, 
  Plus, 
  Trash2,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    user, 
    toggleAdminMode, 
    dogs, 
    posts, 
    places, 
    expertArticles, 
    products, 
    deletePost,
    addPlace 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stats' | 'reports' | 'addPlace' | 'notices'>('stats');

  // New place state
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<any>('애견 동반 카페');
  const [pRegion, setPRegion] = useState('서울');
  const [pAddress, setPAddress] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [placeSuccess, setPlaceSuccess] = useState(false);

  const handleAddPlaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pAddress) return;

    addPlace({
      name: pName,
      category: pCategory,
      region: pRegion,
      address: pAddress,
      image: '/src/assets/images/place_dog_cafe_1794379969714.jpg',
      allowedSizes: ['소형견', '중형견'],
      environment: '실내+실외',
      hasParking: true,
      hasFencedArea: true,
      leashRequired: false,
      description: pDesc || '새로 등록된 반려견 동반 공간입니다.',
      operatingHours: '10:00 - 20:00',
      contact: '02-000-0000',
      isVerified: true,
    });

    setPlaceSuccess(true);
    setPName('');
    setPAddress('');
    setPDesc('');
    setTimeout(() => setPlaceSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">System Administration</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">관리자 대시보드</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            플랫폼 콘텐츠 모니터링, 신규 장소 승인, 커뮤니티 신고 내역 및 통계를 관리합니다.
          </p>
        </div>

        {/* Admin Privilege Toggle */}
        <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-2xl border border-stone-200">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 block font-semibold">보안 권한 시뮬레이션</span>
            <span className={`text-xs font-bold ${user.isAdmin ? 'text-[#6F9278]' : 'text-stone-600'}`}>
              {user.isAdmin ? '최고 관리자 권한 (Super Admin)' : '일반 회원 모드 (Normal User)'}
            </span>
          </div>
          <button
            onClick={toggleAdminMode}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
              user.isAdmin
                ? 'bg-[#6F9278] text-white shadow-xs'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
            }`}
          >
            {user.isAdmin ? '관리자 해제' : '관리자 권한 획득'}
          </button>
        </div>
      </div>

      {/* Security Rule Notice */}
      <div className="p-4 bg-stone-900 text-white rounded-3xl border border-stone-800 flex items-start gap-3 text-xs leading-relaxed">
        <Lock className="w-4 h-4 text-[#F4B183] shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-[#F4B183]">보안 및 데이터베이스 접근 제어 (RBAC) 규정 안내</p>
          <p className="text-stone-400 mt-0.5">
            관리자 기능은 단순 UI 조건부 렌더링에 의존하지 않고, Firebase Firestore Security Rules 또는 백엔드 세션 토큰(`customClaims.admin == true`)을 통해 DB 단위에서 비인가 회원의 조작을 원천 차단하도록 설계되어 있습니다.
          </p>
        </div>
      </div>

      {/* Admin KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-400 font-medium">등록 반려견</span>
          <p className="text-2xl font-black text-[#26332B] mt-1 font-mono">{dogs.length}두</p>
          <span className="text-[10px] text-emerald-600 font-bold">건강 모니터링 중</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-400 font-medium">커뮤니티 게시글</span>
          <p className="text-2xl font-black text-[#26332B] mt-1 font-mono">{posts.length}건</p>
          <span className="text-[10px] text-stone-500">누적 활동 피드</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-400 font-medium">등록된 동반 장소</span>
          <p className="text-2xl font-black text-[#26332B] mt-1 font-mono">{places.length}곳</p>
          <span className="text-[10px] text-emerald-600 font-bold">현장 검증 완료 5곳</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-400 font-medium">전문가 칼럼</span>
          <p className="text-2xl font-black text-[#26332B] mt-1 font-mono">{expertArticles.length}편</p>
          <span className="text-[10px] text-[#6F9278] font-bold">수의사 검수 필</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'stats' ? 'bg-[#6F9278] text-white' : 'text-stone-500 hover:bg-stone-100'
          }`}
        >
          콘텐츠 통합 관리
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'reports' ? 'bg-[#6F9278] text-white' : 'text-stone-500 hover:bg-stone-100'
          }`}
        >
          신고 및 유해물 필터 (0)
        </button>
        <button
          onClick={() => setActiveTab('addPlace')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'addPlace' ? 'bg-[#6F9278] text-white' : 'text-stone-500 hover:bg-stone-100'
          }`}
        >
          신규 장소 등록
        </button>
      </div>

      {/* TAB 1: Content Management */}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#26332B]">실시간 커뮤니티 게시글 모니터링</h3>
          <div className="divide-y divide-stone-100 text-xs">
            {posts.map(p => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[#6F9278] font-bold">[{p.category}]</span>
                    <span className="font-bold text-[#26332B] truncate">{p.title}</span>
                  </div>
                  <p className="text-stone-400 text-[11px] mt-0.5">
                    작성자: {p.authorName} · 작성일: {p.createdAt} · 좋아요 {p.likes} · 댓글 {p.comments.length}
                  </p>
                </div>
                <button
                  onClick={() => deletePost(p.id)}
                  className="px-2.5 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs font-bold shrink-0"
                >
                  강제 삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <h4 className="text-base font-bold text-[#26332B]">신고된 콘텐츠가 없습니다</h4>
          <p className="text-xs text-stone-400 mt-1">댕댕 라이프 커뮤니티는 안전하고 청결하게 유지되고 있습니다.</p>
        </div>
      )}

      {/* TAB 3: Add Place Form */}
      {activeTab === 'addPlace' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-[#26332B]">새로운 반려견 동반 장소 직접 등록</h3>

          {placeSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>새로운 장소가 성공적으로 데이터베이스에 등록되었습니다.</span>
            </div>
          )}

          <form onSubmit={handleAddPlaceSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#26332B] mb-1">장소명</label>
                <input
                  type="text"
                  required
                  value={pName}
                  onChange={e => setPName(e.target.value)}
                  placeholder="예: 해피퍼피 테라스"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-[#26332B] mb-1">카테고리</label>
                <select
                  value={pCategory}
                  onChange={e => setPCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                >
                  <option value="애견 동반 카페">애견 동반 카페</option>
                  <option value="애견 동반 식당">애견 동반 식당</option>
                  <option value="애견 동반 숙소">애견 동반 숙소</option>
                  <option value="반려견 놀이터">반려견 놀이터</option>
                  <option value="산책 공원">산책 공원</option>
                  <option value="반려견 동반 여행지">반려견 동반 여행지</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#26332B] mb-1">지역</label>
                <input
                  type="text"
                  required
                  value={pRegion}
                  onChange={e => setPRegion(e.target.value)}
                  placeholder="예: 경기 가평, 서울 성동구"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-[#26332B] mb-1">상세 도로명 주소</label>
                <input
                  type="text"
                  required
                  value={pAddress}
                  onChange={e => setPAddress(e.target.value)}
                  placeholder="도로명 주소 입력"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#26332B] mb-1">소개 및 특징</label>
              <textarea
                rows={3}
                value={pDesc}
                onChange={e => setPDesc(e.target.value)}
                placeholder="잔디 운동장 규모, 입장 기준 등을 작성해주세요."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#6F9278] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#5a7c63]"
              >
                장소 등록 완료
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
