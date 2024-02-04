import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerScreenProps } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import auth from '@react-native-firebase/auth';
import { Drawer } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type DashboardScreenProps = DrawerScreenProps<RootStackParamList, 'DrawerNavigation'>
const CustomDrawer = (props: DrawerContentComponentProps, { route, navigation }: DashboardScreenProps) => {

    const [name, setName] = useState<string | null | undefined>()
    const [email, setEmail] = useState<string | null | undefined>()
    const [imageURL, setImageURL] = useState<string | undefined>()

    //getting current user information and settig values
    useEffect(() => {
        const user = auth().currentUser
        setName(user?.displayName)
        setEmail(user?.email)
        if (user?.photoURL) {
            setImageURL(user.photoURL)
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                {imageURL ?
                    <Image source={{ uri: imageURL }}
                        style={styles.image} />
                    : <Image source={require('../assets/Images/user.jpeg')}
                        style={styles.image} />}
                <Text style={styles.profileName}>{name ? name : 'John Doe'}</Text>
                <Text style={styles.profileEmail}>{email ? email : 'example@gmail.com'}</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.buttonContainer} >
                <TouchableOpacity style={styles.button} activeOpacity={0.6}
                    onPress={() => {
                        auth().signOut().then(() => {
                            // navigation.closeDrawer
                            GoogleSignin.signOut().then(() => {

                            }).catch(() => { })

                            props.navigation.navigate('Home')
                            console.log('User SignOut ');
                        }).catch((error) => {
                            return console.log(error);
                        })
                    }}
                >
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileInfo: {
        width: '100%',
        height: 200,
        backgroundColor: '#eee',
        alignItems: 'center',
        marginBottom: 10
    },
    image: {
        width: 80,
        height: 80,
        // alignSelf:'center',
        borderRadius: 40,
        marginTop: 50,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
        marginTop: 5,
    },
    profileEmail: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 4
    },
    buttonContainer: {
        marginBottom: 20,
        width: '90%',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'rgba(0,0,255,0.6)',
        borderRadius: 4,
        paddingVertical: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 19,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})