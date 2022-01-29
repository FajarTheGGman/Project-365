import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import { StackActions } from '@react-navigation/native'
import Modal from 'react-native-modal'
import Icons from 'react-native-vector-icons/Ionicons'

export default class Guide extends Component{
    constructor(props){
        super(props)

        this.state = {
            localip: '',
            ip: '',
            name: '',
            io_username: '',
            io_key: '',
            adafruit: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('mode').then(x => {
            if(x == 'offline'){
                this.props.navigation.navigate(
                    StackActions.replace('offline', { type: 'offline' })
                )
            }
        })
    }

    connection(){
        AsyncStorage.setItem('localip', this.state.ip)
        axios.get(this.state.ip).then(res => {
            if(res.status == 200){
                alert('Connected Successfully')
            }else{
                alert("Can't connect to your local network")
            }
        })
    }

    offline(){
        this.props.navigation.dispatch(
            StackActions.replace('Offline', { type: 'offline' })
        )
    }

    name(){
        AsyncStorage.setItem('name', this.state.name)
        alert('Done!')
    }

    io(){
        AsyncStorage.setItem('io_username', this.state.io_username)
        AsyncStorage.setItem('io_key', this.state.io_key)
        this.setState({ adafruit: false })
    }

    render(){
        return(
            <View style={{ backgroundColor: "#282829", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal isVisible={this.state.adafruit}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, width: 220, alignItems: 'center' }}>

                            <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyg8lw-X6OlOGw2f6Y-Jd-FLlOgoONuoUYxsVTv5-VAxJubLVMm0DHIkQax3bLrUhNwc&usqp=CAU" }} style={{ width: 110, height: 110 }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Configure Adafruit</Text>

                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <View>
                                    <TextInput placeholder="Nickname" onChangeText={(val) => this.setState({ io_username: val })}/>
                                    <TextInput placeholder="IO Key" onChangeText={(val) => this.setState({ io_key: val })} />
                                </View>

                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ color: 'red', marginTop: 5, fontWeight: 'bold' }}>Required*</Text>
                                    <Text style={{ color: 'red', marginTop: 10, fontWeight: 'bold' }}>Required*</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, alignSelf: 'center', paddingLeft: 7, paddingRight: 7, color: 'black', backgroundColor: 'green', borderRadius: 10, padding: 5, elevation: 15, }} onPress={() => this.io()}>
                                <Text style={{ fontWeight: 'bold', }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Swiper showButtons={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 170 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Code IT!</Text>
                        <Image source={require('../assets/illustrations/register/code.png')} style={{ width: 220, height: 220 }} />
                        <Text style={{ color: "white" }}>Make Sure Your'e already upload</Text>
                        <Text style={{ color: "white" }}>The Code For Nodemcu</Text>
                    </View>
                    
                    <View style={{ marginTop: 170, alignItems: 'center', justifyContent: "center" }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Upload IT!</Text>
                        <Image source={require('../assets/illustrations/register/hosting.png')} style={{ width: 220, height: 180, marginTop: 15 }} />
                        <Text style={{ marginTop: 15, color: 'white' }}>To Control Your Board Online</Text>
                        <Text style={{ color: "white" }}>You Should Upload Nodejs Server to your hosting</Text>
                        <Text style={{ color: 'white' }}>Or You can use free nodejs hosting like</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Heroku, Vercel, Netlify</Text>
                    </View>

                    <View style={{ marginTop: 170, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Example Schematic</Text>
                        <Image source={require('../assets/icons/schematic.png')} style={{ width: 220, height: 180, borderRadius: 10, marginTop: 10 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>This is the minimum example of microcontroller </Text>
                        <Text style={{ color: 'white' }}>Relay <Text style={{ fontWeight: 'bold' }}>Ground</Text> goes to Ground, Relay <Text>Vcc</Text> Goes to</Text>
                        <Text style={{ color: 'white' }}>3.3v, And <Text style={{ fontWeight: "bold" }}>Signal</Text> pin goes to digital pin</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 120 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Configure Adafruit</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>MQTT Server</Text>

                        <Image source={require('../assets/illustrations/server.png')} style={{ width: 320, height: 250, marginTop: 15 }} />
                        
                        <Text style={{ color: 'white', marginTop: 5 }}>This configuration for Adafruit realtime io to ESP.</Text>
                        <Text style={{ color: 'white' }}>If you don't have to setup adafruit io yet</Text>
                        <Text style={{ color: 'white' }}>Click here to setup your enviroment</Text>
                        <Text style={{ color: 'white' }}>And get back to here, and paste your configuration</Text>

                        <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => this.setState({ adafruit: true })}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Configure</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Setup is complete !</Text>
                        <Image source={require('../assets/illustrations/register/mode.png')} style={{ width: 250, height: 220, marginTop: 15 }} />
                        <Text style={{ marginTop: 10, color: 'white' }}>Let's jump into</Text>
                        <Text style={{ color: 'white' }}>Home menu, mate</Text>
                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 15, elevation: 15, marginTop: 15 }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Let Me In</Text>
                        </TouchableOpacity>

                    </View>
                </Swiper>
            </View>
        )
    }
}
