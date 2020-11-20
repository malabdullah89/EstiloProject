import React, {Component} from 'react';
import {View , Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Link} from '@react-navigation/web';

export default class Drawer extends Component {
    render(){
        return(
            <View style={{width: '80vw',height: '80vh', backgroundColor: 'rgba(56, 59, 67, 0.8)' , position:'absolute' , zIndex: 1 , top: '20vh' , borderBottomEndRadius: 10}}>
                <ScrollView>
                <Text style={{ fontSize: 25 , marginHorizontal: 10 , color:"#FFCF01"}} >
                                Welcome!
                              </Text>
                    <View style={{ marginHorizontal: 25  , paddingVertical: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} >
                            <View style={{ flexDirection: 'row' , alignSelf:'flex-end'}}>
                                <Image source={require('./../../../image/city.png')} style={{width:40 , height: 25 , marginRight: 5}} />
                                <Icon name={'angle-down'} size={25} color={'white'} />
                            </View>
                                <TouchableOpacity style={{ }} onPress={ this.props.handlerLogin } >
                                       
                                          <Text style={{position:'absolute',color: '#FFCF01', fontSize: 15, bottom: 1 }}> LOGIN/SIGNUP </Text>
                                          
                                 </TouchableOpacity>
                        </TouchableOpacity>  
                             </View>
                                 
                                 <Text style={{ fontSize: 25 , marginHorizontal: 10 , color:"#FFCF01"}} >
                                Quick Links
                             </Text>
                             <View style={{ marginHorizontal: 25 , marginBottom: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                <TouchableOpacity >
                                   <Link routeName='index' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> HOME </Text>
                                   </Link>
                                </TouchableOpacity>  
                             </View>
                             <View style={{marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                <TouchableOpacity>
                                   <Link routeName='categories' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> CATEGORIES </Text>
                                   </Link>
                                </TouchableOpacity>  
                             </View>
                             <View style={{marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                <TouchableOpacity>
                                <Link routeName='cart' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> CONTACT US </Text>
                                   </Link>
                                </TouchableOpacity>  
                             </View>
                             <View style={{  marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                <TouchableOpacity>
                                   <Link routeName='about' >
                                      <Text style={{position:'absolute',color: 'white',fontSize: 15}}> ABOUT US </Text>
                                   </Link>
                                </TouchableOpacity>
                             </View>
                             <View style={{ marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                   <Link routeName='orders' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> MY ORDERS </Text>
                                   </Link>  
                             </View>
                             <Text style={{ fontSize: 25 , marginHorizontal: 10 , color:"#FFCF01"}} >
                                Privacy Links
                             </Text>
                             <View style={{ marginHorizontal: 25 , marginBottom: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                   <Link routeName='terms' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> TERMS & CONDITIONS </Text>
                                   </Link>  
                             </View>
                             <View style={{ marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                   <Link routeName='privacy_policy' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> PRIVACY & POLICY </Text>
                                   </Link>  
                             </View>
                             <View style={{ marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                   <Link routeName='return_policy' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> RETURN POLICY </Text>
                                   </Link>  
                             </View>
                             <View style={{ marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                   <Link routeName='return_policy' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> FAQs </Text>
                                   </Link>  
                             </View>
                             <View style={{ marginHorizontal: 25 , marginVertical: 10 , paddingVertical: 20 , borderBottomWidth: 1 , borderColor: "#FFCF01"}}>
                                   <Link routeName='return_policy' >
                                      <Text style={{position:'absolute', color: 'white',fontSize: 15}}> LIVE CHAT </Text>
                                   </Link>  
                             </View>
                             <Text style={{ fontSize: 25 , marginHorizontal: 10 , color:"#FFCF01"}} >
                                Get The App!
                             </Text>
                            <View style={{ justifyContent: 'center',flexDirection:'row',flex: 0.4,paddingHorizontal: 10 , marginHorizontal: 20 , marginTop: 10, marginBottom: 30}}>
                                <TouchableOpacity style={{marginRight: 10}} onPress={() => this.props.navigation.navigate('Cart')} >
                                   <Icon name="apple" size={30} color="white" style={{}} />
                                </TouchableOpacity>  
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} >
                                   <Icon name="android" size={30} color="white" style={{}} />
                                </TouchableOpacity>  
                            </View>
            </ScrollView>
            </View>
        )
    }
}