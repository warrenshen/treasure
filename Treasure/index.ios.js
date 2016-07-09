// Libraries
import React, { Component } from 'react';

// UI
import {
  AppRegistry,
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
      <TabBarIOS
        barTintColor={'white'}
        tintColor={'#FF765F'}
        unselectedTintColor={'gray'}
      >
        <TabBarIOS.Item
          onPress={() => this.setState({ selectedTab: 'home' })}
          selected={this.state.selectedTab === 'home'}
          systemIcon={'search'}
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
    );
  }
}

AppRegistry.registerComponent('Treasure', () => Treasure);
