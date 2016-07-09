// Libraries
import React, { Component } from 'react';

// UI
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Treasure extends Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableHighlight onPress={this._onPressButtonGET} style={styles.button}>
          <Text>GET</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

  // --------------------------------------------------
  // Styles
  // --------------------------------------------------
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },

    button: {
      backgroundColor: '#eeeeee',
      padding: 10,
      marginRight: 5,
      marginLeft: 5,
    },
  });

  AppRegistry.registerComponent('Treasure', () => Treasure);
