import React, { Component } from 'react'
import { View, ScrollView, TextInput, Image, AsyncStorage, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import konfigurasi from '../config'
import MapView, { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import * as Network from 'expo-network'
import Icon from 'react-native-vector-icons/Ionicons'


export default class ProfileOffline extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: 'Users',
            devices: null,
            since: '',
            connection: false,
            addmachine: false
        }

        this.data = [
            {time: "15:00", title: "test", description: 'as'}
        ]
    }

    componentDidMount(){
        AsyncStorage.getItem('name').then(data => {
            this.setState({ username: data })
        })
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

                <Modal isVisible={this.state.addmachine}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center', width: 170 }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ addmachine: false })}>
                                <Icon name='close-outline' size={28} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16.5 }}>Add Machine</Text>

                            <Image source={require("../assets/icons/machine.png")} style={{ width: 100, height: 100, marginTop: 15 }} />
                            
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <TextInput placeholder="IP / Domain" />
                                <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'black', padding: 5, borderRadius: 5 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Machine</Text>
                                </TouchableOpacity>
                            </View>
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
                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Machine</Text>
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

                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 27 }}>Your Machine</Text>

                <View style={{ marginTop: 10, padding: 15, borderRadius: 15, elevation: 15, backgroundColor: 'black', flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>List Machine</Text>
                    <View style={{ marginTop: 10, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150 }}>
                            <View>
                                <Text style={{ color: 'white' }}>192.168.1.3</Text>
                            </View>

                            <View>
                                <Text style={{ color: 'white', color: 'green' }}>ONLINE</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
