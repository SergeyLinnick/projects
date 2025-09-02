"use client";

import React from "react";

import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={this.resetError}
          />
        );
      }

      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-md border p-8 text-center">
          <h2 className="mb-4 text-lg font-semibold">Something went wrong</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            An error occurred while rendering the phone input component.
          </p>
          <Button onClick={this.resetError} variant="outline">
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
