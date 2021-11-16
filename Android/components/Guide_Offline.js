import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import Loading from 'react-native-loading-spinner-overlay'
import { StackActions } from '@react-navigation/native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Guide extends Component{
    constructor(props){
        super(props)

        this.state = {
            localip: '',
            ip: '',
            name: '',
            loading: false,
            server_done: false,
            server_false: false
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
        this.setState({ loading: true })
        await axios.get('http://' + this.state.ip).then(res => {
            if(res.status == 200){
                this.setState({ server_done: true, loading: false })
            }else{
                this.setState({ server_false: true, loading: false })
            }
        }).catch(err => {
            this.setState({ server_false: true, loading: false })
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
                <Loading visible={this.state.loading} textContent={"Tunggu Bentar..."} textStyle={{ color: 'white', fontWeight: 'bold' }} />
                
                <Modal isVisible={this.state.server_done}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: 10, borderRadius: 10, backgroundColor: 'white', alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ server_done: false })}>
                                <Icon name="close-outline" size={30} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'green', marginTop: 10 }}>Berhasil Konek Ke Server</Text>
                            <Image source={require('../assets/illustrations/success.png')} style={{ width: 140, height: 120, marginTop: 15 }} />
                            <Text>Mantep, berhasil Konek Ke server!</Text>
                            <Text>Lanjut ke step berikutnya</Text>
                            
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.server_false}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: 10, borderRadius: 10, backgroundColor: 'white', alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ server_false: false })}>
                                <Icon name="close-outline" size={30} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'red', marginTop: 10 }}>Gagal Konek Ke Server</Text>
                            <Image source={require('../assets/illustrations/denied.png')} style={{ width: 140, height: 140, marginTop: 15 }} />
                            <Text>Upps, gagal konek ke server</Text>
                            <Text>Coba cek lagi ip untuk </Text>
                            <Text>Web Server IOT nya</Text>
                        </View>
                    </View>
                </Modal>

                <Swiper showButtons={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 170 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Code IT!</Text>
                        <Image source={require('../assets/illustrations/register/code.png')} style={{ width: 220, height: 220 }} />
                        <Text style={{ color: "white" }}>Pastikan kamu sudah memprogram</Text>
                        <Text style={{ color: "white" }}>Mesin IOT nya</Text>
                    </View>
                    
                    <View style={{ marginTop: 170, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Rangkaian IOT</Text>
                        <Image source={require('../assets/icons/schematic.png')} style={{ width: 220, height: 180, borderRadius: 10, marginTop: 10 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>Ini adalah contoh sederhana</Text>
                        <Text style={{ color: 'white' }}>Untuk board IOT, dan pastikan</Text>
                        <Text style={{ color: 'white' }}>kamu sudah memasang</Text>
                        <Text style={{ color: 'white' }}>Mikrokontroller ke Relay</Text>
                    </View>


                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Apa IP dari board IOT ?</Text>
                        <Image source={require('../assets/illustrations/register/server.png')} style={{ width: 220, height: 220, marginTop: 15 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>Silahkan cek ip untuk Web server IOT</Text>
                        <Text style={{ color: 'white' }}>dan inputkan di bawah</Text>


                        <TextInput style={{ backgroundColor: "white", marginTop: 10, borderRadius: 10, elevation: 15, padding: 8 }} placeholder="Input IP Server" keyboardType={'numeric'} onChangeText={(val) => this.setState({ ip: val })} />
                        <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, padding: 12, elevation: 15 }} onPress={() => this.connection()}>
                            <Text style={{ color: 'white' }}>Tes Koneksi</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>By The Way</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>What's Your Name ?</Text>

                        <Image source={require('../assets/illustrations/name.png')} style={{ width: 300, height: 220, marginTop: 15 }} />
                        
                        <Text style={{ color: 'white', marginTop: 5 }}>This name gonna appear in menu</Text>

                        <TextInput style={{ padding: 5, backgroundColor: 'white', borderRadius: 10, width: 150, marginTop: 10 }} onChangeText={(val) => this.setState({ name: val })} placeholder="Input Your Name" />
                        <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => this.name()}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Selamat Datang !</Text>
                        <Image source={require('../assets/illustrations/register/mode.png')} style={{ width: 250, height: 220, marginTop: 15 }} />
                        <Text style={{ marginTop: 10, color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ingat!</Text>, semua konfigurasi ada pada aplikasi</Text>
                        <Text style={{ color: 'white' }}>tidak pada server, jika aplikasi di reset</Text>
                        <Text style={{ color: 'white' }}>maka akan mengulang lagi dari awal</Text>

                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 15, elevation: 15, marginTop: 10 }} onPress={() => this.offline()}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
