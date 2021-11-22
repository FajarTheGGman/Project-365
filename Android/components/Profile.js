import React, { Component } from 'react'
import { View, ScrollView, Image, AsyncStorage, Text, TouchableOpacity } from 'react-native'
//import Timeline from 'react-native-timeline-flatlist'
import axios from 'axios'
import konfigurasi from '../config'
import MapView, { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import * as Network from 'expo-network'


export default class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            devices: null,
            since: '',
            connection: false
        }

        this.data = [
            {time: "15:00", title: "test", description: 'as'}
        ]
    }

    componentDidMount(){
    alert('testing')

        AsyncStorage.getItem('name').then(data => {
            alert(data)
        })


/*        AsyncStorage.getItem('token').then(res => {
            axios.post(konfigurasi.server + 'auth/getall', { token: res, secret: 'Important' }).then(data => {
                this.setState({ username: data.data.result.username, since: data.data.result.since })
            })

            axios.post(konfigurasi.server + 'relay/getall', { token: res, secret: 'Important' }).then(data => {
                let total = data.data.length
                this.setState({ devices: total })
            })
        })*/
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: '#292928', alignItems: 'center' }}>
                <Modal isVisible={this.state.connection}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', alignItems: 'center', padding: 15, borderRadius: 15, elevation: 15 }}>
                            <Image source={require('../assets/illustrations/offline.png')} style={{ width: 170, height: 150 }} />
                            <Text>I'm Sorry but, Profile Information</Text>
                            <Text>Doesn't appear in offline mode</Text>
                            <TouchableOpacity style={{ marginTop: 15, backgroundColor: '#d9d9d9', padding: 7, borderRadius: 10 }} onPress={() => this.props.navigation.goBack()}>
                                <Text style={{ color: 'white' }}>Going back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', marginTop: 25, backgroundColor: 'black', padding: 10, borderRadius: 15, elevation: 15 }}>
                        <Image source={require('../assets/icons/profile.png')} style={{ width: 60, height: 60 }} />
                    </View>
                </View>

                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', marginTop: 15, color: 'white' }}>@{this.state.username}</Text>

                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ marginTop: 15, flexDirection: 'row', backgroundColor: 'black', padding: 15, borderRadius: 15, elevation: 15 }}>
                        <View style={{ flexDirection: 'column', marginRight: 25, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Relays</Text>
                            <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 17, color: 'white' }}>{this.state.devices}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>Since</Text>
                            <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 17, color: 'white' }}>{this.state.since}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', marginLeft: 25, alignItens: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>Board</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 27 }}>Location of your board</Text>

                <View style={{ marginTop: 10, padding: 15, borderRadius: 15, elevation: 15, backgroundColor: 'black' }}>
                    <MapView region={{ latitude: -6.5945, longitude: 106.789, latitudeDelta: -6.5945, longitudeDelta: 106.789 }} style={{ width: 220, height: 180 }}>
                        <Marker coordinate={{ longitude: 106.789, latitude: -6.5945 }} title="Nodemcu" description="Notes: The GPS Not 100% Accurate"/>
                    </MapView>
                </View>
            </ScrollView>
        )
    }
}
