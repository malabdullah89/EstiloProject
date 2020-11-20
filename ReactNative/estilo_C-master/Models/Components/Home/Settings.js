import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,Alert,AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import FlipToggle from 'react-native-flip-toggle-button'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import NavigationServices from './../../NavigationServices';

import { connect } from 'react-redux' // redux
import { SetLanguage ,SetLoading ,Logout } from '../../Actions' //redux


class Settings extends Component{
   constructor(props) {
      super(props);
      this.state = {
         toggleLang:this.props.Language,
         toggleNotifi: true,
         userType:1
      };
   }
 
    componentWillMount(){
    
    }

   //  UNSAFE_componentWillMount(){
   //    this.props.logOut()
   //    NavigationServices.reset('ChooseLoginType')
   //  }

   signOut =async() =>{
      Alert.alert(
        this.props.Language == "AR"?'أستيلو':'Estilo' ,
        this.props.Language == "AR"?'هل أنت متأكد من تسجيل الخروج':'Are you sure want to logout',
        [
          {text: this.props.Language == "AR"?'ألغاء':'Cancel' ,
          onPress: () => this.dismiss, style: 'cancel'},
          {text:this.props.Language == "AR"?'نـعم':'Yes' ,  onPress: () => {
            try{
               // this.props.Logout(this.props.User)
            AsyncStorage.removeItem('User');
         //    this.props.navigation.dispatch(StackActions.reset({
         //       index: 0,
         //       actions: [
         //           NavigationActions.navigate({ routeName: 'Login' })
         //       ],
         //   }))
            NavigationServices.reset('Login')

            }catch(e){
               alert(e)
            }
           }
         },
        ],
        { cancelable: true }
      )
       return true;
       }

   changeLanguage = async (lang) => {
      this.props.SetLoading(true)
      try {
          await AsyncStorage.setItem('Lang', lang).then((value) => {
              AsyncStorage.getItem('Lang')
                  .then((val) => {
                     this.props.SetLoading(false)
                      this.props.SetLanguage(val)
                     //  this.props.navigation.dispatch(StackActions.reset({
                     //      index: 0,
                     //      actions: [
                     //          NavigationActions.navigate({ routeName: 'Login' })
                     //      ],
                     //  }))
                  })
          })

      } catch (error) {
         this.props.SetLoading(false)
          alert("error")
      }
  };
   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Cart')}>
           <Icon name="shopping-cart" size={30} color="#FFCF01" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'الأعدادات':'Settings'}</Text>
  
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
               visible={this.props.Processing}
               textContent={'Loading...'}
               textStyle={{ color: '#FFF' }}
            />
            {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style={{width:width,alignItems:'center',justifyContent:"center"}}>

               <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'80%',height:50,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'تبديل الإشعارات ':'Notifications toggle'}</Text>
                  <View style={[this.props.Language == "AR"?styles.rowReversed:styles.row,{width:'30%',alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{color: '#111111', textAlign:'center',fontSize: 12,fontFamily:'nexa_light',margin:5}}>
                     {this.props.Language == "AR" ? 'تشغيل' : 'ON'}
                  </Text>
                   <FlipToggle
                   value={this.state.toggleNotifi}
                   buttonWidth={60}
                   buttonHeight={30}
                   buttonRadius={30}
                   sliderWidth={20}
                   sliderHeight={20}
                   sliderRadius={50}
                   buttonOnColor='#F0F2F5'
                   buttonOffColor='#F0F2F5'
                   sliderOnColor='#FFCF01'
                   sliderOffColor='#FFCF01'
                   onToggle={(newState) => {this.setState({toggleNotifi:!this.state.toggleNotifi})}}
                  />
                  <Text style={{color: '#111111', textAlign:'center',fontSize: 12,fontFamily:'nexa_light',margin:5}}>
                     {this.props.Language == "AR" ? 'أيقاف' : 'OFF'}
                  </Text>
                 </View>
                  </View>


                  <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'80%',height:50,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'تبديل اللغـة ':'Languahe switcher'}</Text>
                  <View style={[this.props.Language == "AR"?styles.rowReversed:styles.row,{width:'30%',alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{color: '#111111', textAlign:'center',fontSize: 15,fontFamily:'nexa_light',margin:10}}>
                     E
                  </Text>
                   <FlipToggle
                   value={false}
                   buttonWidth={60}
                   buttonHeight={30}
                   buttonRadius={30}
                   sliderWidth={20}
                   sliderHeight={20}
                   sliderRadius={50}
                   buttonOnColor='#F0F2F5'
                   buttonOffColor='#F0F2F5'
                   sliderOnColor='#383B43'
                   sliderOffColor='#383B43'
                   onToggle={(newState) => {
                      if(this.props.Language=='AR'){
                         this.changeLanguage('EN')
                      }else{
                         this.changeLanguage('AR')
                      }
                     //  this.setState({toggleLang:!this.state.toggleLang})
                     }}
                  />
                  <Text style={{color: '#111111', textAlign:'center',fontSize: 15,fontFamily:'nexa_light',margin:10}}>
                     ع
                  </Text>
                 </View>
                  </View>
                
              {this.state.userType==1?
                <View style={{ width:'80%',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity 
                onPress={()=>{
                  this.props.navigation.navigate('TermsOfUse')
               //     this.props.navigation.dispatch(StackActions.reset({
               //       index: 0,
               //       actions: [
               //           NavigationActions.navigate({ routeName: 'TermsOfUse' })
               //       ],
               //   }))
                  }}
                style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',height:45,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'شروط الأستخدام':'Terms of Use'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('PrivacyPolicy')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',height:45,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'سياسية الخصوصية':'Privacy Policy'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('ReturnPolicy')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',height:45,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'سياسة العائدات':'Return Policy'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>

                  <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 36 }]}>
                            <TouchableOpacity 
                            onPress={this.signOut.bind(this)}
                             style={[styles.Button, styles.shadow, { backgroundColor: '#fff'}]} >
                                <Text style={{ color: '#383B43', fontSize: 18,fontFamily:'nexa_light', }}>
                                    {this.props.Language == "AR" ? ' تسجيل خروج' : 'LogOut'}
                                </Text>
                            </TouchableOpacity>
                        </View>
              </View>
              :
              <View style={{display:'none'}}></View>
              }  
           
            </View>
            </ScrollView>
                <View style={{width:'80%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:15}}>
                  <View style={{width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'row',}}>
                    <Icon name="share-alt"size={25}color={'#383B43'} style={{margin:10}}/>
                    <Icon name="facebook-f"size={25}color={'#383B43'} style={{margin:10}}/>
                    <Image source={require('./../../../image/twitter.png')} style={ {width:35 , height:35 ,margin:10  }} resizeMode='contain' />
                    <Icon name="instagram"size={25}color={'#383B43'} style={{margin:10}}/>
                    <Icon name="snapchat-ghost"size={25}color={'#383B43'} style={{margin:10}}/>
                    </View>
                    <Text style={{ color: '#383B43', textAlign:'center',fontSize: 15,fontFamily:'nexa_light'}}>Powered by Line</Text>
                </View>

         </View>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
       Processing: state.AuthReducer.Processing,
        Message: state.AuthReducer.Message,
        User: state.AuthReducer.User,
    }
 }
export default connect(mapStateToProps, {SetLanguage  , SetLoading , Logout})(Settings)

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
   right:{
      right:20
   },
   left:{
      left:20
   },
   Button: {
      width: '40%',
      borderRadius: 60,
      borderColor:'#707070',
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginHorizontal: 36
  },
 });
