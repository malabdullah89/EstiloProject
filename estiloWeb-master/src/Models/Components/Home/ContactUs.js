/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux' // redux
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const { width } = Dimensions.get('window')

class ProductDetail extends Component{
   constructor(props) {
      super(props);
      this.state = {
         img1: require('./../../../image/favorite.png'),
         img2: require('./../../../image/img1.png'),
         img3: require('./../../../image/intro.png'),
         flag_fav:2,
         Bg:'#F0F2F5',
         Txt:'#707070',
         clickedBg:'#383B43',
         clickedTxt:'#FFCF06',
         sizeId:null,
         colorId:null,
         isVisible: false,
         showLogin: false,
         drawer: false,

      };this.viewLogin = this.viewLogin.bind(this);
      this.viewDrawer = this.viewDrawer.bind(this);
   }
   viewLogin(){
      this.setState({
         showLogin : !this.state.showLogin,
         drawer: false
      })
   }

   viewDrawer(){
      this.setState({
         drawer : !this.state.drawer,
      })
   }
    

    render(){
        return(
            <View style={ width < 1250 ? {} : styles.container } >
               {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='CONTACT US' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Contact Us' iconName='phone' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer  handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
               
                <View style={[ styles.shadow , width < 1250? {flex:1 , flexDirection:'column'}: {flex:1 , flexDirection: 'row' , margin: 30 , borderRadius: 40  ,alignContent:'center', width:'80%'}]}>
                   <View style={[width <1250? {}: {borderBottomStartRadius: 40 , borderTopStartRadius: 40 ,},{backgroundColor: 'white'  , flex: 1 , alignItems: 'center' , padding: 20}]}>
                   <View >
                                <TextInput
                                    style={ {outline: 'none' ,paddingLeft:10, justifyContent: 'center', alignItems: 'center' , borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: '3%', width: width <1250? '80vw': '35vw' , height: width <1250? '8vh': '5vh'}}
                                    placeholder='Name'
                                />
                        </View>
                        <View >
                                <TextInput
                                    style={ {outline: 'none' ,paddingLeft:10, justifyContent: 'center', alignItems: 'center', borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: '3%', width: width <1250? '80vw': '35vw' , height: width <1250? '8vh': '5vh'}}
                                    placeholder='Email'
                                />
                        </View>
                        <View >
                                <TextInput
                                    style={ {outline: 'none' ,paddingLeft:10, justifyContent: 'center', alignItems: 'center', borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: '3%', width: width <1250? '80vw': '35vw' , height: width <1250? '8vh': '5vh'}}
                                    placeholder='Mobile Number'
                                />
                        </View>
                        <View >
                                <TextInput
                                    style={ {outline: 'none' ,paddingLeft:30, justifyContent: 'center', alignItems: 'center', borderRadius:10,borderColor:'#707070',borderWidth:2,marginTop: '3%', width: width <1250? '80vw': '35vw', height: width <1250? '14vh': '15vh'}}
                                    placeholder='Message'
                                    multiline={true}
                                />
                        </View>
                        <TouchableOpacity  style={[styles.Button, styles.shadow, { backgroundColor: '#FFCF06' , margin: 30}]} >
                                <Text style={{ color: '#383B43', fontSize: 18, fontWeight: 'bold'}}>
                                    {this.props.Language == "AR" ? 'تسجيل الدخول' : 'SEND'}
                                </Text>
                            </TouchableOpacity>
                   </View>
                   <View style={ [width <1250? {}: {borderBottomEndRadius: 40 , borderTopEndRadius: 40 ,},{backgroundColor: "#383B43"  , flex:1 , alignItems: 'center' , padding: 20}]}>
                        <Text style={{ color: '#FFCF06', fontSize: 18 }}>
                           CONTACT INFORMATION
                        </Text>
                        <View style={{flexDirection: 'row' , margin:20 , alignSelf: 'flex-start'}}>
                           <Icon name='map-marker' size={40} color='#FFCF06' style={width < 1250?{marginHorizontal: 10} : {marginHorizontal: 40}} />
                           <Text style={{color: 'white' ,fontSize: 20}}>Al-Sabbahiya, Block: 10, St: 2, Lane: 4, House 40  </Text>
                        </View>
                        <View style={{flexDirection: 'row' , margin:20 , alignSelf: 'flex-start'}}>
                           <Icon name='envelope-o' size={40} color='#FFCF06' style={width < 1250?{marginHorizontal: 10} : {marginHorizontal: 40}} />
                           <Text style={{color: 'white' ,fontSize: 20}}>xyz@gmail.com  </Text>
                        </View>
                        <View style={{flexDirection: 'row' , margin:20 , alignSelf: 'flex-start'}}>
                           <Icon name='phone' size={40} color='#FFCF06' style={width < 1250?{marginHorizontal: 10} : {marginHorizontal: 40}} />
                           <Text style={{color: 'white' ,fontSize: 20}}>+1234 567890  </Text>
                        </View>
                        {width < 1250 ? null :
                        <MapView  
            provider = {PROVIDER_GOOGLE}
            style={{flex:1,width:'100%',height:'100%' }} 
            region={{ latitude: 42.882004,
                longitude: 74.582748,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421}}
                showsUserLocation={true}/>
                        }
                   </View>
                </View>
              
           {width < 1250 ? <MobileFooter /> : <Footer />}
         </View>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
    }
 }
export default connect(mapStateToProps, {})(ProductDetail)

const styles = StyleSheet.create({
    flex: {
       flex: 1
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
       backgroundColor: '#F0F2F5',
    },
    image: {
       width: 90,
       height: 50
   },
   right:{
      textAlign:'right'
   },
   left:{
      textAlign:'left'
   },
   posRight:{
      right:15
   },
   posLeft:{
      left:15
   },
   Button: {
      width: '45%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      marginBottom: 18,
  },
  customImage:{
      width:'100%',
      height:'100%',
      borderBottomRightRadius:50,
      borderBottomLeftRadius:50
  },
  
 });
 //AIzaSyCcxpzOZVD-eo6ZHKhHUxoL3Yb0jxch8Do