// Libraries
import React, { Component } from 'react';

// UI
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
} from 'react-native';

class NavbarButton extends Component {
  render() {
    const {
      disabled,
      imageSource,
      onPress,
      textContent,
    } = this.props;
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        style={styles.container}
        underlayColor={'#CCCCCC50'}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
          />
        ) : (
          <Text style={styles.text}>{textContent}</Text>
        )}
      </TouchableHighlight>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    paddingTop: 8,
    color: 'white',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 18,
  },
});

export default NavbarButton;
