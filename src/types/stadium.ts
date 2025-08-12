export interface Zone {
  id: string;
  name: string;
  sections: string[];
  totalSeats: number;
  currentOccupancy: number;
  density: 'low' | 'medium' | 'high' | 'critical';
  staffCount: number;
  recommendedStaff: number;
}

export interface SectionDetail {
  sectionNumber: string;
  totalSeats: number;
  currentOccupancy: number;
  density: number;
  staffCount: number;
}

export interface StadiumData {
  totalCapacity: number;
  totalOccupancy: number;
  totalStaff: number;
  recommendedTotalStaff: number;
  zones: Zone[];
  sections: SectionDetail[];
}

export interface DemographicData {
  gender: { male: number; female: number };
  ageGroups: { [key: string]: number };
}