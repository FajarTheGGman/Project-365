import React, { Component } from 'react'
import { AsyncStorage, TouchableOpacity, KeyboardAvoidingView, View, TextInput, Text, Modal, Image } from 'react-native'
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import Loading from 'react-native-loading-spinner-overlay'
import konfigurasi from '../config'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            loading: false,
            server: null
        }
    }

    async componentDidMount(){
        await AsyncStorage.getItem('myserver').then(data => {
            this.setState({ server: data })
        })


        // make asyncstorage get item 'mode'
        await AsyncStorage.getItem('mode').then(data => {
            if(data == 'online'){
                AsyncStorage.getItem('token').then(data => {
                    if(!data){

                    }else{
                        this.props.navigation.dispatch(
                            StackActions.replace('Home')
                        )
                    }
                })
            }else if(data == 'offline'){
                this.props.navigation.dispatch(
                    StackActions.replace('Offline')
                )
            }
        })
    }

    login(){
        (async() => {
            this.setState({ loading: true })
            await axios.post(this.state.server + 'auth/login', { username: this.state.username, password: this.state.password }).then(result => {
                if(result.status == 201){
                    alert('[!] Username or password is wrong')
                }else{
                    AsyncStorage.setItem('token', result.headers.token)
                    this.props.navigation.dispatch(
                        StackActions.replace('Home')
                    )
                }
            })
            this.setState({ loading: false })
 
        })()
   }

    offline(){
        this.props.navigation.dispatch(
            StackActions.replace('Offline', { status: 'outside' })
        )
    }

    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", flexDirection: 'column', backgroundColor: '#292928' }}>
                <Loading visible={this.state.loading} textContent={"Please Wait..."} textStyle={{ color: 'white' }}/>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, elevation: 15, paddingTop: 5 }} onPress={() => this.offline()}>
                        <Image source={require('../assets/icons/icon.png')} style={{ width: 100, height: 100, }}  />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: 'white' }}>Project 365%</Text>
                    <Text style={{ color: 'white' }}>Version: 1.2.5</Text>

                </View>

                <View style={{ backgroundColor: 'white', padding: 15, marginTop: 25, elevation: 15, borderRadius: 10, alignItems: 'center', paddingLeft: 35, paddingRight: 35 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                    <TextInput placeholder="Username" style={{ marginTop: 15, padding: 10, backgroundColor: '#ededed', width: 120, borderRadius: 10  }} onChangeText={(value) => this.setState({ username: value })} />
                    <TextInput placeholder="Password" style={{ marginTop: 10, padding: 10, backgroundColor: '#ededed', width: 120, borderRadius: 10 }} onChangeText={(value) => this.setState({ password: value })} secureTextEntry={true} />
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
