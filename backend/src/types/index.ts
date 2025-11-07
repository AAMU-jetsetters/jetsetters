// Chemical Parameter Types
export type ChemicalParameter = 
  | 'chlorine'
  | 'pH'
  | 'turbidity'
  | 'temperature'
  | 'lead';

export type ParameterStatus = 'normal' | 'warning' | 'anomaly';

export type OverallRiskLevel = 
  | 'stable'      // Normal - Green
  | 'low'         // Moderate Risk - Yellow
  | 'moderate'    // Orange
  | 'high'        // Red-Orange
  | 'critical';   // Red Flashing

// Chemical Reading Interface
export interface ChemicalReading {
  parameter: ChemicalParameter;
  value: number;
  unit: string;
  status: ParameterStatus;
  timestamp: Date;
  note?: string;
}

// Overall Water Risk Index
export interface WaterRiskIndex {
  index: number; // 0-100 percentage
  level: OverallRiskLevel;
  timestamp: Date;
  description: string;
}

// Public Dashboard Status Response
export interface PublicStatusResponse {
  overallRisk: WaterRiskIndex;
  chemicals: ChemicalReading[];
  healthAdvisory: HealthAdvisory;
  lastUpdated: Date;
}

// Health Advisory
export interface HealthAdvisory {
  message: string;
  instructions: string;
  updatedAt: Date;
}

// Anomaly Context (for correlating with ML model)
export interface AnomalyContext {
  isActive: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type?: 'chemical' | 'network' | 'physical' | 'cyber';
  affectedParameters?: ChemicalParameter[];
  startTime?: Date;
}

// Time Series Data Point
export interface TimeSeriesPoint {
  timestamp: Date;
  chemicals: ChemicalReading[];
  riskIndex: number;
  anomalyContext: AnomalyContext;
}

// Demo Attack Scenario
export interface AttackScenario {
  id: string;
  name: string;
  type: 'chemical' | 'network' | 'physical';
  duration: number; // minutes
  effects: {
    parameter: ChemicalParameter;
    targetValue: number;
    progressionRate: number; // change per minute
  }[];
}

