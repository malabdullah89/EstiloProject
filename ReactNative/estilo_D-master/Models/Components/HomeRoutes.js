import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text, View, Image, StatusBar, TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import NavigationServices from '../NavigationServices';
const { width, height } = Dimensions.get('window')

import AppRoutes from './Home/AppRoutes'
import Notifications from './Home/Notifications'
import MyProfile from './Home/MyProfile'
import Settings from './Home/Settings'
import LogOut from './Home/LogOut'
import DriverOrders from './Home/DriverOrders'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import {  } from './../Actions' //redux


class HomeRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            image:'',
            first_name:'',
            last_name:'',
            city:'',

        };
    }

    UNSAFE_componentWillMount(){
        // this.getUserProfile(this.props.User.token)
     }

    getUserProfile = (Token ) => {
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile', {
             headers: {
                'Authorization': 'Token '+Token,
              }
            }).then((response)=> {
              
              if(response.data.profile){
                this.setState({image: response.data.profile.photo})
                 this.setState({first_name: response.data.profile.first_name})
                 this.setState({last_name: response.data.profile.last_name})
                 this.setState({city: response.data.profile.city})
             }
                   
            }).catch((error)=> {
              
               alert(error.message)
                if (error.response.data.detail) {
                   alert(error.response.data.detail)
                } else {
                   alert("Something went wrong")
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
           
          alert("Something went wrong")
        }
     } else {
       alert("No internet connection")
       }
     });
     
     }


    renderHeader() {
            return (
                <View style={{ width:'100%' ,alignItems:'center',}}>
                    <Image source={require('./../../image/drawer_bg.png')} style={{ width: '100%',height:height*0.3}}  resizeMode='cover'/>
                       <View style={[styles.shadow,{ width: 150, height: 150,alignItems:'center',justifyContent:'center', borderRadius:150/2 ,backgroundColor:'#383B43',position:'absolute',bottom:'10%'}]}>
                       <Image source={require('./../../image/logo.png')} resizeMode='contain'
                          style={{ width: 90, height: 40, }} />
                       </View>
                       <Image source={require('./../../image/driver.png')} resizeMode='contain'
                          style={{ width: 70, height: 70,position:'absolute',top:'10%',left:20}} />
                       <TouchableOpacity 
                       onPress={()=> this.props.navigation.navigate('MyProfile')}
                       style={{width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#383B43',position:'absolute',top:'30%',right:'15%'}}>
                       <Image source={require('./../../image/edit2.png')} resizeMode='contain'
                          style={{ width: 20, height: 20,}} />
                       </TouchableOpacity>
                       
                     
                     <Text style={{fontSize:18,color:'#fff',textAlign:'center',fontFamily:'nexa_bold',marginTop:'5%'}}>
                       Driver Name
                     </Text>
                    
                  
                </View>
            )
    }




    render() {
     
        CustomDrawerContentComponent = (props) => (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#383B43',justifyContent:'center',alignItems:'center'}} forceInset={{ top: 'always', horizontal: 'never' }}>
                <StatusBar backgroundColor='#383B43' barStyle="light-content" />
                <ScrollView style={{width:'100%'}}>
               
                    {this.renderHeader()}
                    <DrawerItems {...props} />
                </ScrollView>
                <View style={{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',position:"absolute",bottom:20}}>
                    <FontAwesome5 name="share-alt"size={25}color={'#fff'} style={{margin:10}}/>
                    <FontAwesome5 name="facebook-f"size={25}color={'#fff'} style={{margin:10}}/>
                    <Image source={require('./../../image/twitter.png')} style={ {width:35 , height:35 ,margin:10  }} resizeMode='contain' />
                    <FontAwesome5 name="instagram"size={25}color={'#fff'} style={{margin:10}}/>
                    <FontAwesome5 name="snapchat-ghost"size={25}color={'#fff'} style={{margin:10}}/>
                    </View>
            </SafeAreaView>
        );

        Routes = createDrawerNavigator(
            {
                AppRoutes: {
                    screen: AppRoutes,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'الرئيسية' : 'Home'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            this.props.Language=='AR'?
                            <FontAwesome5
                                name="angle-left"
                                size={24}
                                color={'#FFFFFF'}
                            />
                            :
                            <FontAwesome5
                                name="angle-right"
                                size={24}
                                color={'#FFFFFF'}
                            />
                            
                        ),
                    }),
                },
                DriverOrders: {
                    screen: DriverOrders,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'الطلبات' : 'Orders'}</Text>
                            ),
                        drawerIcon: ({ tintColor }) => (
                            this.props.Language=='AR'?
                            <FontAwesome5
                                name="angle-left"
                                size={24}
                                color={'#FFFFFF'}
                            />
                            :
                            <FontAwesome5
                                name="angle-right"
                                size={24}
                                color={'#FFFFFF'}
                            />
                        ),
                    }),
                },
                Settings: {
                    screen: Settings,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'الأعدادات' : 'Settings'}</Text>
                            ),
                        drawerIcon: ({ tintColor }) => (
                            this.props.Language=='AR'?
                            <FontAwesome5
                                name="angle-left"
                                size={24}
                                color={'#FFFFFF'}
                            />
                            :
                            <FontAwesome5
                                name="angle-right"
                                size={24}
                                color={'#FFFFFF'}
                            />
                        ),
                    }),
                },
                Notifications: {
                    screen: Notifications,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'الأشعار ات' : 'Notifications'}</Text>
                            ),
                        drawerIcon: ({ tintColor }) => (
                            this.props.Language=='AR'?
                            <FontAwesome5
                                name="angle-left"
                                size={24}
                                color={'#FFFFFF'}
                            />
                            :
                            <FontAwesome5
                                name="angle-right"
                                size={24}
                                color={'#FFFFFF'}
                            />
                        ),
                    }),
                },
                LogOut: {
                    screen: LogOut,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#FFCF01',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'تسجيل الخروج' : 'LogOut'}</Text>
                            ),
                    }),
                },
            },
            {
                contentComponent: CustomDrawerContentComponent,
                initialRouteName: "AppRoutes",
                drawerPosition: this.props.Language == "AR" ? 'right' : 'left',
                unmountInactiveRoutes:true, 
                contentOptions: {
                    activeTintColor: '#fff',
                    itemStyle: {width:'100%',flexDirection: this.props.Language == "AR" ? 'row' : 'row-reverse',marginTop:27},
                }
            },
        );


     

        AppContainer = createAppContainer(Routes);
        return (
            <AppContainer />
        );
    }

}

//redux
const mapStateToProps = state => {
    return {
        Language: state.LanguageReducer.Language,
        User: state.AuthReducer.User,
        Processing: state.AuthReducer.Processing,
        Message: state.AuthReducer.Message,
    }
}
// redux
export default connect(mapStateToProps, {  })(HomeRoutes)

// export default HomeRoutes
const styles = StyleSheet.create({
    flex: {
       flex: 0
    },
    row: {
       flexDirection: 'row'
    },
    rowReversed: {
       flexDirection: 'row-reverse'
    },
    column: {
       flexDirection: 'column'
    },
    shadow: {
       shadowColor: '#000',
       shadowOffset: {
          width: 0,
          height: 6,
       },
       shadowOpacity: 0.05,
       shadowRadius: 10,
       elevation: 5,
    },
    container: {
       flex: 1,
       justifyContent: 'flex-start',
       alignItems: 'center',
       backgroundColor: '#FFF',
    },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left'
    }
 });