import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';

import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();

import firebase from './firebase/firebase';
// Listen for authentication state to change.

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [userId, setUserId] = React.useState(null);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const finishLoading = () => {
      if (!isLoadingComplete) {
          setLoadingComplete(true);
          SplashScreen.hide();
      }
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect((t) => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font, ...FontAwesome.font
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
          if (!userId) {
              firebase.auth().onAuthStateChanged((user) => {
                  console.log('user ', user)
                  if (user != null) {
                      setUserId(user.uid)
                      finishLoading()
                  } else {
                      finishLoading()
                  }
              });
          } else {
              finishLoading()
          }
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const BottomTabNavigatorWithUserId = props => BottomTabNavigator({userId, ...props})

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
      console.log('aaaaaa', userId)
      return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator screenOptions={{
              headerShown: false
          }} initialRouteName={userId ? 'Root' : 'Login'}>
              <Stack.Screen name="Root" component={BottomTabNavigatorWithUserId} />
              <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
