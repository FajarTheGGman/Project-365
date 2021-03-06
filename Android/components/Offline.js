 // React Components
import React, { Component } from 'react'
import { View, TouchableOpacity, CameraRoll, Text, Switch, Image, TextInput, FlatList, AsyncStorage, ScrollView, RefreshControl, Button, Picker, AppRegistry, ImageBackground } from 'react-native'

import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Expo Package
import * as FileSystem from 'expo-file-system'
import * as Notif from 'expo-notifications'
import { Gyroscope } from 'expo-sensors'
import * as Network from 'expo-network'
import * as Battery from 'expo-battery'
import * as Updates from 'expo-updates'

// Random Package
import axios from 'axios'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from 'react-native-loading-spinner-overlay'
import DateTimePicker from '@react-native-community/datetimepicker'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Radio from 'react-native-simple-radio-button'
import { LinearGradient } from 'expo-linear-gradient'
import SwipeUpDown from 'react-native-swipe-modal-up-down'
import * as Animasi from 'react-native-animatable'
import base64 from 'react-native-base64'
import QRCode from 'react-native-qrcode-svg'
import * as Speech from 'expo-speech'

// Configurations
import konfigurasi from '../config'


Notif.setNotificationHandler({
    handleNotification: async() => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    }),
})

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            wellcome: false,
            low: false,
            update: false,
            nomachine_alert: false
        }
    }

    async componentDidMount(){
        await this.battery()
       // const update = await Updates.checkForUpdateAsync()
        AsyncStorage.setItem('mode', 'offline');

        AsyncStorage.getItem(konfigurasi.version).then(data => {
            if(data == null || data == undefined){
                this.setState({ update: true })
            }else{
                this.setState({ update: false })
            }
        })

        AsyncStorage.getItem('machine').then(data =>  {
            if(data.length == 2){
                this.setState({ nomachine_alert: true })
            }
        })

        try{
            if(this.props.route.params.type == 'offline'){
                AsyncStorage.setItem('offline', true)
                this.setState({ wellcome: true })
            }
        }catch(e){

        }
    }

    closeupdate(){
        AsyncStorage.setItem(konfigurasi.version, 'yes')
        this.setState({ update: false })
    }

    async notif(title, body){
        await Notif.scheduleNotificationAsync({
            content: {
                title: title,
                body: body
            },
            trigger: { seconds: 1 }
        })
    }

    async battery(){
        let init = await Battery.getBatteryLevelAsync()
        let parse = init.toString()
        let level = parse[2] + parse[3]

        if(level == 19){
            this.setState({ low: true })
        }
    }

    render(){
        const Tabs = createBottomTabNavigator();
        return(
            <View style={{ flex: 1, backgroundColor: '#292928' }}>
                <Modal isVisible={this.state.update}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: -5, marginTop: -5 }} onPress={() => this.closeupdate()}>
                                <Icon name='close-outline' size={30}/>
                            </TouchableOpacity>

                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}>Updates Available!</Text>

                                <Image source={require('../assets/illustrations/update.png')} style={{ width: 120, height: 120, marginTop: 10 }} />

                                <View style={{ alignItems: 'center' }}>
                                    <Text>App has updated to version 1.2.5</Text>
                                    <Text>So, Whats new ?</Text>

                                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold' }}>- Bug Fix</Text>
                                        <Text style={{ fontWeight: 'bold' }}>- Update Sensor Mode</Text>
                                        <Text style={{ fontWeight: 'bold' }}>- Fix Machine Mode</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.nomachine_alert}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center', paddingLeft: 12, paddingRight: 12 }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ nomachine_alert: false })}>
                                <Icon name="close-outline" size={30} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>There's no machine!</Text>
                            <Image source={require('../assets/illustrations/offline.png')} style={{ width: 130, height: 120, marginTop: 10 }} />
                            <Text>Hi dude, There's no machine left,</Text>
                            <Text>Plz adding the machine </Text>
                            <Text>by clicking this button</Text>

                            <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 5, backgroundColor: 'black', elevation: 15 }} onPress={() => this.props.navigation.navigate('ProfileOffline')}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Machine</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.low}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Low Level Battery</Text>
                            <Image source={require('../assets/icons/low-battery.png')} style={{ width: 90, height: 80 }} />
                            <Text>Hey mate, your battery level is 19%</Text>
                            <Text>Please charge your phone</Text>

                            <TouchableOpacity style={{ backgroundColor: '#c4c4c4', padding: 5, marginTop: 12, borderRadius: 10 }} onPress={() => this.setState({ low: false })}>
                                <Text style={{ color: 'white' }}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.wellcome}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 17, borderRadius: 15, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Wellcome to offline mode !</Text>
                            <Image source={require('../assets/illustrations/wellcome.png')} style={{ width: 240, height: 150, marginTop: 15}} />
                            <Text>In here you can only access</Text>
                            <Text>your iot board from your router</Text>

                            <TouchableOpacity style={{ marginTop: 15, backgroundColor: '#c4c4c4', padding: 8, borderRadius: 10 }} onPress={() => this.setState({ wellcome: false })}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Tabs.Navigator tabBarOptions={{ style: { backgroundColor: '#171717', borderTop: '#171717', borderTopRightRadius: 15, borderTopLeftRadius: 15, borderTopWidth: -2, padding: 5, color: 'white', elevation: 25, }, activeTintColor: 'white', inactiveTintColor: 'grey' }} screenOptions={({route}) => ({
                tabBarIcon: ({ focus, color, size }) => {
                    let icons;

                    if(route.name == 'Home'){
                        icons = 'home-outline'
                    }else if(route.name == 'Barcode'){
                        icons = 'qr-code-outline'
                    }else if(route.name == 'Settings'){
                        icons = 'settings-outline'
                    }

                    return <Icon name={icons} size={size} color="white" />
                }
            })}>
                <Tabs.Screen name='Home' component={HomePage} />
                <Tabs.Screen name='Barcode' component={Barcode} />
                <Tabs.Screen name='Settings' component={Settings} />
            </Tabs.Navigator>
            </View>
        )
    }
}

class Code extends Component{
    constructor(props){
        super(props)

        this.state = {
            example: 'void setup(){\n\tpinMode(D2, OUTPUT);\n}\n\nvoid loop(){\n\tdigitalWrite(D2, HIGH);\n\tdelay(200);\n\tdigitalWrite(D2, LOW);\n\tdelay(200);\n}',
            warning: true
        }
    }

