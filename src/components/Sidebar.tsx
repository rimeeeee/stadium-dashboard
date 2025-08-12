import React from 'react';
import { Home, Users, BarChart3, Monitor, ClipboardList } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'overview', label: '전체현황', icon: Home },
    { id: 'crowd-density', label: '관중밀집도', icon: Users },
    { id: 'staff-management', label: '인력배치', icon: BarChart3 },
    { id: 'digital-signage', label: '디지털\n사이니지', icon: Monitor },
    { id: 'detailed-status', label: '구역별상세', icon: ClipboardList }
  ];

  return (
    <div className="w-24 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full p-3 flex flex-col items-center gap-2 transition-colors relative ${
                activeTab === item.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-medium text-center leading-tight px-1 break-words min-h-[2.5rem] flex items-center justify-center whitespace-pre-line">
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
  );
};

export default Sidebar;