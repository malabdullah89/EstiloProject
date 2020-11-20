import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,AsyncStorage,TextInput } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Input, Item } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

import { connect } from 'react-redux' // redux
import { SetLoading , getUserProfile , UpdateUser ,ChangePwd} from './../../Actions' //redux


class MyProfile extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         isVisible: false,
         flag_name:1,
         flag_mail:1,
         flag_phone:1,
         userData:{},
         userName:'',
         image: '',
         first_name: '',
         last_name: '',
         phone: '',
         email: '',
      };
   }
   
   UNSAFE_componentWillMount(){
       this.getUserProfile(this.props.User.token)
      //  this.props.getUserProfile(this.props.User.token)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.Message != null) {
      if (nextProps.Message =='Update User Done') {
         alert('Data Updated Successfully')
      }else{
          alert(nextProps.Message)
      }
    }
  }
    

   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.goBack()}>
           <Icon name="shopping-cart" size={30} color="#FFCF01" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'حسـابى':'My Profile'}</Text>
  
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
    
  getUserProfile = (Token ) => {
   NetInfo.fetch().then(state =>{
       if (state.isConnected){
   try {
      this.setState({Processing:true})
       axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile', {
        headers: {
           'Authorization': 'Token '+Token,
         }
       }).then((response)=> {
         this.setState({Processing:false})
         if(response.data){
            const userData = {
                id: response.data.id ,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                photo: response.data.photo,
                phone: response.data.phone,
                points: response.data.points,
                city: response.data.city,
                lon: response.data.lon,
                lat: response.data.lat,
                user_type: response.data.user_type,
            }
            this.setState({image: response.data.photo})
            this.setState({first_name: response.data.first_name})
            this.setState({last_name: response.data.last_name})
            this.setState({email: response.data.email})
            this.setState({phone: response.data.phone})
            this.setState({userData})
            AsyncStorage.setItem('UserPoint', response.data.points.toString())
            
        }
              
       }).catch((error)=> {
         this.setState({Processing:false})
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
      this.setState({Processing:false})
     alert("Something went wrong")
   }
} else {
  alert("No internet connection")
  }
});

}

 ChangePwd=(Token , password , new_password )=>{
       NetInfo.fetch().then(state =>{
           if (state.isConnected){
       try {
         this.setState({Processing:true})
           axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/change_password/',{
             password , new_password
           }, 
           {
               headers: {
                   'Authorization': 'Token '+Token,
                 }
           }).then((response)=> {
            this.setState({Processing:false})
               if(response.data.detail){
                   alert(response.data.detail)
                   this.setState({isVisible: false})
               }
           }).catch((error)=> {
            this.setState({Processing:false})
               if(error.response.data.password){
                   alert(error.response.data.password)
               }else{
                   alert(error.message)
               }
               
           }).finally(function () {
               // always executed
           });
       } catch (error) {
         this.setState({Processing:false})
           alert("Something went wrong" )
       }
   } else {
      if(this.props.Language=='AR'){
         alert("لا يوجد أتصال بالأنترنت" )
      }else{
         alert("No internet connection" )
      }
      }
    });
}

