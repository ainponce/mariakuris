import { AppError, AppErrorDetails, ErrorLogEntry } from '@/shared/types/error.types';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemoteLogging: boolean;
  remoteEndpoint?: string;
  maxEntries: number;
}

class Logger {
  private config: LoggerConfig;
  private logs: ErrorLogEntry[] = [];

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private createLogEntry(error: AppError, severity: ErrorLogEntry['severity']): ErrorLogEntry {
    return {
      id: this.generateId(),
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        context: error.context,
        stack: error.stack,
        timestamp: error.timestamp,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined
      },
      severity,
      resolved: false,
      reportedAt: new Date()
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private async sendToRemote(entry: ErrorLogEntry): Promise<void> {
    if (!this.config.enableRemoteLogging || !this.config.remoteEndpoint) {
      return;
    }

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry)
      });
    } catch (remoteError) {
      // Evitar bucles infinitos - solo log a consola
      if (this.config.enableConsole) {
        console.error('Error al enviar log remoto:', remoteError);
      }
    }
  }

  private logToConsole(entry: ErrorLogEntry): void {
    if (!this.config.enableConsole) return;

    const { error, severity } = entry;
    const logMessage = `[${severity.toUpperCase()}] ${error.message}`;
    
    switch (severity) {
      case 'low':
        console.info(logMessage, error.context);
        break;
      case 'medium':
        console.warn(logMessage, error.context);
        break;
      case 'high':
      case 'critical':
        console.error(logMessage, error.context);
        if (error.stack) {
          console.error('Stack:', error.stack);
        }
        break;
    }
  }

  private addToStorage(entry: ErrorLogEntry): void {
    this.logs.unshift(entry);
    
    // Limitar el número de entradas
    if (this.logs.length > this.config.maxEntries) {
      this.logs = this.logs.slice(0, this.config.maxEntries);
    }
  }

  public async log(error: AppError, severity: ErrorLogEntry['severity'] = 'medium'): Promise<void> {
    try {
      const entry = this.createLogEntry(error, severity);
      
      this.addToStorage(entry);
      this.logToConsole(entry);
      
      // Enviar a servicio remoto de manera asíncrona
      if (this.config.enableRemoteLogging) {
        this.sendToRemote(entry).catch(() => {
          // Error ya manejado en sendToRemote
        });
      }
    } catch (logError) {
      // Fallback - solo consola
      console.error('Error en el logger:', logError);
    }
  }

  public info(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.INFO)) {
      const error = new AppError(message, 'INFO', undefined, context);
      this.log(error, 'low').catch(() => {});
    }
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.WARN)) {
      const error = new AppError(message, 'WARN', undefined, context);
      this.log(error, 'medium').catch(() => {});
    }
  }

  public error(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const error = new AppError(message, 'ERROR', undefined, context);
      this.log(error, 'high').catch(() => {});
    }
  }

  public fatal(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog(LogLevel.FATAL)) {
      const error = new AppError(message, 'FATAL', undefined, context);
      this.log(error, 'critical').catch(() => {});
    }
  }

  public getLogs(): ErrorLogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

// Configuración por defecto
const defaultConfig: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.DEBUG,
  enableConsole: process.env.NODE_ENV !== 'production',
  enableRemoteLogging: process.env.NODE_ENV === 'production',
  maxEntries: 100
};

export const logger = new Logger(defaultConfig);
export { Logger }; 