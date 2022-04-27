import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * クライアントサイドのエラーハンドラー
 * https://nextjs.org/docs/advanced-features/error-handling#handling-client-errors
 */
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  /**
   * このライフサイクルはフォールバック UI を描画するために使用されます
   */
  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * このライフサイクルは主にロギングなどの処理に使用されます
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  /**
   * getDerivedStateFromError によってエラーをキャッチした状態であるならば、
   * フォールバック UI を描画するようにします
   */
  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
