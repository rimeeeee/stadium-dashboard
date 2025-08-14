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
    <div className="flex min-h-screen bg-gray-50">
      {/* 좌측 사이드바 */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            {/* 좌측: 제목 */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">야구장 종합 운영 관리 시스템</p>
            </div>
            
            {/* 중앙: 로고들 */}
            <div className="flex items-center justify-center gap-8 flex-1">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="STADIUM X Logo" 
                  className="w-32 h-32 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/twins.png" 
                  alt="LG TWINS Logo" 
                  className="h-16 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
            
            {/* 우측: 상태 정보 */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="text-sm text-gray-500">
                마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 px-8 py-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;