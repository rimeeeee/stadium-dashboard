import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zone } from '../../types/stadium';
import { Users, AlertTriangle, CheckCircle, TrendingUp, X, ArrowRight, Brain } from 'lucide-react';

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
    id: string;
  }>>([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
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
    if (selectedRecommendations.size === 0) {
      alert('적용할 추천사항을 선택해주세요.');
      return;
    }

    const newZones = [...optimizedZones];
    
    optimizationRecommendations.forEach(rec => {
      if (selectedRecommendations.has(rec.id)) {
        const fromZone = newZones.find(zone => zone.name === rec.from);
        const toZone = newZones.find(zone => zone.name === rec.to);
        
        if (fromZone && toZone) {
          fromZone.staffCount -= rec.count;
          toZone.staffCount += rec.count;
        }
      }
    });
    
    setOptimizedZones(newZones);
    setHasOptimized(true);
    setShowOptimizationPopup(false);
    setSelectedRecommendations(new Set());
  };

  // 체크박스 토글 함수
  const toggleRecommendation = (id: string) => {
    const newSelected = new Set(selectedRecommendations);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRecommendations(newSelected);
  };

  // 나중에 버튼 클릭 시
  const handleLater = () => {
    setShowOptimizationPopup(false);
    setSelectedRecommendations(new Set());
  };

  // 효율화 추천 계산 함수
  const calculateOptimization = () => {
    const recommendations: Array<{
      from: string;
      to: string;
      count: number;
      reason: string;
      id: string;
    }> = [];

    // 과잉 구역과 부족 구역을 정렬하여 효율적으로 매칭
    const sortedOverstaffed = [...overstaffedZones].sort((a, b) => 
      (b.staffCount - b.recommendedStaff) - (a.staffCount - a.recommendedStaff)
    );
    
    const sortedUnderstaffed = [...understaffedZones].sort((a, b) => 
      (a.recommendedStaff - a.staffCount) - (b.recommendedStaff - b.staffCount)
    );

    const usedFromZones = new Set<string>();
    const usedToZones = new Set<string>();

    // 과잉 구역에서 부족 구역으로 이동 추천 (중복 방지)
    sortedOverstaffed.forEach(overZone => {
      if (usedFromZones.has(overZone.name)) return;
      
      const excess = overZone.staffCount - overZone.recommendedStaff;
      if (excess > 0) {
        for (const underZone of sortedUnderstaffed) {
          if (usedToZones.has(underZone.name)) continue;
          
          const shortage = underZone.recommendedStaff - underZone.staffCount;
          if (shortage > 0) {
            const moveCount = Math.min(excess, shortage);
            if (moveCount > 0) {
              const recommendationId = `${overZone.name}-${underZone.name}-${moveCount}`;
              recommendations.push({
                from: overZone.name,
                to: underZone.name,
                count: moveCount,
                reason: `${overZone.name}에서 ${underZone.name}로 이동하여 효율성 향상`,
                id: recommendationId
              });
              
              usedFromZones.add(overZone.name);
              usedToZones.add(underZone.name);
              break; // 이 과잉 구역은 한 번만 사용
            }
          }
        }
      }
    });

    setOptimizationRecommendations(recommendations);
    setShowOptimizationPopup(true);
  };

  return (
    <div className="h-full overflow-auto space-y-2 sm:space-y-3">
      {/* 효율화 팝업 */}
      {showOptimizationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">AI 인력 재배치 추천</h3>
              </div>
              <button
                onClick={() => setShowOptimizationPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                효율적인 인력 배치를 위한 AI 추천사항
              </p>
              
              <div className="space-y-3">
                {optimizationRecommendations.slice(0, 3).map((rec, index) => (
                  <div key={rec.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={rec.id}
                          checked={selectedRecommendations.has(rec.id)}
                          onChange={() => toggleRecommendation(rec.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-xs sm:text-sm font-medium text-blue-900">{rec.from}</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mx-2" />
                          <span className="text-xs sm:text-sm font-medium text-blue-900">{rec.to}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-blue-700 mt-2 ml-7">
                      {rec.count}명 이동 권장
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleLater}
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                나중에
              </button>
              <button
                onClick={applyOptimization}
                className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                disabled={selectedRecommendations.size === 0}
              >
                적용하기 ({selectedRecommendations.size}개 선택)
              </button>
            </div>
          </div>
        </div>
            )}
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
        <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
          인력 배치 현황
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            실시간 AI 분석중
          </div>
          {(overstaffedZones.length > 0 || understaffedZones.length > 0) && (
            <button
              onClick={calculateOptimization}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
            >
              <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
              AI 재배치
            </button>
          )}
        </div>
      </div>

      {/* 최적화 완료 알림 */}
      {hasOptimized && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
          <div className="flex items-center gap-2">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            <span className="text-green-800 font-medium text-xs sm:text-sm">AI 인력 재배치가 완료되었습니다!</span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            AI 추천에 따라 인력이 효율적으로 재배치되었습니다.
          </p>
        </div>
      )}

      {/* 전체 인력 현황 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">현재 총 배치 인력</h3>
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{totalStaff}명</div>
          <p className="text-xs text-gray-600">현재 근무 중인 전체 인력</p>
        </div>

        <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">권장 총 배치 인력</h3>
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">{recommendedTotalStaff}명</div>
          <p className="text-xs text-gray-600">최적 운영을 위한 권장 인력</p>
          {totalStaff < recommendedTotalStaff && (
            <div className="mt-1 text-xs text-orange-600 font-medium">
              {recommendedTotalStaff - totalStaff}명 부족
            </div>
          )}
        </div>
      </div>

      {/* 구역별 인력 배치 현황 - 사람 픽토그램 */}
      <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">구역별 인력 배치 현황</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {chartData.map((zone) => {
            const percentage = Math.round((zone.current / zone.recommended) * 100);
            const getFillColor = (percent: number) => {
              if (percent >= 100) return 'text-green-600';
              if (percent >= 80) return 'text-blue-600';
              if (percent >= 60) return 'text-yellow-600';
              return 'text-red-600';
            };
            
            return (
              <div key={zone.name} className="text-center p-2 sm:p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">{zone.name}</h4>
                
                {/* 사람 픽토그램 */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3">
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
                <div className={`text-sm sm:text-base font-bold ${getFillColor(percentage)} mb-1 sm:mb-2`}>
                  {percentage}%
                </div>
                
                {/* 인력 수치 */}
                <div className="text-xs text-gray-600 space-y-0.5">
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
                <div className="mt-2">
                  {percentage >= 100 ? (
                    <div className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {percentage > 100 ? '초과' : '충분'}
                    </div>
                  ) : percentage >= 80 ? (
                    <div className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      양호
                    </div>
                  ) : percentage >= 60 ? (
                    <div className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      주의
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
        {/* 인력 부족 구역 */}
        <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">인력 부족 구역</h3>
          </div>
          {understaffedZones.length > 0 ? (
            <div className="space-y-2">
              {understaffedZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-1.5 sm:p-2 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <div className="font-medium text-gray-900 text-xs sm:text-sm">{zone.name}</div>
                    <div className="text-xs text-gray-600">
                      현재: {zone.staffCount}명 / 권장: {zone.recommendedStaff}명
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600 text-xs">
                      +{zone.recommendedStaff - zone.staffCount}명 필요
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 sm:py-6 text-gray-500 text-xs sm:text-sm">
              인력이 부족한 구역이 없습니다.
            </div>
          )}
        </div>

        {/* 인력 과잉 구역 */}
        <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">인력 과잉 구역</h3>
          </div>
          {overstaffedZones.length > 0 ? (
            <div className="space-y-2">
              {overstaffedZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-1.5 sm:p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <div className="font-medium text-gray-900 text-xs sm:text-sm">{zone.name}</div>
                    <div className="text-xs text-gray-600">
                      현재: {zone.staffCount}명 / 권장: {zone.recommendedStaff}명
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600 text-xs">
                      -{zone.staffCount - zone.recommendedStaff}명 초과
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 sm:py-6 text-gray-500 text-xs sm:text-sm">
              인력이 과잉인 구역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;