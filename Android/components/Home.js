import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Switch, Image, TextInput, FlatList, AsyncStorage, ScrollView, RefreshControl, Button, Picker } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import axios from 'axios'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from 'react-native-loading-spinner-overlay'
import DateTimePicker from '@react-native-community/datetimepicker'
import GridList from 'react-native-grid-list'
import konfigurasi from '../config'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Network from 'expo-network'
import * as Battery from 'expo-battery'
import Radio from 'react-native-simple-radio-button'
import { LinearGradient } from 'expo-linear-gradient'
import SwipeUpDown from 'react-native-swipe-modal-up-down'
import * as Animasi from 'react-native-animatable'
import* as FileSystem from 'expo-file-system'

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            wellcome: false,
            low: false
        }
    }

    async componentDidMount(){
            await this.battery()
            if(this.props.route.params.type == 'offline'){
                AsyncStorage.setItem('offline', true)
                this.setState({ wellcome: true })
            }
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
                    }else if(route.name == 'Code'){
                        icons = 'code-slash-outline'
                    }else if(route.name == 'Settings'){
                        icons = 'settings-outline'
                    }

                    return <Icon name={icons} size={size} color="white" />
                }
            })}>
                <Tabs.Screen name='Home' component={HomePage} />
                <Tabs.Screen name='Barcode' component={Barcode} />
                <Tabs.Screen name="Code" component={Code }/>
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
            localip: null
        }
    }

    logout(){
        AsyncStorage.removeItem('token').then(respon => {
            this.props.navigation.dispatch(
                StackActions.replace('Login')
            )
        })
    }

    async componentDidMount(){
        await this.Network()
        await this.Battery()

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
        this.props.navigation.dispatch(
            StackActions.replace('Home')
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
                                <Text>📶 Connection : {this.state.connection ? <Text>✅</Text> : <Text>🚫</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>📡Internet : {this.state.connection_internet ? <Text>✅</Text> : <Text>🚫</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>🌐Type Connection: {this.state.connection_type == 'NetworkStateType.CELLULAR' ? <Text>Cellular</Text> : <Text>WIFI</Text>}</Text>
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
                                <Text>🔋Battery : {this.state.battery_level}</Text>
                                <Text style={{ marginTop: 4 }}>⚡Charging: {this.state.battery_charge ? <Text style={{ color: 'green' }}>YES</Text> : <Text style={{ color: 'grey' }}>NO</Text>}</Text>
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
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity style={{ marginLeft: -2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: 'black', backgroundColor: 'black', }} onPress={() => this.Online()}>
                            <Text style={{ color: 'white', paddingTop: 15, paddingBottom: 15, marginLeft: 15, fontWeight: 'bold', elevation: 15 }}>📡 Switch To <Text style={{ color: 'green' }}> ONLINE</Text></Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 15 }} onPress={() => this.setState({ phone_status: true })}>
                            <Text style={{ paddingTop: 15, paddingBottom: 15, color: 'white', fontWeight: 'bold', marginLeft: 12, elevation: 15 }}>📱My Phone Status</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 15 }} onPress={() => this.setState({ settings_network: true })}>
                            <Text style={{ color: 'white', fontWeight: 'bold', elevation: 15, paddingTop: 15, paddingBottom: 15, marginLeft: 15 }}>📶  Check Connection Status</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 15 }} onPress={() => this.setState({ iot_board: true })}>
                            <Text style={{ marginLeft: 15, paddingBottom: 15, paddingTop: 15, color: 'white', fontWeight: 'bold' }}>⚒️ IOT Board IP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 160, backgroundColor: 'red', elevation: 15 }} onPress={() => this.logout()}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, paddingTop: 15, marginLeft: 15, paddingBottom: 15 }}>Logout</Text>
                        </TouchableOpacity>
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
            scan: false
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

    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#292928' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 19 }}>Barcode Scanner</Text>
                <View style={{ paddingLeft: 8, marginTop: 10, paddingRight: 8, paddingTop: 20, paddingBottom: 20, borderRadius: 15, backgroundColor: 'black', elevation: 15 }}>
                    <BarCodeScanner onBarCodeScanned={ this.state.scan ? undefined : ({ type, data }) => {
                        this.setState({ scan: true })
                    } } style={{ width: 300, height: 300, justifyContent: 'center', marginTop: 5 }}/>
                </View>

                { this.state.scan ? <TouchableOpacity style={{ backgroundColor: 'black', elevation: 15, borderRadius: 15, padding: 10, marginTop: 10 }} onPress={() => this.setState({ scan: false })}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Scan Again</Text>
                </TouchableOpacity> : <Text></Text> }
            </View>
        )
    }
}

