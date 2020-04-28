import * as React from 'react';
import { Image, StyleSheet, View, Platform, ImageBackground} from 'react-native';
import Constants from 'expo-constants';

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
                <Image
                    source={require('../assets/images/white-logo.png')}
                    style={styles.logoImage}
                />
                <View style={styles.buttons}>
                    <FontAwesome.Button
                        name="facebook"
                        onPress={loginWithFacebook(navigation)}
                        flexDirection={flex}
                        paddingLeft={paddingLeft+6}
                        style={styles.fbButton}
                        backgroundColor='transparent'
                        borderRadius={5}
                        >
                        {fbSpace+'Login with Facebook'}
                    </FontAwesome.Button>
                    <FontAwesome.Button
                        name="google"
                        onPress={loginWithGoogle(navigation)}
                        flexDirection={flex}
                        paddingLeft={paddingLeft}
                        style={styles.buttonGoogle}
                        backgroundColor='transparent'
                        borderRadius={5}>
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
        top: Constants.statusBarHeight+100,
        width:300,
        height:200,
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
        width:240,
        height:50,
        backgroundColor:"#3b5998"
    },
    buttonGoogle:{
        marginTop:5,
        borderWidth:0,
        borderColor:'transparent',
        width:240,
        height:50,
        backgroundColor:"#4c8bf5"
    }
});
