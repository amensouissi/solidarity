// @flow
import * as React from 'react';

type Props = {
  start?: number
};

type State = {
  /* the counter */
  counter: number,
  timeout: ?TimeoutID
};

class Page extends React.Component<Props, State> {
  static defaultProps = {
    start: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      // $FlowFixMe we have a default value for the start prop
      counter: props.start,
      timeout: null
    };
  }

  componentDidMount() {
    this.start();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.counter !== 10;
  }

  componentDidUpdate() {
    const { counter } = this.state;
    if (counter > 6) throw new Error('Error');
  }

  componentWillUnmout() {
    const { timeout } = this.state;
    if (timeout) clearTimeout(timeout);
  }

  start = () => {
    this.setState({ timeout: setTimeout(this.clic, 1000) });
  };

  clic = () => {
    this.setState((state) => {
      return { ...state, counter: state.counter + 1 };
    }, this.start);
  };

  render() {
    const { counter } = this.state;
    return <strong>{counter}</strong>;
  }
}

export default Page;