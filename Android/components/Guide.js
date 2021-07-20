import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'

export default class Guide extends Component{
    constructor(props){
        super(props)

        this.state = {
            localip: ''
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('username').then(data => {
            console.log(data)
        })
    }

    connection(){
        axios.get(this.state.localip).then(res => {
            if(res.status == 200){
                alert('Connected Successfully')
            }else{
                alert("Can't connect to your local network")
            }
        })
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


                        <TextInput style={{ backgroundColor: "white", marginTop: 10, borderRadius: 10, elevation: 15, padding: 8 }} placeholder="Input IP Server" keyboardType={'numeric'} />
                        <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, padding: 12, elevation: 15 }}>
                            <Text style={{ color: 'white' }}>Test Connection</Text>
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

                        <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 15, elevation: 15, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Offline Mode</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
