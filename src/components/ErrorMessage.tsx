import React, { Component } from 'react';

interface Props {
  error: string;
}

export default class ErrorMessage extends Component<Props> {
  render() {
    return (
      <p className="py-5 font-bold text-center text-red-600">
        {this.props.error}
      </p>
    );
  }
}
