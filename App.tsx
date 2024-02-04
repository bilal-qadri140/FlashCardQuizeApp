import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// Screens for Navigation
import AddQuestions from './Screens/AddQuestions';
import Profile from './Screens/Profile';
import Home from './Screens/Home'
import Dashboard from './Screens/Dashboard'
import CustomDrawer from './Screens/CustomDrawer';
import TakeQuiz from './Screens/TakeQuiz';
import ShowResult from './Screens/ShowResult';
import PrivacyPolicy from './Screens/PrivacyPolicy';

// params for Stack Navigation
export type RootStackParamList = {
  Home: undefined,
  DrawerNavigation: undefined
  AddQuestions: {
    title: string
    id: string
    name:string
  }
  TakeQuiz:{
    title: string
    id: string
    name:string
  }
  ShowResult:{
    score: boolean[]
  }
};

// params for Drawer Navigation
export type DrawerParams = {
  Dashboard: undefined,
  Profile: undefined,
  PrivacyPolicy:undefined
}
// Stack and Drawer Navigators
const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<DrawerParams>()
4

// Drawer Navigation function
const DrawerNavigation = ({ route,navigation }: any) => {

  return (
    <Drawer.Navigator initialRouteName='Dashboard' drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{
      drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 230,
      },
      drawerType: 'front',
      drawerLabelStyle: {
        marginLeft: -25,
        fontSize: 18,
        fontWeight: 'bold'
      }
    }}>
      <Drawer.Screen name='Dashboard' component={Dashboard} options={{
        drawerIcon: ({ color }) => (
          <MaterialIcons name='home-max' size={28} color={color} />
        ),
      }} />
      <Drawer.Screen name='Profile' component={Profile} options={{
        drawerIcon: ({ color }) => (
          <Icon name='user-o' size={28} color={color} />
        )
      }} />
      <Drawer.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{
        drawerIcon: ({ color }) => (
          <MaterialComunityIcons name='shield-key' size={28} color={color} />
        )
      }} />
    </Drawer.Navigator>
  )
}

// main App Satart here
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
        <Stack.Screen name='AddQuestions' component={AddQuestions} options={{
          headerShown: true,
          headerTitle: 'Add Questions',
        }} />
        <Stack.Screen name='TakeQuiz' component={TakeQuiz} options={{
          headerShown: true,
          headerTitle: 'Quiz Test',
        }}/>
        <Stack.Screen name='ShowResult' component={ShowResult} options={{
          headerShown: true,
          headerTitle: 'Quiz Result',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App

const styles = StyleSheet.create({
  container: {
  }
})