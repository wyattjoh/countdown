import React, { Component } from 'react';
import ConfettiManager from './ConfettiManager';
import './Confetti.css';

class Confetti extends Component {
  bindCanvas = el => {
    this.canvas = el;
    this.context = el.getContext('2d');
  };

  resizeWindow = () => {
    window.w = this.canvas.width = window.innerWidth;
    window.h = this.canvas.height = window.innerHeight;
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow, false);
    this.resizeWindow();
    this.manager = new ConfettiManager(this.canvas, this.context);
    this.manager.start();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow);
    this.manager.stop();
    delete this.manager;
  }

  render() {
    return (
      <div className="Confetti">
        <h2>Happy New Year!</h2>
        <canvas ref={this.bindCanvas} />
      </div>
    );
  }
}

export default Confetti;
