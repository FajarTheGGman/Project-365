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
            version: "{ Version: '1.2.2' }",
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
                        <Text style={{ fontSize: 19, color: 'white', fontWeight: 'normal', marginTop: 27  }}>Hi, Selamat Datang Di</Text>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Smart Lab</Text>
                        <Text style={{ color: 'white', marginTop: 65 }}>{this.state.dev}</Text>
                        <Text style={{ color: 'white', marginTop: 5 }}>{this.state.version}</Text>

                        <Text style={{ marginTop: 50, fontSize: 17, color: 'white', fontWeight: 'bold' }}>Swipe Ke Kanan 👉</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 140}}>
                        <Text style={{ color: 'white', fontSize: 27, fontWeight: 'bold' }}>Apasih Smart Lab Itu ?</Text>
                        <Image source={require('../assets/illustrations/question.png')} style={{ width: 250, height: 200, marginTop: 5 }} />
                        <Text style={{ fontSize: 15, color: 'white', marginTop: 5 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Smart Lab </Text>Adalah aplikasi untuk</Text>
                        <Text style={{ color: 'white', }}>Internet Of Things stuff, jadi kalian bisa </Text>
                        <Text style={{ color: 'white' }}>Mengatur/Menkontrol alat2 elektronik di sekitar</Text>
                        <Text style={{ color: 'white' }}>Khususnya di Lab Sekolah</Text>
                        <Text style={{ marginTop: 100, color: 'white', fontWeight: 'bold', fontSize: 17 }}>Swipe Ke Kanan 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Bagaimana cara pakai nya ?</Text>
                        <Image source={require('../assets/illustrations/control.png')} style={{ width: 280, height: 210, marginTop: 15 }} />
                        <Text style={{ color: 'white', marginTop: 15 }}>Simple nya, Kalian Hanya Perlu konek</Text>
                        <Text style={{ color: 'white' }}>Ke jaringan IOT nya lalu setting ip </Text>
                        <Text style={{ color: 'white' }}>sesuaikan dengan mesin IOT nya</Text>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginTop: 80 }}>Swipe Ke Kanan 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Apakah Project ini Open Source ?</Text>
                        <Image source={require('../assets/illustrations/opensource.png')} style={{ width: 350, height: 210, marginTop: 15 }} />
                        <Text style={{ marginTop: 15, color: 'white', fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Yup</Text> project ini opensource</Text>
                        <Text style={{ color: 'white' }}>Kalian bisa cek source code nya di </Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>https://github.com/FajarTheGGman/Project-365</Text>
                        <Text style={{ color: 'white' }}>Dan Kalian bisa memodifikasi kode nya</Text>
                        <Text style={{ color: 'white' }}>Sesuai dengan yang kalian butuhkan</Text>
                        <Text style={{ marginTop: 80, color: 'white', fontSize: 17, fontWeight: 'bold' }}>Swipe Ke Kanan 👉</Text>
                    </View>

                    <View style={{ marginTop: 150, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Lanjut Ke Step Berikutnya</Text>
                        <Image source={require('../assets/illustrations/login.png')} style={{ width: 270, height: 210, marginTop: 15 }} />
                        <Text style={{ color: 'white', marginTop: 15 }}>Di step ini akan ada beberapa instruksi</Text>
                        <Text style={{ color: 'white' }}>Untuk mengatur aplikasi agar bisa</Text>
                        <Text style={{ color: 'white' }}>Konek ke mesin IOT</Text>

                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 12, marginTop: 70, paddingLeft: 110, paddingRight: 110, borderRadius: 15, elevation: 15 }} onPress={() => this.props.navigation.navigate('GuideOffline')}>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 17 }}>Lanjut</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
