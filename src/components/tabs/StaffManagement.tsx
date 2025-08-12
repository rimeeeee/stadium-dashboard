import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zone } from '../../types/stadium';
import { Users, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface StaffManagementProps {
  zones: Zone[];
  totalStaff: number;
  recommendedTotalStaff: number;
}

const StaffManagement: React.FC<StaffManagementProps> = ({ 
  zones, 
  totalStaff, 
  recommendedTotalStaff 
}) => {
  const chartData = zones.map(zone => ({
    name: zone.name,
    current: zone.staffCount,
    recommended: zone.recommendedStaff,
    difference: zone.recommendedStaff - zone.staffCount
  }));

  const understaffedZones = zones.filter(zone => zone.staffCount < zone.recommendedStaff);
  const overstaffedZones = zones.filter(zone => zone.staffCount > zone.recommendedStaff);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          인력 배치 현황
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          실시간 AI 분석중
        </div>
      </div>

      {/* 전체 인력 현황 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">현재 총 배치 인력</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">{totalStaff}명</div>
          <p className="text-sm text-gray-600">현재 근무 중인 전체 인력</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">권장 총 배치 인력</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{recommendedTotalStaff}명</div>
          <p className="text-sm text-gray-600">최적 운영을 위한 권장 인력</p>
          {totalStaff < recommendedTotalStaff && (
            <div className="mt-2 text-sm text-orange-600 font-medium">
              {recommendedTotalStaff - totalStaff}명 부족
            </div>
          )}
        </div>
      </div>

      {/* 구역별 인력 배치 현황 - 사람 픽토그램 */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">구역별 인력 배치 현황</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartData.map((zone) => {
            const percentage = Math.round((zone.current / zone.recommended) * 100);
            const getFillColor = (percent: number) => {
              if (percent >= 100) return 'text-green-600';
              if (percent >= 80) return 'text-blue-600';
              if (percent >= 60) return 'text-yellow-600';
              return 'text-red-600';
            };
            
            return (
              <div key={zone.name} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-4">{zone.name}</h4>
                
                {/* 사람 픽토그램 */}
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    {/* 사람 실루엣 배경 */}
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      fill="#e5e7eb"
                      className="transition-all duration-300"
                    />
                    {/* 채워진 부분 */}
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      fill="currentColor"
                      className={`${getFillColor(percentage)} transition-all duration-300`}
                      style={{
                        clipPath: `inset(${Math.max(0, 100 - percentage)}% 0 0 0)`
                      }}
                    />
                  </svg>
                </div>
                
                {/* 백분율 표시 */}
                <div className={`text-lg font-bold ${getFillColor(percentage)} mb-2`}>
                  {percentage}%
                </div>
                
                {/* 인력 수치 */}
                <div className="text-sm text-gray-600 space-y-1">
                  <div>현재: {zone.current}명</div>
                  <div>권장: {zone.recommended}명</div>
                  {zone.difference !== 0 && (
                    <div className={`text-xs font-medium ${
                      zone.difference > 0 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {zone.difference > 0 ? `+${zone.difference}명 부족` : `${Math.abs(zone.difference)}명 초과`}
                    </div>
                  )}
                </div>
                
                {/* 상태 표시 */}
                <div className="mt-3">
                  {percentage >= 100 ? (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {percentage > 100 ? '초과' : '충분'}
                    </div>
                  ) : percentage >= 80 ? (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      양호
                    </div>
                  ) : percentage >= 60 ? (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      주의
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      부족
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 인력 조정 권장사항 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 인력 부족 구역 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">인력 부족 구역</h3>
          </div>
          {understaffedZones.length > 0 ? (
            <div className="space-y-3">
              {understaffedZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <div className="font-medium text-gray-900">{zone.name}</div>
                    <div className="text-sm text-gray-600">
                      현재: {zone.staffCount}명 / 권장: {zone.recommendedStaff}명
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600">
                      +{zone.recommendedStaff - zone.staffCount}명 필요
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              인력이 부족한 구역이 없습니다.
            </div>
          )}
        </div>

        {/* 인력 과잉 구역 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">인력 과잉 구역</h3>
          </div>
          {overstaffedZones.length > 0 ? (
            <div className="space-y-3">
              {overstaffedZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <div className="font-medium text-gray-900">{zone.name}</div>
                    <div className="text-sm text-gray-600">
                      현재: {zone.staffCount}명 / 권장: {zone.recommendedStaff}명
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      -{zone.staffCount - zone.recommendedStaff}명 초과
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              인력이 과잉인 구역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;