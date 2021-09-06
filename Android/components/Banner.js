import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import Swiper from 'react-native-swiper'
import { StackActions } from '@react-navigation/native'

export default class Banner extends Component{
    constructor(props){
        super(props)

        this.state ={
            dev: "{ Developer: Fajar Firdaus }",
            version: "{ Version: 'development' }"
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('mode').then(data => {
            if(data == 'offline'){
                this.props.navigation.dispatch(
                    StackActions.replace('Offline', { type: 'outside' })
                )
            }else if(data == 'outside'){
                this.props.navigation.dispatch(
                    StackActions.replace('Offline', { type: 'outside' })
                )
            }
        })
        AsyncStorage.getItem('token').then(res => {
            if(res.length == 0 || res.length == null){

            }else{
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928', justifyContent: 'center' }}>
                <Swiper showsButton={true}>
                    <View style={{ alignItems: 'center', marginTop: 200 }}>
                        <Image source={require('../assets/icons/icon.png')} style={{ width: 130, height: 120 }} />
                        <Text style={{ fontSize: 19, color: 'white', fontWeight: 'normal', marginTop: 27  }}>Sup Mate, Wellcome To</Text>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Project 365%</Text>
                        <Text style={{ color: 'white', marginTop: 65 }}>{this.state.dev}</Text>
                        <Text style={{ color: 'white', marginTop: 5 }}>{this.state.version}</Text>

                        <Text style={{ marginTop: 50, fontSize: 17, color: 'white', fontWeight: 'bold' }}>Swipe To Right 👉</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 140}}>
                        <Text style={{ color: 'white', fontSize: 27, fontWeight: 'bold' }}>So, What is Project-365% ?</Text>
                        <Image source={require('../assets/illustrations/question.png')} style={{ width: 250, height: 200, marginTop: 5 }} />
                        <Text style={{ fontSize: 15, color: 'white', marginTop: 5 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Project-365%</Text> is simple application for </Text>
                        <Text style={{ color: 'white', }}>Internet Of Things stuff, that's like </Text>
                        <Text style={{ color: 'white' }}>Controlling Your IOT Board Just From Your Phone</Text>
                        <Text style={{ marginTop: 100, color: 'white', fontWeight: 'bold', fontSize: 17 }}>Swipe To Right 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 27, fontWeight: 'bold' }}>How About The UI/UX ?</Text>
                        <Image source={require('../assets/illustrations/ui.png')} style={{ width: 250, height: 200, marginTop: 15 }} />
                        <Text style={{ fontSize: 15, color: 'white' }}>This time i was trying to designing the UI</Text>
                        <Text style={{ color: 'white' }}>With Minimalist Style and also the Dark Mode</Text>
                        <Text style={{ marginTop: 100, fontSize: 17, color: 'white', fontWeight: 'bold' }}>Swipe To Right 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Can I Use it from anywhere ?</Text>
                        <Image source={require('../assets/illustrations/control.png')} style={{ width: 280, height: 210, marginTop: 15 }} />
                        <Text style={{ color: 'white', marginTop: 15 }}><Text style={{ fontWeight: 'bold' }}>Yes You Can</Text>, The Application I was designing to </Text>
                        <Text style={{ color: 'white' }}>Working as <Text style={{ fontWeight: 'bold' }}>Offline</Text> and <Text style={{ fontWeight: 'bold' }}>Online</Text></Text>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginTop: 80 }}>Swipe To Right 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Is this project open source ?</Text>
                        <Image source={require('../assets/illustrations/opensource.png')} style={{ width: 350, height: 210, marginTop: 15 }} />
                        <Text style={{ marginTop: 15, color: 'white', fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Yup</Text> this project is open source</Text>
                        <Text style={{ color: 'white' }}>You can modify the code as well in my github</Text>
                        <Text style={{ marginTop: 80, color: 'white', fontSize: 17, fontWeight: 'bold' }}>Swipe To Right 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Now You Can Login Here</Text>
                        <Image source={require('../assets/illustrations/login.png')} style={{ width: 270, height: 210, marginTop: 15 }} />
                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 12, paddingLeft: 120, marginTop: 65, paddingRight: 120, borderRadius: 15, elevation: 15 }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 17 }}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 12, marginTop: 10, paddingLeft: 110, paddingRight: 110, borderRadius: 15, elevation: 15 }} onPress={() => this.props.navigation.navigate('GuideOffline')}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Offline</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
