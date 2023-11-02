import React, { Component, ErrorInfo } from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
  readonly children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(
      'ErrorBoundary did catch an error: ',
      error,
      info.componentStack
    );
    this.setState({
      hasError: true,
      error: error,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          error={`Oops, something went wrong: ${this.state.error?.message}`}
        />
      );
    }

    return this.props.children;
  }
}
