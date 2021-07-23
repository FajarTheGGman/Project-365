import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import { StackActions } from '@react-navigation/native'

export default class Guide extends Component{
    constructor(props){
        super(props)

        this.state = {
            localip: '',
            ip: '',
            name: ''
        }
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

    render(){
        return(
            <View style={{ backgroundColor: "#282829", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                        <Text style={{ color: "white" }}>You Should Upload it to your hosting</Text>
                        <Text style={{ color: 'white' }}>Or You can use free nodejs hosting like</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Heroku, Vercel, Netlify</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>What's Your Local IP Server ?</Text>
                        <Image source={require('../assets/illustrations/register/server.png')} style={{ width: 220, height: 220, marginTop: 15 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>Input your nodemcu IP, It can be useful</Text>
                        <Text style={{ color: 'white' }}>if your're using offline mode</Text>


                        <TextInput style={{ backgroundColor: "white", marginTop: 10, borderRadius: 10, elevation: 15, padding: 8 }} placeholder="Input IP Server" keyboardType={'numeric'} onChangeText={(val) => this.setState({ ip: val })} />
                        <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, padding: 12, elevation: 15 }} onPress={() => this.connection()}>
                            <Text style={{ color: 'white' }}>Test Connection</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>By The Way</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>What's Your Name ?</Text>

                        <Image source={require('../assets/illustrations/name.png')} style={{ width: 300, height: 220, marginTop: 15 }} />
                        
                        <Text style={{ color: 'white', marginTop: 5 }}>This name gonna appear in</Text>
                        <Text style={{ color: 'white' }}>Offline mode</Text>

                        <TextInput style={{ padding: 5, backgroundColor: 'white', borderRadius: 10, width: 150, marginTop: 10 }} onChangeText={(val) => this.setState({ name: val })} placeholder="Input Your Name" />
                        <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => this.name()}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Choose Your Mode</Text>
                        <Image source={require('../assets/illustrations/register/mode.png')} style={{ width: 250, height: 220, marginTop: 15 }} />
                        <Text style={{ marginTop: 10, color: 'white' }}>Choose Your Mode</Text>
                        <Text style={{ color: 'white' }}>Or You can change manually in settings</Text>
                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 15, elevation: 15, marginTop: 15 }} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Online Mode</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 15, elevation: 15, marginTop: 10 }} onPress={() => this.offline()}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Offline Mode</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
