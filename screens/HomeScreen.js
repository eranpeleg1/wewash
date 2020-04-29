import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {StyleSheet, View, Button, Dimensions} from 'react-native';
import Constants from 'expo-constants';

const screenHeight = Math.round(Dimensions.get('window').height);

import ProgressBar  from '../components/ProgressBar'
export default function HomeScreen({userData}) {
    const checkIn = () => console.log('userId', userData)
    return (
    <View style={styles.container}>
        <View style={styles.progressBarContainer}>
        {ProgressBar()}
        </View>
        <View style={styles.checkInButtonContainer}>
        <Button
              onPress={checkIn}
              title="הירשם לשטיפה"
          />
    </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
  },
  checkInButtonContainer: {
    top: screenHeight*0.8+Constants.statusBarHeight
  },
    progressBarContainer: {
      top:screenHeight*0.1+Constants.statusBarHeight
    }
});
