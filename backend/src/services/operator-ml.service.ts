import axios from 'axios';
import { AnomalyContext } from '../types/index.js';

export class OperatorMLService {
  private apiKey: string | undefined;
  private modelUrl: string | undefined;
  private baseUrl = 'https://api-inference.huggingface.co/models';

  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY;
    this.modelUrl = process.env.HUGGINGFACE_MODEL_URL;
  }

  public isConfigured(): boolean {
    return !!(this.apiKey && this.modelUrl);
  }

  private preprocessOperatorData(data: {
    otData?: Record<string, number>;
    itData?: Record<string, number>;
    timestamp: Date;
  }): Record<string, unknown> {
    return {
      features: {
        ...data.otData,
        ...data.itData,
      },
      timestamp: data.timestamp.toISOString(),
    };
  }

  private postprocessOperatorResult(
    modelOutput: Record<string, unknown>
  ): {
    anomalyScore: number;
    anomalyContext: AnomalyContext;
    predictions: Record<string, unknown>;
  } {
    const anomalyScore = (modelOutput.anomaly_score as number) || 0;
    const anomalyType = (modelOutput.anomaly_type as string) || 'unknown';
    const severity = this.mapScoreToSeverity(anomalyScore);
    const emptyPredictions: Record<string, unknown> = {};

    return {
      anomalyScore,
      anomalyContext: {
        isActive: anomalyScore > 0.5,
        severity,
        type: this.mapTypeToAnomalyType(anomalyType),
        startTime: new Date(),
      },
      predictions: (modelOutput.predictions as Record<string, unknown>) || emptyPredictions,
    };
  }

  public async detectOperatorAnomaly(data: {
    otData?: Record<string, number>;
    itData?: Record<string, number>;
    timestamp: Date;
  }): Promise<{
    anomalyScore: number;
    anomalyContext: AnomalyContext;
    predictions: Record<string, unknown>;
    }> {
    if (!this.isConfigured()) {
      return {
        anomalyScore: 0,
        anomalyContext: {
          isActive: false,
          severity: 'low',
        },
        predictions: {},
      };
    }

    try {
      const preprocessed = this.preprocessOperatorData(data);
      
      const response = await axios.post(
        `${this.baseUrl}/${this.modelUrl}`,
        { inputs: preprocessed },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      return this.postprocessOperatorResult(response.data);
    } catch (error) {
      console.error('Operator ML API error:', error);
      return {
        anomalyScore: 0,
        anomalyContext: {
          isActive: false,
          severity: 'low',
        },
        predictions: {},
      };
    }
  }

  private mapScoreToSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score < 0.3) return 'low';
    if (score < 0.6) return 'medium';
    if (score < 0.8) return 'high';
    return 'critical';
  }

  private mapTypeToAnomalyType(
    type: string
  ): 'chemical' | 'network' | 'physical' | 'cyber' | undefined {
    const typeMap: Record<string, 'chemical' | 'network' | 'physical' | 'cyber'> = {
      chemical: 'chemical',
      network: 'network',
      physical: 'physical',
      cyber: 'cyber',
      intrusion: 'cyber',
      attack: 'cyber',
    };
    return typeMap[type.toLowerCase()];
  }
}

export const operatorMLService = new OperatorMLService();

