import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Place, PlaceCategory } from '../../types';
import { 
  MapPin, 
  Search, 
  Heart, 
  Star, 
  Car, 
  ShieldCheck, 
  Check, 
  Phone, 
  Clock, 
  X, 
  Info,
  Filter
} from 'lucide-react';

const CATEGORIES: ('전체' | PlaceCategory)[] = [
  '전체',
  '애견 동반 카페',
  '애견 동반 식당',
  '애견 동반 숙소',
  '반려견 놀이터',
  '산책 공원',
  '반려견 동반 여행지',
];

export const PlacesView: React.FC = () => {
  const { places, toggleBookmarkPlace, selectedPlaceCategory, setSelectedPlaceCategory } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>(selectedPlaceCategory || '전체');
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [selectedDogSize, setSelectedDogSize] = useState<string>('전체');
  const [onlyParking, setOnlyParking] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const regions = ['전체', '서울 성동구', '서울 마포구', '경기 가평', '경기 남양주', '강원 양양', '제주 구좌읍'];

  const filteredPlaces = useMemo(() => {
    return places.filter(p => {
      if (activeCategory !== '전체' && p.category !== activeCategory) return false;
      if (selectedRegion !== '전체' && p.region !== selectedRegion) return false;
      if (selectedDogSize !== '전체' && !p.allowedSizes.includes(selectedDogSize as any)) return false;
      if (onlyParking && !p.hasParking) return false;
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchAddr = p.address.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchName && !matchAddr && !matchDesc) return false;
      }
      return true;
    });
  }, [places, activeCategory, selectedRegion, selectedDogSize, onlyParking, searchKeyword]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="pb-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Dog-Friendly Spots & Walks</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">산책 & 반려견 동반 여행</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            카페, 식당, 숙소부터 오프리시 천연잔디 놀이터까지 댕댕이와 함께 안심하고 떠나보세요.
          </p>
        </div>

        {/* Data Authenticity Notice Badge */}
        <div className="inline-flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-600">
          <Info className="w-4 h-4 text-[#6F9278] shrink-0" />
          <span>
            <strong className="text-[#26332B]">확인된 데이터</strong>와 <strong className="text-amber-800">추천 샘플 데이터</strong>가 구분 표기됩니다.
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedPlaceCategory(cat === '전체' ? null : cat);
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

      {/* Detailed Filters & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="장소 이름, 지역, 특징 검색..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6F9278]/30 focus:outline-none"
            />
          </div>

          {/* Region Select */}
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700"
          >
            <option value="전체">전체 지역</option>
            {regions.filter(r => r !== '전체').map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Dog Size Select */}
          <select
            value={selectedDogSize}
            onChange={e => setSelectedDogSize(e.target.value)}
            className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700"
          >
            <option value="전체">모든 견종 크기</option>
            <option value="소형견">소형견 가능</option>
            <option value="중형견">중형견 가능</option>
            <option value="대형견">대형견 입장 가능</option>
          </select>

          {/* Parking Toggle */}
          <button
            onClick={() => setOnlyParking(!onlyParking)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
              onlyParking
                ? 'bg-[#6F9278]/10 text-[#6F9278] border-[#6F9278]'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>주차 가능만</span>
          </button>
        </div>
      </div>

      {/* Places Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-stone-500 font-medium">
            총 <strong className="text-[#26332B]">{filteredPlaces.length}</strong>곳의 추천 장소가 있습니다.
          </p>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <p className="text-sm font-semibold text-stone-600">조건에 맞는 장소가 없습니다.</p>
            <p className="text-xs text-stone-400 mt-1">필터를 초기화하거나 다른 검색어로 찾아보세요.</p>
            <button
              onClick={() => {
                setActiveCategory('전체');
                setSelectedRegion('전체');
                setSelectedDogSize('전체');
                setOnlyParking(false);
                setSearchKeyword('');
              }}
              className="mt-4 px-4 py-2 bg-[#6F9278] text-white text-xs font-bold rounded-xl"
            >
              필터 전체 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map(place => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-[#6F9278]/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Category Label */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#26332B] shadow-xs">
                      {place.category}
                    </span>

                    {/* Data Source Badge: Verified vs Sample */}
                    <span
                      className={`absolute top-3 right-12 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        place.isVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {place.isVerified ? '✓ 현장확인' : '추천샘플'}
                    </span>

                    {/* Bookmark Heart */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleBookmarkPlace(place.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-600 hover:text-rose-500 transition-colors shadow-xs"
                      aria-label="저장"
                    >
                      <Heart
                        className={`w-4 h-4 ${place.bookmarked ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6F9278] font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {place.region}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{place.rating}</span>
                        <span className="text-[10px] text-stone-400">({place.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#26332B] group-hover:text-[#6F9278] transition-colors leading-snug">
                      {place.name}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {place.description}
                    </p>

                    {/* Attributes */}
                    <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-stone-600">
                      <span className="bg-stone-100 px-2 py-0.5 rounded-md">
                        {place.allowedSizes.join(', ')}
                      </span>
                      <span className="bg-stone-100 px-2 py-0.5 rounded-md">
                        {place.environment}
                      </span>
                      {place.hasParking && (
                        <span className="bg-stone-100 px-2 py-0.5 rounded-md">
                          주차가능
                        </span>
                      )}
                      {place.hasFencedArea && (
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium">
                          펜스완비
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                  <span>{place.operatingHours.split('(')[0]}</span>
                  <span className="text-[#6F9278] font-bold group-hover:underline">상세보기 →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-5">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#26332B]">
                {selectedPlace.category}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#6F9278]">{selectedPlace.region}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#26332B] mt-0.5">{selectedPlace.name}</h2>
                </div>
                <button
                  onClick={() => toggleBookmarkPlace(selectedPlace.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    selectedPlace.bookmarked
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedPlace.bookmarked ? 'fill-rose-500' : ''}`} />
                  <span>{selectedPlace.bookmarked ? '저장됨' : '관심장소 저장'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#F7F3EA]/60 p-4 rounded-2xl border border-stone-200/50">
                {selectedPlace.description}
              </p>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                  <span className="font-semibold">{selectedPlace.address}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{selectedPlace.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{selectedPlace.contact}</span>
                </div>
              </div>

              {/* Facility Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl text-center">
                  <span className="text-stone-400 text-[10px] block">입장 가능 견종</span>
                  <span className="font-bold text-[#26332B]">{selectedPlace.allowedSizes.join(', ')}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl text-center">
                  <span className="text-stone-400 text-[10px] block">환경</span>
                  <span className="font-bold text-[#26332B]">{selectedPlace.environment}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl text-center">
                  <span className="text-stone-400 text-[10px] block">오프리시 펜스</span>
                  <span className="font-bold text-[#6F9278]">{selectedPlace.hasFencedArea ? '펜스 구비' : '리드줄 필수'}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#26332B] text-xs font-bold rounded-xl"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