class HomePage extends Component{
    constructor(props){
        super(props)

        this.state = {
            relay: false,
            data_offline: {
                title: "Offline Relay Data",
                value: []
            },
            data: [],
            relayEmpty: false,
            relayAlert: false,
            serial_information: false,
            loading: false,
            refresh: false,
            getcontent: false,
            type: '',
            menu: false,
            schedule: false,
            relay_button_type: true,
            relay_timeout: false,
            status: false,
            relay_category: 'lights.png',
            relay_name: "",
            relay_time_interval: null,
            relay_url: "",
            internet: false,
            username: '',
            waktu: '',
            dev: "{ Coder: Fajar Firdaus }",
            swipeRelay: false,
            addRelay: false,
            weather: null,
            weatherStatus: '',
            weatherCondition: 'No Internet !',
            weatherPallete: 'white',
            weatherTemp: '',
            error: false,
            date: false,
            input_date: new Date(),
            schedule_date: null,
            schedule_name_select: ""
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
            type_button: this.state.relay_button_type
        }

        this.setState({ data_offline: this.state.data_offline.value.push(actual_data) })
        AsyncStorage.setItem("relay_offline", JSON.stringify(this.state.data_offline))
        AsyncStorage.getItem("relay_offline").then(x => {
            console.log(x)
        })
    }


    async componentDidMount(){
        const network = await Network.getNetworkStateAsync()

        if(network.isConnected == true){
            this.setState({ getcontent: true })
            AsyncStorage.getItem('d').then(data => {
                axios.post(konfigurasi.server + 'relay/getall', { token: data, secret: konfigurasi.key }).then(result => {
                    
                }).catch(err => {
                
                })
            })
            this.setState({ getcontent: false })
        }else{
            
        }

        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'settings/users', { token: data }).then(respon => {

                if(respon.status == 200){
                    this.setState({ username: respon.data.user.username })
                }
            })

            axios.post(konfigurasi.server + 'relay/getall', { token: data, secret: konfigurasi.key }).then(result => {
                if(result.status == 200){
                    this.setState({ data: this.state.data.concat(result.data) })
                    if(result.data.length == 0 || result.data.length == null){
                        this.setState({ relayEmpty: true })
                    }else{
                        this.setState({ relayEmpty: false })
                    }
                }else{
                    alert('Server Error !')
                }
            })

            axios.get(konfigurasi.server).then(respon => {
                if(!respon.status == 200){
                    this.setState({ internet: true })
                }
                this.setState({ internet: false })
            })

            axios.post(konfigurasi.server + 'board/weather', { token: data, secret: konfigurasi.key }).then(res => {
                this.setState({ weatherStatus: res.data.condition, weatherTemp: res.data.temp })

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
        })

        let waktu = new Date();
        let jam = waktu.getHours();

