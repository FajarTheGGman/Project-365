import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import Modal from 'react-native-modal'
import Loading from 'react-native-loading-spinner-overlay'

export default class Banner extends Component{
    constructor(props){
        super(props)

        this.state ={
            dev: "{ Developer: Fajar Firdaus }",
            version: "{ Version: '1.2.3' }",
            server: null,
            noserver: false,
            input_server: false,
            loading: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('myserver').then(data => {
            if(data == null){
                this.setState({ noserver: true })
            }else{
                this.setState({ noserver: false })
            }
        })
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
            if(res != null){
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    async server(){
        this.setState({ loading: true })
        await axios.get(this.state.server).then(res => {
            if(res.status == 200){
                AsyncStorage.setItem("myserver", this.state.server + "/")
                this.setState({ noserver: false })
                alert('Now your server is ' + this.state.server)
            }
        }).catch(err => {
            if(err){
                alert('[!] Error Connecting to server')
            }
        })
        this.setState({ loading: false })
   }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928', justifyContent: 'center' }}>
                <Modal isVisible={this.state.input_server}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 13, borderRadius: 10 }}>
                            <TextInput placeholder="Input Server" onChangeText={(val) => this.setState({ server: val })} />
                            <TouchableOpacity style={{ backgroundColor: 'black', padding: 5, color: 'white', borderRadius: 5, marginTop: 5, alignItems: "center" }} onPress={() => this.setState({ input_server: false })}>
                                <Text style={{ color: 'white', alignItems: 'center' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Loading visible={this.state.loading} textContent={"Connecting to server..."} textStyle={{ color: 'white' }} />

                <Swiper showsButton={true}>
                    <View style={{ alignItems: 'center', marginTop: 170 }}>
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

                    <View style={{ marginTop: 140, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>One Last Step</Text>
                        <Image source={require('../assets/illustrations/register/server.png')} style={{ width: 270, height: 210, marginTop: 15 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>If you want to use online mode</Text>
                        <Text style={{ color: 'white' }}>You should input your server url</Text>
                        <Text style={{ color: 'orange' }}>plz use http/https in url</Text>
                        <Text style={{ color: 'orange' }}>and don't use '/' in end of url</Text>
                        <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, padding: 10, paddingLeft: 15, paddingRight: 15 }} placeholder="Input Domain Server" onPress={() => this.setState({ input_server: true })} ><Text style={{ color: 'white', fontWeight: 'bold' }}>Input Server</Text></TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 7, borderRadius: 10, backgroundColor: 'green', padding: 7 }} onPress={() => this.server()}>
                            <Text style={{ fontWeight: 'bold' }}>Yes, that's my server</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Choose Your Side </Text>
                        <Image source={require('../assets/illustrations/login.png')} style={{ width: 270, height: 210, marginTop: 15 }} />

                        {this.state.noserver ? 
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 65, marginRight: 8 }}>
                            <Icon name="arrow-back-outline" size={30} color="white" style={{ marginRight: 10 }} />
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>You should write down your server</Text>
                        </View>
                        :
                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 12, paddingLeft: 110, marginTop: 65, paddingRight: 110, borderRadius: 15, elevation: 15 }} onPress={() => this.props.navigation.navigate('Guide')}>
                            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 17 }}>Online</Text>
                        </TouchableOpacity>
                        }

                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 12, marginTop: 10, paddingLeft: 110, paddingRight: 110, borderRadius: 15, elevation: 15 }} onPress={() => this.props.navigation.navigate('GuideOffline')}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Offline</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
