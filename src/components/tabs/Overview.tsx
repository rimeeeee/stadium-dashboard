import React from 'react';
import { Users, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { Zone } from '../../types/stadium';
import StadiumMap from '../StadiumMap';

interface OverviewProps {
  zones: Zone[];
  totalCapacity: number;
  totalOccupancy: number;
  totalStaff: number;
  recommendedTotalStaff: number;
  selectedZone?: string;
  onZoneClick: (zoneId: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ 
  zones, 
  totalCapacity, 
  totalOccupancy, 
  totalStaff, 
  recommendedTotalStaff,
  selectedZone,
  onZoneClick 
}) => {
  const occupancyRate = Math.round((totalOccupancy / totalCapacity) * 100);
  const staffShortage = Math.max(0, recommendedTotalStaff - totalStaff);
  
  const getOverallStatus = () => {
    if (occupancyRate >= 90) return { status: '매우혼잡', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (occupancyRate >= 75) return { status: '혼잡', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (occupancyRate >= 50) return { status: '보통', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: '여유', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const statusInfo = getOverallStatus();
  const criticalZones = zones.filter(zone => zone.density === 'critical' || zone.density === 'high');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">전체 운영 현황</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">실시간 AI 분석중</span>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">총 관중</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              {totalOccupancy.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              / {totalCapacity.toLocaleString()}석
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} ${statusInfo.bgColor}`}>
              {statusInfo.status} ({occupancyRate}%)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">총 배치 인력</h3>
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              {totalStaff}명
            </div>
            <div className="text-sm text-gray-500">
              / {recommendedTotalStaff}명 권장
            </div>
            {staffShortage > 0 && (
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-orange-600 bg-orange-100">
                {staffShortage}명 부족
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">평균 혼잡도</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              {occupancyRate}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  occupancyRate >= 90 ? 'bg-red-500' :
                  occupancyRate >= 75 ? 'bg-orange-500' :
                  occupancyRate >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">주의 구역</h3>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              {criticalZones.length}개
            </div>
            <div className="text-sm text-gray-500">
              혼잡/매우혼잡 구역
            </div>
            {criticalZones.length > 0 && (
              <div className="text-xs text-red-600">
                모니터링 필요
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 야구장 구역도 */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">야구장 구역도</h3>
        <StadiumMap 
          zones={zones} 
          onZoneClick={onZoneClick}
          selectedZone={selectedZone}
        />
      </div>

      {/* 구역별 실시간 혼잡도 */}
      {selectedZone && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4">선택된 구역 정보</h4>
          {zones
            .filter(zone => zone.id === selectedZone)
            .map(zone => (
              <div key={zone.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">{zone.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    zone.density === 'critical' ? 'text-red-700 bg-red-100' :
                    zone.density === 'high' ? 'text-orange-700 bg-orange-100' :
                    zone.density === 'medium' ? 'text-yellow-700 bg-yellow-100' :
                    'text-green-700 bg-green-100'
                  }`}>
                    {zone.density === 'critical' ? '매우혼잡' :
                     zone.density === 'high' ? '혼잡' :
                     zone.density === 'medium' ? '보통' : '여유'}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-blue-600">현재 관중</div>
                    <div className="font-bold text-blue-900">{zone.currentOccupancy.toLocaleString()}명</div>
                  </div>
                  <div>
                    <div className="text-blue-600">전체 좌석</div>
                    <div className="font-bold text-blue-900">{zone.totalSeats.toLocaleString()}석</div>
                  </div>
                  <div>
                    <div className="text-blue-600">점유율</div>
                    <div className="font-bold text-blue-900">
                      {Math.round((zone.currentOccupancy / zone.totalSeats) * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-600">배치 인력</div>
                    <div className="font-bold text-blue-900">{zone.staffCount}명</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 알림 및 권고사항 */}
      {(criticalZones.length > 0 || staffShortage > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            운영 알림 및 권고사항
          </h4>
          <div className="space-y-2 text-sm text-yellow-800">
            {criticalZones.length > 0 && (
              <div>
                • <strong>혼잡 구역 주의:</strong> {criticalZones.map(z => z.name).join(', ')} 구역의 혼잡도가 높습니다.
              </div>
            )}
            {staffShortage > 0 && (
              <div>
                • <strong>인력 부족:</strong> 현재 {staffShortage}명의 추가 인력이 필요합니다.
              </div>
            )}
            <div>
              • <strong>권장사항:</strong> 혼잡 구역의 관중 분산을 위해 안내 방송 및 디지털 사이니지 활용을 권장합니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;