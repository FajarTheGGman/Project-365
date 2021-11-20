import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import ProfileOffline from './components/Profile_Offline'
import Banner from './components/Banner'
import Guide from './components/Guide'
import GuideOffline from './components/Guide_Offline'
import Offline from './components/Offline' 

export default class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            redirect: 'Banner'
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('mode').then(data => {
            if(data == 'outside'){
                this.setState({ redirect: 'offline' })
            }else if(data == 'offline'){
                this.setState({ redirect: 'offline' })
            }else{
                this.setState({ redirect: null })
            }
        })
    }

    render(){
        let Stack = createStackNavigator();
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.state.redirect}>
                    <Stack.Screen name="Banner" component={Banner} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
                    <Stack.Screen name='Register' component={Register} options={{ headerStyle: { backgroundColor: '#292928' }, headerTitleStyle: { color: 'white' } }}/>
                    <Stack.Screen name='Guide' component={Guide} options={{ headerShown: false }} />
                    <Stack.Screen name='GuideOffline' component={GuideOffline} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                    <Stack.Screen name='Offline' component={Offline} options={{ headerShown: false }}/>
                    <Stack.Screen name='Profile' component={Profile} options={{ headerStyle: { backgroundColor: '#292928', color: 'white' }, headerTitleStyle: { color: 'white' } }} />
                    <Stack.Screen name='ProfileOffline' component={ProfileOffline} options={{ headerStyle: { backgroundColor: '#292928' }, headerTitleStyle: { color: 'white' }, headerTitle: 'Profile' }} />
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
