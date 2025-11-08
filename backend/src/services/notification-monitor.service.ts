import { waterDataService } from './water-data.service.js';
import { notificationsService } from './notifications.service.js';
import { emailService } from './email.service.js';

export class NotificationMonitorService {
  private checkInterval: NodeJS.Timeout | null = null;
  private isMonitoring: boolean = false;
  private demoCheckCount: number = 0;
  private demoChecksEnabled: boolean = false;

  startMonitoring(intervalMs: number = 60000, enableDemoChecks: boolean = false): void {
    if (this.isMonitoring) {
      return;
    }

    this.isMonitoring = true;
    this.demoChecksEnabled = enableDemoChecks;
    this.demoCheckCount = 0;

    if (enableDemoChecks) {
      setTimeout(() => {
        if (this.demoCheckCount < 3) {
          this.checkAndNotify();
        }
      }, 20000);

      setTimeout(() => {
        if (this.demoCheckCount < 3) {
          this.checkAndNotify();
        }
      }, 40000);
    }

    this.checkInterval = setInterval(() => {
      this.checkAndNotify();
    }, intervalMs);
  }

  getNotificationCount(): number {
    return this.demoCheckCount;
  }

  incrementNotificationCount(): void {
    this.demoCheckCount++;
    
    if (this.demoCheckCount >= 3 && this.demoChecksEnabled) {
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
      }
      
      this.checkInterval = setInterval(() => {
        this.checkAndNotify();
      }, 3600000);
    }
  }

  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      this.isMonitoring = false;
    }
  }

  private async checkAndNotify(): Promise<void> {
    try {
      const riskIndex = waterDataService.getWaterRiskIndex();
      const notification = notificationsService.checkAndCreateNotification(riskIndex.level);

      if (notification) {
        this.incrementNotificationCount();
        
        if (emailService.isEmailConfigured()) {
          await emailService.sendNotificationEmail(notification);
        }
      }
    } catch (error) {
      console.error('Error in notification monitor:', error);
    }
  }
}

export const notificationMonitorService = new NotificationMonitorService();

