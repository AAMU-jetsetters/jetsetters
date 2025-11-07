import {
  ChemicalReading,
  ChemicalParameter,
  ParameterStatus,
  OverallRiskLevel,
  WaterRiskIndex,
  AnomalyContext,
  TimeSeriesPoint,
  AttackScenario,
} from '../types/index.js';

export class SyntheticDataService {
  private currentState: TimeSeriesPoint;
  private activeAttack: AttackScenario | null = null;
  private attackStartTime: Date | null = null;
  private dataHistory: TimeSeriesPoint[] = [];
  private updateInterval: NodeJS.Timeout | null = null;

  private readonly NORMAL_RANGES = {
    chlorine: { min: 0.2, max: 2.0, unit: 'mg/L', optimal: 0.8 },
    pH: { min: 7.0, max: 8.5, unit: '', optimal: 7.5 },
    turbidity: { min: 0.0, max: 1.0, unit: 'NTU', optimal: 0.3 },
    temperature: { min: 15, max: 25, unit: '°C', optimal: 20 },
    lead: { min: 0.0, max: 0.015, unit: 'mg/L', optimal: 0.005 },
  };

  private readonly ATTACK_SCENARIOS: AttackScenario[] = [
    {
      id: 'chemical-attack',
      name: 'Chemical Attack',
      type: 'chemical',
      duration: 30,
      effects: [
        { parameter: 'pH', targetValue: 12.5, progressionRate: 0.15 },
        { parameter: 'chlorine', targetValue: 3.8, progressionRate: 0.1 },
      ],
    },
    {
      id: 'chlorine-attack',
      name: 'Chlorine Attack',
      type: 'chemical',
      duration: 20,
      effects: [
        { parameter: 'chlorine', targetValue: 4.5, progressionRate: 0.2 },
        { parameter: 'pH', targetValue: 6.5, progressionRate: 0.08 },
      ],
    },
    {
      id: 'filtration-attack',
      name: 'Filtration Attack',
      type: 'physical',
      duration: 45,
      effects: [
        { parameter: 'turbidity', targetValue: 8.5, progressionRate: 0.18 },
        { parameter: 'lead', targetValue: 0.025, progressionRate: 0.0005 },
      ],
    },
    {
      id: 'temperature-attack',
      name: 'Temperature Attack',
      type: 'physical',
      duration: 25,
      effects: [
        { parameter: 'temperature', targetValue: 32, progressionRate: 0.4 },
        { parameter: 'chlorine', targetValue: 0.1, progressionRate: 0.05 },
      ],
    },
  ];

  constructor() {
    this.currentState = this.generateBaselineState();
    this.startDataGeneration();
  }

  private generateBaselineState(): TimeSeriesPoint {
    const chemicals: ChemicalReading[] = Object.keys(this.NORMAL_RANGES).map((key) => {
      const param = key as ChemicalParameter;
      const range = this.NORMAL_RANGES[param];
      
      let value: number;
      if (param === 'pH') {
        value = 8.1;
      } else if (param === 'chlorine') {
        value = 1.5;
      } else if (param === 'turbidity') {
        value = 0.65;
      } else if (param === 'temperature') {
        value = 22;
      } else {
        value = 0.010;
      }
      
      return {
        parameter: param,
        value: this.roundToPrecision(value, param),
        unit: range.unit,
        status: this.determineParameterStatus(param, value),
        timestamp: new Date(),
      };
    });

    const riskIndex = this.calculateRiskIndex(chemicals);
    
    return {
      timestamp: new Date(),
      chemicals,
      riskIndex,
      anomalyContext: { isActive: riskIndex > 60, severity: this.mapRiskLevelToSeverity(this.determineRiskLevel(riskIndex)) },
    };
  }

  private addNaturalVariation(
    baseValue: number,
    min: number,
    max: number,
    variationPercent: number = 0.05
  ): number {
    const variation = baseValue * variationPercent;
    const randomVariation = (Math.random() - 0.5) * 2 * variation;
    const newValue = baseValue + randomVariation;
    return Math.max(min, Math.min(max, newValue));
  }

