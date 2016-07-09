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

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  // --------------------------------------------------
  // Event Handlers
  // --------------------------------------------------
  render() {
    return (
      <TabBarIOS
        barTintColor={'white'}
        tintColor={'white'}
        unselectedTintColor={'yellow'}
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
