import axios, { AxiosError } from 'axios';
import { Component } from 'react';
import { Character, Info } from '../Interfaces';
import Card from './Card';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

interface Props {
  query: string;
}

interface CardListState {
  characters: Character[];
  error: string;
  loading: boolean;
}

type State = Readonly<CardListState>;

export default class CardList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      characters: [],
      error: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchProducts(this.props.query);
  }

  componentDidUpdate(previousProps: Props) {
    if (previousProps.query === this.props.query) return;
    this.fetchProducts(this.props.query);
  }

  async fetchProducts(name: string) {
    try {
      this.setState({ error: '', loading: true });

      const response = await axios.get<Info<Character[]>>(
        `character${name ? `?name=${name}` : ''}`
      );

      this.setState({
        characters: response.data.results ?? [],
        loading: false,
      });
    } catch (e: unknown) {
      const error = e as AxiosError;

      if (error.response?.status === 404) {
        this.setState({ characters: [], loading: false });
        return;
      }

      this.setState({ error: error.message, loading: false });
      console.warn(error);
    }
  }

  render() {
    return (
      <>
        <p className="my-6 text-center">Query: `{this.props.query}`</p>

        {this.state.error && <ErrorMessage error={this.state.error} />}
        {this.state.loading && <Loader />}

        <div className="flex flex-wrap gap-6">
          {this.state.characters.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      </>
    );
  }
}
