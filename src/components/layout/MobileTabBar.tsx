import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { Home, Heart, Activity, Users, User } from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { tab: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'home', label: '홈', icon: Home },
    { tab: 'dog', label: '아이 관리', icon: Heart },
    { tab: 'health', label: '건강 기록', icon: Activity },
    { tab: 'community', label: '커뮤니티', icon: Users },
    { tab: 'mypage', label: 'MY', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#26332B]/10 safe-area-pb">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        {tabs.map(({ tab, label, icon: Icon }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-colors ${
                isActive ? 'text-[#6F9278]' : 'text-stone-400 hover:text-stone-700'
              }`}
              aria-label={label}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[#6F9278]/10' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-[#6F9278]' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