pickImageFromPhone() {
   const options = {
      title: 'Select Avatar',
      storageOptions: {
         skipBackup: true,
         path: 'images',
      },
   };
   ImagePicker.showImagePicker(options, async(response) => {
      this.setState({Processing:true})
      console.log('Response = ', response);
      if (response.didCancel) {
         this.setState({Processing:false})
         console.log('User cancelled image picker');
      } else if (response.error) {
         this.setState({Processing:false})
         console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
         this.setState({Processing:false})
         console.log('User tapped custom button: ', response.customButton);
      } else {
         this.setState({Processing:false})
         const source = { uri: response.uri, fileName: response.fileName }
         this.setState({image:source.uri })
      }
   });
}

 updateUser =(Token)=>{
     const {first_name , last_name , phone , email , image} = this.state
     const user ={
      first_name: first_name,
      last_name: last_name,
      phone: phone, 
      email: email, 
      photo: 'data:image/png;base64,'+image,
   }
   
    if(first_name){
       if(last_name){
          if(email){
             if(phone){
               // if(phone.startsWith('965')){
               NetInfo.fetch().then(state =>{
                  if (state.isConnected){
                     try {
                        axios.put('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile/',
                        {
                           // photo: user.photo,
                           first_name: user.first_name,
                           last_name: user.last_name,
                           phone: user.phone, 
                           email: user.email, 
                        }, { headers: { 
                           'Content-Type': 'application/json',
                           'Authorization': 'Token '+Token
                         }}).then(function (response) {
                               if(response.data){
                                  alert('Data Update Successfully')
                               }
                        }).catch(function (error) {
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
         //   }else{
         //    if(this.props.Language=='AR'){
         //        alert('رقم الهاتف يجب أن يبدأ 00965')
         //       }else{
         //        alert('Phone must begin with 00965')
         //       }
         //    }
             }else{
                alert('Enter Your Phone')
             }
          }else{
             alert('Enter Your Email')
          }
       }else{
          alert('Enter Last Name')
       }
    }else{
       alert('Enter First Name')
    }
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
            {this.renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
             <View style={{width:width,alignItems:'center',justifyContent:"center"}}>
               <View style={{width:width, alignItems:'center',justifyContent:'center',backgroundColor:'#FFCF01',paddingHorizontal:'20%'}}>
                  <TouchableOpacity 
                   onPress={()=> this.setState({isVisible: true})}
                   style={{width:40,height:40,marginTop:10,alignItems:'center',alignSelf:'flex-end',justifyContent:'center',borderRadius:40/2,backgroundColor:'#383B43'}}>
                    <Image source={require('./../../../image/edit2.png')} style={{ width:20,height:20}} resizeMode='contain' />
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={()=>this.pickImageFromPhone()} 
                  style={[styles.shadow,{width:120,height:120,borderRadius:120/2,alignItems:'center',justifyContent:'center',backgroundColor:'#9B9191'}]}>
                  <Image
                   source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+this.state.image}}
                   style={{width:120,height:120,borderRadius:120/2}}>
                  </Image>
                  <Image source={require('./../../../image/plus.png')} style={{ width:70,height:70,position:'absolute'}} resizeMode='contain' />
                  </TouchableOpacity>
                  <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',height:40,alignItems:'center',justifyContent:'center',marginTop:10}]}>
                     {this.state.flag_name==1?
                     <Text style={{flex:1,textAlign:'center',color: '#383B43', fontSize: 22,fontFamily:'nexa_bold'}}>
                     {this.state.userData.first_name} {this.state.userData.last_name}</Text>
                     :
                     <TextInput
                     style={{flex:1 , height:'100%', color:'#383B43',fontSize:15,fontFamily:'nexa_bold'}}
                     placeholder="User Nickname"
                     onChangeText={(userName) => {
                        var first_name = userName.split(' ')[0]
                        var last_name = userName.split(' ')[1]
                        this.setState({first_name})
                        this.setState({last_name})
                     }}
                     underlineColorAndroid="transparent"
                 />
                     }
                   <TouchableOpacity
                    onPress={()=>this.setState({flag_name:2})}>
                   <Image source={require('./../../../image/edit.png')} style={{ width:20,height:20}} resizeMode='contain' />
                   </TouchableOpacity>
                  </View>
               </View>
                  <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'100%',height:55,alignItems:'center',justifyContent:'center',marginTop:10}]}>
                    <Text style={{fontSize:17,color:'#111111',textAlign:'center',fontFamily:'nexa_bold',paddingHorizontal:10}}>
                    {this.state.userData.city}</Text>
                    {/* <Image source={require('./../../../image/city.png')} resizeMode='contain'
                      style={{ width: 45, height: 40, }} /> */}
                    </View>
                 
                    <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'60%',height:40,alignItems:'center',justifyContent:'center',marginTop:10}]}>
                    <TouchableOpacity
                  //   onPress={()=>this.setState({flag_name:2})}
                    >
                   <Image source={require('./../../../image/call.png')} style={{ width:20,height:20}} resizeMode='contain' />
                   </TouchableOpacity>
                     {this.state.flag_phone==1?
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#383B43', fontSize: 15,fontFamily:'nexa_light',paddingHorizontal:10}]}>{this.state.userData.phone}</Text>
                     :
                     <TextInput
                     style={{flex:1 , height:'100%', color:'#383B43',fontSize:15,fontFamily:'nexa_light',paddingHorizontal:10}}
                     placeholder="User Phone"
                     onChangeText={(phone) => {this.setState({phone})}}
                     underlineColorAndroid="transparent"
                 />
                     }
                   <TouchableOpacity
                    onPress={()=>this.setState({flag_phone:2})}>
                   <Image source={require('./../../../image/edit.png')} style={{ width:20,height:20}} resizeMode='contain' />
                   </TouchableOpacity>
                  </View>

                  <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'60%',height:40,alignItems:'center',justifyContent:'center',marginTop:5}]}>
                  <TouchableOpacity
                  //   onPress={()=>this.setState({flag_name:2})}
                    >
                   <Image source={require('./../../../image/mail.png')} style={{ width:20,height:20}} resizeMode='contain' />
                   </TouchableOpacity>
                     {this.state.flag_mail==1?
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#383B43', fontSize: 15,fontFamily:'nexa_light',paddingHorizontal:10}]}>{this.state.userData.email}</Text>
                     :
                     <TextInput
                     style={{flex:1 , height:'100%', color:'#383B43',fontSize:15,fontFamily:'nexa_light',paddingHorizontal:10}}
                     placeholder="User Email"
                     onChangeText={(email) => {this.setState({email})}}
                     underlineColorAndroid="transparent"
                 />
                     }
                   <TouchableOpacity
                    onPress={()=>this.setState({flag_mail:2})}>
                   <Image source={require('./../../../image/edit.png')} style={{ width:20,height:20}} resizeMode='contain' />
                   </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('MyOrders')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'85%',height:40,alignItems:'center',justifyContent:'center',marginTop:25}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'طلبات':'Orders'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                   onPress={()=>this.props.navigation.navigate('MyFavorites')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'85%',height:40,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'المفضلات':'Favorites'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('AddressesBook')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'85%',height:40,alignItems:'center',justifyContent:'center',marginTop:15}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,fontFamily:'nexa_light'}]}>{this.props.Language=='AR'?'العناوين':'Addresses'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>

                  <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 36 }]}>
                            <TouchableOpacity 
                            onPress={() => { this.updateUser(this.props.User.token)}}
                             style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18,fontFamily:'nexa_bold', }}>
                                    {this.props.Language == "AR" ? ' تحديث' : 'Update'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        
            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={styles.modal}>
             <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={25} color="#000" style={{margin:10}} />
               </TouchableOpacity>
            </View>
            <Text style={{ width: '100%',textAlign:'center',alignItems:'center',color:'#000', fontSize:16,fontFamily:'nexa_bold',}}>
            {this.props.Language == "AR" ? 'تغير الرقم السرى' : 'Change Password'}
            </Text>
           
            <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                 <Item style={[styles.inputFields,{ marginTop: 12 }]}>
                    <Input
                    placeholderTextColor='#919191'
                    secureTextEntry
                    placeholder={this.props.Language == "AR" ? ' أدخل الرقم السرى الحالى' : 'Enter current password'}
                    style={{ color: '#000',fontFamily:'nexa_bold',fontSize:14,borderColor:'#E4E4E4',borderRadius:60,borderWidth:1 }} textAlign={'center'}
                    onChangeText={(text) => this.setState({ currentPwd: text })} />
                 </Item>
            </View>

            <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                 <Item style={[styles.inputFields,{ marginTop: 12 }]}>
                    <Input
                    placeholderTextColor='#919191'
                    secureTextEntry
                    placeholder={this.props.Language == "AR" ? ' الرقم السرى الجديد' : 'New password'}
                    style={{ color: '#000',fontFamily:'nexa_bold',fontSize:14,borderColor:'#E4E4E4',borderRadius:60,borderWidth:1 }} textAlign={'center'}
                    onChangeText={(text) => this.setState({ newPwd: text })} />
                 </Item>
            </View>

            <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                 <Item style={[styles.inputFields,{ marginTop: 12 }]}>
                    <Input
                    placeholderTextColor='#919191'
                    secureTextEntry
                    placeholder={this.props.Language == "AR" ? 'تأكيد الرقم السرى' : 'Confirm password'}
                    style={{ color: '#000',fontFamily:'nexa_bold',fontSize:14,borderColor:'#E4E4E4',borderRadius:60,borderWidth:1 }} textAlign={'center'}
                    onChangeText={(text) => this.setState({ conf_Pwd: text })} />
                 </Item>
            </View>
                <TouchableOpacity 
                onPress={() => { 
                   const { currentPwd , newPwd , conf_Pwd }= this.state
                   if(currentPwd){
                      if(newPwd){
                         if(newPwd == conf_Pwd){
                           this.ChangePwd(this.props.User.token , currentPwd , newPwd)
                         }else{
                            alert('Password not matches')
                         }

                      }else{
                         alert('Enter New Password')
                      }

                   }else{
                      alert('Enter Current Password')
                   }
                 }} 
                style={[styles.shadow,styles.Button,{width:width*0.6,alignItems:'center',justifyContent:'center',marginTop:20}]} >
                <Text style={{ color: '#FFCF06', fontSize: 14,fontFamily:'nexa_bold',fontWeight:'bold' }}>
                {this.props.Language == "AR" ? 'أنشاء كلمة مرور جديدة' : 'Create New Password'}
                </Text>
                </TouchableOpacity>
           
         </View>
         
          </Modal>
             </View>
            </ScrollView>

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
       UserData: state.AuthReducer.UserData
    }
 }
export default connect(mapStateToProps, { SetLoading , getUserProfile , })(MyProfile)

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
       elevation: 10,
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
      textAlign:'right'
   },
   left:{
      textAlign:'left'
   },
   Button: {
      width: '35%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginBottom: 18,
      marginHorizontal: 36,
      backgroundColor: '#383B43'
  },
  modal:{
   width:'100%',
   alignItems:'center',
   backgroundColor:'#fff',
   borderRadius:5,
 },
 inputFields: {
   width:'85%',
   height:50,
   borderBottomColor: '#fff',
},
 });
