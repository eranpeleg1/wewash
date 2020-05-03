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
import {getUser, setUser} from './firebase/firebaseCloudFuncInvokers';

// Listen for authentication state to change.

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [userData, setUserData] = React.useState(null);
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
        const customFonts={
          'Gothic':require('./assets/fonts/Gothic.ttf'),
          'Rubik-Black':require('./assets/fonts/Rubik-Black.ttf'),
          'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
          'Rubik-Light':  require('./assets/fonts/Rubik-Light.ttf'),
          'Rubik-Bold':  require('./assets/fonts/Rubik-Bold.ttf'),
        }
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font, ...FontAwesome.font, ...customFonts
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
          firebase.auth().onAuthStateChanged(async user => {
              if (user) {
                  const userFromFireBase = await getUser(user.uid);
                  const isUserExist = userFromFireBase && userFromFireBase.userId
                  if (!isUserExist) {
                      const {uid, displayName, photoURL, email} = user
                      const userFromFireBase = {
                          userId: uid,
                          displayName,
                          photoURL,
                          email
                      }
                      await setUser(userFromFireBase)
                  }
                  setUserData(userFromFireBase)
                  finishLoading()
              } else {
                  finishLoading()
              }
          })
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const BottomTabNavigatorWithUserData = props => BottomTabNavigator({userData, ...props})

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
      return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator screenOptions={{
              headerShown: false
          }} initialRouteName={userData ? 'Root' : 'Login'}>
              <Stack.Screen name="Root" component={BottomTabNavigatorWithUserData} />
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
