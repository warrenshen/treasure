// Libraries
import React, { Component } from 'react';

// UI
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import MapPage from  './javascripts/components/MapPage';
import MePage from './javascripts/components/MePage';

class Treasure extends Component {

  // --------------------------------------------------
  // State
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      createNoteModalIsVisible: false,
      isPostingNote: false,
    };
  }

  // --------------------------------------------------
  // Event Handlers
  // --------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <TabBarIOS
          barTintColor={'white'}
          tintColor={'#FF765F'}
          unselectedTintColor={'gray'}
        >
          <TabBarIOS.Item
            onPress={() => this.setState({ selectedTab: 'home' })}
            icon={require('./images/home.png')}
            iconSize={30}
            selected={this.state.selectedTab === 'home'}
            selectedIcon={require('./images/home-selected.png')}
            title={'Map'}
          >
            <MapPage />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            onPress={() => this.setState({ selectedTab: 'me' })}
            selected={this.state.selectedTab === 'me'}
            systemIcon={'contacts'}
            title={'Me'}
          >
            <MePage />
          </TabBarIOS.Item>
        </TabBarIOS>
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
  },
});

AppRegistry.registerComponent('Treasure', () => Treasure);