    componentDidMount(){
        this.setState({ warning: true })
    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#292928' }}>
                <Modal isVisible={this.state.warning}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/icons/warning.png')} style={{ width: 70, height: 70 }} />
                            <Text style={{ marginTop: 15, fontWeight: 'bold' }}>This Features is</Text>
                            <Text style={{ fontWeight: 'bold' }}>Under Development</Text>
                            <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: 'grey', borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text>Return</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ backgroundColor: 'black', padding: 17, alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <Text style={{ textAlign: 'center', textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Code To Esp</Text>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                    <View style={{ marginTop: 85, backgroundColor: 'black', padding: 20, borderRadius: 15, width: 190, elevation: 15, paddingLeft: 15, paddingRight: 15, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ backgroundColor: 'red', padding: 8, borderRadius: 100 }}></View>
                                <View style={{ backgroundColor: 'orange', padding: 8, borderRadius: 100, marginLeft: 8 }}></View>
                                <View style={{ backgroundColor: 'green', padding: 8, borderRadius: 100, marginLeft: 8 }}></View>
                            </View>

                            <Text style={{ color: 'white', marginTop: -3, marginLeft: 15 }}>Code Here!</Text>
                        </View>

                        <View>
                            <TextInput multiline={true} style={{ paddingBottom: 50, color: 'white', marginTop: 10 }} />
                        </View>
                    </View>

                    <TouchableOpacity style={{ marginTop: 20, padding: 10, backgroundColor: 'black', borderRadius: 15 }}>
                        <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Upload IT!</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

class Settings extends Component{
    constructor(props){
        super(props)

        this.state = {
            settings_network: false,
            phone_status: false,
            connection: false,
            connection_details: null,
            connection_internet: null,
            connection_type: null,
            battery_level: "",
            battery_charge: false,
            iot_board: false,
            ip: null,
            localip: null,
            type: null,
            offline: false,
            authors: false
        }
    }

    logout(){
        AsyncStorage.removeItem('mode')
        AsyncStorage.removeItem('localip')
        AsyncStorage.removeItem('name')
        this.props.navigation.dispatch(
            StackActions.replace('Banner')
        )
    }

    async componentDidMount(){
        await this.Network()
        await this.Battery()

        AsyncStorage.getItem('token').then(data => {
            if(!data){
                this.setState({ offline: true })
            }
        })

        AsyncStorage.getItem('localip').then(data => {
            this.setState({ localip: data })
        }).catch(err => {

        })
    }

    async refresh(){
        await this.Network()
        await this.Battery()

        AsyncStorage.getItem('localip').then(data => {
            this.setState({ localip: data })
        }).catch(err => {

        })
    }

    async Network(){
        const network = await Network.getNetworkStateAsync()
        this.setState({ 
            connection: network.isConnected, 
            connection_details: network,
            connection_internet: network.isInternetReachable,
            connection_type: network.type
        })
    }

    async Battery(){
        const level = await Battery.getBatteryLevelAsync()
        const charge = await Battery.getBatteryStateAsync()
        let parseStr = level.toString()
        this.setState({ 
            battery_level: parseStr[2] + parseStr[3] + "%",
            battery_charge: charge == 2 ? true : false
        })
    }

    SetIP(ip){
        AsyncStorage.setItem('localip', ip)
        this.refresh()
    }

    Online(){
        AsyncStorage.setItem('mode', 'online')
        this.props.navigation.dispatch(
            StackActions.replace('Home', { type: 'online' })
        )
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#292928' }}>
                <Modal isVisible={this.state.settings_network}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', width: 205, padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'black' }}>Network Status</Text>
                                </View>

                                <View style={{ marginTop: -5, marginLeft: 18}}>
                                    <TouchableOpacity onPress={() => this.setState({ settings_network: false })}>
                                        <Icon name='close-outline' size={30} color='black'/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', marginTop: 15, marginLeft: 5 }}>
                                <Text>???? Connection : {this.state.connection ? <Text>???</Text> : <Text>????</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>????Internet : {this.state.connection_internet ? <Text>???</Text> : <Text>????</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>????Type Connection: {this.state.connection_type == 'NetworkStateType.CELLULAR' ? <Text>Cellular</Text> : <Text>WIFI</Text>}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.authors}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, alignItems: 'center', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Coders</Text>
                            
                            <Image source={require('../assets/icons/author.jpeg')} style={{ width: 100, height: 100, borderRadius: 10, marginTop: 10 }} />

                            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ marginTop: 3, fontWeight: 'bold' }}>My Social Media</Text>
                                <Text style={{ marginTop: 5 }}>Github: FajarTheGGman</Text>
                                <Text>IG: @FajarTheGGman</Text>
                                <Text>Twitter: @kernel024</Text>
                                <Text>Web: fajarfirdaus.now.sh</Text>

                                <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 5, backgroundColor: 'grey' }} onPress={() => this.setState({ authors: false })}>
                                    <Text style={{ color: 'white' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal isVisible={this.state.phone_status}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Phone Status</Text>
                                </View>

                                <View>
                                    <TouchableOpacity style={{ marginTop: -3, marginLeft: 15, marginRight: -3 }} onPress={() => this.setState({ phone_status: false })}>
                                        <Icon name="close-outline" size={30} color='black' />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 3 }}>
                                <Text>????Battery : {this.state.battery_level}</Text>
                                <Text style={{ marginTop: 4 }}>???Charging: {this.state.battery_charge ? <Text style={{ color: 'green' }}>YES</Text> : <Text style={{ color: 'grey' }}>NO</Text>}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.iot_board}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>IOT Board IP</Text>
                                </View>

                                <View style={{ marginTop: -4, marginLeft: 15, marginRight: -3 }}>
                                    <TouchableOpacity onPress={() => this.setState({ iot_board: false })}>
                                        <Icon name="close-outline" size={30} color='black'/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', marginLeft: 7, marginTop: 10 }}>
                                <Text style={{ textAlign: 'center' }}>{this.state.localip == null ? <Text style={{ color: 'red' }}>IP Doesn't set</Text> : <Text style={{ color: 'green' }}>{this.state.localip}</Text>}</Text>

                                <View style={{ marginTop: 20 }}>
                                    <TextInput style={{ textAlign: 'center' }} placeholder="Change IP" onChangeText={(val) => this.setState({ ip: val })} />
                                    <TouchableOpacity style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, elevation: 15 }} onPress={() => this.SetIP(this.state.ip)}>
                                        <Text style={{ color: 'white', textAlign: 'center' }}>Change IT!</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ backgroundColor: 'black', padding: 15, textAlign: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, elevation: 15 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 15 }}>Settings</Text>
                </View>

                <ScrollView style={{ marginTop: 35 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View>
                            {this.state.offline ? <View></View> : <TouchableOpacity style={{ marginLeft: -2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: 'black', backgroundColor: 'black', }} onPress={() => this.Online()}>
                                <Text style={{ color: 'white', paddingTop: 15, paddingBottom: 15, marginLeft: 15, fontWeight: 'bold', elevation: 15 }}>???? Switch To <Text style={{ color: 'green' }}> ONLINE</Text></Text>
                            </TouchableOpacity>}

                            <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 15 }} onPress={() => this.setState({ phone_status: true })}>
                                <Text style={{ paddingTop: 15, paddingBottom: 15, color: 'white', fontWeight: 'bold', marginLeft: 12, elevation: 15 }}>????My Phone Status</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 15 }} onPress={() => this.setState({ settings_network: true })}>
                                <Text style={{ color: 'white', fontWeight: 'bold', elevation: 15, paddingTop: 15, paddingBottom: 15, marginLeft: 15 }}>????  Check Connection Status</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 15 }} onPress={() => this.setState({ authors: true })}>
                                <Text style={{ marginLeft: 15, paddingBottom: 15, paddingTop: 15, color: 'white', fontWeight: 'bold' }}>???? Authors</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 250 }}>
                            {this.state.offline ? <TouchableOpacity style={{ backgroundColor: 'red', elevation: 15 }} onPress={() => this.logout()}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, paddingTop: 15, marginLeft: 15, paddingBottom: 15 }}>Exit</Text>
                            </TouchableOpacity> : <TouchableOpacity style={{ marginTop: 160, backgroundColor: 'red', elevation: 15 }} onPress={() => this.logout()}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, paddingTop: 15, marginLeft: 15, paddingBottom: 15 }}>Logout</Text>
                            </TouchableOpacity> }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

class Barcode extends Component{

    constructor(props){
        super(props)

        this.state = {
            camera: false,
            scan: false,
            error: false
        }
    }

    async componentDidMount(){
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if(status == 'granted'){
            this.setState({ camera: true })
        }else{
            this.setState({ camera: false })
        }
    }