  private roundToPrecision(value: number, parameter: ChemicalParameter): number {
    const precisions: Record<ChemicalParameter, number> = {
      chlorine: 1,
      pH: 1,
      turbidity: 1,
      temperature: 0,
      lead: 3,
    };
    
    const precision = precisions[parameter];
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  private determineParameterStatus(
    parameter: ChemicalParameter,
    value: number
  ): ParameterStatus {
    const range = this.NORMAL_RANGES[parameter];
    const optimal = range.optimal;
    const tolerance = (range.max - range.min) * 0.15;

    if (value >= range.min && value <= range.max) {
      const deviation = Math.abs(value - optimal);
      if (deviation <= tolerance) {
        return 'normal';
      } else {
        return 'warning';
      }
    }
    return 'anomaly';
  }

  private calculateRiskIndex(chemicals: ChemicalReading[]): number {
    let totalRisk = 0;
    let maxRisk = 0;

    chemicals.forEach((chemical) => {
      const range = this.NORMAL_RANGES[chemical.parameter];
      const optimal = range.optimal;
      const rangeSize = range.max - range.min;
      let deviation: number;
      if (chemical.value < range.min) {
        deviation = (range.min - chemical.value) / rangeSize;
      } else if (chemical.value > range.max) {
        deviation = (chemical.value - range.max) / rangeSize;
      } else {
        deviation = Math.abs(chemical.value - optimal) / rangeSize;
      }

      const weights: Record<ChemicalParameter, number> = {
        chlorine: 0.25,
        pH: 0.30,
        turbidity: 0.20,
        temperature: 0.15,
        lead: 0.10,
      };

      const weight = weights[chemical.parameter];
      const risk = Math.min(1, deviation * 2);
      totalRisk += risk * weight;
      maxRisk += weight;
    });

    const riskPercentage = (totalRisk / maxRisk) * 100;
    return Math.round(riskPercentage);
  }

  private determineRiskLevel(index: number): OverallRiskLevel {
    if (index < 20) return 'stable';
    if (index < 40) return 'low';
    if (index < 60) return 'moderate';
    if (index < 80) return 'high';
    return 'critical';
  }

  private generateNextPoint(): TimeSeriesPoint {
    const now = new Date();
    const previousPoint = this.currentState;
    
    if (this.activeAttack && this.attackStartTime) {
      const elapsedMinutes = (now.getTime() - this.attackStartTime.getTime()) / 60000;
      
      if (elapsedMinutes < this.activeAttack.duration) {
        return this.applyAttackEffects(previousPoint, elapsedMinutes);
      } else {
        this.activeAttack = null;
        this.attackStartTime = null;
        return this.beginRecovery(previousPoint);
      }
    }

    const newChemicals: ChemicalReading[] = previousPoint.chemicals.map((chem) => {
      const range = this.NORMAL_RANGES[chem.parameter];
      const currentValue = chem.value;
      const drift = (range.optimal - currentValue) * 0.015;
      const randomWalk = (Math.random() - 0.5) * 0.15 * (range.max - range.min);
      const newValue = currentValue + drift + randomWalk;
      
      const clampedValue = Math.max(range.min * 0.85, Math.min(range.max * 1.15, newValue));
      
      return {
        ...chem,
        value: this.roundToPrecision(clampedValue, chem.parameter),
        status: this.determineParameterStatus(chem.parameter, clampedValue),
        timestamp: now,
      };
    });

    const riskIndex = this.calculateRiskIndex(newChemicals);
    const riskLevel = this.determineRiskLevel(riskIndex);

    return {
      timestamp: now,
      chemicals: newChemicals,
      riskIndex,
      anomalyContext: {
        isActive: riskLevel !== 'stable',
        severity: this.mapRiskLevelToSeverity(riskLevel),
      },
    };
  }

  private applyAttackEffects(
    currentPoint: TimeSeriesPoint,
    elapsedMinutes: number
  ): TimeSeriesPoint {
    if (!this.activeAttack) return currentPoint;

    const newChemicals: ChemicalReading[] = currentPoint.chemicals.map((chem) => {
      const attackEffect = this.activeAttack!.effects.find(
        (e) => e.parameter === chem.parameter
      );

      if (!attackEffect) {
        const range = this.NORMAL_RANGES[chem.parameter];
        const drift = (range.optimal - chem.value) * 0.01;
        const randomWalk = (Math.random() - 0.5) * 0.05 * (range.max - range.min);
        const newValue = Math.max(range.min, Math.min(range.max, chem.value + drift + randomWalk));
        return {
          ...chem,
          value: this.roundToPrecision(newValue, chem.parameter),
          status: this.determineParameterStatus(chem.parameter, newValue),
          timestamp: new Date(),
        };
      }

      const progress = Math.min(1, elapsedMinutes / (this.activeAttack!.duration * 0.7));
      const currentTarget = attackEffect.targetValue;
      const currentValue = chem.value;
      const change = (currentTarget - currentValue) * progress * attackEffect.progressionRate;
      const newValue = currentValue + change;

      return {
        ...chem,
        value: this.roundToPrecision(newValue, chem.parameter),
        status: this.determineParameterStatus(chem.parameter, newValue),
        timestamp: new Date(),
        note: this.generateAttackNote(chem.parameter, newValue),
      };
    });

    const riskIndex = this.calculateRiskIndex(newChemicals);
    const riskLevel = this.determineRiskLevel(riskIndex);

    return {
      timestamp: new Date(),
      chemicals: newChemicals,
      riskIndex,
      anomalyContext: {
        isActive: true,
        severity: this.mapRiskLevelToSeverity(riskLevel),
        type: this.activeAttack!.type,
        affectedParameters: this.activeAttack!.effects.map((e) => e.parameter),
        startTime: this.attackStartTime!,
      },
    };
  }

  private beginRecovery(currentPoint: TimeSeriesPoint): TimeSeriesPoint {
    const newChemicals: ChemicalReading[] = currentPoint.chemicals.map((chem) => {
      const range = this.NORMAL_RANGES[chem.parameter];
      const optimal = range.optimal;
      const currentValue = chem.value;
      const recoveryRate = 0.05;
      const recovery = (optimal - currentValue) * recoveryRate;
      const newValue = currentValue + recovery;
      
      return {
        ...chem,
        value: this.roundToPrecision(
          Math.max(range.min * 0.95, Math.min(range.max * 1.05, newValue)),
          chem.parameter
        ),
        status: this.determineParameterStatus(chem.parameter, newValue),
        timestamp: new Date(),
      };
    });

    const riskIndex = this.calculateRiskIndex(newChemicals);
    const riskLevel = this.determineRiskLevel(riskIndex);

    return {
      timestamp: new Date(),
      chemicals: newChemicals,
      riskIndex,
      anomalyContext: {
        isActive: riskLevel !== 'stable',
        severity: this.mapRiskLevelToSeverity(riskLevel),
      },
    };
  }

  private generateAttackNote(parameter: ChemicalParameter, value: number): string {
    const range = this.NORMAL_RANGES[parameter];
    const notes: Record<ChemicalParameter, (v: number, r: typeof range) => string> = {
      chlorine: (v, r) => {
        if (v > r.max) return 'Excessive Chlorine Dosing Detected';
        if (v < r.min) return 'Insufficient Chlorine Residual';
        return 'Chlorine levels within normal range';
      },
      pH: (v, r) => {
        if (v > 8.5) return 'Potential Alkaline Dosing';
        if (v < 7.0) return 'Acidic Conditions Detected';
        return 'pH levels stable';
      },
      turbidity: (v, r) => {
        if (v > r.max) return 'Filtration System Compromised';
        return 'Physical Filtration Unaffected';
      },
      temperature: (v, r) => {
        if (v > r.max) return 'Temperature Control Failure';
        if (v < r.min) return 'Low Temperature Alert';
        return 'Temperature within normal range';
      },
      lead: (v, r) => {
        if (v > r.max) return 'Elevated Lead Concentration';
        return 'Lead levels acceptable';
      },
    };

    return notes[parameter](value, range);
  }

  private mapRiskLevelToSeverity(level: OverallRiskLevel): 'low' | 'medium' | 'high' | 'critical' {
    const mapping: Record<OverallRiskLevel, 'low' | 'medium' | 'high' | 'critical'> = {
      stable: 'low',
      low: 'low',
      moderate: 'medium',
      high: 'high',
      critical: 'critical',
    };
    return mapping[level];
  }

  public startDataGeneration(intervalMs: number = 60000): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      this.currentState = this.generateNextPoint();
      this.dataHistory.push({ ...this.currentState });
      
      if (this.dataHistory.length > 1000) {
        this.dataHistory.shift();
      }
    }, intervalMs);
  }

  public stopDataGeneration(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public getCurrentState(): TimeSeriesPoint {
    return { ...this.currentState };
  }

  public getWaterRiskIndex(): WaterRiskIndex {
    const level = this.determineRiskLevel(this.currentState.riskIndex);
    const descriptions: Record<OverallRiskLevel, string> = {
      stable: 'Water quality is within normal operating parameters. Safe for all uses.',
      low: 'Minor fluctuations detected. Continue monitoring. Safe for consumption.',
      moderate: 'Some parameters outside optimal range. Increased monitoring active.',
      high: 'Significant deviations detected. Precautionary measures recommended.',
      critical: 'SEVERE WARNING: Critical water quality issues detected. DO NOT USE.',
    };

    return {
      index: this.currentState.riskIndex,
      level,
      timestamp: this.currentState.timestamp,
      description: descriptions[level],
    };
  }

  public triggerAttack(scenarioId: string): boolean {
    const scenario = this.ATTACK_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return false;

    this.activeAttack = scenario;
    this.attackStartTime = new Date();
    return true;
  }

  public resetToBaseline(): void {
    this.activeAttack = null;
    this.attackStartTime = null;
    this.currentState = this.generateBaselineState();
  }

  public getAttackScenarios(): AttackScenario[] {
    return [...this.ATTACK_SCENARIOS];
  }

  public getHistory(limit: number = 100): TimeSeriesPoint[] {
    return this.dataHistory.slice(-limit);
  }
}

export const syntheticDataService = new SyntheticDataService();

