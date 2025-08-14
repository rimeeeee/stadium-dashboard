import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zone } from '../../types/stadium';
import { Users, AlertTriangle, CheckCircle, TrendingUp, X, ArrowRight } from 'lucide-react';

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
  const [showOptimizationPopup, setShowOptimizationPopup] = useState(false);
  const [optimizationRecommendations, setOptimizationRecommendations] = useState<Array<{
    from: string;
    to: string;
    count: number;
    reason: string;
  }>>([]);
  const [optimizedZones, setOptimizedZones] = useState(zones);
  const [hasOptimized, setHasOptimized] = useState(false);

  const chartData = optimizedZones.map(zone => ({
    name: zone.name,
    current: zone.staffCount,
    recommended: zone.recommendedStaff,
    difference: zone.recommendedStaff - zone.staffCount
  }));

  const understaffedZones = optimizedZones.filter(zone => zone.staffCount < zone.recommendedStaff);
  const overstaffedZones = optimizedZones.filter(zone => zone.staffCount > zone.recommendedStaff);

  // 인력 재배치 적용 함수
  const applyOptimization = () => {
    const newZones = [...optimizedZones];
    
    optimizationRecommendations.forEach(rec => {
      const fromZone = newZones.find(zone => zone.name === rec.from);
      const toZone = newZones.find(zone => zone.name === rec.to);
      
      if (fromZone && toZone) {
        fromZone.staffCount -= rec.count;
        toZone.staffCount += rec.count;
      }
    });
    
    setOptimizedZones(newZones);
    setHasOptimized(true);
    setShowOptimizationPopup(false);
  };

  // 나중에 버튼 클릭 시
  const handleLater = () => {
    setShowOptimizationPopup(false);
  };

  // 효율화 추천 계산
  useEffect(() => {
    const recommendations: Array<{
      from: string;
      to: string;
      count: number;
      reason: string;
    }> = [];

    // 과잉 구역에서 부족 구역으로 이동 추천
    overstaffedZones.forEach(overZone => {
      const excess = overZone.staffCount - overZone.recommendedStaff;
      if (excess > 0) {
        understaffedZones.forEach(underZone => {
          const shortage = underZone.recommendedStaff - underZone.staffCount;
          if (shortage > 0) {
            const moveCount = Math.min(excess, shortage);
            if (moveCount > 0) {
              recommendations.push({
                from: overZone.name,
                to: underZone.name,
                count: moveCount,
                reason: `${overZone.name}에서 ${underZone.name}로 이동하여 효율성 향상`
              });
            }
          }
        });
      }
    });

    setOptimizationRecommendations(recommendations);
    
    // 효율화가 필요한 경우 팝업 표시 (최적화하지 않은 경우에만)
    if (recommendations.length > 0 && !hasOptimized) {
      setShowOptimizationPopup(true);
    }
  }, [overstaffedZones, understaffedZones, hasOptimized]);

  return (
    <div className="space-y-6">
      {/* 효율화 팝업 */}
      {showOptimizationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">인력 비효율화 발생</h3>
              </div>
              <button
                onClick={() => setShowOptimizationPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">
                AI 기반 재배치 추천
              </p>
              
              <div className="space-y-3">
                {optimizationRecommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">{rec.from}</span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">{rec.to}</span>
                    </div>
                    <div className="text-xs text-blue-700">
                      {rec.count}명 이동 권장
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleLater}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                나중에
              </button>
              <button
                onClick={applyOptimization}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
            )}
      
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

      {/* 최적화 완료 알림 */}
      {hasOptimized && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">인력 재배치가 완료되었습니다!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            AI 추천에 따라 인력이 효율적으로 재배치되었습니다.
          </p>
        </div>
      )}

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