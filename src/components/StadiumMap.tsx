import React, { useState } from 'react';
import { Zone } from '../types/stadium';

interface StadiumMapProps {
  zones: Zone[];
  onZoneClick: (zoneId: string) => void;
  selectedZone?: string;
}

const StadiumMap: React.FC<StadiumMapProps> = ({ zones, onZoneClick, selectedZone }) => {
  const [filterStatus, setFilterStatus] = useState<string>('전체 상태');

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getDensityStatus = (density: string) => {
    switch (density) {
      case 'critical': return '혼잡';
      case 'high': return '혼잡';
      case 'medium': return '보통';
      case 'low': return '여유';
      default: return '보통';
    }
  };

  const getZoneById = (id: string) => zones.find(zone => zone.id === id);

  // Zone 데이터 정의 (실제 좌석 배치 기반)
  const zoneData = [
    { id: 'zone-1', name: 'Zone 1', areas: ['테라존', '110-111', '212-213', '112-113', '214-215'], density: 'medium' },
    { id: 'zone-2', name: 'Zone 2', areas: ['314-321'], density: 'low' },
    { id: 'zone-3', name: 'Zone 3', areas: ['107-109', '209-211', '310-313'], density: 'high' },
    { id: 'zone-4', name: 'Zone 4', areas: ['101-106', '201-208', '301-312'], density: 'critical' },
    { id: 'zone-5', name: 'Zone 5', areas: ['114-116', '216-218', '322-325'], density: 'medium' },
    { id: 'zone-6', name: 'Zone 6', areas: ['117-122', '219-226', '326-334'], density: 'low' },
    { id: 'zone-7', name: 'Zone 7', areas: ['422-412'], density: 'medium' },
    { id: 'zone-8', name: 'Zone 8', areas: ['401-411'], density: 'high' },
  ];

  // 필터링된 Zone 데이터
  const filteredZoneData = zoneData.filter(zone => {
    if (filterStatus === '전체 상태') return true;
    return getDensityStatus(zone.density) === filterStatus;
  });

  return (
    <div className="flex gap-6">
      {/* 메인 구장 지도 */}
      <div className="flex-1">
        <div className="relative w-full aspect-[4/3] bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
          {/* 경기장 배경 이미지 */}
          <div className="absolute inset-0">
            <img 
              src="/stadium.png" 
              alt="야구장 배경" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Zone별 혼잡도 표시 */}
          {zoneData.map((zone, index) => {
            const positions = [
              { bottom: '30%', left: '51.5%', transform: 'translateX(-50%)' }, // Zone 1 (가운데 아래)
              { bottom: '15%', left: '50%', transform: 'translateX(-50%)' }, // Zone 2 (zone1 아래)
              { bottom: '27%', right: '30%' }, // Zone 3 (zone1 오른편, 더 높게)
              { bottom: '45%', right: '25%' }, // Zone 4 (zone3보다 높게)
              { bottom: '27%', left: '33%' }, // Zone 5 (zone1 왼편, 더 높게)
              { bottom: '45%', left: '27%' }, // Zone 6 (zone5보다 높게)
              { top: '12%', left: '33%' }, // Zone 7 (3루 외야)
              { top: '12%', right: '33%' }, // Zone 8 (1루 외야)
            ];

            const pos = positions[index] || { top: '50%', left: '50%' };
            
            return (
              <div
                key={zone.id}
                className="absolute flex flex-col items-center"
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                  transform: pos.transform,
                }}
              >
                <div className="bg-black bg-opacity-80 px-3 py-2 rounded-lg shadow-lg">
                  <div className="text-white text-xs font-bold mb-2 text-center">{zone.name}</div>
                  <div
                    className={`w-3 h-3 rounded-full ${getDensityColor(zone.density)} shadow-lg mx-auto`}
                    title={`${zone.areas.join(', ')} - ${zone.density}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 범례 */}
        <div className="mt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">여유</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">보통</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-sm text-gray-700">혼잡</span>
          </div>
        </div>
      </div>

      {/* 우측 상태 패널 */}
      <div className="w-80 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">구역별 상태</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">실시간</span>
          </div>
        </div>

        {/* 필터 */}
        <div className="mb-4">
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>전체 상태</option>
            <option>혼잡</option>
            <option>보통</option>
            <option>여유</option>
          </select>
        </div>

        {/* 구역 목록 */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredZoneData.map((zone) => (
            <div
              key={zone.id}
              className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${
                selectedZone === zone.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
              onClick={() => onZoneClick(zone.id)}
            >
                          <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 mb-1">{zone.name}</div>
              <div className="text-xs text-gray-500 break-words leading-tight">
                {zone.areas.join(', ')}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              <div className={`w-3 h-3 rounded-full ${getDensityColor(zone.density)} shadow-lg`}></div>
              <span className="text-xs text-gray-600">{getDensityStatus(zone.density)}</span>
            </div>
            </div>
          ))}
        </div>

        {/* 하단 브랜딩 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="STADIUM X Logo" className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-2">
              <img src="/twins.png" alt="LG TWINS Logo" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumMap;