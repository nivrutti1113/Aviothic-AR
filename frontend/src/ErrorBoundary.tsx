import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[React ErrorBoundary Catch]", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    // Clear VTK structures and reload
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#0a0d14',
          color: '#f1f5f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "Inter, -apple-system, sans-serif",
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '550px',
            backgroundColor: 'rgba(22, 29, 43, 0.7)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '12px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              color: '#f43f5e',
              marginBottom: '20px'
            }}>
              <AlertCircle size={32} />
            </div>

            <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: 700 }}>
              WebGL rendering context collapsed
            </h2>
            
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              The 3D GPU Raycast pipeline or parallel viewports encountered an unrecoverable rendering crash (often caused by WebGL context loss or memory constraints).
            </p>

            {this.state.error && (
              <div style={{
                textAlign: 'left',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                padding: '12px',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#f43f5e',
                overflowX: 'auto',
                marginBottom: '25px',
                maxHeight: '120px'
              }}>
                <strong>Error:</strong> {this.state.error.toString()}
              </div>
            )}

            <button 
              onClick={this.handleReset}
              style={{
                backgroundColor: '#06b6d4',
                color: '#000',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Reset Session and Hot-Reload Viewer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
