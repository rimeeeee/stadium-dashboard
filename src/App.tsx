import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/tabs/Overview';
import CrowdDensity from './components/tabs/CrowdDensity';
import StaffManagement from './components/tabs/StaffManagement';
import DigitalSignage from './components/tabs/DigitalSignage';
import DetailedStatus from './components/tabs/DetailedStatus';
import { stadiumData, demographicData } from './data/stadiumData';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedZone, setSelectedZone] = useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? undefined : zoneId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Overview
            zones={stadiumData.zones}
            totalCapacity={stadiumData.totalCapacity}
            totalOccupancy={stadiumData.totalOccupancy}
            totalStaff={stadiumData.totalStaff}
            recommendedTotalStaff={stadiumData.recommendedTotalStaff}
            selectedZone={selectedZone}
            onZoneClick={handleZoneClick}
          />
        );
      case 'crowd-density':
        return <CrowdDensity zones={stadiumData.zones} />;
      case 'staff-management':
        return (
          <StaffManagement
            zones={stadiumData.zones}
            totalStaff={stadiumData.totalStaff}
            recommendedTotalStaff={stadiumData.recommendedTotalStaff}
          />
        );
      case 'digital-signage':
        return (
          <DigitalSignage
            zones={stadiumData.zones}
            demographicData={demographicData}
          />
        );
      case 'detailed-status':
        return <DetailedStatus sections={stadiumData.sections} />;
      default:
        return (
          <Overview
            zones={stadiumData.zones}
            totalCapacity={stadiumData.totalCapacity}
            totalOccupancy={stadiumData.totalOccupancy}
            totalStaff={stadiumData.totalStaff}
            recommendedTotalStaff={stadiumData.recommendedTotalStaff}
            selectedZone={selectedZone}
            onZoneClick={handleZoneClick}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 좌측 사이드바 */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 상단 헤더 - 더 작게 만들기 */}
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* 좌측: 제목 */}
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">Dashboard</h1>
              <p className="text-xs text-gray-600 truncate">야구장 종합 운영 관리 시스템</p>
            </div>
            
            {/* 중앙: 로고들 - 작은 화면에서는 숨김 */}
            <div className="hidden lg:flex items-center justify-center gap-4 lg:gap-6 flex-1">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="STADIUM X Logo" 
                  className="w-12 h-12 lg:w-16 lg:h-16 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/twins.png" 
                  alt="LG TWINS Logo" 
                  className="h-6 lg:h-8 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
            
            {/* 우측: 상태 정보 */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className="text-xs text-gray-500 hidden sm:block">
                {new Date().toLocaleTimeString('ko-KR')}
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 - 전체 높이 사용 */}
        <main className="flex-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;