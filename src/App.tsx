import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { HomeView } from './components/home/HomeView';
import { DogManagementView } from './components/dog/DogManagementView';
import { HealthRecordsView } from './components/health/HealthRecordsView';
import { PlacesView } from './components/places/PlacesView';
import { CommunityView } from './components/community/CommunityView';
import { ExpertView } from './components/expert/ExpertView';
import { ShopView } from './components/shop/ShopView';
import { EventsView } from './components/events/EventsView';
import { SupportView } from './components/support/SupportView';
import { AiAssistantView } from './components/ai/AiAssistantView';
import { MyPageView } from './components/mypage/MyPageView';
import { AdminView } from './components/admin/AdminView';
import { SearchModal } from './components/modals/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { NotificationModal } from './components/modals/NotificationModal';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    setIsSearchOpen, 
    setIsAuthOpen, 
    setIsNotificationsOpen 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#26332B] font-['Noto_Sans_KR',sans-serif]">
      {/* Top Navigation Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'dog' && <DogManagementView />}
        {activeTab === 'health' && <HealthRecordsView />}
        {activeTab === 'places' && <PlacesView />}
        {activeTab === 'community' && <CommunityView />}
        {activeTab === 'expert' && <ExpertView />}
        {activeTab === 'shop' && <ShopView />}
        {activeTab === 'events' && <EventsView />}
        {activeTab === 'support' && <SupportView />}
        {activeTab === 'ai' && <AiAssistantView />}
        {activeTab === 'mypage' && <MyPageView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Fixed Ergonomic Mobile Tab Bar */}
      <MobileTabBar />

      {/* Modals */}
      <SearchModal />
      <AuthModal />
      <NotificationModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
