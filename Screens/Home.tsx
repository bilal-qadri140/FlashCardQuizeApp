import { Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';




// Navigation Screen Props

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

// Our App
const Home = ({ navigation }: HomeScreenProps) => {
  // console.log('Mounted');
  // console.log(navigation.isFocused());

  // State Hooks
  const [isInProgress, setIsInProgress] = useState<boolean>(false)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [name, setName] = useState<string | null | undefined>()

  // Google singIn
  const signInWithGoogle = async () => {
    setIsInProgress(true)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    setIsInProgress(false)
    return auth().signInWithCredential(googleCredential)
  }

  // Checking signin status 
  const checkSignInStatus = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn()
    setIsSignedIn(isSignedIn)
  };


  // this Navigation Hook is mounted every time when screen is focused using Navigation or other methods
  useFocusEffect(
    useCallback(() => {
      checkSignInStatus()
    }, [])
  )

  //  getting current user logged in
  useEffect(() => {
    if (auth().currentUser?.displayName) {
      setName(convertToString(auth().currentUser?.displayName))
      // console.log(name);
    }
  }, []);

  // conveting into string type
  function convertToString(value: string | null | undefined): string {
    if (value === null || value === undefined) {
      return ''
    }
    return value
  }

  // Configure the App with firebase
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '590950956131-9tlql3ba30mb0mdo5l69b19ul714r0ep.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }, [])



  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading} >Online Quiz</Text> */}
      <View style={styles.imageContainer}>
        <LottieView style={{
          width: responsiveHeight(70),
          height: responsiveHeight(45)
        }} source={require('../assets/Images/Animation - 1707131205815.json')} autoPlay loop />
      </View>
      <View>
        <Text style={styles.heading}>Welcome to Online Quiz</Text>
      </View >
      <View style={styles.descContainer}>
        <Text style={styles.description}>You're are one step away from getting the early access to Quiz.</Text>
      </View >
      {
        !isSignedIn ?
          <GoogleSigninButton
            style={styles.button}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
              signInWithGoogle()
                .then(gmail => {
                  ToastAndroid.show('Loged in as ' + gmail.user.displayName, ToastAndroid.LONG)
                  // navigation.navigate('ShowResult', { score: [] })
                  setIsSignedIn(true)
                  navigation.navigate('DrawerNavigation')
                })
                .catch(error => {
                  console.log(error)
                  Alert.alert('Error', error)
                  setIsInProgress(false)
                })
            }}
            disabled={isInProgress}
          /> :
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity
              style={[styles.startedButton]}
              activeOpacity={0.8}
              onPress={() => {
                console.log(name + ' in Home Page');
                navigation.navigate('DrawerNavigation')
                ToastAndroid.show('Loged in as ' + name, ToastAndroid.LONG)
              }}
            >
              <Text style={styles.startedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
      }
    </View>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
  heading: {
    textAlign: 'center',
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    color: '#0000ff99',
    marginTop: 10,
  },
  imageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    marginTop: 40,
  },
  image: {
    width: responsiveHeight(70),
    height: responsiveHeight(45),
    resizeMode: 'contain',
    // borderWidth: 1,
    borderColor: '#0000ff99',
    marginTop: 30,
    borderRadius: 8,
  },
  descContainer: {
    marginTop: 20,
    width: responsiveWidth(90),
    marginHorizontal: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  button: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '7%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '7%',
    width: '100%',
    alignSelf: 'center'
  },
  startedButton: {
    backgroundColor: '#0000ff99',
    // backgroundColor:'#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
  },
  startedButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    paddingVertical: 8,
  },

})