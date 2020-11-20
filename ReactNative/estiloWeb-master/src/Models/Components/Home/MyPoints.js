/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, } from 'react-native';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux' // redux
import {SetLoading  } from './../../Actions' //redux

const { width } = Dimensions.get('window')

class MyPoints extends Component{
   constructor(props) {
      super(props);
      this.state = {
         userPoint: 200,
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

   componentWillMount(){
      //this.getUserPoint(this.props.User.token)
    }

    getUserPoint = (Token ) => {
          NetInfo.fetch().then(state =>{
              if (state.isConnected){
          try {
              axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/user_points', {
               headers: {
                  'Authorization': 'Token '+Token,
                }
              }).then((response)=> {
                  if(response.data){
                     alert(response.data.user_points)
                     this.setState({userPoint: response.data.user_points})
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


    render(){
        return(
            <View  >
            {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='POINTS' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Points' iconName='map-o' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} > */}
            <Text style={{textAlign:'center',color: '#212121', fontSize: 26,marginTop:50}}>{this.props.Language=='AR'?'اهلا!  جون دو':'Hello!  john Doe'}</Text>
            <Text style={{textAlign:'center',color: '#707070', fontSize: 22,marginTop:2}}>{this.props.Language=='AR'?'أنت لديك':'You have'}</Text>
            <View style={{width:200,height:100,alignSelf:'center',justifyContent:'center',borderRadius:8,backgroundColor:'#383B43',marginVertical:20}}>
            <Text style={{textAlign:'center',color: '#FFCF06', fontSize: 40,}}>{this.state.userPoint}</Text>
            <Text style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{color: '#fff', fontSize: 20,position:'absolute',bottom:5}]}>{this.props.Language=='AR'?'نقطة':'Points'}</Text>
            </View>

            <Text style={{textAlign:'center',marginBottom: 20,color: '#707070', fontSize: 22,}}>{this.props.Language=='AR'?'Ready for redeem!':'Ready for redeem!'}</Text>

            {/* </ScrollView> */}
            <Image source={require('./../../../image/bottom_bg.png')} resizeMode='repeat' style={[ width < 1250 ? {height:100} : {height:200}, { width: '100%', alignSelf:'stretch'}]} />
            {width < 1250 ? <MobileFooter /> : <Footer /> }
         </View>
        )
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
export default connect(mapStateToProps, {SetLoading})(MyPoints)

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
    image: {
       width: 90,
       height: 50
   },
   posLeft:{
      left:5
   },
   posRight:{
      right:5
   },
   quickLinks: {
      fontSize: 20 ,
      color: '#fff',
      fontWeight: 'light',
      textAlign: 'left',
      marginBottom: 10
   },
   footerTitles: {
      fontSize: 30 ,
      color: '#FFCF01',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 20
   },
   titleInfo: {
      fontSize: 30,
      color: '#383B43',
      fontWeight: 'bold'
   }
 });
