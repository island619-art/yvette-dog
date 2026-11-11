import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Activity, Calendar, Stethoscope, Scale, Pill } from 'lucide-react';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'vaccine' | 'visit' | 'weight' | 'medication';
}

export const HealthModal: React.FC<HealthModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'vaccine',
}) => {
  const { 
    currentDog, 
    addVaccination, 
    addHospitalVisit, 
    addWeightRecord, 
    addMedication 
  } = useApp();

  const [activeRecordType, setActiveRecordType] = useState<'vaccine' | 'visit' | 'weight' | 'medication'>(defaultType);

  // Vaccine state
  const [vName, setVName] = useState('종합백신 (DHPPL)');
  const [vDate, setVDate] = useState(new Date().toISOString().split('T')[0]);
  const [vNextDate, setVNextDate] = useState('2027-11-10');
  const [vClinic, setVClinic] = useState('스마일 동물병원');
  const [vNotes, setVNotes] = useState('');

  // Hospital visit state
  const [hClinic, setHClinic] = useState('바른동물의료센터');
  const [hDate, setHDate] = useState(new Date().toISOString().split('T')[0]);
  const [hReason, setHReason] = useState('');
  const [hTreatment, setHTreatment] = useState('');
  const [hCost, setHCost] = useState<number>(35000);
  const [hPrescription, setHPrescription] = useState('');
  const [hNotes, setHNotes] = useState('');

  // Weight state
  const [wDate, setWDate] = useState(new Date().toISOString().split('T')[0]);
  const [wWeight, setWWeight] = useState<number>(currentDog?.weight || 4.8);
  const [wNotes, setWNotes] = useState('');

  // Medication state
  const [mName, setMName] = useState('');
  const [mDosage, setMDosage] = useState('1일 1회 1정');
  const [mTime, setMTime] = useState('아침 식후 30분');
  const [mStartDate, setMStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [mEndDate, setMEndDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [mNotes, setMNotes] = useState('');

  if (!isOpen || !currentDog) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeRecordType === 'vaccine') {
      addVaccination({
        dogId: currentDog.id,
        name: vName,
        date: vDate,
        nextDate: vNextDate,
        clinic: vClinic,
        notes: vNotes || undefined,
        isCompleted: true,
      });
    } else if (activeRecordType === 'visit') {
      addHospitalVisit({
        dogId: currentDog.id,
        date: hDate,
        clinic: hClinic,
        reason: hReason || '정기 검진',
        treatment: hTreatment || '기본 신체검사 및 문진',
        cost: Number(hCost) || 0,
        prescription: hPrescription || undefined,
        notes: hNotes || undefined,
      });
    } else if (activeRecordType === 'weight') {
      addWeightRecord({
        dogId: currentDog.id,
        date: wDate,
        weight: Number(wWeight) || currentDog.weight,
        notes: wNotes || undefined,
      });
    } else if (activeRecordType === 'medication') {
      if (!mName.trim()) {
        alert('약품 또는 영양제 이름을 입력해주세요.');
        return;
      }
      addMedication({
        dogId: currentDog.id,
        name: mName.trim(),
        dosage: mDosage,
        time: mTime,
        startDate: mStartDate,
        endDate: mEndDate,
        isTakenToday: false,
        notes: mNotes || undefined,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-stone-200 my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#6F9278]/15 flex items-center justify-center text-[#6F9278]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#26332B]">
                {currentDog.name}의 건강 기록 등록
              </h3>
              <p className="text-[11px] text-stone-400">정확한 기록은 수의사 진료 시 큰 도움이 됩니다</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Record Type Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-2xl mt-4 shrink-0 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveRecordType('vaccine')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
              activeRecordType === 'vaccine' ? 'bg-white font-bold text-[#6F9278] shadow-xs' : 'text-stone-500'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>예방접종</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveRecordType('visit')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
              activeRecordType === 'visit' ? 'bg-white font-bold text-[#6F9278] shadow-xs' : 'text-stone-500'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>병원진료</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveRecordType('weight')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
              activeRecordType === 'weight' ? 'bg-white font-bold text-[#6F9278] shadow-xs' : 'text-stone-500'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>체중측정</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveRecordType('medication')}
            className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
              activeRecordType === 'medication' ? 'bg-white font-bold text-[#6F9278] shadow-xs' : 'text-stone-500'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>복약/영양</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 mt-4 space-y-4">
          {/* VACCINE FORM */}
          {activeRecordType === 'vaccine' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">백신 종류</label>
                <select
                  value={vName}
                  onChange={e => setVName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6F9278]/30"
                >
                  <option value="종합백신 (DHPPL)">종합백신 (DHPPL)</option>
                  <option value="광견병 예방접종">광견병 예방접종</option>
                  <option value="켄넬코프 (전염성 기관지염)">켄넬코프 (전염성 기관지염)</option>
                  <option value="코로나 장염 백신">코로나 장염 백신</option>
                  <option value="신종플루 (인플루엔자)">신종플루 (인플루엔자)</option>
                  <option value="심장사상충 예방접종">심장사상충 예방 주사</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">접종일</label>
                  <input
                    type="date"
                    required
                    value={vDate}
                    onChange={e => setVDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">다음 접종 예정일</label>
                  <input
                    type="date"
                    required
                    value={vNextDate}
                    onChange={e => setVNextDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">접종 병원명</label>
                <input
                  type="text"
                  required
                  value={vClinic}
                  onChange={e => setVClinic(e.target.value)}
                  placeholder="예: 우리동네 동물병원"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">접종 메모 / 특이사항</label>
                <textarea
                  rows={2}
                  value={vNotes}
                  onChange={e => setVNotes(e.target.value)}
                  placeholder="이상 반응 유무, 주사 부위 마사지 여부 등"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
            </>
          )}

          {/* HOSPITAL VISIT FORM */}
          {activeRecordType === 'visit' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">방문 병원</label>
                  <input
                    type="text"
                    required
                    value={hClinic}
                    onChange={e => setHClinic(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">방문 날짜</label>
                  <input
                    type="date"
                    required
                    value={hDate}
                    onChange={e => setHDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">방문 사유 / 증상</label>
                <input
                  type="text"
                  required
                  value={hReason}
                  onChange={e => setHReason(e.target.value)}
                  placeholder="예: 귀 긁음, 구토 1회, 슬개골 정기검진"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">진료 및 처치 내용</label>
                <textarea
                  rows={2}
                  value={hTreatment}
                  onChange={e => setHTreatment(e.target.value)}
                  placeholder="예: 이경 검사 및 세정 드레싱, 방사선 촬영"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">진료비 (원)</label>
                  <input
                    type="number"
                    step="1000"
                    value={hCost}
                    onChange={e => setHCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">처방 약품</label>
                  <input
                    type="text"
                    value={hPrescription}
                    onChange={e => setHPrescription(e.target.value)}
                    placeholder="예: 소염진통제 5일분"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </>
          )}

          {/* WEIGHT FORM */}
          {activeRecordType === 'weight' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">측정일</label>
                  <input
                    type="date"
                    required
                    value={wDate}
                    onChange={e => setWDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">체중 (kg)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="120"
                    required
                    value={wWeight}
                    onChange={e => setWWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">측정 환경 및 메모</label>
                <input
                  type="text"
                  value={wNotes}
                  onChange={e => setWNotes(e.target.value)}
                  placeholder="예: 공복 아침 측정, 털 미용한 직후"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
            </>
          )}

          {/* MEDICATION FORM */}
          {activeRecordType === 'medication' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">약품 또는 보조제 이름</label>
                <input
                  type="text"
                  required
                  value={mName}
                  onChange={e => setMName(e.target.value)}
                  placeholder="예: 넥스가드 스펙트라, 관절영양제, 유산균"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">복용량</label>
                  <input
                    type="text"
                    value={mDosage}
                    onChange={e => setMDosage(e.target.value)}
                    placeholder="예: 1회 1정, 사료 1스푼"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">복용 시간</label>
                  <input
                    type="text"
                    value={mTime}
                    onChange={e => setMTime(e.target.value)}
                    placeholder="예: 아침 식후, 매월 10일"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">시작일</label>
                  <input
                    type="date"
                    value={mStartDate}
                    onChange={e => setMStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#26332B] mb-1">종료일</label>
                  <input
                    type="date"
                    value={mEndDate}
                    onChange={e => setMEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </>
          )}

          {/* Medical Notice */}
          <p className="text-[11px] text-stone-400 bg-stone-50 p-2.5 rounded-xl border border-stone-200 leading-relaxed">
            ※ 예방접종 및 복약 일정은 입력하신 정보를 기준으로 관리되며, 의학적 권장 주기를 시스템이 자동으로 확정하지 않습니다.
          </p>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#6F9278] hover:bg-[#5a7c63] rounded-xl shadow-sm"
            >
              기록 저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
