import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Calendar, Heart, Gift, ShieldAlert } from 'lucide-react';

export const NotificationModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, setActiveTab } = useApp();

  if (!isNotificationsOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      type: 'vaccine',
      icon: Calendar,
      title: '신종플루(인플루엔자) 접종 예정일 안내',
      description: '콩이의 인플루엔자 보강 접종 예정일이 15일 남았습니다. 동물병원 예약을 확인하세요.',
      time: '오늘 오전 09:00',
      actionTab: 'health',
      unread: true,
    },
    {
      id: 'notif-2',
      type: 'community',
      icon: Heart,
      title: '내 게시글에 새로운 댓글이 달렸습니다',
      description: '보리파파 님이 "가을 햇살 아래서 인생샷..." 글에 댓글을 남겼습니다.',
      time: '1시간 전',
      actionTab: 'community',
      unread: true,
    },
    {
      id: 'notif-3',
      type: 'event',
      icon: Gift,
      title: '연속 출석체크 보너스 500P 달성 임박!',
      description: '앞으로 2일 더 연속 출석하시면 보너스 500 포인트가 적립됩니다.',
      time: '어제',
      actionTab: 'events',
      unread: false,
    },
    {
      id: 'notif-4',
      type: 'alert',
      icon: ShieldAlert,
      title: '가을철 진드기 및 살인진드기 주의보 발령',
      description: '야외 잔디밭 산책 시 반드시 기피제 스프레이를 뿌리고 산책 후 빗질로 꼼꼼히 점검해주세요.',
      time: '3일 전',
      actionTab: 'expert',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl relative border border-stone-200 mt-14 animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#6F9278]" />
            <span className="font-bold text-sm text-[#26332B]">새로운 알림</span>
          </div>
          <button 
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {notifications.map(item => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveTab(item.actionTab as any);
                  setIsNotificationsOpen(false);
                }}
                className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                  item.unread
                    ? 'bg-[#F7F3EA]/70 border-[#6F9278]/20 hover:bg-[#F7F3EA]'
                    : 'bg-white border-stone-100 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#6F9278] shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-[#26332B] truncate">{item.title}</p>
                      {item.unread && <span className="w-1.5 h-1.5 bg-[#F4B183] rounded-full shrink-0" />}
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">{item.description}</p>
                    <p className="text-[10px] text-stone-400 mt-1">{item.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 text-center">
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="text-xs text-[#6F9278] font-semibold hover:underline"
          >
            모든 알림 읽음 표시
          </button>
        </div>
      </div>
    </div>
  );
};
