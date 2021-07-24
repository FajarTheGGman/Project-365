import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import Banner from './components/Banner'
import Guide from './components/Guide'
import Offline from './components/Offline'

export default class App extends Component{
    render(){
        let Stack = createStackNavigator();
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Banner" component={Banner} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
                    <Stack.Screen name='Register' component={Register} options={{ headerStyle: { backgroundColor: '#292928' }, headerTitleStyle: { color: 'white' } }}/>
                    <Stack.Screen name='Guide' component={Guide} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                    <Stack.Screen name='Offline' component={Offline} options={{ headerShown: false }}/>
                    <Stack.Screen name='Profile' component={Profile} options={{ headerStyle: { backgroundColor: '#292928', color: 'white' }, headerTitleStyle: { color: 'white' } }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
