import { StyleSheet } from 'react-native'
import React from 'react'

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Icons imports
import Icon1 from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'react-native-elements'

// Screens for Navigation
import AddQuestions from './app/Screens/AddQuestions';
import Profile from './app/Screens/Profile';
import Home from './app/Screens/Home'
import Dashboard from './app/Screens/Dashboard'
import CustomDrawer from './app/Screens/CustomDrawer';
import TakeQuiz from './app/Screens/TakeQuiz';
import ShowResult from './app/Screens/ShowResult';
import PrivacyPolicy from './app/Screens/PrivacyPolicy';

// params for Stack Navigation
export type RootStackParamList = {
  Home: undefined,
  DrawerNavigation: undefined
  AddQuestions: {
    title: string
    id: string
    name: string
  }
  TakeQuiz: {
    title: string
    id: string
    name: string
  }
  ShowResult: {
    score: boolean[]
  }
};

// params for Drawer Navigation
export type DrawerParams = {
  Dashboard: undefined,
  Profile: undefined,
  PrivacyPolicy: undefined
}
// Stack and Drawer Navigators
const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<DrawerParams>()


// Drawer Navigation function
const DrawerNavigation = () => {

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
          <Icon1 name='user-o' size={28} color={color} />
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
        <Stack.Screen name='AddQuestions' component={AddQuestions} />
        <Stack.Screen name='TakeQuiz' component={TakeQuiz} />
        <Stack.Screen name='ShowResult' component={ShowResult} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App
