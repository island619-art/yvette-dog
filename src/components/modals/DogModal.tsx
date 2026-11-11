import React, { useState, useEffect } from 'react';
import { Dog } from '../../types';
import { X, Camera, Heart, AlertCircle } from 'lucide-react';

interface DogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dogData: Omit<Dog, 'id'>) => void;
  initialDog?: Dog | null;
}

const SAMPLE_AVATARS = [
  '/src/assets/images/dog_profile_sample_1794379968759.jpg',
  '/src/assets/images/hero_dog_park_1794379968344.jpg',
  '/src/assets/images/place_dog_cafe_1794379969714.jpg',
];

export const DogModal: React.FC<DogModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDog,
}) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('2023-01-01');
  const [gender, setGender] = useState<'남아' | '여아'>('남아');
  const [weight, setWeight] = useState<number>(4.5);
  const [isNeutered, setIsNeutered] = useState(true);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [microchipNumber, setMicrochipNumber] = useState('');
  const [allergies, setAllergies] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_AVATARS[0]);

  useEffect(() => {
    if (initialDog) {
      setName(initialDog.name);
      setBreed(initialDog.breed);
      setBirthDate(initialDog.birthDate);
      setGender(initialDog.gender);
      setWeight(initialDog.weight);
      setIsNeutered(initialDog.isNeutered);
      setRegistrationNumber(initialDog.registrationNumber || '');
      setMicrochipNumber(initialDog.microchipNumber || '');
      setAllergies(initialDog.allergies ? initialDog.allergies.join(', ') : '');
      setEmergencyContact(initialDog.emergencyContact || '');
      setNotes(initialDog.notes || '');
      setPhotoUrl(initialDog.photoUrl);
    } else {
      setName('');
      setBreed('');
      setBirthDate('2023-01-01');
      setGender('여아');
      setWeight(5.0);
      setIsNeutered(true);
      setRegistrationNumber('');
      setMicrochipNumber('');
      setAllergies('');
      setEmergencyContact('');
      setNotes('');
      setPhotoUrl(SAMPLE_AVATARS[0]);
    }
  }, [initialDog, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim()) {
      alert('강아지 이름과 견종을 입력해주세요.');
      return;
    }

    onSave({
      name: name.trim(),
      breed: breed.trim(),
      birthDate,
      gender,
      weight: Number(weight) || 4.0,
      isNeutered,
      registrationNumber: registrationNumber.trim() || undefined,
      microchipNumber: microchipNumber.trim() || undefined,
      allergies: allergies ? allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
      emergencyContact: emergencyContact.trim() || undefined,
      notes: notes.trim() || undefined,
      photoUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#6F9278]/15 flex items-center justify-center text-[#6F9278]">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#26332B]">
                {initialDog ? '반려견 정보 수정' : '새로운 우리 강아지 등록'}
              </h3>
              <p className="text-xs text-stone-400">우리 아이의 소중한 정보를 안전하게 등록하세요</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 mt-4 space-y-4">
          {/* Photo Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#26332B] mb-2">반려견 프로필 사진</label>
            <div className="flex items-center gap-4">
              <img
                src={photoUrl}
                alt="미리보기"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6F9278] shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="text-xs text-stone-500">사진 프리셋 선택</span>
                <div className="flex items-center gap-2">
                  {SAMPLE_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPhotoUrl(url)}
                      className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                        photoUrl === url ? 'border-[#6F9278] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 1: Name & Breed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">
                이름 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="예: 콩이, 보리"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">
                견종 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={breed}
                onChange={e => setBreed(e.target.value)}
                placeholder="예: 말티즈, 포메라니안, 진돗개"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
          </div>

          {/* Row 2: Birthdate, Gender, Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">생년월일</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">성별</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setGender('남아')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    gender === '남아' ? 'bg-white text-[#26332B] shadow-xs' : 'text-stone-500'
                  }`}
                >
                  남아
                </button>
                <button
                  type="button"
                  onClick={() => setGender('여아')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    gender === '여아' ? 'bg-white text-[#26332B] shadow-xs' : 'text-stone-500'
                  }`}
                >
                  여아
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">체중 (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="100"
                required
                value={weight}
                onChange={e => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
          </div>

          {/* Neutralized Toggle */}
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <p className="text-xs font-bold text-[#26332B]">중성화 수술 여부</p>
              <p className="text-[11px] text-stone-400">건강 관리 및 비만 예방 식단 기준에 참고됩니다</p>
            </div>
            <button
              type="button"
              onClick={() => setIsNeutered(!isNeutered)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                isNeutered ? 'bg-[#6F9278]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  isNeutered ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Microchip & Registration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">동물등록번호 (선택)</label>
              <input
                type="text"
                value={registrationNumber}
                onChange={e => setRegistrationNumber(e.target.value)}
                placeholder="4101000..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">마이크로칩 번호 (선택)</label>
              <input
                type="text"
                value={microchipNumber}
                onChange={e => setMicrochipNumber(e.target.value)}
                placeholder="MC-KR-..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
          </div>

          {/* Allergies & Emergency Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">식이 알러지 (쉼표로 구분)</label>
              <input
                type="text"
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                placeholder="예: 닭고기, 연어, 글루텐"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#26332B] mb-1">비상 연락망</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#26332B] mb-1">특이사항 및 건강 메모</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="예: 귀 청소 시 민감함, 슬개골 관리 필요, 낯선 소형견에게 경계심 등"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6F9278]/30 focus:border-[#6F9278]"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6F9278] hover:bg-[#5a7c63] rounded-xl shadow-sm transition-colors"
            >
              {initialDog ? '수정 완료' : '반려견 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