        if(jam == 1){
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

    refresh(){
        this.setState({ loading: true, refresh: true, data: [] })
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'settings/users', { token: data }).then(respon => {

                if(respon.status == 200){
                    this.setState({ username: respon.data.user.username })
                }
            })

            axios.post(konfigurasi.server + 'relay/getall', { token: data, secret: konfigurasi.key }).then(result => {
                if(result.status == 200){

                    this.setState({ data: this.state.data.concat(result.data) })
                    if(result.data.length == 0 || result.data.length == null){
                        this.setState({ relayEmpty: true })
                    }else{
                        this.setState({ relayEmpty: false })
                    }
                }else{
                    alert('Server Error !')
                }
            })

            axios.get(konfigurasi.server).then(respon => {
                if(!respon.status == 200){
                    this.setState({ internet: true })
                }
                this.setState({ internet: false })
            })

            axios.post(konfigurasi.server + 'board/weather', { token: data, secret: konfigurasi.key }).then(res => {
                this.setState({ weatherStatus: res.data.condition, weatherTemp: res.data.temp })

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
                }
            })
        })

        let waktu = new Date();
        let jam = waktu.getHours();

        if(jam == 1){
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
        this.setState({ loading: false, refresh: false })
    }

    input_date(){
        this.setState({ date: false })
        this.setState({ date: true })
    }

    switch(nama, status){
        AsyncStorage.getItem('token').then(token_user => {
            axios.post(konfigurasi.server + 'relay/update?type=status', { token: token_user, secret: konfigurasi.key, name: nama, status: !status }).then(result => {
                if(result.status == 200){
                    this.refresh()
                }else{
                    alert('[!] Server Error')
                }
            })
        })
    }

    clicker(nama, status){
        AsyncStorage.getItem('token').then(token_user => {
            axios.post(konfigurasi.server + "relay/update?type=status", { token: token_user, secret: konfigurasi.key, name: nama, status: !status }).then(result => {
                if(result.status == 200){
                    this.refresh()
                }else{
                    alert('[!] Server Error')
                }
            })
        })
    }

    relayData = ({ item, index }) => (
          <View style={{ flexDirection: 'column', padding: 15, backgroundColor: 'black', borderRadius: 15, elevation: 15, marginTop: 15, paddingLeft: 18, paddingRight: 18 }}>
             <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Relay</Text>
          <View style={{ marginTop: 10, padding: 2, backgroundColor: 'orange', borderRadius: 10, alignItems: 'center' }}>
              <Image source={require('../assets/category/lights.png')} style={{ width: 50, height: 50 }} />
          </View>
          <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: 'lime', borderRadius: 10 }}>
             <Text>Turn ON</Text>
          </TouchableOpacity>
       </View>
    )

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928' }} refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={() => this.refresh()}/>}>
                <Loading visible={this.state.loading} textContent={"Tunggu bentar"} textStyle={{ color: 'white' }} />

                <Loading visible={this.state.getcontent} textContent={"Downloading Content..."} textStyle={{ color: "white" }} />

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

                <SwipeUpDown modalVisible={this.state.swipeRelay} ContentModal={
                        <View style={{ flex: 1, marginTop: 70, backgroundColor: '#292928', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928', borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingBottom: 10, elevation: 15 }}>
                                <Icon name='remove-outline' size={40} color="white"/>
                                <Text style={{ fontWeight: 'bold', marginTop: -5, fontSize: 17, color: 'white' }}>List Devices</Text>
                            </View>

                            <View style={{ flexDirection: 'column', marginTop: 0, alignItems: 'center' }}>
                                <ScrollView style={{ flexGrow: 1, flexDirection: 'column'}}>
                                  { this.state.data.map((x, y) => {
                                    return <View style={{ flexDirection: "row", backgroundColor: 'black', justifyContent: 'space-between', padding: 20, width: 280, marginTop: 15, borderRadius: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../assets/category/lights.png')} style={{ width: 50, height: 50, backgroundColor: 'white', padding: 5, borderRadius: 15 }} />
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>{x.name}</Text>
                                        </View>
                                        <View style={{ marginLeft: 50, marginTop: 12 }}>
                                            {x.type_button ? <Switch trackColor={{ false: 'red', true: 'green' }} onValueChange={() => this.switch(x.name, x.status)} value={x.status} /> : <View style={{ marginRight: 5 }}>
                                                {x.status ? <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, padding: 5 }} onPress={() => this.clicker(x.name, x.status)}>
                                                    <Text>Turn OFF</Text>
                                                </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, borderRadius: 10 }} onPress={() => this.clicker(x.name, x.status)}>
                                                    <Text>Turn ON</Text>
                                                </TouchableOpacity>}
                                            </View>}
                                        </View>
                                    </View>
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
                                    <TouchableOpacity onPress={() => this.setState({ schedule: true, menu: false })}>
                                        <Image source={require('../assets/icons/timer.png')} style={{ width: 70, height: 70 }} />
                                        <Text style={{ textAlign: 'center', color: 'blue', fontWeight: 'bold' }}>Schedule</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({ serial_information: true, menu: false })}>
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
                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }} >Serial Information</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: 15, marginRight: -5 }}>
                                    <TouchableOpacity onPress={() => this.setState({ serial_information: false })}>
                                        <Icon name="close-outline" size={30} color='black' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={{ marginTop: 15, alignItems: 'center' }}>
                                <TextInput style={{ marginTop: 10, textAlign: 'center' }} placeholder="Name" />
                                <TextInput style={{ marginTop: 5, textAlign: 'center' }} placeholder="Url Offline"/>
                                <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'black', borderRadius: 10, elevation: 15, padding: 7 }}>
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
                                    {this.state.data.map((x,y) => {
                                        return <Picker.Item label={x.name} value={x.name} />
                                    })}
                                </Picker>
                                <TextInput style={{ marginTop: 8, textAlign: 'center' }} placeholder="Url Offline" />
                                <TouchableOpacity style={{ marginTop: 8, backgroundColor: 'orange', padding: 10, borderRadius: 15, elevation: 15 }} onPress={() => this.input_date()}>
                                    <Text style={{ fontWeight: 'bold' }}>Choose Date</Text>
                                </TouchableOpacity>
                                { this.state.date && (<DateTimePicker value={this.state.input_date} is24Hour={false} display="default" mode={"date"} onChange={(e, x) => {
                                    this.setState({ schedule_date: x, date: false })
                                } } />)}
                                <TouchableOpacity style={{ marginTop: 10, borderRadius: 10, padding: 5, backgroundColor: 'black', elevation: 15 }}>
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
                                    <TextInput placeholder="Url Offline" style={{ marginTop: 5 }} onChangeText={(value) => this.setState({ relay_url: value })} />
                                    <Picker selectedValue={this.state.relay_category} onValueChange={(val) => this.setState({ relay_category: val })} style={{ marginLeft: -8, width: 110, height: 50 }}>
                                        <Picker.Item label="Lights" value="lights.png" />
                                        <Picker.Item label="Lock" value="lock.png" />
                                        <Picker.Item label="Servo" value="servo.png" />
                                    </Picker>
                                </View>

                                <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: -10 }}>
                                    <TextInput placeholder="Timeout" keyboardType='numeric' onChangeText={(value) => this.setState({ relay_time_interval: value })} />
                                    <View style={{ marginTop: 10 }}>
                                        <Text>Type Button</Text>
                                        <Radio radio_props={[{ label: 'Switch', value: true }, { label: "Clicker", value: false }]}  buttonColor="black" formHorizontal={false} animation={true} onPress={(value) => this.setState({ relay_button_type: value }) /*? this.setState({ relay_button_type: true }) : this.setState({ relay_button_type: false }) */ } style={{ marginTop: 10, color: 'black' }} />
                                    </View>
                                </View> 
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 15 }}>
                                <TouchableOpacity style={{ backgroundColor: 'black', elevation: 15, padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 15 }} onPress={() => this.addRelay()}>
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
                        <Text style={{ color: '#ededed' }}>{this.state.waktu} {this.state.username}</Text>

                    </View>

                    <View style={{ marginLeft: 130, backgroundColor: 'black', elevation: 15, padding: 5, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { status: 'online' })}>
                            <Image source={require('../assets/icons/profile.png')} style={{ width: 50, height: 50 }} />
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
                       <TouchableOpacity onPress={() => this.setState({ swipeRelay: true })}>
                           <Image source={require('../assets/icons/box.png')} style={{ width: 60, height: 60 }} />
                       </TouchableOpacity>

                       <TouchableOpacity onPress={() => this.setState({ menu: true })} style={{ marginTop: 5, marginLeft: 35 }} >
                           <Image source={require('../assets/icons/addrelay.png')} style={{ width: 60, height: 60 }} />
                       </TouchableOpacity>
                   </View>
                </View>
            </ScrollView>
        )
    }
}
