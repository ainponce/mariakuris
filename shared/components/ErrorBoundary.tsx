"use client";

import { Component, ErrorInfo, ReactNode } from 'react';
import { AppError } from '@/shared/types/error.types';
import { logger } from '@/services/error-handling/logger';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: AppError;
    errorId?: string;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        const appError = error instanceof AppError
            ? error
            : new AppError(
                error.message || 'Error desconocido',
                'REACT_ERROR',
                500,
                { originalError: error.name }
            );

        return {
            hasError: true,
            error: appError,
            errorId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const appError = this.state.error || new AppError(
            error.message || 'Error desconocido',
            'REACT_ERROR',
            500,
            { originalError: error.name }
        );

        // Log del error
        logger.log(appError, 'high').catch(() => {
            // Fallback silencioso
        });

        // Llamar al callback personalizado si existe
        if (this.props.onError) {
            this.props.onError(appError, errorInfo);
        }
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorId: undefined });
    };

    private handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-8 w-8 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Algo salió mal
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Se ha producido un error inesperado
                                </p>
                            </div>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
                                <h3 className="text-sm font-medium text-red-800 mb-2">
                                    Detalles del error (solo en desarrollo):
                                </h3>
                                <p className="text-xs text-red-700 font-mono">
                                    {this.state.error.message}
                                </p>
                                {this.state.error.code && (
                                    <p className="text-xs text-red-600 mt-1">
                                        Código: {this.state.error.code}
                                    </p>
                                )}
                                {this.state.errorId && (
                                    <p className="text-xs text-red-600 mt-1">
                                        ID: {this.state.errorId}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex space-x-3">
                            <button
                                onClick={this.handleRetry}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Reintentar
                            </button>
                            <button
                                onClick={this.handleReload}
                                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Recargar página
                            </button>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                                Si el problema persiste, por favor contacta al soporte técnico.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 