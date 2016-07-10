import React, { Component, PropTypes } from 'react';

import {
  Animated,
} from 'react-native';

export default class NewMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.state.bounceValue.setValue(0.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1.5,
        friction: 1,
      }
    ).start();
  }

  componentWillUnmount() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0.2,
        friction: 1,
      }
    ).start();
  }

  render() {
    return (
      <Animated.Image
        source={require('../../images/pin-add.png')}
        style={{
          height: 70,
          width: 70,
          opacity: 0.9,
          transform: [
            {scale: this.state.bounceValue},
          ]
        }}
      />
    );
  }
}
