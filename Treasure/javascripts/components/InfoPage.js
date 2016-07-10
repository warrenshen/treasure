// Libraries
import React, { Component, PropTypes} from 'react';

// UI
import {
  AppRegistry,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  DeviceEventEmitter,
  View,
} from 'react-native';

const meRoutes = [
  { index: 0, title: 'Info' },
];


class InfoPage extends Component {


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
    render() {
    return (
      <Navigator
        initialRoute={meRoutes[0]}
        initialRoutes={meRoutes}
        navigationBar={(
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => null,
              RightButton: (route, navigator, index, navState) => null,
              Title: (route, navigator, index, navState) => (
                <Text style={styles.title}>{route.title}</Text>
              ),
            }}
            style={styles.navbar}
          />
        )}
        renderScene={(route, navigator) => {
          return (
            <View style={styles.container}>
              <View style={styles.section}>
                <View style={styles.body}>
                  <Text style={styles.bodyText}>
                    {"Place notes at your current location, and see other's notes in the same area. The most popular notes in an area become Treasure! Usually, notes can't be seen unless you're within around 200 meters, but a Treasure is visible from further and further out the more popular it becomes. This app is designed to be hyper-local - so it helps you share your adventures through location rather than time, and so it leads you on an adventure discovering Treasure after Treasure!"}
                  </Text>
                </View>
                <View style={styles.createdBy}>
                  <Text style={styles.createdByText}>{"Created by"}</Text>
                </View>
                <View style={styles.authors}>
                  <Text style={styles.authorText}>{"Aleks, Kevin, Shimmy, and Warren"}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  }
}


// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  body:{
    paddingBottom: 20,
  },
  bodyText: {
    color: '#666666',
    fontSize: 18,
  },
  createdBy: {
    paddingBottom: 4,
  },
  createdByText: {
    color: '#CCCCCC',
    fontFamily: 'JosefinSansRegularItalic',
    fontSize: 16,
  },
  navbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF765F',
    shadowColor: '#333333',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  authorText: {
    color: '#FF765F',
    fontFamily: 'JosefinSans',
    fontSize: 18,
  },
  section: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingTop: 10,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
  },

});

export default InfoPage;
