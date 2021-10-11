import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import Loading from 'react-native-loading-spinner-overlay'
import { StackActions } from '@react-navigation/native'

export default class Guide extends Component{
    constructor(props){
        super(props)

        this.state = {
            localip: '',
            ip: '',
            name: '',
            loading: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('mode').then(x => {
            if(x == 'offline'){
                this.props.navigation.navigate(
                    StackActions.replace('offline', { type: 'offline' })
                )
            }else if(x == 'outside'){
                this.props.navigation.navigate(
                    StackActions.replace('offline', { type: 'outside' })
                )
            }
        })
    }

    async connection(){
        AsyncStorage.setItem('localip', this.state.ip)
        await axios.get('http://' + this.state.ip).then(res => {
            if(res.status == 200){
                alert('Connected Successfully')
            }else{
                alert("Can't connect to your local network")
            }
        })
    }

    offline(){
        AsyncStorage.setItem('mode', null);
        AsyncStorage.setItem('mode', 'outside');
        this.props.navigation.dispatch(
            StackActions.replace('Offline', { type: 'outside' })
        )
    }

    name(){
        AsyncStorage.setItem('name', this.state.name)
        alert('Hey ' + this.state.name)
    }

    render(){
        return(
            <View style={{ backgroundColor: "#282829", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading visible={this.state.loading} textContent={"Please Wait..."} textStyle={{ color: 'white', fontWeight: 'bold' }} />
                <Swiper showButtons={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 170 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Code IT!</Text>
                        <Image source={require('../assets/illustrations/register/code.png')} style={{ width: 220, height: 220 }} />
                        <Text style={{ color: "white" }}>Make Sure Your'e already upload</Text>
                        <Text style={{ color: "white" }}>The Code For Nodemcu</Text>
                    </View>
                    
                    <View style={{ marginTop: 170, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Example Schematic</Text>
                        <Image source={require('../assets/icons/schematic.png')} style={{ width: 220, height: 180, borderRadius: 10, marginTop: 10 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>This is the minimum example of microcontroller </Text>
                        <Text style={{ color: 'white' }}>Relay <Text style={{ fontWeight: 'bold' }}>Ground</Text> goes to Ground, Relay <Text>Vcc</Text> Goes to</Text>
                        <Text style={{ color: 'white' }}>3.3v, And <Text style={{ fontWeight: "bold" }}>Signal</Text> pin goes to digital pin</Text>
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
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Wellcome To Offline Mode</Text>
                        <Image source={require('../assets/illustrations/register/mode.png')} style={{ width: 250, height: 220, marginTop: 15 }} />
                        <Text style={{ marginTop: 10, color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Remember</Text>, all your configurations</Text>
                        <Text style={{ color: 'white' }}>Only appears in your device</Text>

                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 15, elevation: 15, marginTop: 10 }} onPress={() => this.offline()}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Let Me in</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
