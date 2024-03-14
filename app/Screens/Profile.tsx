import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';

// main app starts
const Profile = () => {

  const [firstName, setFirstName] = useState<string | null>();
  const [lastName, setLastName] = useState<string | null>();
  const [email, setEmail] = useState<string | null | undefined>()
  const [imageURL, setImageURL] = useState<string | undefined>()
  const [phone, setPhone] = useState<string | null>()

  //getting current user information and settig values
  useEffect(() => {
    const user = auth().currentUser
    if (user) {
      const { displayName } = user
      if (displayName) {
        const names = displayName.split(' ');
        setFirstName(names[0]);
        setLastName(names.slice(1).join(' '));
      }
      setEmail(user?.email)
      if (user?.photoURL) {
        setImageURL(user.photoURL)
      }
      setPhone(user.phoneNumber)
    }
  }, [])


  return (
    <View style={styles.container}>
      {imageURL ? <Image source={{ uri: imageURL }} style={styles.image} /> : null}
      <View style={styles.infoContainer}>
        <Text style={styles.heading}>User's Informations</Text>
        <View style={styles.fullNameContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.name}>{firstName}</Text>
          </View >
          <View style={styles.nameContainer}>
            <Text style={styles.label}>Last Name</Text>
            <Text style={styles.name}>{lastName}</Text>
          </View>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.emailText}>{email?email:'Email not found!'}</Text>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.label}>Phone #</Text>
          <Text style={styles.emailText}>{phone ? phone : 'Phone # not found!😒'}</Text>
        </View>
      </View>
      
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 80,
    // backgroundColor:'#444'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#400F92',
    alignSelf: 'center'
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: "#400F92",
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameContainer: {
    // borderWidth:1,
    width: '45%',
    borderBottomWidth: 1
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888'
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#444',

  },
  emailContainer: {
    marginVertical: 14,
    borderBottomWidth: 1,
    paddingVertical:3
  },
  emailText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
  }
})
