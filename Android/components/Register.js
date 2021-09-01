import React, { Component } from 'react'
import { View, Text, TextInput, AsyncStorage, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import axios from 'axios'
import konfigurasi from '../config'
import { StackActions } from '@react-navigation/native'
import Loading from 'react-native-loading-spinner-overlay'

export default class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            success: false,
            alert_success: "Users Registered !",
            username: "",
            password: "",
            loading: false
        }
    }

    register(){
        if(this.state.username.length == 0 || this.state.password.length == 0){
            alert('Username & password still empty !')
        }else{
            (async() => {
                this.setState({ loading: true })
                await axios.post(konfigurasi.server + "auth/register", { username: this.state.username, password: this.state.password }).then(result => {
                    if(result.status == 200){
                        this.setState({ success: true, username: "", password: "" })
                        this.props.navigation.dispatch(
                            StackActions.replace('Guide')
                        )
                    }else{
                    
                    }
                })
                this.setState({ loading: false })
            })()
       }
    }

    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928' }}>
                <Loading visible={this.state.loading} textContent={"Please Wait.."} textStyle={{ color: 'white' }} />
                <View style={{ alignItems: 'center', marginTop: -25 }}>
                    <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, elevation: 15, paddingTop: 5 }}>
                        <Image source={require('../assets/icons/icon.png')} style={{ width: 100, height: 100, }}  />
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: 'white' }}>Project 365%</Text>
                    <Text style={{ color: 'white' }}>Version: 1.0.0</Text>

                </View>
                <View style={{ backgroundColor: 'white', padding: 15, elevation: 15, marginTop: 20, borderRadius: 10, alignItems: 'center', paddingLeft: 35, paddingRight: 35 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Register</Text>
                    <TextInput placeholder="Username" style={{ marginTop: 15 }} onChangeText={(value) => this.setState({ username: value })} />
                    <TextInput placeholder="Password" style={{ marginTop: 5 }} onChangeText={(value) => this.setState({ password: value })} secureTextEntry={true}/>
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.register()}>
                        <Text style={{ color: 'white', backgroundColor: 'black', elevation: 15, borderRadius: 5, padding: 5 }}>Create</Text>
                    </TouchableOpacity>
                    {this.state.success ? <Text style={{ marginTop: 8, color: 'green' }} onPress={() => this.setState({ success: false })} >{this.state.alert_success}</Text> : <Text></Text>}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={{ color: 'white' }}>Already have account login </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: 'green' }}>here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
