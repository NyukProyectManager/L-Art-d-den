import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  constructor(public props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-[#A3B18A]/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">⚠️</span>
              </div>
            </div>
            <h1 className="serif text-4xl italic mb-4 text-[#2D2D2D]">
              Algo salió mal
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Ha ocurrido un error inesperado. Por favor, recarga la página o intenta nuevamente más tarde.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#2D2D2D] text-white px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-[#588157] transition-colors"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
