import * as React from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions } from 'react-native';

import {FontAwesome} from "@expo/vector-icons";
import firebase from '../firebase/firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
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

let flex="row";
let paddingLeft='20%'
if (Platform.OS !== 'ios'){
    flex='row-reverse'
    paddingLeft='20%'
}


export default function LoginScreen({navigation}) {
    return (
        <LinearGradient
            colors={['#0b3959', '#184b6a', '#1f5c7a', '#217fa5',  '#3da6c6', '#36c6f0']}
            start={[0.0, 1.0]}
            locations={[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]}
            end={[1.0, 1.0]}
            style={styles.container}>
            <View style={styles.container}>
                <Svg viewBox="0 0 569 149" style={styles.logoContainer}>
                    <Path fill="white" d="M71.81,67.63H97.24L77.42,149h-25l-4.1-30.32L40.87,149H18.64L0,67.63H24.31l6.85,30,6.91-30h20l6.85,30Z"/>
                    <Path fill="white" d="M159,67.63V90.2H122.67V97H159v22.63H122.67v6.74H159V149H100.05V67.64h59Z"/>
                    <Path fill="white" d="M254.17,67.63H279.6L259.78,149h-25l-4.1-30.32L223.23,149H201L182.36,67.63h24.31l6.85,30,6.91-30h20l6.85,30Z"/>
                    <Path fill="white" d="M328.92,67.63,360,149H334l-3.09-8H299.55l-3,8H269.4l32.23-81.35ZM323,119.74l-7.69-20.32-7.69,20.32Z"/>
                    <Path fill="white" d="M392,90.2q.281.33,26.33,27.46a19.282,19.282,0,0,1,3.54,11,20.213,20.213,0,0,1-5.67,14.26A18.159,18.159,0,0,1,402.56,149H360.79V126.36h35.32L369.89,99a16.83,16.83,0,0,1-3.59-11,20.17,20.17,0,0,1,5.61-14.26,18,18,0,0,1,13.64-6.06h39.69V90.21H392Z"/>
                    <Path fill="white" d="M471.5,67.63h22.57V149H471.5V119.62H447.3V149H424.67V67.63H447.3V97h24.2Z"/>
                    <Path fill="white" d="M549.45,88.85C549.45,62.28,574,62.6,574,62.6s-24.57.42-24.57-26.25c0,26.57-24.57,26.25-24.57,26.25S549.35,62.28,549.45,88.85Z"/>
                    <Path fill="white" d="M510.65,71.6c0-36.2,33.4-35.8,33.4-35.8s-33.4.4-33.4-35.8c0,36.2-33.4,35.8-33.4,35.8S510.65,35.4,510.65,71.6Z"/>
                    <Path fill="white" d="M519.45,98.93c0-16,14.63-15.73,14.63-15.73s-14.63.22-14.63-15.73c0,16-14.63,15.73-14.63,15.73S519.45,83.09,519.45,98.93Z"/>
                </Svg>
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
                            {'   Login with Facebook'}
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
                            {'  Login with Google'}
                        </Text>
                    </FontAwesome.Button>
                </View>
            </View>
        </LinearGradient>
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
        justifyContent:'center'
    },
    faceBookText: {
        color: '#ffffff',
        fontWeight: 'bold',
        paddingLeft:'5%'
    },
    googleText: {
        color: '#ffffff',
        fontWeight: 'bold',
        paddingLeft:'4.2%'
    },
    buttons:{
        flex:2,
        width:'100%',
        top:'30%'
    },
    fbButton:{
        borderWidth:0,
        borderColor:'transparent',
        width:screenWidth*0.8,
        height:50,
        backgroundColor:"#3b5998",
    },
    buttonGoogle:{
        borderWidth:0,
        borderColor:'transparent',
        width: screenWidth*0.8,
        height:50,
        backgroundColor:"#4c8bf5"
    },
    logoContainer:{
        flex:1,
        top:'10%',
        width:screenWidth*0.60,
        marginRight: Platform.OS !== 'ios' ? `${(60*0.1919)/2}%` : 0,
        marginLeft: Platform.OS === 'ios' ? `${(60*0.1919)/2}%` : 0
    }
});
