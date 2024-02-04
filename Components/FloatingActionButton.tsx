import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/MaterialIcons'

const FloatingActionButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Icon name='add' size={40} color={'#fff'}/>
      </TouchableOpacity>
    </View>
  )
}

export default FloatingActionButton

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        borderRadius:35,
        borderWidth:1,
        borderColor:'#000',
        width:70,
        height:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#400F92',
        position:'absolute',
        bottom:20,
        right:20,
    }
})