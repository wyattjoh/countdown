import React, { Component } from 'react';
import Counter from './Counter';
import Confetti from './Confetti';
import './App.css';

class App extends Component {
  state = {
    finished: false,
  };

  handleCounterFinished = () => {
    this.setState({ finished: true });
  };

  render() {
    const { finished } = this.state;

    return (
      <div className="App">
        {finished ? (
          <Confetti />
        ) : (
          <Counter onFinished={this.handleCounterFinished} />
        )}
      </div>
    );
  }
}

export default App;
