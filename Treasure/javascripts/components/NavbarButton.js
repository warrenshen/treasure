// Libraries
import React, { Component } from 'react';

// UI
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
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
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={onPress}
        style={styles.container}
        underlayColor={'#CCCCCC50'}>
        <View style={styles.navbarButton}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.image}
            />
          ) : (
            <Text style={styles.text}>{textContent}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  navbarButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginHorizontal: 8,
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
