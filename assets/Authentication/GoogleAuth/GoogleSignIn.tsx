import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import { Text, View } from 'react-native'
import React from 'react'

export const authentication = () => {
    useEffect(() => {
        const userName = (auth().currentUser?.displayName)
    }, [])
}

const GoogleSignIn = () => {
    return (
        <View>
            <Text>GoogleSignIn</Text>
        </View>
    )
}

export default GoogleSignIn

