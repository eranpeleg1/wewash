import * as React from 'react';
import { Image, StyleSheet, View, Platform, ImageBackground} from 'react-native';
import Svg, { Path, Text, G } from "react-native-svg"
import {FontAwesome} from "@expo/vector-icons";
import firebase from '../firebase/firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
const background = require('../assets/images/background.png');

function loginWithGoogle(navigation) {
    return async function () {
        const result = await
            Google.logInAsync({
                androidStandaloneAppClientId: '566727409835-5f30731ooe9ji7hl99qjbgllin0m4nov.apps.googleusercontent.com',
                androidClientId: '566727409835-5f30731ooe9ji7hl99qjbgllin0m4nov.apps.googleusercontent.com',
                iosClientId: '566727409835-ual2hcd7uvf7hknukdcvdpn40ukfrfs0.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                //webClientId: '566727409835-e1k9v2jg7ekctm514nigp098ga94ilko.apps.googleusercontent.com',
            });


        if (result.type === 'success') {
            const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
            firebase.auth().signInWithCredential(credential).then(() => navigation.navigate({name: 'Root'})).catch(error => {
                console.log(error);
            })
        }
    }
}

function loginWithFacebook(navigation) {
    return async function () {
        await Facebook.initializeAsync('210674870232698');

        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            {permissions: ['public_profile']}
        );

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).then(() => navigation.navigate({name: 'Root'})).catch((error) => {
                console.log('error', error);
            });
        }
    }
}

let fbSpace="";
let googleSpace="";
let flex="row";
let paddingLeft=20
if (Platform.OS !== 'ios'){
    fbSpace='   ';
    googleSpace='  ';
    flex='row-reverse'
    paddingLeft=5
}


export default function LoginScreen({navigation}) {
    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.container}>
            <Svg
      id="prefix__Layer_1"
      x={0}
      y={0}
    >
      <Path  d="M286.44 453.27h25.43l-19.82 81.35h-25.04l-4.1-30.32-7.41 30.32h-22.23l-18.64-81.35h24.31l6.85 29.98 6.91-29.98h19.99l6.85 29.98 6.9-29.98zM373.63 453.27v22.57H337.3v6.79h36.33v22.63H337.3V512h36.33v22.63h-58.95v-81.35h58.95zM468.8 453.27h25.43l-19.82 81.35h-25.04l-4.1-30.32-7.41 30.32h-22.23l-18.64-81.35h24.31l6.85 29.98 6.91-29.98h19.99l6.85 29.98 6.9-29.98zM556.55 453.27l31.1 81.35h-26l-3.09-8.03h-31.38l-3.03 8.03h-27.12l32.23-81.35h27.29zm-5.95 52.11l-7.69-20.32-7.69 20.32h15.38z" />
      <Path d="M616.63 475.84c.19.22 8.96 9.38 26.33 27.46 2.36 3.48 3.54 7.15 3.54 11 0 5.46-1.89 10.22-5.67 14.26-3.82 4.04-8.37 6.06-13.64 6.06h-41.77V512h35.32l-26.22-27.34c-2.4-2.92-3.59-6.61-3.59-11.06 0-5.5 1.87-10.25 5.61-14.26 3.78-4.04 8.33-6.06 13.64-6.06h39.69v22.57h-33.24z" />
      <Path d="M696.13 453.27h22.57v81.35h-22.57v-29.36h-24.2v29.36H649.3v-81.35h22.63v29.36h24.2v-29.36z" />
      {/* <Text
        transform="matrix(1 0 0 .9 243.648 577.36)"
        fontSize={36.846}
        fontFamily='"Century Gothic",CenturyGothic,AppleGothic,sans-serif'
      >
        {"Hand Car Wash &amp; Services"}
      </Text> */}
      <G>
        <Path d="M776.08 472.49c0-26.57 24.57-26.25 24.57-26.25s-24.57.42-24.57-26.25c0 26.57-24.57 26.25-24.57 26.25s24.47-.32 24.57 26.25zM737.28 455.24c0-36.2 33.4-35.8 33.4-35.8s-33.4.4-33.4-35.8c0 36.2-33.4 35.8-33.4 35.8s33.4-.4 33.4 35.8zM746.08 482.57c0-15.95 14.63-15.73 14.63-15.73s-14.63.22-14.63-15.73c0 15.95-14.63 15.73-14.63 15.73s14.63-.11 14.63 15.73z" />
      </G>
    </Svg>
                <View style={styles.buttons}>
                    <FontAwesome.Button
                        name="facebook"
                        onPress={loginWithFacebook(navigation)}
                        flexDirection={flex}
                        paddingLeft={paddingLeft}
                        style={styles.fbButton}
                        backgroundColor='transparent'
                        borderRadius={150}>
                        {fbSpace+'Login with Facebook'}
                    </FontAwesome.Button>
                    <FontAwesome.Button
                        name="google"
                        onPress={loginWithGoogle(navigation)}
                        flexDirection={flex}
                        paddingLeft={paddingLeft}
                        style={styles.buttonGoogle}
                        backgroundColor='transparent'
                        borderRadius={150}>
                        {googleSpace+'Login with Google'}
                    </FontAwesome.Button>
                </View>
            </View>
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
    header: null
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems:'center',
        justifyContent:'center',
    },
    logoImage: {
        width:600,
        height:500,
        resizeMode:'contain',
    },
    buttons:{
        top:'60%',
        height:'100%'
    },
    fbButton:{
        marginBottom:5,
        borderWidth:0,
        borderColor:'transparent',
        borderRadius:100,
        width:200,
        height:40,
        backgroundColor:"#3b5998"
    },
    buttonGoogle:{
        marginTop:5,
        borderWidth:0,
        borderColor:'transparent',
        borderRadius:100,
        width:200,
        height:40,
        backgroundColor:"#DD4B39"
    }
});
