import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import CardList from '../components/CardList';

const LS_QUERY_ITEM_NAME = 'TN_Query';

interface State {
  query: string;
}

type Props = Record<string, never>;

export default class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: localStorage.getItem(LS_QUERY_ITEM_NAME) ?? '' };
  }

  onSearchSubmit = (query: string) => {
    localStorage.setItem(LS_QUERY_ITEM_NAME, query);
    this.setState({ query });
  };

  render() {
    return (
      <>
        <h1 className="my-6 text-3xl text-center">Hi there!</h1>
        <SearchBar query={this.state.query} onSubmit={this.onSearchSubmit} />
        <CardList query={this.state.query} />
      </>
    );
  }
}
