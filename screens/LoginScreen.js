import * as React from 'react';
import { Image, StyleSheet, View, Platform, ImageBackground, Text} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

import {FontAwesome} from "@expo/vector-icons";
import firebase from '../firebase/firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
const background = require('../assets/images/background.png');
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
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
let paddingText=6
if (Platform.OS !== 'ios'){
    fbSpace='   ';
    googleSpace='  ';
    flex='row-reverse'
    paddingLeft=5
    paddingText=0
}


export default function LoginScreen({navigation}) {
    return (
        <ImageBackground source={background} style={styles.container}>
              <View style={styles.logoContainer}>
              <Svg  width="100%" height="100%" viewBox="0 0 586.02 150.99">
            <G>
                <G>
                <Path fill="white" d="M71.81 69.63h25.43L77.42 151h-25l-4.1-30.32L40.87 151H18.64L0 69.63h24.31l6.85 30 6.91-30h20l6.85 30zM159 69.63V92.2h-36.33V99H159v22.63h-36.33v6.74H159V151h-58.95V69.64h59zM254.17 69.63h25.43L259.78 151h-25l-4.1-30.32-7.45 30.32H201l-18.64-81.37h24.31l6.85 30 6.91-30h20l6.85 30zM341.92 69.63L373 151h-26l-3.09-8h-31.36l-3 8H282.4l32.23-81.35zM336 121.74l-7.69-20.32-7.69 20.32z" />
                <Path fill="white" d="M402 92.2q.28.33 26.33 27.46a19.29 19.29 0 013.54 11 20.2 20.2 0 01-5.67 14.26 18.15 18.15 0 01-13.64 6.08h-41.77v-22.64h35.32L379.89 101a16.84 16.84 0 01-3.59-11 20.2 20.2 0 015.61-14.26 18 18 0 0113.64-6.06h39.69v22.53H402z" />
                <Path fill="white" d="M481.5 69.63h22.57V151H481.5v-29.38h-24.2V151h-22.63V69.63h22.63V99h24.2zM561.45 88.85C561.45 62.28 586 62.6 586 62.6s-24.57.42-24.57-26.25c0 26.57-24.57 26.25-24.57 26.25s24.49-.32 24.59 26.25zM522.65 71.6c0-36.2 33.4-35.8 33.4-35.8s-33.4.4-33.4-35.8c0 36.2-33.4 35.8-33.4 35.8s33.4-.4 33.4 35.8zM531.45 98.93c0-16 14.63-15.73 14.63-15.73s-14.63.22-14.63-15.73c0 16-14.63 15.73-14.63 15.73s14.63-.11 14.63 15.73z" />
                </G>
            </G> 
            </Svg>
            </View>
            <View style={styles.container}>
         
      
                <View style={styles.buttons}>
                    <FontAwesome.Button
                        name="facebook"
                        onPress={loginWithFacebook(navigation)}
                        flexDirection={flex}
                        paddingLeft={paddingLeft}
                        style={styles.fbButton}
                        backgroundColor='transparent'
                        borderRadius={5}
                        >
                        <Text
                            style={styles.faceBookText}
                        >
                        {fbSpace+'Login with Facebook'}
                        </Text>
                    </FontAwesome.Button>
                    <View
                        style={{height: 10}}
                    />
                    <FontAwesome.Button
                        name="google"
                        onPress={loginWithGoogle(navigation)}
                        flexDirection={flex}
                        paddingLeft={paddingLeft}
                        style={styles.buttonGoogle}
                        backgroundColor='transparent'
                        borderRadius={5}>
                        <Text
                            style={styles.googleText}
                        >
                        {googleSpace+'Login with Google'}
                        </Text>
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
        top: Constants.statusBarHeight+100,
        width:300,
        height:200,
        resizeMode:'contain',
    },
    faceBookText: {
        color: '#ffffff',
        paddingLeft: paddingText,
        fontWeight: 'bold'
    },
    googleText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    buttons:{
        top:'60%',
        height:'100%'
    },
    fbButton:{
        borderWidth:0,
        borderColor:'transparent',
        width:240,
        height:50,
        backgroundColor:"#3b5998"
    },
    buttonGoogle:{
        borderWidth:0,
        borderColor:'transparent',
        width:240,
        height:50,
        backgroundColor:"#4c8bf5"
    },
    logoContainer:{
        flex:1,
        left:17,
        width:screenWidth*0.66,
        
    }
});
