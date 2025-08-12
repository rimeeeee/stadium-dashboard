import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Zone } from '../../types/stadium';
import { DemographicData } from '../../types/stadium';
import { Monitor, Users, Target, Lightbulb } from 'lucide-react';

interface DigitalSignageProps {
  zones: Zone[];
  demographicData: { [key: string]: DemographicData };
}

const DigitalSignage: React.FC<DigitalSignageProps> = ({ zones, demographicData }) => {
  const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

  const getContentRecommendations = (zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    const demo = demographicData[zoneId];
    
    if (!zone || !demo) return [];

    const recommendations = [];
    
    // 성별 기반 추천
    if (demo.gender.male > 60) {
      recommendations.push('남성 타겟 스포츠 용품 광고');
    } else if (demo.gender.female > 50) {
      recommendations.push('가족 친화적 이벤트 정보');
    }

    // 연령대 기반 추천
    const dominantAge = Object.entries(demo.ageGroups).reduce((a, b) => 
      demo.ageGroups[a[0]] > demo.ageGroups[b[0]] ? a : b
    );
    
    switch (dominantAge[0]) {
      case '10대':
        recommendations.push('청소년 할인 이벤트', 'SNS 이벤트 참여 안내');
        break;
      case '20대':
        recommendations.push('커플석 프로모션', '야구 굿즈 할인');
        break;
      case '30대':
        recommendations.push('가족 패키지 상품', '키즈존 이용 안내');
        break;
      case '40대':
      case '50대+':
        recommendations.push('프리미엄 좌석 안내', '클래식 야구 영상');
        break;
    }

    // 밀집도 기반 추천
    if (zone.density === 'high' || zone.density === 'critical') {
      recommendations.push('혼잡 시간대 피하기', '다른 구역 매점 이용 안내');
    } else if (zone.density === 'low') {
      recommendations.push('현재 구역 매점 할인', '편의시설 이용 안내');
    }

    return recommendations.slice(0, 3); // 최대 3개까지
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Monitor className="w-6 h-6 text-blue-600" />
          디지털 사이니지
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          맞춤 콘텐츠 추천
        </div>
      </div>

      {/* 구역별 관중 인구 통계 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 성별 분포 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            전체 구역 성별 분포
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '남성', value: 60 },
                    { name: '여성', value: 40 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 연령대 분포 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            전체 구역 연령대 분포
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '10대', value: 20 },
                    { name: '20대', value: 35 },
                    { name: '30대', value: 25 },
                    { name: '40대', value: 15 },
                    { name: '50대+', value: 5 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 구역별 맞춤 콘텐츠 추천 */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          구역별 맞춤 콘텐츠 추천
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => {
            const recommendations = getContentRecommendations(zone.id);
            const demo = demographicData[zone.id];
            
            return (
              <div key={zone.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    zone.density === 'high' ? 'bg-orange-100 text-orange-800' :
                    zone.density === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {zone.density === 'high' ? '혼잡' : 
                     zone.density === 'medium' ? '보통' : '여유'}
                  </div>
                </div>
                
                {demo && (
                  <div className="text-xs text-gray-600 mb-3">
                    <div>남성: {demo.gender.male}% | 여성: {demo.gender.female}%</div>
                    <div>주요 연령대: {Object.entries(demo.ageGroups).reduce((a, b) => 
                      demo.ageGroups[a[0]] > demo.ageGroups[b[0]] ? a : b
                    )[0]}</div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-800">추천 콘텐츠:</div>
                  {recommendations.map((rec, index) => (
                    <div key={index} className="text-xs bg-blue-50 text-blue-800 p-2 rounded">
                      • {rec}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 실시간 콘텐츠 현황 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <h4 className="font-semibold text-blue-900">실시간 콘텐츠 업데이트 현황</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-blue-700 font-medium">활성 디스플레이</div>
            <div className="text-2xl font-bold text-blue-900">24개</div>
          </div>
          <div>
            <div className="text-blue-700 font-medium">실시간 업데이트</div>
            <div className="text-2xl font-bold text-blue-900">98%</div>
          </div>
          <div>
            <div className="text-blue-700 font-medium">맞춤 광고 노출</div>
            <div className="text-2xl font-bold text-blue-900">156건</div>
          </div>
          <div>
            <div className="text-blue-700 font-medium">평균 조회시간</div>
            <div className="text-2xl font-bold text-blue-900">4.2초</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignage;