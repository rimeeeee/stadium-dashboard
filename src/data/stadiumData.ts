import { StadiumData, DemographicData } from '../types/stadium';

export const stadiumData: StadiumData = {
  totalCapacity: 23750,
  totalOccupancy: 18200,
  totalStaff: 108,
  recommendedTotalStaff: 105,
  zones: [
    {
      id: 'home-plate',
      name: '내야 중앙',
      sections: ['테라존', '1루 익사이팅석', '3루 익사이팅석', '316', '317', '318', '319'],
      totalSeats: 1656, // 256+100+100+400+420+410+400
      currentOccupancy: 1520,
      density: 'high',
      staffCount: 22,
      recommendedStaff: 25
    },
    {
      id: 'first-infield',
      name: '1루 내야',
      sections: ['101-111', '201-213', '301-315'],
      totalSeats: 6838, // 계산된 합계
      currentOccupancy: 5850,
      density: 'high',
      staffCount: 32,
      recommendedStaff: 35
    },
    {
      id: 'third-infield',
      name: '3루 내야',
      sections: ['112-122', '214-226', '320-334'],
      totalSeats: 6426, // 계산된 합계
      currentOccupancy: 5200,
      density: 'medium',
      staffCount: 35,
      recommendedStaff: 32
    },
    {
      id: 'first-outfield',
      name: '1루 외야',
      sections: ['401-411'],
      totalSeats: 2640, // 계산된 합계
      currentOccupancy: 1850,
      density: 'medium',
      staffCount: 12,
      recommendedStaff: 8
    },
    {
      id: 'third-outfield',
      name: '3루 외야',
      sections: ['412-422'],
      totalSeats: 3190, // 계산된 합계
      currentOccupancy: 1780,
      density: 'low',
      staffCount: 8,
      recommendedStaff: 5
    }
  ],
  sections: [
    // 내야 중앙
    { sectionNumber: '테라존', totalSeats: 256, currentOccupancy: 245, density: 95.7, staffCount: 8 },
    { sectionNumber: '1루 익사이팅석', totalSeats: 100, currentOccupancy: 92, density: 92.0, staffCount: 3 },
    { sectionNumber: '3루 익사이팅석', totalSeats: 100, currentOccupancy: 88, density: 88.0, staffCount: 3 },
    { sectionNumber: '316', totalSeats: 400, currentOccupancy: 380, density: 95.0, staffCount: 2 },
    { sectionNumber: '317', totalSeats: 420, currentOccupancy: 395, density: 94.0, staffCount: 2 },
    { sectionNumber: '318', totalSeats: 410, currentOccupancy: 385, density: 93.9, staffCount: 2 },
    { sectionNumber: '319', totalSeats: 400, currentOccupancy: 375, density: 93.8, staffCount: 2 },
    
    // 1루 내야
    { sectionNumber: '101', totalSeats: 290, currentOccupancy: 275, density: 94.8, staffCount: 3 },
    { sectionNumber: '102', totalSeats: 230, currentOccupancy: 210, density: 91.3, staffCount: 2 },
    { sectionNumber: '103', totalSeats: 230, currentOccupancy: 220, density: 95.7, staffCount: 3 },
    { sectionNumber: '104', totalSeats: 230, currentOccupancy: 215, density: 93.5, staffCount: 2 },
    { sectionNumber: '105', totalSeats: 190, currentOccupancy: 180, density: 94.7, staffCount: 2 },
    { sectionNumber: '106', totalSeats: 160, currentOccupancy: 148, density: 92.5, staffCount: 2 },
    { sectionNumber: '107', totalSeats: 140, currentOccupancy: 125, density: 89.3, staffCount: 2 },
    { sectionNumber: '108', totalSeats: 120, currentOccupancy: 110, density: 91.7, staffCount: 2 },
    { sectionNumber: '109', totalSeats: 100, currentOccupancy: 92, density: 92.0, staffCount: 1 },
    { sectionNumber: '110', totalSeats: 48, currentOccupancy: 42, density: 87.5, staffCount: 1 },
    { sectionNumber: '111', totalSeats: 70, currentOccupancy: 65, density: 92.9, staffCount: 1 },
    
    { sectionNumber: '201', totalSeats: 250, currentOccupancy: 235, density: 94.0, staffCount: 2 },
    { sectionNumber: '202', totalSeats: 170, currentOccupancy: 155, density: 91.2, staffCount: 2 },
    { sectionNumber: '203', totalSeats: 180, currentOccupancy: 165, density: 91.7, staffCount: 2 },
    { sectionNumber: '204', totalSeats: 200, currentOccupancy: 185, density: 92.5, staffCount: 2 },
    { sectionNumber: '205', totalSeats: 190, currentOccupancy: 175, density: 92.1, staffCount: 2 },
    { sectionNumber: '206', totalSeats: 220, currentOccupancy: 200, density: 90.9, staffCount: 2 },
    { sectionNumber: '207', totalSeats: 240, currentOccupancy: 220, density: 91.7, staffCount: 2 },
    { sectionNumber: '208', totalSeats: 270, currentOccupancy: 250, density: 92.6, staffCount: 3 },
    { sectionNumber: '209', totalSeats: 290, currentOccupancy: 270, density: 93.1, staffCount: 3 },
    { sectionNumber: '210', totalSeats: 270, currentOccupancy: 245, density: 90.7, staffCount: 2 },
    { sectionNumber: '211', totalSeats: 180, currentOccupancy: 165, density: 91.7, staffCount: 2 },
    { sectionNumber: '212', totalSeats: 80, currentOccupancy: 72, density: 90.0, staffCount: 1 },
    { sectionNumber: '213', totalSeats: 60, currentOccupancy: 55, density: 91.7, staffCount: 1 },
    
    { sectionNumber: '301', totalSeats: 140, currentOccupancy: 125, density: 89.3, staffCount: 1 },
    { sectionNumber: '302', totalSeats: 140, currentOccupancy: 128, density: 91.4, staffCount: 1 },
    { sectionNumber: '303', totalSeats: 160, currentOccupancy: 145, density: 90.6, staffCount: 2 },
    { sectionNumber: '304', totalSeats: 180, currentOccupancy: 165, density: 91.7, staffCount: 2 },
    { sectionNumber: '305', totalSeats: 170, currentOccupancy: 155, density: 91.2, staffCount: 2 },
    { sectionNumber: '306', totalSeats: 220, currentOccupancy: 200, density: 90.9, staffCount: 2 },
    { sectionNumber: '307', totalSeats: 200, currentOccupancy: 185, density: 92.5, staffCount: 2 },
    { sectionNumber: '308', totalSeats: 240, currentOccupancy: 220, density: 91.7, staffCount: 2 },
    { sectionNumber: '309', totalSeats: 240, currentOccupancy: 225, density: 93.8, staffCount: 2 },
    { sectionNumber: '310', totalSeats: 280, currentOccupancy: 260, density: 92.9, staffCount: 3 },
    { sectionNumber: '311', totalSeats: 280, currentOccupancy: 265, density: 94.6, staffCount: 3 },
    { sectionNumber: '312', totalSeats: 290, currentOccupancy: 275, density: 94.8, staffCount: 3 },
    { sectionNumber: '313', totalSeats: 290, currentOccupancy: 270, density: 93.1, staffCount: 3 },
    { sectionNumber: '314', totalSeats: 420, currentOccupancy: 395, density: 94.0, staffCount: 4 },
    { sectionNumber: '315', totalSeats: 400, currentOccupancy: 375, density: 93.8, staffCount: 4 },
    
    // 3루 내야
    { sectionNumber: '112', totalSeats: 58, currentOccupancy: 50, density: 86.2, staffCount: 1 },
    { sectionNumber: '113', totalSeats: 48, currentOccupancy: 42, density: 87.5, staffCount: 1 },
    { sectionNumber: '114', totalSeats: 100, currentOccupancy: 88, density: 88.0, staffCount: 1 },
    { sectionNumber: '115', totalSeats: 120, currentOccupancy: 105, density: 87.5, staffCount: 1 },
    { sectionNumber: '116', totalSeats: 140, currentOccupancy: 125, density: 89.3, staffCount: 2 },
    { sectionNumber: '117', totalSeats: 170, currentOccupancy: 150, density: 88.2, staffCount: 2 },
    { sectionNumber: '118', totalSeats: 210, currentOccupancy: 185, density: 88.1, staffCount: 2 },
    { sectionNumber: '119', totalSeats: 240, currentOccupancy: 210, density: 87.5, staffCount: 2 },
    { sectionNumber: '120', totalSeats: 240, currentOccupancy: 215, density: 89.6, staffCount: 2 },
    { sectionNumber: '121', totalSeats: 220, currentOccupancy: 195, density: 88.6, staffCount: 2 },
    { sectionNumber: '122', totalSeats: 270, currentOccupancy: 240, density: 88.9, staffCount: 3 },
    
    { sectionNumber: '214', totalSeats: 60, currentOccupancy: 52, density: 86.7, staffCount: 1 },
    { sectionNumber: '215', totalSeats: 70, currentOccupancy: 60, density: 85.7, staffCount: 1 },
    { sectionNumber: '216', totalSeats: 180, currentOccupancy: 155, density: 86.1, staffCount: 2 },
    { sectionNumber: '217', totalSeats: 120, currentOccupancy: 105, density: 87.5, staffCount: 1 },
    { sectionNumber: '218', totalSeats: 300, currentOccupancy: 260, density: 86.7, staffCount: 3 },
    { sectionNumber: '219', totalSeats: 260, currentOccupancy: 225, density: 86.5, staffCount: 2 },
    { sectionNumber: '220', totalSeats: 240, currentOccupancy: 210, density: 87.5, staffCount: 2 },
    { sectionNumber: '221', totalSeats: 220, currentOccupancy: 190, density: 86.4, staffCount: 2 },
    { sectionNumber: '222', totalSeats: 190, currentOccupancy: 165, density: 86.8, staffCount: 2 },
    { sectionNumber: '223', totalSeats: 180, currentOccupancy: 155, density: 86.1, staffCount: 2 },
    { sectionNumber: '224', totalSeats: 150, currentOccupancy: 130, density: 86.7, staffCount: 1 },
    { sectionNumber: '225', totalSeats: 150, currentOccupancy: 128, density: 85.3, staffCount: 1 },
    { sectionNumber: '226', totalSeats: 200, currentOccupancy: 175, density: 87.5, staffCount: 2 },
    
    { sectionNumber: '320', totalSeats: 400, currentOccupancy: 340, density: 85.0, staffCount: 3 },
    { sectionNumber: '321', totalSeats: 420, currentOccupancy: 355, density: 84.5, staffCount: 3 },
    { sectionNumber: '322', totalSeats: 300, currentOccupancy: 255, density: 85.0, staffCount: 2 },
    { sectionNumber: '323', totalSeats: 300, currentOccupancy: 260, density: 86.7, staffCount: 2 },
    { sectionNumber: '324', totalSeats: 300, currentOccupancy: 255, density: 85.0, staffCount: 2 },
    { sectionNumber: '325', totalSeats: 280, currentOccupancy: 240, density: 85.7, staffCount: 2 },
    { sectionNumber: '326', totalSeats: 240, currentOccupancy: 205, density: 85.4, staffCount: 2 },
    { sectionNumber: '327', totalSeats: 250, currentOccupancy: 215, density: 86.0, staffCount: 2 },
    { sectionNumber: '328', totalSeats: 240, currentOccupancy: 205, density: 85.4, staffCount: 2 },
    { sectionNumber: '329', totalSeats: 210, currentOccupancy: 180, density: 85.7, staffCount: 2 },
    { sectionNumber: '330', totalSeats: 190, currentOccupancy: 160, density: 84.2, staffCount: 1 },
    { sectionNumber: '331', totalSeats: 180, currentOccupancy: 155, density: 86.1, staffCount: 1 },
    { sectionNumber: '332', totalSeats: 170, currentOccupancy: 145, density: 85.3, staffCount: 1 },
    { sectionNumber: '333', totalSeats: 140, currentOccupancy: 120, density: 85.7, staffCount: 1 },
    { sectionNumber: '334', totalSeats: 150, currentOccupancy: 128, density: 85.3, staffCount: 1 },
    
    // 1루 외야
    { sectionNumber: '401', totalSeats: 130, currentOccupancy: 85, density: 65.4, staffCount: 1 },
    { sectionNumber: '402', totalSeats: 360, currentOccupancy: 250, density: 69.4, staffCount: 2 },
    { sectionNumber: '403', totalSeats: 340, currentOccupancy: 230, density: 67.6, staffCount: 1 },
    { sectionNumber: '404', totalSeats: 320, currentOccupancy: 215, density: 67.2, staffCount: 1 },
    { sectionNumber: '405', totalSeats: 280, currentOccupancy: 185, density: 66.1, staffCount: 1 },
    { sectionNumber: '406', totalSeats: 300, currentOccupancy: 200, density: 66.7, staffCount: 1 },
    { sectionNumber: '407', totalSeats: 250, currentOccupancy: 165, density: 66.0, staffCount: 1 },
    { sectionNumber: '408', totalSeats: 230, currentOccupancy: 150, density: 65.2, staffCount: 1 },
    { sectionNumber: '409', totalSeats: 240, currentOccupancy: 160, density: 66.7, staffCount: 1 },
    { sectionNumber: '410', totalSeats: 220, currentOccupancy: 145, density: 65.9, staffCount: 1 },
    { sectionNumber: '411', totalSeats: 170, currentOccupancy: 110, density: 64.7, staffCount: 1 },
    
    // 3루 외야
    { sectionNumber: '412', totalSeats: 180, currentOccupancy: 105, density: 58.3, staffCount: 1 },
    { sectionNumber: '413', totalSeats: 240, currentOccupancy: 140, density: 58.3, staffCount: 1 },
    { sectionNumber: '414', totalSeats: 240, currentOccupancy: 145, density: 60.4, staffCount: 1 },
    { sectionNumber: '415', totalSeats: 220, currentOccupancy: 130, density: 59.1, staffCount: 1 },
    { sectionNumber: '416', totalSeats: 280, currentOccupancy: 170, density: 60.7, staffCount: 1 },
    { sectionNumber: '417', totalSeats: 270, currentOccupancy: 160, density: 59.3, staffCount: 1 },
    { sectionNumber: '418', totalSeats: 270, currentOccupancy: 165, density: 61.1, staffCount: 1 },
    { sectionNumber: '419', totalSeats: 320, currentOccupancy: 195, density: 60.9, staffCount: 1 },
    { sectionNumber: '420', totalSeats: 340, currentOccupancy: 210, density: 61.8, staffCount: 1 },
    { sectionNumber: '421', totalSeats: 370, currentOccupancy: 230, density: 62.2, staffCount: 1 },
    { sectionNumber: '422', totalSeats: 130, currentOccupancy: 80, density: 61.5, staffCount: 1 }
  ]
};

export const demographicData: { [key: string]: DemographicData } = {
  'home-plate': {
    gender: { male: 58, female: 42 },
    ageGroups: { '10대': 15, '20대': 35, '30대': 25, '40대': 15, '50대+': 10 }
  },
  'first-infield': {
    gender: { male: 62, female: 38 },
    ageGroups: { '10대': 20, '20대': 30, '30대': 25, '40대': 15, '50대+': 10 }
  },
  'third-infield': {
    gender: { male: 60, female: 40 },
    ageGroups: { '10대': 18, '20대': 32, '30대': 22, '40대': 18, '50대+': 10 }
  },
  'first-outfield': {
    gender: { male: 65, female: 35 },
    ageGroups: { '10대': 25, '20대': 40, '30대': 20, '40대': 10, '50대+': 5 }
  },
  'third-outfield': {
    gender: { male: 55, female: 45 },
    ageGroups: { '10대': 30, '20대': 35, '30대': 20, '40대': 10, '50대+': 5 }
  }
};