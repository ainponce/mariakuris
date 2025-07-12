export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

export interface AppErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
  context?: Record<string, unknown>;
  stack?: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

export interface ErrorLogEntry {
  id: string;
  error: AppErrorDetails;
  errorInfo?: ErrorInfo;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  reportedAt: Date;
}

export class AppError extends Error {
  public readonly code?: string;
  public readonly statusCode?: number;
  public readonly context?: Record<string, unknown>;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.context = context;
    this.timestamp = new Date();

    // Mantener el stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export type ErrorHandler = (error: AppError, errorInfo?: ErrorInfo) => void; 