/* eslint-disable react/destructuring-assignment */
import * as React from 'react';

class Page extends React.Component {
  static defaultProps = {
    start: 0
  };

  state = {
    counter: this.props.start
  };

  componentDidMount() {
    this.start();
  }

  componentDidUpdate() {
    this.start();
  }

  componentWillUnmout() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  start = () => {
    this.timeout = setTimeout(this.clic, 1000);
  };

  clic = () => {
    this.setState((state) => {
      return { counter: state.counter + 1 };
    });
  };

  render() {
    const { counter } = this.state;
    return <strong>{counter}</strong>;
  }
}

export default Page;