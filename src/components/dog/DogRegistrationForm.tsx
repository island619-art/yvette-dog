import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Dog } from '../../types';
import { Heart, Plus, Check, Sparkles, Scale, Calendar, AlertCircle } from 'lucide-react';

interface DogRegistrationFormProps {
  onSuccess?: (newDog: Dog) => void;
  isCompact?: boolean;
}

const SAMPLE_AVATARS = [
  { url: '/src/assets/images/dog_profile_sample_1794379968759.jpg', label: '비숑/화이트' },
  { url: '/src/assets/images/hero_dog_park_1794379968344.jpg', label: '골든/대형견' },
  { url: '/src/assets/images/place_dog_cafe_1794379969714.jpg', label: '푸들/브라운' },
];

export const DogRegistrationForm: React.FC<DogRegistrationFormProps> = ({
  onSuccess,
  isCompact = false,
}) => {
  const { addDog } = useApp();

  // Form State (Name, Breed, DOB, Weight + extras)
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dob, setDob] = useState('2023-05-15');
  const [weight, setWeight] = useState<string>('4.5');
  const [gender, setGender] = useState<'남아' | '여아'>('남아');
  const [isNeutered, setIsNeutered] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_AVATARS[0].url);
  const [allergies, setAllergies] = useState('');
  const [notes, setNotes] = useState('');

  // Feedback State
  const [submittedDog, setSubmittedDog] = useState<Dog | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    if (years <= 0) {
      return `${Math.max(1, months)}개월`;
    }
    return `${years}세 ${months > 0 ? `${months}개월` : ''}`.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!name.trim()) {
      setErrorMsg('강아지 이름을 입력해주세요.');
      return;
    }
    if (!breed.trim()) {
      setErrorMsg('견종을 입력해주세요 (예: 말티즈, 포메라니안).');
      return;
    }
    if (!dob) {
      setErrorMsg('생년월일을 선택해주세요.');
      return;
    }
    const numWeight = parseFloat(weight);
    if (isNaN(numWeight) || numWeight <= 0) {
      setErrorMsg('올바른 체중(kg)을 입력해주세요.');
      return;
    }

    // Save to local React State acting as mock database
    const newDog = addDog({
      name: name.trim(),
      breed: breed.trim(),
      birthDate: dob,
      weight: numWeight,
      gender,
      isNeutered,
      photoUrl: selectedPhoto,
      allergies: allergies ? allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
      notes: notes.trim() || undefined,
    });

    setSubmittedDog(newDog);

    // Reset form fields
    setName('');
    setBreed('');
    setDob('2023-05-15');
    setWeight('4.5');
    setAllergies('');
    setNotes('');

    if (onSuccess) {
      onSuccess(newDog);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#6F9278]/15 flex items-center justify-center text-[#6F9278]">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#26332B]">우리 강아지 등록 (Dog Registration)</h3>
            <p className="text-xs text-stone-400">
              이름, 견종, 생년월일, 몸무게를 입력하면 로컬 목 데이터베이스에 즉시 보관됩니다.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F3EA] text-[#6F9278] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#F4B183]" />
          로컬 목 DB 연동
        </span>
      </div>

      {/* Success Banner when newly registered */}
      {submittedDog && (
        <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3 animate-in fade-in duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-emerald-900">
                🎉 '{submittedDog.name}'의 프로필이 로컬 데이터베이스에 성공적으로 등록되었습니다!
              </p>
              <button
                onClick={() => setSubmittedDog(null)}
                className="text-xs text-emerald-600 hover:underline font-semibold"
              >
                닫기
              </button>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              {submittedDog.breed} · {calculateAge(submittedDog.birthDate)} ({submittedDog.gender}) · {submittedDog.weight}kg ·{' '}
              {submittedDog.isNeutered ? '중성화 완료' : '중성화 미실시'}
            </p>
          </div>
        </div>
      )}

      {/* Validation Error Banner */}
      {errorMsg && (
        <div className="mb-6 p-3 bg-rose-50 rounded-2xl border border-rose-200 flex items-center gap-2 text-xs text-rose-700 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Image Selection */}
        <div>
          <label className="block text-xs font-bold text-[#26332B] mb-2">
            1. 프로필 사진 선택 (Profile Photo)
          </label>
          <div className="flex items-center gap-3">
            <img
              src={selectedPhoto}
              alt="선택된 프로필"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#6F9278] shadow-sm shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2 flex-wrap">
              {SAMPLE_AVATARS.map((avatar, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(avatar.url)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedPhoto === avatar.url
                      ? 'border-[#6F9278] bg-[#6F9278]/10 text-[#6F9278] font-bold shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <img src={avatar.url} alt="" className="w-5 h-5 rounded-lg object-cover" />
                  <span>{avatar.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Name & Breed (Required) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#26332B] mb-1.5">
              2. 이름 (Name) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="예: 콩이, 구름이, 토토"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-[#26332B] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#26332B] mb-1.5">
              3. 견종 (Breed) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={breed}
              onChange={e => setBreed(e.target.value)}
              placeholder="예: 비숑 프리제, 말티푸, 골든 리트리버"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-[#26332B] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278] transition-all"
            />
          </div>
        </div>

        {/* DOB & Weight (Required) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#26332B]">
                4. 생년월일 (DOB) <span className="text-rose-500">*</span>
              </label>
              {dob && (
                <span className="text-[11px] text-[#6F9278] font-semibold">
                  (현재 {calculateAge(dob)})
                </span>
              )}
            </div>
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="date"
                required
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-[#26332B] focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#26332B] mb-1.5">
              5. 몸무게 (Weight kg) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Scale className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="100"
                required
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="4.5"
                className="w-full pl-10 pr-12 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-[#26332B] focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278] transition-all"
              />
              <span className="absolute right-3.5 top-3 text-xs text-stone-400 font-medium">kg</span>
            </div>
          </div>
        </div>

        {/* Gender & Neutered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#26332B] mb-1.5">성별 (Gender)</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setGender('남아')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                  gender === '남아' ? 'bg-white text-[#26332B] shadow-xs font-bold' : 'text-stone-500'
                }`}
              >
                남아 ♂
              </button>
              <button
                type="button"
                onClick={() => setGender('여아')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                  gender === '여아' ? 'bg-white text-[#26332B] shadow-xs font-bold' : 'text-stone-500'
                }`}
              >
                여아 ♀
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#26332B] mb-1.5">중성화 여부 (Neutered)</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setIsNeutered(true)}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                  isNeutered ? 'bg-white text-[#6F9278] shadow-xs font-bold' : 'text-stone-500'
                }`}
              >
                완료 (Yes)
              </button>
              <button
                type="button"
                onClick={() => setIsNeutered(false)}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                  !isNeutered ? 'bg-white text-[#26332B] shadow-xs font-bold' : 'text-stone-500'
                }`}
              >
                미실시 (No)
              </button>
            </div>
          </div>
        </div>

        {/* Optional Allergies & Notes */}
        {!isCompact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#26332B] mb-1.5">알러지 정보 (Allergies)</label>
              <input
                type="text"
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                placeholder="예: 닭고기, 연어, 진드기"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#26332B] focus:ring-2 focus:ring-[#6F9278]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#26332B] mb-1.5">특이사항 / 건강 메모 (Notes)</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="예: 슬개골 1기 주의, 귀 청소 민감"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#26332B] focus:ring-2 focus:ring-[#6F9278]/30"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-3 flex items-center justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#6F9278] hover:bg-[#5b7a63] text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>반려견 등록 완료 및 로컬 DB 저장</span>
          </button>
        </div>
      </form>
    </div>
  );
};
