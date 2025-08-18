import React from 'react';
import { Home, Users, BarChart3, Monitor, ClipboardList, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen = true, onToggle }) => {
  const menuItems = [
    { id: 'overview', label: '전체현황', icon: Home },
    { id: 'crowd-density', label: '관중밀집도', icon: Users },
    { id: 'staff-management', label: '인력배치', icon: BarChart3 },
    { id: 'digital-signage', label: '디지털\n사이니지', icon: Monitor },
    { id: 'detailed-status', label: '구역별상세', icon: ClipboardList }
  ];

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* 사이드바 */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-gray-900 min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-20 sm:w-24
      `}>
        {/* 헤더 */}
        <div className="p-2 sm:p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          {onToggle && (
            <button
              onClick={onToggle}
              className="lg:hidden p-1 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* 네비게이션 */}
        <nav className="flex-1 py-3 sm:py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  // 모바일에서 탭 클릭 시 사이드바 닫기
                  if (onToggle && window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`w-full p-2 sm:p-3 flex flex-col items-center gap-1 sm:gap-2 transition-colors relative ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs font-medium text-center leading-tight px-1 break-words min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center whitespace-pre-line">
                  {item.label}
                </span>
                {activeTab === item.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-green-400 rounded-l"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* 모바일 메뉴 버튼 */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-30 lg:hidden p-2 bg-gray-900 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Sidebar;