    scan(x){
            (async() => {
                const decrypt = base64.decode(x)
                const parse = JSON.parse(decrypt)
                this.setState({ loading: true })
                if(parse.type_sensor == 'lock.png'){
                    axios.get('http://' + parse.machine + parse.url).then(data => {
                        if(data.status == 200){
                            alert(parse.name + ' is opening')
                        }else{
                            this.setState({ error: true })
                        }
                    })
                    setInterval(() => {
                        axios.get('http://' + parse.machine + parse.url + 'die').then(data => {
                            if(data.status == 200){
                                this.setState({ loading: false })
                                alert(parse.name + ' is closing')
                            }else{
                                this.setState({ error: true })
                            }
                        }).catch(err => {
                            this.setState({ error: true })
                        })
                    }, 5000)
                }else{
                    axios.get('http://' + parse.machine + parse.url).then(data => {
                        if(data.status == 200){
                            this.setState({ loading: false })
                            if(parse.type){
                                alert(parse.name + ' is on')
                            }else{
                                alert(parse.name + ' is off')
                            }
                        }else{
                            this.setState({ error: true })
                        }
                    }).catch(err => {
                        this.setState({ error: true })
                    })
                }
            })()
    }

    render(){
        return(
            <BarCodeScanner onBarCodeScanned={ this.state.scan ? undefined : ({ type, data }) => {
                        this.scan(data)
                        this.setState({ scan: true })
            } } style={{ flex: 1, backgroundColor: '#292928', justifyContent: 'center', marginTop: 5 }}>
                <Modal isVisible={this.state.error}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: 10, borderRadius: 10, backgroundColor: 'white', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'red' }}>QR Code Denied !</Text>
                            <Image source={require('../assets/illustrations/denied.png')} style={{ width: 160, height: 150, marginTop: 10 }} />
                            <Text style={{ marginTop: 7 }}>QR Code was denied by application</Text>
                            <Text>Try creating again using</Text>
                            <Text>qr code generator in Home Menu</Text>

                            <TouchableOpacity style={{ marginTop: 10, padding: 5, borderRadius: 5, backgroundColor: 'grey' }} onPress={() => this.setState({ error: false })}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
                        <View style={{ padding: 15, backgroundColor: 'none', borderLeftWidth: 5, borderTopWidth: 5, borderRadius: 5, borderColor: 'white' }}></View>

                        <View style={{ padding: 15, backgroundColor: 'none', borderRightWidth: 5, borderTopWidth: 5, borderRadius: 5, borderColor: 'white' }}></View>
                    </View>

                    <View style={{ justifyContent: 'center', marginTop: 50, marginBottom: 50 }}>
                        { this.state.scan ? <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }} onPress={() => this.setState({ scan: false })}><Text>Retry</Text></TouchableOpacity> : 
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Scan Here!</Text> }
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
                        <View style={{ padding: 15, backgroundColor: 'none', borderLeftWidth: 5, borderBottomWidth: 5, borderRadius: 5, borderColor: 'white' }}></View>

                        <View style={{ padding: 15, backgroundColor: 'none', borderRightWidth: 5, borderBottomWidth: 5, borderRadius: 5, borderColor: 'white' }}></View>
                    </View>
                </View>
            </BarCodeScanner>
        )
    }
}

class HomePage extends Component{
    constructor(props){
        super(props)

        this.state = {
            relay: false,
            data_offline: [],
            data_serial: [],
            data: [],
            relayEmpty: false,
            relayAlert: false,
            serial_information: false,
            serial_name: null,
            serial_url: null,
            serial_details: false,
            serial_data: null,
            serial_index: null,
            serial_type: true,
            loading: false,
            refresh: false,
            name: null,
            getcontent: false,
            error_server: false,
            type: null,
            menu: false,
            menu_mode: false,
            schedule: false,
            relay_button_type: true,
            relay_timeout: false,
            status: false,
            relay_category: 'lights.png',
            relay_name: null,
            relay_time_interval: null,
            relay_url: null,
            relay_pin: null,
            relay_status: false,
            internet: false,
            username: '',
            waktu: null,
            dev: "{ Coder: Fajar Firdaus }",
            swipeRelay: false,
            addRelay: false,
            weather: null,
            weatherStatus: null,
            weatherCondition: 'No Internet !',
            weatherPallete: 'white',
            weatherTemp: null,
            error: false,
            date: false,
            input_date: new Date(),
            schedule_date: null,
            schedule_name_select: null,
            schedule_offline: null,
            scheduleDetail: false,
            scheduleDetailName: '',
            scheduleDetailDate: null,
            scheduleButton: false,
            moduleDetail: false,
            moduleName: null,
            modulePin: null,
            moduleUrlOn: null,
            moduleUrlOff: null,
            moduleIndex: null,
            uri_on: null,
            uri_off: null,
            newRelay: null,
            qr_generator: null,
            qr_generator_popup: false,
            qr_result: false,
            qr_type: true,
            author: false,
            machine: [],
            machineIP: null,
            machineDetailsIP: null,
            not_available: false,
            door_open: false,
        }
    }

    addRelay(){
        AsyncStorage.getItem('token').then(key => {
            if(this.state.relay_time_interval == null){
                this.setState({ relay_timeout: true })
            }

            axios.post(konfigurasi.server + "relay/add", 
                { token: key, 
                    secret: konfigurasi.key, 
                    name: this.state.relay_name, 
                    timeout_time: this.state.relay_time_interval, 
                    url: this.state.relay_url, 
                    timeout: this.state.relay_timeout, 
                    relay_category: this.state.relay_category, 
                    type_button: this.state.relay_button_type 
                }).then(data => {
                if(!data.status == 200){
                    alert('Server Error :(')
                }else{
                    this.refresh()
                    alert('Relay Successfully Added')
                }
            })
        })
    }

    addRelayOffline(){
        const actual_data = {
            name: this.state.relay_name,
            url: this.state.relay_url,
            type: this.state.relay_category,
            relay_status: false,
            relay_pin: this.state.relay_pin,
            type_button: this.state.relay_button_type,
            machineIP: this.state.machine.length == 1 ? this.state.machine[0].ip : this.state.machineIP,
            uri_on: '/' + this.state.uri_on,
            uri_off: '/' + this.state.uri_on + 'die'
        }

        this.setState({ data_offline: this.state.data_offline.concat(actual_data) })
        AsyncStorage.removeItem('relay_offline')
        AsyncStorage.setItem("relay_offline", JSON.stringify(this.state.data_offline))
        alert('Relay Added!')
    }

    addSerial(){
        const actual_data = {
            name: this.state.serial_name,
            url: this.state.serial_url,
            machineIP: this.state.machineIP,
            type: this.state.serial_type
        }

        this.setState({ data_serial: this.state.data_serial.concat(actual_data) })
        AsyncStorage.removeItem('serial_offline')
        AsyncStorage.setItem('serial_offline', JSON.stringify(this.state.data_serial))
        alert('Sensor Added!')
    }

    relay_offline(){
        AsyncStorage.getItem('relay_offline').then(data => {
            this.setState({ data_offline: data })
            console.log(this.state.data_offline)
        })
    }

