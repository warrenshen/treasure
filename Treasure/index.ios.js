// Libraries
import React, { Component } from 'react';

// UI
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  View,
} from 'react-native';

import MapPage from  './javascripts/components/MapPage';
import MePage from './javascripts/components/MePage';
import InfoPage from './javascripts/components/InfoPage';

class Treasure extends Component {

  // --------------------------------------------------
  // State
  // --------------------------------------------------
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
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <TabBarIOS
          barTintColor={'white'}
          itemPositioning={'center'}
          tintColor={'#FF765F'}
          unselectedTintColor={'#999999'}
        >
          <TabBarIOS.Item
            onPress={() => this.setState({ selectedTab: 'home' })}
            icon={require('./images/home@2x.png')}
            iconSize={32}
            selected={this.state.selectedTab === 'home'}
            selectedIcon={require('./images/home-red@2x.png')}
            title={'Nearby'}
          >
            <MapPage />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            onPress={() => this.setState({ selectedTab: 'mine' })}
            icon={require('./images/mine@2x.png')}
            iconSize={32}
            selected={this.state.selectedTab === 'mine'}
            selectedIcon={require('./images/mine-red@2x.png')}
            title={'Mine'}
          >
            <MePage />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            onPress={() => this.setState({ selectedTab: 'info' })}
            icon={require('./images/info@2x.png')}
            iconSize={32}
            selected={this.state.selectedTab === 'info'}
            selectedIcon={require('./images/info-red@2x.png')}
            title={'Info'}
          >
            <InfoPage />
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
