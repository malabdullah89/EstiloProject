import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,ImageBackground,FlatList, AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';


import { connect } from 'react-redux' // redux
import {SetLoading  } from './../../Actions' //redux


class MyPoints extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing: false,
         userPoint: null
      };
   }


   componentWillMount(){
      this.getUserPoint(this.props.User.token)
    }

    


    getUserPoint = async(Token ) => {
          NetInfo.fetch().then(state =>{
              if (state.isConnected){
          try {
             this.setState({Processing: true})
              axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/user_points', {
               headers: {
                  'Authorization': 'Token '+Token,
                }
              }).then(async(response)=> {
               this.setState({Processing: false})
                  if(response.data){
                     this.setState({userPoint: response.data.user_points})
                      await AsyncStorage.setItem('UserPoint', response.data.user_points.toString())
                  }
                     
              }).catch((error)=> {
               this.setState({Processing: false})
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
            this.setState({Processing: false})
            alert("Something went wrong")
          }
      } else {
         alert("No internet connection")
         }
       });
      
  }

    
  renderHeader() {
    return (
       <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
         <View style={{justifyContent:'center',margin:5,}}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('Cart')}>
         <Icon name="shopping-cart" size={30} color="#FFCF01" style={{}} />
         </TouchableOpacity>
         
         </View>
         <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'نقاطى':'My Points'}</Text>

         <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
            <View style={{width:35,justifyContent:'center'}}>
            <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='stretch' />
            <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='stretch' />
            <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='stretch' />
            </View>
         </TouchableOpacity>
       </View>
    )
}

    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Spinner
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
            {this.renderHeader(this.props.Language)}
            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} > */}
            <Text style={{textAlign:'center',color: '#212121', fontSize: 26,fontFamily:'nexa_bold',marginTop:'25%'}}>{this.props.Language=='AR'?'اهلا!  جون دو':'Hello!  john Doe'}</Text>
            <Text style={{textAlign:'center',color: '#707070', fontSize: 22,fontFamily:'nexa_bold',marginTop:2}}>{this.props.Language=='AR'?'أنت لديك':'You have'}</Text>
            <View style={{width:200,height:100,alignItems:'center',justifyContent:'center',borderRadius:8,backgroundColor:'#383B43',marginTop:'5%'}}>
            <Text style={{textAlign:'center',color: '#FFCF06', fontSize: 40,fontFamily:'nexa_bold'}}>{this.state.userPoint}</Text>
            <Text style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{color: '#fff', fontSize: 20,fontFamily:'nexa_bold',position:'absolute',bottom:5}]}>{this.props.Language=='AR'?'نقطة':'Pionts'}</Text>
            </View>

            <Text style={{textAlign:'center',color: '#707070', fontSize: 22,fontFamily:'nexa_bold',marginTop:'15%'}}>{this.props.Language=='AR'?'Ready for redeem!':'Ready for redeem!'}</Text>

            <Image source={require('./../../../image/bottom_bg.png')} 
            style={{ width: width, height: '20%', position: 'absolute', bottom: 0 }}  resizeMode='stretch' />
            {/* </ScrollView> */}

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
   }
 });
