import React, { Component } from 'react';

interface Props {
  query: string;
  onSubmit: (query: string) => void;
}

interface SearchBarState {
  query: string;
}

type State = Readonly<SearchBarState>;

export default class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: this.props.query };
  }

  onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, query: event.target.value });
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSubmit(this.state.query.trim());
  };

  render() {
    return (
      <div className="flex justify-center">
        <form onSubmit={this.onSubmit}>
          <input
            type="search"
            className="px-4 py-2 border"
            placeholder="Search..."
            autoComplete="off"
            value={this.state.query}
            onChange={this.onQueryChange}
          />

          <button
            type="submit"
            className="px-6 py-2 m-3 bg-green-500 rounded-full hover:text-white"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