    async componentDidMount(){
        const network = await Network.getNetworkStateAsync()

        AsyncStorage.getItem('name').then(data => {
            this.setState({ name: data })
        })

        AsyncStorage.getItem('relay_offline').then(data => {
            let parsing = JSON.parse(data)
            if(parsing == null){
                this.setState({ data_offline: [] })
            }else{
                this.setState({ data_offline: this.state.data_offline.concat(parsing) })
            }
        })

        AsyncStorage.getItem('machine').then(data => {
            let parsing = JSON.parse(data)
            if(parsing == null){
                this.setState({ machine: [] })
            }else{
                this.setState({ machine: [] })
                this.setState({ machine: this.state.machine.concat(parsing) })
                this.setState({ machineIP: this.state.machine[0].ip })
            }
        })


        AsyncStorage.getItem('serial_offline').then(data => {
            let parsing = JSON.parse(data)
            if(parsing == null){
                this.setState({ data_serial: [] })
            }else{
                this.setState({ data_serial: this.state.data_serial.concat(parsing) })
            }
        })

            axios.get('http://wttr.in/?format=j1').then(res => {
                this.setState({ weatherStatus: res.data.current_condition[0].weatherDesc[0].value, weatherTemp: res.data.current_condition[0].temp_C + "??" })
                
                this.setState({ weather: require('../assets/weather/cloudy.png'), weatherCondition: 'Cloudy Normal', weatherPallete: 'white', weatherFont: 'black' })

                if(this.state.weatherStatus.match(/Thunder/i)){
                    this.setState({ weather: require('../assets/weather/thunder.png'), weatherCondition: "Thunder", weatherPallete: 'black', weatherFont: 'white' })
                }else if(this.state.weatherStatus.match(/Sunny/i)){
                    this.setState({ weather: require('../assets/weather/sunny.png'), weatherCondition: 'Sunny', weatherPallete: '#faa825', weatherFont: 'white' })
                }else if(this.state.weatherStatus.match(/Fair/i)){
                    this.setState({ weather: require('../assets/weather/cloudy.png'), weatherCondition: 'Cloudy Fair', weatherPallete: 'white', weatherFont: 'black' })
                }else if(this.state.weatherStatus.match(/Rain/i)){
                    this.setState({ weather: require('../assets/weather/rain.png'), weatherCondition: 'Raining', weatherPallete: 'grey', weatherFont: 'white' })
                }else if(this.state.weatherStatus.match(/Cloudy/i)){
                    this.setState({ weather: require('../assets/weather/cloudy.png'), weatherCondition: 'Cloudy', weatherPallete: 'white', weatherFont: 'black' })
                }else{
                    this.setState({
                        weather: require('../assets/weather/cloudy.png'),
                        weatherCondition: 'Cloudy',
                        weatherPallete: 'white',
                        weatherFont: 'black'
                    })
                }
            }).catch(err => {
                this.setState({ weather: require('../assets/weather/cloudy.png'), weatherCondition: 'Cloudy Normal', weatherPallete: 'white', weatherFont: 'black' })
            })

        let waktu = new Date();
        let jam = waktu.getHours();

        if(jam == 0){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 1){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 2){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 3){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 4){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 5){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 6){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 7){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 8){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 9){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 10){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 11){
            this.setState({ waktu: "Good Morning" })
        }else if(jam == 12){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 13){
            this.setState({ waktu: 'Good Morning' })
        }else if(jam == 14){
            this.setState({ waktu: 'Good Afternoon' })
        }else if(jam == 15){
            this.setState({ waktu: 'Good Afternoon' })
        }else if(jam == 16){
            this.setState({ waktu: 'Good Afternoon' })
        }else if(jam == 17){
            this.setState({ waktu: 'Good Afternoon' })
        }else if(jam == 18){
            this.setState({ waktu: 'Good Afternoon' })
        }else if(jam == 19){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 20){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 21){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 22){
            this.setState({ waktu: 'Good Night' })
        }else if(jam == 23){
            this.setState({ waktu: 'Good Night' })
        }
    }

    async refresh(){
        this.setState({ loading: true })
        const network = await Network.getNetworkStateAsync()

        AsyncStorage.getItem('name').then(data => {
            this.setState({ name: data })
        })

        AsyncStorage.getItem('machine').then(data => {
            let parsing = JSON.parse(data)
            if(parsing == null){
                this.setState({ machine: [] })
            }else{
                this.setState({ machine: [] })
                this.setState({ machine: this.state.machine.concat(parsing) })
                this.setState({ machineIP: this.state.machine[0].ip })
            }
        })

        AsyncStorage.getItem('relay_offline').then(data => {
            let parsing = JSON.parse(data)
            if(parsing == null){
                this.setState({ data_offline: [] })
            }else{
                this.setState({ data_offline: [] })
                this.setState({ data_offline: this.state.data_offline.concat(parsing) })
            }
        })



        AsyncStorage.getItem('serial_offline').then(data => {
            let parsing = JSON.parse(data)
            if(parsing == null){
                this.setState({ data_serial: [] })
            }else{
                this.setState({ data_serial: this.state.data_serial.concat(parsing) })
            }
        })

            axios.get('http://wttr.in/?format=j1').then(res => {
                this.setState({ weatherStatus: res.data.current_condition[0].weatherDesc[0].value, weatherTemp: res.data.current_condition[0].temp_C + "??" })
                
                this.setState({ weatherCondition: 'No Internet', weatherPallete: 'black', weatherFont: 'white' })

                if(this.state.weatherStatus.match(/Thunder/i)){
                    this.setState({ weather: require('../assets/weather/thunder.png'), weatherCondition: "Thunder", weatherPallete: 'black', weatherFont: 'white' })
                }else if(this.state.weatherStatus.match(/Sunny/i)){
                    this.setState({ weather: require('../assets/weather/sunny.png'), weatherCondition: 'Sunny', weatherPallete: '#faa825', weatherFont: 'white' })
                }else if(this.state.weatherStatus.match(/Fair/i)){
                    this.setState({ weather: require('../assets/weather/cloudy.png'), weatherCondition: 'Cloudy Fair', weatherPallete: 'white', weatherFont: 'black' })
                }else if(this.state.weatherStatus.match(/Rain/i)){
                    this.setState({ weather: require('../assets/weather/rain.png'), weatherCondition: 'Raining', weatherPallete: 'grey', weatherFont: 'white' })
                }else if(this.state.weatherStatus.match(/Cloudy/i)){
                    this.setState({ weather: require('../assets/weather/cloudy.png'), weatherCondition: 'Cloudy', weatherPallete: 'white', weatherFont: 'black' })
                }else{
                    this.setState({
                        weather: require('../assets/weather/cloudy.png'),
                        weatherCondition: 'Cloudy',
                        weatherPallete: 'white',
                        weatherFont: 'black'
                    })
                }
            })

        let waktu = new Date();
        let jam = waktu.getHours();

        if(jam == 1){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 2){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 3){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 4){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 5){
            this.setState({ waktu: 'Selamat Pagi' })
        }else if(jam == 6){
            this.setState({ waktu: 'Selamat Pagi' })
        }else if(jam == 7){
            this.setState({ waktu: 'Selamat Pagi' })
        }else if(jam == 8){
            this.setState({ waktu: 'Selamat Pagi' })
        }else if(jam == 9){
            this.setState({ waktu: 'Selamat Pagi' })
        }else if(jam == 10){
            this.setState({ waktu: 'Selamat Pagi' })
        }else if(jam == 11){
            this.setState({ waktu: "Selamat Siang" })
        }else if(jam == 12){
            this.setState({ waktu: 'Selamat Siang' })
        }else if(jam == 13){
            this.setState({ waktu: 'Selamat Siang' })
        }else if(jam == 14){
            this.setState({ waktu: 'Selamat Sore' })
        }else if(jam == 15){
            this.setState({ waktu: 'Selamat Sore' })
        }else if(jam == 16){
            this.setState({ waktu: 'Selamat Sore' })
        }else if(jam == 17){
            this.setState({ waktu: 'Selamat Sore' })
        }else if(jam == 18){
            this.setState({ waktu: 'Selamat Sore' })
        }else if(jam == 19){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 20){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 21){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 22){
            this.setState({ waktu: 'Selamat Malam' })
        }else if(jam == 23){
            this.setState({ waktu: 'Selamat Malam' })
        }
        this.setState({ loading: false })
    }

    input_date(){
        this.setState({ date: false })
        this.setState({ date: true })
    }

    module_delete(){
        this.state.data_offline.splice(this.state.moduleIndex, 1)
        AsyncStorage.setItem('relay_offline', JSON.stringify(this.state.data_offline))
        this.setState({ moduleDetail: false })
        this.refresh_relay()
    }

