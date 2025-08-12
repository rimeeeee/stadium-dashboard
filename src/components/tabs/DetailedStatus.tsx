import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { SectionDetail } from '../../types/stadium';
import { ClipboardList, Users, TrendingUp, ChevronDown } from 'lucide-react';

interface DetailedStatusProps {
  sections: SectionDetail[];
}

const DetailedStatus: React.FC<DetailedStatusProps> = ({ sections }) => {
  const [selectedZone, setSelectedZone] = useState<string>('1루 내야');

  // 구역별로 섹션들을 그룹화
  const groupedSections = {
    '1루 내야': sections.filter(s => 
      ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', 
       '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213',
       '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315'].includes(s.sectionNumber)
    ),
    '내야 중앙': sections.filter(s => 
      ['테라존', '1루 익사이팅석', '3루 익사이팅석', '316', '317', '318', '319'].includes(s.sectionNumber)
    ),
    '3루 내야': sections.filter(s => 
      ['112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122',
       '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225', '226',
       '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334'].includes(s.sectionNumber)
    ),
    '1루 외야': sections.filter(s => 
      ['401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411'].includes(s.sectionNumber)
    ),
    '3루 외야': sections.filter(s => 
      ['412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422'].includes(s.sectionNumber)
    )
  };

  const zoneOptions = Object.keys(groupedSections);
  const selectedSections = groupedSections[selectedZone as keyof typeof groupedSections];

  const getDensityColor = (density: number) => {
    if (density >= 95) return 'text-red-600 bg-red-100';
    if (density >= 80) return 'text-orange-600 bg-orange-100';
    if (density >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getDensityStatus = (density: number) => {
    if (density >= 95) return '매우혼잡';
    if (density >= 80) return '혼잡';
    if (density >= 60) return '보통';
    return '여유';
  };

  // 혼잡도 히트맵 색상을 더 대비되게 변경
  const getDensityHeatmapColor = (density: number) => {
    if (density >= 95) return 'bg-red-800';
    if (density >= 90) return 'bg-red-700';
    if (density >= 85) return 'bg-red-600';
    if (density >= 80) return 'bg-orange-600';
    if (density >= 75) return 'bg-orange-500';
    if (density >= 70) return 'bg-yellow-600';
    if (density >= 65) return 'bg-yellow-500';
    if (density >= 60) return 'bg-yellow-400';
    if (density >= 50) return 'bg-green-500';
    if (density >= 40) return 'bg-green-400';
    if (density >= 30) return 'bg-green-300';
    return 'bg-green-200';
  };

  // 상대적 혼잡도 히트맵 색상 (구역별 상세 탭에서만 사용)
  const getRelativeDensityHeatmapColor = (density: number, sections: SectionDetail[]) => {
    if (sections.length === 0) return 'bg-gray-400';
    
    const minDensity = Math.min(...sections.map(s => s.density));
    const maxDensity = Math.max(...sections.map(s => s.density));
    const range = maxDensity - minDensity;
    
    if (range === 0) return 'bg-gray-500'; // 모든 값이 같을 때
    
    // 현재 값의 상대적 위치 (0~1)
    const relativePosition = (density - minDensity) / range;
    
    // 전체 혼잡도 범위에 따라 기본 색상 결정
    const avgDensity = sections.reduce((sum, s) => sum + s.density, 0) / sections.length;
    
    if (avgDensity >= 80) {
      // 전체적으로 혼잡한 구역 - 빨간색 계열
      if (relativePosition >= 0.8) return 'bg-red-800';
      if (relativePosition >= 0.6) return 'bg-red-700';
      if (relativePosition >= 0.4) return 'bg-red-600';
      if (relativePosition >= 0.2) return 'bg-red-500';
      return 'bg-red-400';
    } else if (avgDensity >= 60) {
      // 전체적으로 보통인 구역 - 주황색 계열
      if (relativePosition >= 0.8) return 'bg-orange-600';
      if (relativePosition >= 0.6) return 'bg-orange-500';
      if (relativePosition >= 0.4) return 'bg-orange-400';
      if (relativePosition >= 0.2) return 'bg-orange-300';
      return 'bg-orange-200';
    } else {
      // 전체적으로 여유로운 구역 - 초록색 계열
      if (relativePosition >= 0.8) return 'bg-green-600';
      if (relativePosition >= 0.6) return 'bg-green-500';
      if (relativePosition >= 0.4) return 'bg-green-400';
      if (relativePosition >= 0.2) return 'bg-green-300';
      return 'bg-green-200';
    }
  };

  // 인력배치 차트 데이터
  const staffChartData = selectedSections.map(section => ({
    name: section.sectionNumber,
    staff: section.staffCount,
    density: section.density
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-600" />
          구역별 상세 현황
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          실시간 모니터링
        </div>
      </div>

      {/* 구역 선택 드롭다운 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          구역 선택
        </label>
        <div className="relative">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
          >
            {zoneOptions.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 선택된 구역 정보 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
          {selectedZone}
        </h3>
        
        {/* 구역별 상세 현황 테이블 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    구역번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총 좌석수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관중수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    혼잡도
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedSections.map((section) => (
                  <tr key={section.sectionNumber} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {section.sectionNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.totalSeats.toLocaleString()}석
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {section.currentOccupancy.toLocaleString()}명
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {section.density.toFixed(1)}%
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDensityColor(section.density)}`}>
                          {getDensityStatus(section.density)}
                        </span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="space-y-6">
          {/* 혼잡도 히트맵 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              {selectedZone} - 혼잡도 히트맵
            </h4>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {selectedSections.map((section) => {
                const heatmapColor = getRelativeDensityHeatmapColor(section.density, selectedSections);
                return (
                  <div key={section.sectionNumber} className="text-center">
                    <div className={`${heatmapColor} rounded-lg p-3 text-white shadow-sm transition-all duration-300 hover:scale-105`}>
                      <div className="text-xs font-bold mb-1">{section.sectionNumber}</div>
                      <div className="text-sm font-bold">{section.density.toFixed(0)}%</div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {section.currentOccupancy}명
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default DetailedStatus;