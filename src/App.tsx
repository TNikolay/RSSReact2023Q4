import { Component } from 'react';
import MainPage from './pages/MainPage';

export default class App extends Component {
  render() {
    return (
      <div className="pt-5 mx-auto w-[90%]">
        <MainPage />
      </div>
    );
  }
}
