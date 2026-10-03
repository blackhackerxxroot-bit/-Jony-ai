import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Root Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFF8FB] text-[#20202A] text-center font-sans">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-[#EC3B87]/25 mb-4">
            বি
          </div>
          <h2 className="text-xl font-bold mb-2">BCS প্রস্তুতি রিলোড করুন</h2>
          <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
            অ্যাপ্লিকেশনটি লোড হতে সমস্যা হয়েছে। নিচের বাটনে ক্লিক করে পুনরায় লোড করুন।
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white text-xs font-bold shadow-lg shadow-[#EC3B87]/25 hover:opacity-95"
          >
            পুনরায় লোড করুন (Reload)
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
