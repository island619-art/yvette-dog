import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Dog } from '../../types';
import { DogRegistrationForm } from './DogRegistrationForm';
import { DogModal } from '../modals/DogModal';
import { 
  Heart, 
  Calendar, 
  Scale, 
  Edit3, 
  Trash2, 
  Plus, 
  Activity, 
  ShieldAlert, 
  Phone, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DogManagementView: React.FC = () => {
  const { 
    dogs, 
    selectedDogId, 
    setSelectedDogId, 
    currentDog, 
    deleteDog, 
    updateDog, 
    setActiveTab,
    vaccinations,
    hospitalVisits
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDog, setEditingDog] = useState<Dog | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Age calculation
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
    if (years <= 0) {
      return `${Math.max(1, months)}개월`;
    }
    return `${years}세 ${months > 0 ? `${months}개월` : ''}`.trim();
  };

  const handleEditClick = (dog: Dog) => {
    setEditingDog(dog);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (dogId: string, dogName: string) => {
    if (window.confirm(`'${dogName}'의 프로필과 모든 기록을 삭제하시겠습니까?`)) {
      deleteDog(dogId);
    }
  };

  // Dog-specific vaccine & health counts
  const dogVaccines = vaccinations.filter(v => v.dogId === selectedDogId);
  const dogVisits = hospitalVisits.filter(h => h.dogId === selectedDogId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Pet Profile & Care</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">우리 아이 관리</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            소중한 반려견의 기본 프로필, 신체 정보 및 비상 연락처를 한눈에 확인하고 관리하세요.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRegisterForm(!showRegisterForm)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all ${
              showRegisterForm
                ? 'bg-stone-200 text-stone-800'
                : 'bg-[#6F9278] hover:bg-[#5a7c63] text-white'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{showRegisterForm ? '등록 폼 닫기' : '새로운 강아지 등록하기'}</span>
          </button>
        </div>
      </div>

      {/* Inline Registration Form Component when expanded */}
      {showRegisterForm && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <DogRegistrationForm
            onSuccess={() => {
              setShowRegisterForm(false);
            }}
          />
        </div>
      )}

      {/* Multi-dog Switcher Tabs */}
      {dogs.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dogs.map(dog => {
            const isSelected = dog.id === selectedDogId;
            return (
              <button
                key={dog.id}
                onClick={() => setSelectedDogId(dog.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-white border-[#6F9278] ring-2 ring-[#6F9278]/20 shadow-sm'
                    : 'bg-stone-50 border-stone-200/80 hover:bg-white text-stone-600'
                }`}
              >
                <img
                  src={dog.photoUrl}
                  alt={dog.name}
                  className="w-8 h-8 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#26332B]">{dog.name}</span>
                    <span className="text-[10px] text-stone-400">({dog.gender})</span>
                  </div>
                  <span className="text-[10px] text-stone-500">{dog.breed} · {dog.weight}kg</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Selected Dog Profile Card */}
      {currentDog ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col 1: Dog Big Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={currentDog.photoUrl}
                  alt={currentDog.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#6F9278] shadow-xs">
                {currentDog.breed}
              </span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-black text-[#26332B]">{currentDog.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  currentDog.gender === '남아' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                }`}>
                  {currentDog.gender}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                생일: {currentDog.birthDate} ({calculateAge(currentDog.birthDate)})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-[#F7F3EA]/70 rounded-2xl border border-stone-200/50 text-center">
              <div>
                <span className="text-[11px] text-stone-500 font-medium">현재 체중</span>
                <p className="text-lg font-bold text-[#26332B] mt-0.5">{currentDog.weight} kg</p>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 font-medium">중성화 여부</span>
                <p className="text-lg font-bold text-[#6F9278] mt-0.5">
                  {currentDog.isNeutered ? '완료' : '미실시'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditClick(currentDog)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#26332B] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                프로필 수정
              </button>
              <button
                onClick={() => handleDeleteClick(currentDog.id, currentDog.name)}
                className="p-2.5 bg-stone-50 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-xl transition-colors"
                title="프로필 삭제"
                aria-label="프로필 삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2 & 3: Detailed Care, Medical ID, Allergies & Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            {/* Identification & Registration Numbers */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6F9278]" />
                  <h3 className="text-sm font-bold text-[#26332B]">동물등록 및 안심 식별 정보</h3>
                </div>
                <span className="text-xs text-stone-400">정부 동물보호관리시스템</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/70">
                  <span className="text-[11px] text-stone-400">동물등록번호</span>
                  <p className="text-xs font-mono font-bold text-[#26332B] mt-0.5">
                    {currentDog.registrationNumber || '미등록 (등록번호 입력 필요)'}
                  </p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/70">
                  <span className="text-[11px] text-stone-400">마이크로칩 ID</span>
                  <p className="text-xs font-mono font-bold text-[#26332B] mt-0.5">
                    {currentDog.microchipNumber || '내장형 마이크로칩 미입력'}
                  </p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="flex items-center justify-between p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/60 text-xs">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="font-bold text-amber-900">비상 보호자 연락처:</span>{' '}
                    <span className="font-mono text-amber-800">
                      {currentDog.emergencyContact || '연락처 미등록'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-amber-700 hidden sm:inline">실종 방지 목줄용</span>
              </div>
            </div>

            {/* Health Notes & Dietary Allergies */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <ShieldAlert className="w-4 h-4 text-[#F4B183]" />
                <h3 className="text-sm font-bold text-[#26332B]">주의 사항 및 알러지 정보</h3>
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-500 block mb-2">식이 알러지 (Allergies)</span>
                {currentDog.allergies && currentDog.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentDog.allergies.map((allergy, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200/60"
                      >
                        ⚠️ {allergy} 금지
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400">등록된 식이 알러지가 없습니다.</p>
                )}
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-500 block mb-1">건강 메모 및 행동 특이사항</span>
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/70 text-xs text-stone-700 leading-relaxed">
                  {currentDog.notes || '등록된 건강 메모가 없습니다. 프로필 수정에서 메모를 추가해보세요.'}
                </div>
              </div>
            </div>

            {/* Quick Action Cards: Jump to Health & Vaccines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setActiveTab('health')}
                className="p-5 bg-gradient-to-br from-[#6F9278]/10 to-transparent rounded-3xl border border-[#6F9278]/20 hover:border-[#6F9278] cursor-pointer transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#6F9278] text-white flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6F9278] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#26332B]">건강 기록 및 체중 그래프</h4>
                <p className="text-xs text-stone-500 mt-1">
                  총 {dogVisits.length}건의 병원 진료 및 정기 체중 기록
                </p>
              </div>

              <div
                onClick={() => setActiveTab('health')}
                className="p-5 bg-gradient-to-br from-[#F4B183]/15 to-transparent rounded-3xl border border-[#F4B183]/30 hover:border-[#F4B183] cursor-pointer transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#F4B183] text-[#26332B] flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-700 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#26332B]">예방접종 일정 관리</h4>
                <p className="text-xs text-stone-500 mt-1">
                  등록된 백신 {dogVaccines.length}건 및 예정일 알림 확인
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#6F9278]/15 flex items-center justify-center mx-auto text-[#6F9278]">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#26332B]">등록된 반려견이 없습니다</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            우리 강아지의 프로필을 등록하고 건강 기록, 예방접종, 맞춤 산책 장소를 추천받아 보세요!
          </p>
          <button
            onClick={() => setShowRegisterForm(true)}
            className="px-6 py-3 bg-[#6F9278] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#5a7c63] transition-colors"
          >
            + 첫 반려견 등록하기
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <DogModal
          isOpen={isEditModalOpen}
          initialDog={editingDog}
          onClose={() => setIsEditModalOpen(false)}
          onSave={data => {
            if (editingDog) {
              updateDog(editingDog.id, data);
            }
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
