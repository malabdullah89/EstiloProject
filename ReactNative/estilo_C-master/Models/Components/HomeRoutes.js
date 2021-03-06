import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text, View, Image, StatusBar, TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import NavigationServices from '../NavigationServices';
const { width, height } = Dimensions.get('window')

import AppRoutes from './Home/AppRoutes'
import MyPoints from './Home/MyPoints'
import MyProfile from './Home/MyProfile'
import MyOrders from './Home/MyOrders'
import MyFavorites from './Home/MyFavorites'
import Notifications from './Home/Notifications'
import Settings from './Home/Settings'
import DriverOrders from './Home/DriverOrders'
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import { getUserProfile } from './../Actions' //redux


class HomeRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:'',
            first_name:'',
            last_name:'',
            city:'',

        };
    }

    UNSAFE_componentWillMount(){
        this.getUserProfile(this.props.User.token)
     }

     
    getUserProfile = (Token ) => {
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile/1/', {
             headers: {
                'Authorization': 'Token '+Token,
              }
            }).then((response)=> {
              if(response.data){
                this.setState({image: response.data.photo})
                 this.setState({first_name: response.data.first_name})
                 this.setState({last_name: response.data.last_name})
                 this.setState({city: response.data.city})
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
                       <View style={[styles.shadow,{ width: 150, height: 150,alignItems:'center',justifyContent:'center', borderRadius:150/2 ,backgroundColor:'#383B43',position:'absolute',top:'27%'}]}>
                       <Image source={require('./../../image/logo.png')} resizeMode='contain'
                          style={{ width: 90, height: 40, }} />
                       </View>
                     
                   
                    <Text style={{fontSize:18,color:'#fff',textAlign:'center',fontFamily:'nexa_bold',marginTop:'4%'}}>
                      {this.state.first_name} {this.state.last_name}
                    </Text>
                     <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'100%',height:55,alignItems:'center',justifyContent:'center',backgroundColor:'#FFCF01',marginTop:'10%'}]}>
                     <Text style={{fontSize:18,color:'#111111',textAlign:'center',fontFamily:'nexa_bold',paddingHorizontal:10}}>
                       {this.state.city}
                      </Text>
                     {/* <Image source={require('./../../image/city.png')} resizeMode='contain'
                       style={{ width: 55, height: 40, }} /> */}
                     </View>
                  
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
                   
                   
                    <View style={{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:5}}>
                    <FontAwesome5 name="share-alt"size={25}color={'#fff'} style={{margin:10}}/>
                    <FontAwesome5 name="facebook-f"size={25}color={'#fff'} style={{margin:10}}/>
                    <Image source={require('./../../image/twitter.png')} style={ {width:35 , height:35 ,margin:10  }} resizeMode='contain' />
                    <FontAwesome5 name="instagram"size={25}color={'#fff'} style={{margin:10}}/>
                    <FontAwesome5 name="snapchat-ghost"size={25}color={'#fff'} style={{margin:10}}/>
                    </View>
                </ScrollView>
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
                MyPoints: {
                    screen: MyPoints,
                    drawerPosition: 'right',
                    drawerOpenRoute: 'RightSideMenu',
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'نقاطى' : 'My Points'}</Text>
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
                MyProfile: {
                    screen: MyProfile,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'حسابى' : 'My Profile'}</Text>
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
                MyOrders: {
                    screen: MyOrders,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'طلباتـى' : 'My Orders'}</Text>
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
                MyFavorites: {
                    screen: MyFavorites,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel:()=>(
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'المفضلـة' : ' My Favorites'}</Text>
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
                            <Text style={{color:'#fff',flex:1,paddingHorizontal:20,fontSize:18 , fontFamily:'nexa_bold'}}>{this.props.Language == "AR" ? 'الأشعارات' : 'Notifications'}</Text>
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
        UserData: state.AuthReducer.UserData
    }
}
// redux
export default connect(mapStateToProps, { getUserProfile })(HomeRoutes)

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