
import React, { Component } from 'react';
import { Animated } from 'react-native';

export class FadeInView extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      // Initial value for opacity: 0
      fadeAnim: new Animated.Value( 0 ),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 1500 }
    )
    .start()
  }

  render() {
    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,  // Bind opacity to animated value
        }}
      >
        { this.props.children }
      </Animated.View>
    );
  }
}