    moduleDetail(ThisName, url_on, url_off, index, machineIP){
        this.setState({ moduleDetail: true, moduleName: ThisName, moduleUrlOn: url_on, moduleUrlOff: url_off, moduleIndex: index, machineDetailsIP: machineIP })
    }

    moduleUpdate(index){
        this.state.data_offline[this.state.moduleIndex].name = this.state.moduleName;
        this.state.data_offline[this.state.moduleIndex].uri_on = this.state.newRelay;
        AsyncStorage.setItem('relay_offline', JSON.stringify(this.state.data_offline))
        alert('Data Updated!')
    }

    schedule(x){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'schedule/get', { token: data, secret: konfigurasi.key, name: x }).then(res => {
                try{
                    this.setState({ scheduleDetailName: res.data.data[0].name, scheduleDetailDate: res.data.data[0].schedule, scheduleDetail: true })
                    console.log(res.data)
                }catch(e){
                    
                }
            })
        })
    }

    addSchedule(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'schedule/input', { token: data, secret: konfigurasi.key, name: this.state.schedule_name_select, url_offline: this.state.schedule_offline, schedule: this.state.schedule_date}).then(res => {
                if(res.status == 200){
                    alert('Done')
                }
            })
        })
    }

    refresh_relay(){
        AsyncStorage.getItem('relay_offline').then(data => {
            let parse = JSON.parse(data)
            if(parse == null){
                this.setState({ data_offline: [] })
            }else{
                this.setState({ data_offline: [] })
                this.setState({ data_offline: this.state.data_offline.concat(parse) })
            }
        })
    }

    update_relay(){
        let compress = JSON.stringify(this.state.data_offline)
        AsyncStorage.setItem('relay_offline', compress)
    }

    async notif(title, body){
        await Notif.scheduleNotificationAsync({
            content: {
                title: title,
                body: body
            },
            trigger: { seconds: 1 }
        })
    }

    async serial_details(name, url, index, machineIP, type){
        const actual_data = this.state.data_serial[index]

        if(actual_data.type == true){
            this.setState({ loading: true })
            await axios.post('http://' + actual_data.machineIP + url).then(data => {
                this.setState({ serial_data: data.data, serial_index: index })
                this.setState({ serial_details: true, loading: false })
            }).catch(err => {
                this.setState({ loading: false })
                this.setState({ serial_data: 'error server' })
                this.setState({ serial_details: true })
            })
        }else{
            this.setState({ loading: true })
            await axios.get('http://' + actual_data.machineIP + url).then(data => {
                this.setState({ serial_data: data.data, serial_index: index })
                this.setState({ serial_details: true, loading: false })
            }).catch(err => {
                this.setState({ loading: false })
                this.setState({ serial_data: 'error server' })
                this.setState({ serial_details: true })
            })
        }

    }

    serial_delete(index){
        this.state.data_serial.splice(index, 1)
        AsyncStorage.setItem('serial_offline', this.state.data_serial)
        this.setState({ serial_details: false })
    }

    switch(index, status, url, pin, uri_on, uri_off, machineIP){
            let get_status = this.state.data_offline[index].relay_status
            let get_name = this.state.data_offline[index].name
            this.state.data_offline[index].relay_status = !this.state.data_offline[index].relay_status

            if(get_status){
                (async() => {
                    this.setState({ loading: true })
                    await axios.post('http://' + machineIP + uri_on + 'die').then(x => {
                        if(x.status != 200){
                            this.setState({ error_server: true })
                        }
                        this.notif('Turning OFF', 'Hei ' + this.state.name + ', '+ get_name + ' is now OFF')
                        AsyncStorage.setItem('relay_offline', JSON.stringify(this.state.data_offline))
                    }).catch(err => {
                        if(err){
                            this.setState({ loading: false, error_server: true })
                        }
                    })

                    this.setState({ loading: false }) 
                })()
            }else{
                (async() => {
                    this.setState({ loading: true })
                    await axios.post('http://' + machineIP + uri_on).then(x => {
                        if(x.status != 200){
                            this.setState({ error_server: false })
                        }
                        this.notif('Turning ON', 'Hei ' + this.state.name + ', ' + get_name + ' is now ON')
                        AsyncStorage.setItem('relay_offline', JSON.stringify(this.state.data_offline))
                    }).catch(err => {
                        if(err){
                            this.setState({ loading: false, error_server: true })
                        }
                    })
                    this.setState({ loading: false }) 
                })()
            }
    }

    unlock(index){
        let data = this.state.data_offline[index]

            this.setState({ loading: true })
            axios.post('http://' + data.machineIP + data.uri_on).then(response => {
                this.setState({ door_open: true })
            }).catch(err => {
                this.setState({ loading: false, error_server: true })
            })

            setTimeout(() => {
                axios.post('http://' + data.machineIP + data.uri_off).then(response => {
                    this.setState({ door_open: false })
                }).catch(err => {
                    this.setState({ loading: false, error_server: true })
                })
            }, 10000)
            this.setState({ loading: false })
    }

    clicker(index, status, url, pin, uri_on, uri_off, machineIP){
            let get_status = this.state.data_offline[index].status
            let get_name = this.state.data_offline[index].name
            this.state.data_offline[index].relay_status = !this.state.data_offline[index].relay_status
            

            if(get_status){
                (async() => {
                    this.setState({ loading: true })
                    await axios.get('http://' + machineIP + uri_on).then(x => {
                        if(x.status != 200){

                        }
                        this.notif('Turning ON', 'Hei ' + this.state.name + ', ' + get_name + ' is turning on')
                    }).catch(err => {
                        if(err){
                            this.setState({ loading: false, error_server: true })
                        }
                    })
                    this.setState({ loading: false }) 
                })()
           }else{
                (async() => {
                    this.setState({ loading: true })
                    await axios.get('http://' + machineIP + uri_on + 'die').then(x => {
                        if(x.status != 200){

                        }
                        this.notif('Turning OFF', 'Hei ' + this.state.name + ', ' + get_name + ' is turning off')
                    }).catch(err => {
                        if(err){
                            this.setState({ loading: false, error_server: true })
                        }
                    })
                    this.setState({ loading: false }) 
                })()
           }
    }

    list(){
        AsyncStorage.setItem('serial_offline', JSON.stringify(this.state.data_serial))
        AsyncStorage.setItem('relay_offline', JSON.stringify(this.state.data_offline))
        this.setState({ swipeRelay: true })
    }


    save_qr(){
        this.svg.toDataURL(async (data) => {

        })
    }

    result_qr(index, type){
        if(index == null){
            if(type == true){
                const raw_data = this.state.data_offline[0]
                const data = {
                    name: raw_data.name,
                    type_sensor: raw_data.type,
                    type: type,
                    machine: raw_data.machineIP,
                    url: raw_data.uri_on,
                    message: "Hey dude, what you gonna do with this data ?"
                }
                const parse = JSON.stringify(data)
                const encode = base64.encode(parse)
                this.setState({ qr_code: encode, qr_result: true, qr_generator_popup: false })
            }else{
                const raw_data = this.state.data_offline[0]
                const data = {
                    name: raw_data.name,
                    type_sensor: raw_data.type,
                    type: type,
                    machine: raw_data.machineIP,
                    url: raw_data.uri_off,
                    message: "Hey dude, what you gonna do with this data ?"
                }
                const parse = JSON.stringify(data)
                const encode = base64.encode(parse)
                this.setState({ qr_code: encode, qr_result: true, qr_generator_popup: false })
            }
        }else{
            if(type == true){
                const raw_data = this.state.data_offline[index]
                const data = {
                    name: raw_data.name,
                    type_sensor: raw_data.type,
                    type: type,
                    machine: raw_data.machineIP,
                    url: raw_data.uri_on,
                    message: "Hey dude, what you gonna do with this data ?"
                }
                const parse = JSON.stringify(data)
                const encode = base64.encode(parse)
                this.setState({ qr_code: encode, qr_result: true, qr_generator_popup: false })
            }else{
                const raw_data = this.state.data_offline[index]
                const data = {
                    name: raw_data.name,
                    type_sensor: raw_data.type,
                    type: type,
                    machine: raw_data.machineIP,
                    url: raw_data.uri_off,
                    message: "Hey dude, what you gonna do with this data ?"
                }
                const parse = JSON.stringify(data)
                const encode = base64.encode(parse)
                this.setState({ qr_code: encode, qr_result: true, qr_generator_popup: false })
            }
        }
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928' }} refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={() => this.refresh()}/>}>
                <Loading visible={this.state.loading} textContent={"Please Wait..."} textStyle={{ color: 'white' }} />

                <Loading visible={this.state.getcontent} textContent={"Downloading Content..."} textStyle={{ color: "white" }} />

                <Modal isVisible={this.state.not_available}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: 10, borderRadius: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: -5 }} onPress={() => this.setState({ not_available: false })}>
                                <Icon name='close-outline' size={30} />
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Not Available Yet</Text>
                            <Image source={require('../assets/illustrations/bug.png')} style={{ width: 150, marginTop: 10, height: 100 }} />
                            <Text>This Feature still in development,</Text>
                            <Text>Could be updated soon !</Text>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.author}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, alignItems: 'center', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Authors</Text>
                            
                            <Image source={require('../assets/icons/author.jpeg')} style={{ width: 100, height: 100, borderRadius: 10, marginTop: 10 }} />

                            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ marginTop: 3, fontWeight: 'bold' }}>My Social Media</Text>
                                <Text style={{ marginTop: 5 }}>Github: FajarTheGGman</Text>
                                <Text>IG: @FajarTheGGman</Text>
                                <Text>Twitter: @kernel024</Text>
                                <Text>Web: fajarfirdaus.now.sh</Text>

                                <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 5, backgroundColor: 'grey' }} onPress={() => this.setState({ author: false })}>
                                    <Text style={{ color: 'white' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.door_open}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Opening The Door</Text>
                            <Image source={require('../assets/illustrations/login.png')}  style={{ width: 140, height: 100, marginTop: 10 }}/>
                            <Text style={{ marginTop: 5 }}>Door Is Opening</Text>
                            <Text>In 10 Seconds</Text>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.qr_result}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end', marginTop: -5, marginLeft: 5 }}>
                                <TouchableOpacity onPress={() => this.setState({ qr_result: false })}>
                                    <Icon name='close-outline' size={30} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 16 }}>Result QR Code</Text>
                            
                            <View style={{ marginTop: 25 }}>
                                <QRCode value={this.state.qr_code} logo={require('../assets/icon.png')} size={120} getRef={(x) => (this.svg = x)} />
                            </View>

                            <TouchableOpacity style={{ marginTop: 25, padding: 5, backgroundColor: 'black', borderRadius: 5 }} onPress={() => this.save_qr()}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.qr_generator_popup}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}>
                        <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 5, alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: -3 }} onPress={() => this.setState({ qr_generator_popup: false })}>
                                <Icon name='close-outline' size={30} />
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>QR Code Generator</Text>
                            <Image source={require('../assets/icons/qr.png')} style={{ width: 80, height: 80, marginTop: 10 }} />

                            <Text style={{ marginTop: 20 }}>Select Devices</Text>
                            <Picker selectedValue={this.state.qr_generator} onValueChange={(val) => this.setState({ qr_generator: val })} style={{ width: 100, height: 50 }} style={{ width: 110 }}>
                                {this.state.data_offline.map((x,y) => {
                                    return <Picker.Item label={x.name} value={y} />
                                })}
                            </Picker>

                            <Radio radio_props={[{ label: 'ON', value: true }, { label: "OFF", value: false }]}  buttonColor="black" formHorizontal={true} animation={true} onPress={(value) => this.setState({ qr_type: value }) } style={{ marginTop: 10, color: 'black' }} labelStyle={{ padding: 10, marginTop: -5 }} />

                            <TouchableOpacity style={{ marginTop: 20, borderRadius: 5, backgroundColor: 'black', padding: 5 }} onPress={() => this.result_qr(this.state.qr_generator, this.state.qr_type)}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Generate!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.error}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: 15, marginRight: 15 }}>
                                    <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Download Error</Text>
                                </View>

                                <View style={{ marginTop: -3, marginLeft: 10, marginRight: -40 }}>
                                    <TouchableOpacity onPress={() => this.setState({ error: false })}>
                                        <Icon name="close-outline" size={30} color="black"/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={require('../assets/illustrations/error.png')} style={{ width: 210, height: 120 }} />
                                <Text>Error downloading relay data, </Text>
                                <Text>You should connect to internet</Text>
                                <Text>To get some relay data from</Text>
                                <Text>Your account or</Text>
                                <Text>You can continue offline</Text>

                                <TouchableOpacity style={{ marginTop: 15, padding: 12, backgroundColor: '#c9c9c9', borderRadius: 15 }} onPress={() => this.setState({ error: false })}>
                                    <Text style={{ color: 'white' }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.error_server}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: 12, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>Error Connecting to server</Text>
                            <Text style={{ marginTop: 8 }}>Plz check your ip configuration</Text>
                            <Text>or your machine</Text>
                            <Image source={require('../assets/illustrations/error.png')} style={{ width: 150, height: 80, marginTop: 15 }}  />
                            <TouchableOpacity style={{ marginTop: 10, padding: 8, borderRadius: 5, backgroundColor: 'orange' }} onPress={() => this.refresh()}>
                                <Text style={{ fontWeight: 'bold' }}>Refresh</Text>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>OR</Text>
                            <TouchableOpacity style={{ marginTop: 10, padding: 8, borderRadius: 5, backgroundColor: 'grey' }} onPress={() => this.setState({ error_server: false })}>
                                <Text style={{ fontWeight: 'bold' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.serial_details}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <View style={{ marginTop: 15, marginLeft: 30, alignItems: 'center' }}>
                                        <Image source={require('../assets/icons/receiving.png')} style={{ width: 80, height: 80, marginLeft: -15 }} />
                                        <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 17 }} >Serial Data</Text>
                                   </View>
                                </View>

                                <View style={{ marginLeft: 15, marginRight: -5 }}>
                                    <TouchableOpacity onPress={() => this.setState({ serial_details: false })}>
                                        <Icon name="close-outline" size={30} color='black' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={{ marginTop: 15, alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'black', borderRadius: 5, padding: 13 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.serial_data}</Text>
                                </View>

                                <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'red', padding: 5, borderRadius: 5 }} onPress={() => this.serial_delete(this.state.serial_index)}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>



                <Modal isVisible={this.state.moduleDetail}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <View style={{ marginTop: 15, marginLeft: 30, alignItems: 'center' }}>
                                        <Image source={require('../assets/icons/details.png')} style={{ width: 80, height: 80, marginLeft: -15 }} />
                                        <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 17 }} >Details Module</Text>
                                        {this.state.scheduleButton ? <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 10, backgroundColor: 'green' }} onPress={() => this.schedule(this.state.moduleName)}>
                                            <Text>Schedule</Text>
                                        </TouchableOpacity>:<View></View>}

                                    </View>
                                </View>

                                <View style={{ marginLeft: 15, marginRight: -5 }}>
                                    <TouchableOpacity onPress={() => this.setState({ moduleDetail: false, scheduleButton: false })}>
                                        <Icon name="close-outline" size={30} color='black' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={{ marginTop: 15, alignItems: 'center' }}>
                                <Text>Your Module : <Text style={{ fontWeight: 'bold' }}>{this.state.moduleName}</Text></Text>
                                <Text style={{ marginTop: 5 }}>Relay : <Text style={{ fontWeight: 'bold' }}>{this.state.moduleUrlOn}</Text></Text>
                                <Text style={{ marginTop: 5 }}>Machine IP : <Text style={{ fontWeight: 'bold' }}>{this.state.machineDetailsIP}</Text></Text>
                                <TouchableOpacity style={{ marginTop: 15, padding: 5, backgroundColor: 'red', borderRadius: 10, elevation: 15 }} onPress={() => this.module_delete()}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>

                                <TextInput style={{ marginTop: 10, textAlign: 'center' }} placeholder="Change Name ?" onChangeText={(val) => this.setState({ moduleName: val })} />
                                <TextInput style={{ marginTop: 5, textAlign: 'center' }} placeholder="Change Relay ?" onChangeText={(val) => this.setState({ newRelay: val })} />
                                <Picker selectedValue={this.state.machineDetailsIP} onValueChange={(val) => this.setState({ machineDetailsIP: val })} style={{ marginLeft: -8, width: 110, height: 50 }}>
                                    {this.state.machine.map((x, y) => {
                                    return <Picker.Item label={x.name} value={x.ip} />
                                    })}
                                </Picker>
                                <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, elevation: 15, padding: 7 }} onPress={() => this.moduleUpdate(this.state.moduleIndex)}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Change IT!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <SwipeUpDown modalVisible={this.state.swipeRelay} ContentModal={
                        <View style={{ flexGrow: 1, marginTop: 70, backgroundColor: '#292928', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928', borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingBottom: 10, elevation: 15 }}>
                                <Icon name='remove-outline' size={40} color="white"/>
                                <Text style={{ fontWeight: 'bold', marginTop: -5, fontSize: 17, color: 'white' }}>List Devices</Text>
                            </View>

                            <View style={{ flexGrow: 2, height: 65, flexDirection: 'column', marginTop: 0, alignItems: 'center' }}>
                                <ScrollView style={{ flexGrow: 1, flexDirection: 'column' }}>
                                    <View style={{ padding: 20, width: 280, marginTop: 15, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Sensor Mode</Text>
                                        </View>

                                        <View>
                                            <Switch trackColor={{ false: 'black', true: 'green' }} onValueChange={(val) => this.setState({ menu_mode: val })} value={this.state.menu_mode} />
                                        </View>
                                    </View>
                                    { this.state.menu_mode ? this.state.data_serial.map((x, y) => {
                                        return <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'black', justifyContent: 'space-between', padding: 20, width: 280, marginTop: 19, borderRadius: 10 }} onPress={() => this.serial_details(x.name, x.url, y, x.machineIP, x.type)}>
                                            <View>
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{x.name}</Text>
                                            </View>

                                            <View>
                                                <Text style={{ color: 'orange' }}>{x.url}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }) : this.state.data_offline.map((x, y) => {
                                    return <TouchableOpacity style={{ flexDirection: "row", backgroundColor: 'black', justifyContent: 'space-between', padding: 20, width: 280, marginTop: 19, borderRadius: 10 }} onPress={() => this.moduleDetail(x.name, x.uri_on, x.uri_off, y, x.machineIP)}>
                                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                            {x.type == "lights.png" ? <Image source={require('../assets/category/lights.png')} style={{ width: 50, height: 50, backgroundColor: 'white', padding: 5, borderRadius: 15 }} /> : <Image source={require('../assets/category/lock.png')} style={{ width: 50, height: 50, backgroundColor: 'white', padding: 5, borderRadius: 15 }} />}
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>{x.name.length > 6 ? x.name.slice(0, 5)+'...' : x.name}</Text>
                                        </View>
                                        <View style={{ marginLeft: 50, marginTop: 12 }}>
                                        {x.type == 'lock.png' ? <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.unlock(y)}>
                                            <Icon name='lock-open-outline' size={25} color='white' />
                                        </TouchableOpacity>: x.type_button ? <Switch trackColor={{ false: 'red', true: 'green' }} onValueChange={() => this.switch(y, x.relay_status, x.url, x.relay_pin, x.uri_on, x.uri_off, x.machineIP)} value={x.relay_status} /> : <View style={{ marginRight: 5 }}>
                                                {x.relay_status ? <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, padding: 5 }} onPress={() => this.clicker(y, x.status, x.url, x.relay_pin, x.uri_on, x.uri_off, y)}>
                                                    <Text>Turn OFF</Text>
                                                </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, borderRadius: 10 }} onPress={() => this.clicker(x.name, x.status)}>
                                                    <Text>Turn ON</Text>
                                                </TouchableOpacity>}
                                            </View>}
                                        </View>
                                    </TouchableOpacity>
                                  })}
                                </ScrollView>
                            </View>
                        </View>
                    } onClose={() => this.setState({ swipeRelay: false })} />

                <Modal isVisible={this.state.menu}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 85 }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Choose One</Text>
                                </View>

                                <View style={{ marginLeft: 58, marginRight: -4.5 }}>
                                    <TouchableOpacity onPress={() => this.setState({ menu: false })}>
                                        <Icon name="close-outline" size={30} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 10 }}>
                                    <TouchableOpacity onPress={() => this.setState({ qr_generator_popup: true, menu: false })}>
                                        <Image source={require('../assets/icons/qr.png')} style={{ width: 70, height: 70 }} />
                                        <Text style={{ textAlign: 'center', color: 'blue', fontWeight: 'bold' }}>QR Generator</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({ serial_information: true, not_available: false, menu: false })}>
                                            <Image source={require('../assets/icons/resistor.png')} style={{ width: 70, height: 70 }} />
                                            <Text style={{ fontWeight: 'bold', color: 'orange', textAlign: 'center' }}>Sensor Info</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <TouchableOpacity onPress={() => this.setState({ addRelay: true, menu: false })}>
                                        <Image source={require('../assets/icons/touch.png')} style={{ width: 70, height: 70 }} />
                                        <Text style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>Button</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.serial_information}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <View style={{ marginTop: 15, marginLeft: 30, alignItems: 'center' }}>
                                        <Image source={require('../assets/icons/serial_information.png')} style={{ width: 80, height: 80, marginLeft: -15 }} />
                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }} >Sensor Information</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: 15, marginRight: -5 }}>
                                    <TouchableOpacity onPress={() => this.setState({ serial_information: false })}>
                                        <Icon name="close-outline" size={30} color='black' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={{ marginTop: 15, alignItems: 'center' }}>
                                <TextInput style={{ marginTop: 10, textAlign: 'center' }} placeholder="Name" onChangeText={(val) => this.setState({ serial_name: val })} />
                                    <Picker selectedValue={this.state.machineIP} onValueChange={(val) => this.setState({ machineIP: val })} style={{ marginLeft: -8, width: 110, height: 50 }}>
                                        {this.state.machine.map((x, y) => {
                                        return <Picker.Item label={x.name} value={x.ip} />
                                        })}
                                    </Picker>
                                <TextInput style={{ marginTop: 10, textAlign: 'center' }} placeholder="Input URL" onChangeText={(val) => this.setState({ serial_url: val })} />
                                <Radio radio_props={[{ label: 'POST', value: true }, { label: "GET", value: false }]}  buttonColor="black" formHorizontal={true} animation={true} onPress={(value) => this.setState({ serial_type: value }) } style={{ marginTop: 10, color: 'black' }} style={{ padding: 5 }} />

                                <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, elevation: 15, padding: 7 }} onPress={() => this.addSerial()}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.schedule}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <View style={{ alignItems: 'center', marginTop: 15, marginLeft: 25}}>
                                        <Image source={require('../assets/icons/clock.png')} style={{ width: 50, height: 50 }} />
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>Schedule Relay</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: 15, marginTop: -3, marginRight: -5 }}>
                                    <TouchableOpacity onPress={() => this.setState({ schedule: false })}>
                                        <Icon name="close-outline" size={30} color="black"/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginTop: 15, alignItems: 'center' }}>
                                <Picker selectedValue={this.state.schedule_name_select} onValueChange={(val) => this.setState({ schedule_name_select: val })} style={{ width: 100, height: 50 }}>
                                    {this.state.data_offline.map((x,y) => {
                                        return <Picker.Item label={x.name} value={x.name} />
                                    })}
                                </Picker>
                                <TouchableOpacity style={{ marginTop: 8, backgroundColor: 'orange', padding: 10, borderRadius: 15, elevation: 15 }} onPress={() => this.input_date()}>
                                    <Text style={{ fontWeight: 'bold' }}>Choose Time</Text>
                                </TouchableOpacity>
                                { this.state.date && (<DateTimePicker value={this.state.input_date} is24Hour={false} display="default" mode="time" onChange={(e, x) => {
                                    this.setState({ schedule_date: x, date: false })
                                } } />)}
                                <TouchableOpacity style={{ marginTop: 10, borderRadius: 10, padding: 5, backgroundColor: 'black', elevation: 15 }} onPress={() => this.addSchedule()}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 2 }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.addRelay}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 10, paddingLeft: 35, paddingRight: 35, paddingBottom: 20, borderRadius: 25 }}>
                            <View style={{ alignItems: 'flex-end', marginRight: -25, marginTop: 1 }}>
                                <TouchableOpacity onPress={() => this.setState({ addRelay: false })}>
                                    <Icon name='close-outline' size={30} color='black' />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: -5 }}>
                                <Image source={require('../assets/icons/relayicon.png')} style={{ width: 50, height: 50 }} />
                            </View>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Add Some Relay</Text>

                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', marginLeft: -10 }}>
                                    <TextInput placeholder="Name" onChangeText={(value) => this.setState({ relay_name: value })}/>
                                    <Picker selectedValue={this.state.relay_category} onValueChange={(val) => this.setState({ relay_category: val })} style={{ marginLeft: -8, width: 110, height: 50 }}>
                                        <Picker.Item label="Lights" value="lights.png" />
                                        <Picker.Item label="Lock" value="lock.png" />
                                    </Picker>

                                    <Picker selectedValue={this.state.machineIP} onValueChange={(val) => this.setState({ machineIP: val })} style={{ marginLeft: -8, width: 110, height: 50 }}>
                                        {this.state.machine.map((x, y) => {
                                        return <Picker.Item label={x.name} value={x.ip} />
                                        })}
                                    </Picker>

                                    <TextInput placeholder="Relay" onChangeText={(val) => this.setState({ uri_on: val })} />
                                </View>

                                <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: -10 }}>
                                    <View style={{ marginTop: 10 }}>
                                        <Text>Type Button</Text>
                                        <Radio radio_props={[{ label: 'Switch', value: true }, { label: "Clicker", value: false }]}  buttonColor="black" formHorizontal={false} animation={true} onPress={(value) => this.setState({ relay_button_type: value }) } style={{ marginTop: 10, color: 'black' }} />
                                    </View>
                                </View> 
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 15 }}>
                                <TouchableOpacity style={{ backgroundColor: 'black', elevation: 15, padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 15 }} onPress={() => this.addRelayOffline()}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', padding: 2 }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.internet}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'red' }}>No Internet Connection !</Text>
                            <Image source={require('../assets/icons/nointernet.png')} style={{ width: 70, height: 70, marginTop: 15 }} />
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={false}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', flexDirection: 'column', padding: 15, borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 50 }}>Add Some Relay</Text>
                                <TouchableOpacity>
                                    <Icon name="close-outline" size={34} color="black" style={{ marginLeft: 50 }}/>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: "column", marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput placeholder="Name" onChangeText={(val) => this.setState({ relay_name: val })} style={{ marginLeft: 15 }} />
                                    <View style={{ flexDirection: 'column', marginRight: 10 }}>
                                        <Text>Buttons</Text>
                                        <Radio radio_props={[{ label: 'Button', value: true }, { label: "Switch", value: false }]} formHorizontal={false} animation={true} onPress={(value) => value ? this.setState({ type: true }) : this.setState({ type: false }) } style={{ marginTop: 10 }} />
                                    </View>

                                </View>
                            </View>

                            <View style={{ flexDirection: "column", marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput placeholder="Time Interval" onChangeText={(val) => this.setState({ time_interval: val })} keyboardType="numeric" style={{ marginLeft: 15 }} />
                                    <View style={{ flexDirection: 'column', marginRight: 35 }}>
                                        <Text>Timeout</Text>
                                        <Radio radio_props={[{ label: 'Yes', value: true }, { label: "No", value: false }]} formHorizontal={false} animation={true} onPress={(value) => value ? this.setState({ timeout: true }) : this.setState({ timeout: false }) } style={{ marginTop: 10 }} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: "column", marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextInput placeholder="Url Machine" onChangeText={(val) => this.setState({ url_machine: val })} style={{ marginLeft: 15 }} />
                                    <View style={{ flexDirection: 'column', marginRight: 35 }}>
                                        <Text>Status</Text>
                                        <Radio radio_props={[{ label: 'ON', value: true }, { label: "OFF", value: false }]} formHorizontal={false} animation={true} onPress={(value) => value ? this.setState({ status: true }) : this.setState({ status: false }) } style={{ marginTop: 10 }} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 15 }}>
                                <TouchableOpacity onPress={() => this.addRelay()}>
                                    <Text style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', padding: 5, borderRadius: 5 }}>Add New Relay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 45 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => this.refresh()}>
                            <Text style={{ color: '#EDEDED', fontWeight: 'bold', fontSize: 25 }}>Project 365%</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#ededed' }}>{this.state.waktu} {this.state.name}</Text>

                    </View>

                    <View style={{ marginLeft: 130, backgroundColor: 'black', elevation: 15, padding: 5, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileOffline') }>
                            <Image source={{ uri: 'https://avatars.dicebear.com/api/male/' + this.state.name + '.png' }} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 100, backgroundColor: this.state.weatherPallete, padding: 15, borderRadius: 15, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: this.state.weatherFont, fontSize: 18 }}>{this.state.weatherCondition} <Text style={{ color: this.weatherColor, fontWeight: 'normal', fontSize: 15 }}>{this.state.weatherTemp}</Text></Text>
                    <Image source={this.state.weather} style={{ width: 50, height: 50, marginLeft: 80 }} />
                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={{ color: 'white' }}>{this.state.dev}</Text>
                </View>

                <Text style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', padding: 5, borderRadius: 5, marginTop: 70, fontSize: 17 }}>Navigation</Text>

                <View style={{ padding: 15, borderRadius: 15, backgroundColor: '#0d0d0d', elevation: 15, marginTop: 15 }}>
                   <View style={{ flexDirection: "row" }}>
                       <TouchableOpacity onPress={() => this.list()}>
                           <Image source={require('../assets/icons/box.png')} style={{ width: 60, height: 60 }} />
                       </TouchableOpacity>

                       <TouchableOpacity onPress={() => this.setState({ menu: true })} style={{ marginTop: 5, marginLeft: 35 }} >
                           <Image source={require('../assets/icons/addrelay.png')} style={{ width: 60, height: 60 }} />
                       </TouchableOpacity>
                   </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'orange' }}>Wellcome to offline mode</Text>
                </View>
            </ScrollView>
        )
    }
}
