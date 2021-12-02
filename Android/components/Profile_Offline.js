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
            totalMachine: null,
            machine: [],
            addmachineIP: null,
            addmachineName: null,
            addmachine: false,
            machineDetails: false,
            machineDetailsName: null,
            machineDetailsIP: null,
            machineDetailsStatus: null,
            machineIndex: null
        }

        this.data = [
            {time: "15:00", title: "test", description: 'as'}
        ]
    }

    machinedelete(){
        this.state.machine.splice(this.state.machineIndex, 1)
        AsyncStorage.setItem('machine', JSON.stringify(this.state.machine))
        this.setState({ machineDetails: false })
        this.refresh()
    }

    async addmachine(){
        await AsyncStorage.removeItem('machine')
        const data = {
            name: this.state.addmachineName,
            ip: this.state.addmachineIP,
            status: 'ONLINE'
        }

        await this.setState({ machine: this.state.machine.concat(data) })
        await AsyncStorage.setItem('machine', JSON.stringify(this.state.machine))
        alert('Machine Added !')
    }

    componentDidMount(){
        AsyncStorage.getItem('name').then(data => {
            this.setState({ username: data })
        })


        AsyncStorage.getItem('machine').then(data => {
            const parse = JSON.parse(data)

            if(parse == null || parse == undefined){
                this.setState({ machine: [] })
            }else{
                this.setState({ machine: this.state.machine.concat(parse) })
            }
        })


        const totalMachine = this.state.machine.length

        this.setState({ totalMachine: totalMachine })
    }

    refresh(){
        AsyncStorage.getItem('name').then(data => {
            this.setState({ username: data })
        })


        AsyncStorage.getItem('machine').then(data => {
            const parse = JSON.parse(data)

            if(parse == null || parse == undefined){
                this.setState({ machine: [] })
            }else{
                this.setState({ machine: this.state.machine.concat(parse) })
            }
        })


        const totalMachine = this.state.machine.length

        this.setState({ totalMachine: totalMachine })
    }

    machineDetails(name, ip, index){
        this.setState({
            machineDetailsName: name,
            machineDetailsIP: ip,
            machineDetails: true,
            machineIndex: index
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
                                <TextInput placeholder="Machine Name" onChangeText={(val) => this.setState({ addmachineName: val })} />
                                <TextInput placeholder="IP / Domain" onChangeText={(val) => this.setState({ addmachineIP: val })} />
                                <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'black', padding: 5, borderRadius: 5 }} onPress={() => this.addmachine()}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Machine</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.machineDetails}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center', width: 170 }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ machineDetails: false })}>
                                <Icon name="close-outline" size={28} />
                            </TouchableOpacity>

                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Machine Details</Text>
                                <Image source={require('../assets/icons/machine.png')} style={{ width: 100, height: 100, marginTop: 10 }} />
                                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{this.state.machineDetailsName}</Text>
                                <Text style={{ marginTop: 10 }}>IP : <Text style={{ fontWeight: 'bold' }}>{this.state.machineDetailsIP}</Text></Text>
                                <Text style={{ marginTop: 10 }}>Status : <Text style={{ color: 'green' }}>ONLINE</Text></Text>
                                <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'red', padding: 5, borderRadius: 5 }} onPress={() => this.machinedelete()}>
                                    <Text style={{ fontWeight: 'bold' }}>Delete</Text>
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
                            <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 17, color: 'white' }}>{this.state.totalMachine}</Text>
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

                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 37 }}>Your Machine</Text>

                <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'black', padding: 10, borderRadius: 5 }} onPress={() => this.setState({ addmachine: true })}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Add Machine</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 10, padding: 15, borderRadius: 15, elevation: 15, backgroundColor: 'black', flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>List Machine</Text>
                    <View style={{ marginTop: 10, flexDirection: 'column' }}>
                        {this.state.machine.length == 0 ? <View>
                            <Text style={{ color: 'white' }}>There is no machine</Text>
                            <Text style={{ color: 'white' }}>Plz add the machine!</Text>
                                </View> : this.state.machine.map((x,y) => {
                        return <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150, marginTop: 10 }} onPress={() => this.machineDetails(x.name, x.ip, y)}>
                            <View>
                                <Text style={{ color: 'white' }}>{x.name}</Text>
                            </View>

                            <View>
                                <Text style={{ color: 'white', color: 'green' }}>{x.status}</Text>
                            </View>
                        </TouchableOpacity>
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
