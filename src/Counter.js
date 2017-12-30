import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-precise-range-plugin';

const NEW_YEAR = moment('20180101', 'YYYYMMDD').startOf('day');

class Counter extends Component {
  static propTypes = {
    onFinished: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const now = moment();

    this.state = {
      time: now.format('LLL'),
      timeLeft: this.getTime(),
    };
  }

  getTime = (time = moment()) => time.preciseDiff(NEW_YEAR);

  clearTimeout = () => {
    this.timeout = false;
  };

  updateTime = () => {
    if (!this.timeout) {
      return;
    }

    const now = moment();
    const timeLeft = this.getTime(now);

    // We're calculating the end of the current second that we're rendering on,
    // and finding out how many milliseconds exist in-between then and now, and
    // adding 50 milliseconds to spare to ensure the time reflects the change.
    const timeout = now.endOf('second').valueOf() - Date.now() + 50;

    if (now.unix() >= NEW_YEAR.unix()) {
      this.setState({
        time: now.format('LLL'),
        timeLeft: '0 seconds',
      });

      setTimeout(this.handleFinished, timeout);
    } else {
      this.setState({
        time: now.format('LLL'),
        timeLeft,
      });

      setTimeout(this.updateTime, timeout);
    }
  };

  handleFinished = () => {
    const { onFinished } = this.props;
    onFinished();
  };

  componentDidMount() {
    this.timeout = true;
    this.updateTime();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  render() {
    const { time, timeLeft } = this.state;

    return (
      <div>
        <h2>{time}</h2>
        <h3>{timeLeft} until 2018</h3>
      </div>
    );
  }
}

export default Counter;
