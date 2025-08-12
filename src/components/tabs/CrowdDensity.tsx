import React from 'react';
import { Zone } from '../../types/stadium';
import { Users, TrendingUp } from 'lucide-react';

interface CrowdDensityProps {
  zones: Zone[];
}

const CrowdDensity: React.FC<CrowdDensityProps> = ({ zones }) => {
  const getDensityStatus = (percentage: number) => {
    if (percentage >= 95) return { status: '매우혼잡', color: 'text-red-600 bg-red-100' };
    if (percentage >= 80) return { status: '혼잡', color: 'text-orange-600 bg-orange-100' };
    if (percentage >= 60) return { status: '보통', color: 'text-yellow-600 bg-yellow-100' };
    return { status: '여유', color: 'text-green-600 bg-green-100' };
  };

  const getDensityHeatmapColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-red-800';
    if (percentage >= 90) return 'bg-red-700';
    if (percentage >= 85) return 'bg-red-600';
    if (percentage >= 80) return 'bg-orange-600';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 70) return 'bg-yellow-600';
    if (percentage >= 65) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-yellow-400';
    if (percentage >= 50) return 'bg-green-500';
    if (percentage >= 40) return 'bg-green-400';
    if (percentage >= 30) return 'bg-green-300';
    return 'bg-green-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          구역별 실시간 관중 밀집도
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          실시간 업데이트
        </div>
      </div>

      {/* 전체 현황 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {zones.map((zone) => {
          const percentage = Math.round((zone.currentOccupancy / zone.totalSeats) * 100);
          const densityInfo = getDensityStatus(percentage);
          
          return (
            <div key={zone.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">{zone.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">현재 관중</span>
                  <span className="font-bold text-lg">{zone.currentOccupancy.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">전체 좌석</span>
                  <span className="text-sm text-gray-500">{zone.totalSeats.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage >= 95 ? 'bg-red-500' :
                      percentage >= 80 ? 'bg-orange-500' :
                      percentage >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${densityInfo.color}`}>
                    {densityInfo.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 혼잡도 히트맵 */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">구역별 혼잡도</h3>
        
        {/* 히트맵 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {zones.map((zone) => {
            const percentage = Math.round((zone.currentOccupancy / zone.totalSeats) * 100);
            const densityInfo = getDensityStatus(percentage);
            const heatmapColor = getDensityHeatmapColor(percentage);
            
            return (
              <div key={zone.id} className="relative">
                <div className={`${heatmapColor} rounded-lg p-6 text-white shadow-lg transition-all duration-300 hover:scale-105`}>
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-2">{zone.name}</h4>
                    <div className="text-3xl font-bold mb-1">{percentage}%</div>
                    <div className="text-sm opacity-90">
                      {zone.currentOccupancy.toLocaleString()}명 / {zone.totalSeats.toLocaleString()}석
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${densityInfo.color}`}>
                    {densityInfo.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        

      </div>

      {/* 혼잡도 알림 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <h4 className="font-semibold text-yellow-800">혼잡도 알림</h4>
        </div>
        <div className="text-sm text-yellow-700">
          <p>• 내야 중앙: 혼잡도 {Math.round((zones.find(z => z.id === 'home-plate')?.currentOccupancy || 0) / (zones.find(z => z.id === 'home-plate')?.totalSeats || 1) * 100)}% - 주의 필요</p>
          <p>• 1루 내야 구역: 혼잡도 {Math.round((zones.find(z => z.id === 'first-infield')?.currentOccupancy || 0) / (zones.find(z => z.id === 'first-infield')?.totalSeats || 1) * 100)}% - 모니터링 중</p>
        </div>
      </div>
    </div>
  );
};

export default CrowdDensity;