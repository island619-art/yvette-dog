import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import { 
  Gift, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Clock, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const { events, user, performAttendanceCheck } = useApp();
  const [attendanceMsg, setAttendanceMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleAttendanceClick = () => {
    const res = performAttendanceCheck();
    setAttendanceMsg({ text: res.message, success: res.success });
    setTimeout(() => setAttendanceMsg(null), 4000);
  };

  const today = new Date().toISOString().split('T')[0];
  const isCheckedInToday = user.lastAttendanceDate === today;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="pb-6 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Events & Rewards</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">이벤트 & 혜택</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            매일 출석체크 스탬프를 찍고 댕댕 포인트와 프리미엄 체험단 당첨 기회를 잡으세요!
          </p>
        </div>

        <div className="p-3 bg-[#F7F3EA] rounded-2xl border border-stone-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4B183] flex items-center justify-center text-[#26332B] font-bold">
            P
          </div>
          <div>
            <span className="text-[11px] text-stone-500">내 보유 댕댕 포인트</span>
            <p className="text-base font-extrabold text-[#26332B] font-mono">{user.points.toLocaleString()} P</p>
          </div>
        </div>
      </div>

      {/* Attendance Check-in Section */}
      <div className="bg-gradient-to-br from-[#6F9278] to-[#55765e] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B183]" />
            <span>11월 연속 출석 챌린지</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            오늘도 건강한 하루! 매일 출석체크하고 50P 받기
          </h2>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            매일 접속하여 강아지 건강 상태를 확인하고 도장을 찍어보세요. 7일 연속 출석 시 500 보너스 포인트가 지급됩니다!
          </p>

          {/* Attendance message alert */}
          {attendanceMsg && (
            <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
              attendanceMsg.success ? 'bg-white text-emerald-800' : 'bg-amber-100 text-amber-900'
            }`}>
              {attendanceMsg.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
              <span>{attendanceMsg.text}</span>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleAttendanceClick}
              disabled={isCheckedInToday}
              className={`px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
                isCheckedInToday
                  ? 'bg-white/30 text-white cursor-not-allowed'
                  : 'bg-[#F4B183] hover:bg-[#e89d6c] text-[#26332B]'
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isCheckedInToday ? '오늘 출석 완료 (내일 또 만나요!)' : '오늘 출석 스탬프 찍기 (+50P)'}</span>
            </button>
            <span className="text-xs text-white/80">
              현재 누적 <strong className="text-white underline">{user.attendanceDays}일</strong> 연속 출석 중
            </span>
          </div>

          {/* 7-day stamp grid preview */}
          <div className="grid grid-cols-7 gap-2 pt-4">
            {[1, 2, 3, 4, 5, 6, 7].map(day => {
              const isStamped = day <= (user.attendanceDays % 7 || (user.attendanceDays > 0 ? 7 : 0));
              return (
                <div
                  key={day}
                  className={`py-2 px-1 rounded-xl text-center border text-[11px] font-bold ${
                    isStamped
                      ? 'bg-white/95 text-[#6F9278] border-white shadow-xs'
                      : 'bg-white/10 text-white/60 border-white/20'
                  }`}
                >
                  <span className="block text-[9px] font-normal opacity-80">{day}일차</span>
                  <span>{isStamped ? '✓ 완료' : `+${day === 7 ? '500' : '50'}P`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#26332B]">진행 중인 이벤트 & 체험단</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(ev => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {ev.image && (
                  <div className="aspect-[16/9] relative bg-stone-100 overflow-hidden">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#26332B]">
                      {ev.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ev.isOfficial ? 'bg-emerald-600 text-white' : 'bg-stone-500 text-white'
                      }`}
                    >
                      {ev.isOfficial ? '공식 이벤트' : '샘플 이벤트'}
                    </span>
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-[#6F9278] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ev.period}
                  </span>
                  <h4 className="text-sm font-bold text-[#26332B] leading-snug">{ev.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{ev.description}</p>

                  {ev.reward && (
                    <div className="p-2.5 bg-[#F7F3EA] rounded-xl text-xs text-stone-700 font-medium">
                      🎁 혜택: {ev.reward}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => alert(`'${ev.title}' 이벤트에 참여 신청되었습니다!`)}
                  className="w-full py-2.5 bg-stone-100 hover:bg-[#6F9278] hover:text-white text-[#26332B] text-xs font-bold rounded-xl transition-colors"
                >
                  이벤트 참여하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
