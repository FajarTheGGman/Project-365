import React, { Component } from 'react'
import { AsyncStorage, TouchableOpacity, KeyboardAvoidingView, View, TextInput, Text, Modal, Image } from 'react-native'
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import konfigurasi from '../config'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data.length == 0 || data.length == null){

            }else{
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    login(){
        axios.post(konfigurasi.server + 'auth/login', { username: this.state.username, password: this.state.password }).then(result => {
            if(result.status == 201){
                alert('[!] Username or password is wrong')
            }else{
                AsyncStorage.setItem('token', result.headers.token)
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", flexDirection: 'column', backgroundColor: '#292928' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, elevation: 15, paddingTop: 5 }}>
                        <Image source={require('../assets/icons/icon.png')} style={{ width: 100, height: 100, }}  />
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: 'white' }}>Project 365%</Text>
                    <Text style={{ color: 'white' }}>Version: 1.0.0</Text>

                </View>

                <View style={{ backgroundColor: 'white', padding: 15, marginTop: 25, elevation: 15, borderRadius: 10, alignItems: 'center', paddingLeft: 35, paddingRight: 35 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                    <TextInput placeholder="Username" style={{ marginTop: 15 }} onChangeText={(value) => this.setState({ username: value })} />
                    <TextInput placeholder="Password" style={{ marginTop: 5 }} onChangeText={(value) => this.setState({ password: value })} secureTextEntry={true} />
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.login()}>
                        <Text style={{ color: 'white', backgroundColor: 'black', elevation: 15, borderRadius: 5, padding: 5 }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={{ color: 'white' }}>Don't have any account register </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ color: 'green' }}>here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
