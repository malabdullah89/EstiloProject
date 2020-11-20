/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux' // redux
import { SetLoading , getUserProfile , UpdateUser} from './../../Actions' //redux

const { width } = Dimensions.get('window')

class MyProfile extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         flag_name:1,
         flag_mail:1,
         flag_phone:1,
         userData:{
            first_name: 'joseph',
            last_name: 'konophka',
            phone: '+50 7889966554',
            email: 'joseph@gmail.com'
         },
         userName:'',
         image: '',
         first_name: '',
         last_name: '',
         phone: '',
         email: '',
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
   
   UNSAFE_componentWillMount(){
       //this.getUserProfile(this.props.User.token)
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
         if(response.data.profile){
            const userData = {
                id: response.data.profile.id ,
                first_name: response.data.profile.first_name,
                last_name: response.data.profile.last_name,
                email: response.data.profile.email,
                photo: response.data.profile.photo,
                phone: response.data.profile.phone,
                points: response.data.profile.points,
                city: response.data.profile.city,
                lon: response.data.profile.lon,
                lat: response.data.profile.lat,
                user_type: response.data.profile.user_type,
            }
            this.setState({image: response.data.profile.photo})
            this.setState({first_name: response.data.profile.first_name})
            this.setState({last_name: response.data.profile.last_name})
            this.setState({email: response.data.profile.email})
            this.setState({phone: response.data.profile.phone})
            this.setState({userData})
            
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
       const fieldSize = width < 1250 ? '83%' : '33%'; 
        return(
            <View  >
            {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='PROFILE' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Profile' iconName='shopping-cart' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
             <View style={{width:width,alignItems:'center',justifyContent:"center"}}>
                  <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'100%',height:55,alignItems:'center',justifyContent:'center',marginTop:10}]}>
                    <Text style={{fontSize:17,color:'#111111',textAlign:'center',paddingHorizontal:10}}>
                    {this.state.userData.city}</Text>
                    </View>
                 
                    <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',padding: 10,marginTop:10 , backgroundColor:'#383B43' , borderTopEndRadius: 10 , borderTopStartRadius: 10}]}>
                    <TouchableOpacity
                  //   onPress={()=>this.setState({flag_name:2})}
                    >
                   <Icon name='phone' size={20} color='#fff' style={{marginHorizontal: 5}} />
                   </TouchableOpacity>
                     {this.state.flag_phone==1?
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex: 1,color: '#fff', fontSize: 15,paddingHorizontal:10}]}>{this.state.userData.phone}</Text>
                     :
                     <TextInput
                     style={{flex:1 , height:'100%', color:'#fff',fontSize:15,paddingHorizontal:10 , outline: 'none'}}
                     placeholder="User Phone"
                     onChangeText={(phone) => {this.setState({phone})}}
                     underlineColorAndroid="transparent"
                 />
                     }
                   <TouchableOpacity
                    onPress={()=>this.setState({flag_phone:2})}>
                   <Icon name='pencil' size={20} color='#fff' style={{marginHorizontal: 5}} />
                   </TouchableOpacity>
                  </View>

                  <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',marginBottom: 5,padding: 10, backgroundColor:'#383B43' , borderBottomEndRadius: 10 , borderBottomStartRadius: 10}]}>
                  <TouchableOpacity
                  //   onPress={()=>this.setState({flag_name:2})}
                    >
                   <Icon name='envelope-o' size={20} color='#fff' style={{marginHorizontal: 5}} />
                   </TouchableOpacity>
                     {this.state.flag_mail==1?
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex: 1, color: '#fff', fontSize: 15,paddingHorizontal:10}]}>{this.state.userData.email}</Text>
                     :
                     <TextInput
                     style={{flex:1 , height:'100%', color:'#fff',fontSize:15,paddingHorizontal:10 , outline: 'none'}}
                     placeholder="User Email"
                     onChangeText={(email) => {this.setState({email})}}
                     underlineColorAndroid="transparent"
                 />
                     }
                   <TouchableOpacity
                    onPress={()=>this.setState({flag_mail:2})}>
                   <Icon name='pencil' size={20} color='#fff' style={{marginHorizontal: 5}} />
                   </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('orders')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',marginTop:25 , borderWidth: 1 , borderColor: 'gray' , borderRadius: 20 , padding: 20}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,}]}>{this.props.Language=='AR'?'طلبات':'Orders'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                   onPress={()=>this.props.navigation.navigate('favorites')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',marginTop:15 , borderWidth: 1 , borderColor: 'gray' , borderRadius: 20 , padding: 20}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,}]}>{this.props.Language=='AR'?'المفضلات':'Favorites'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('addresses_book')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',marginTop:15 , borderWidth: 1 , borderColor: 'gray' , borderRadius: 20 , padding: 20}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,}]}>{this.props.Language=='AR'?'العناوين':'Addresses'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('change_password')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',marginTop:15 , borderWidth: 1 , borderColor: 'gray' , borderRadius: 20 , padding: 20}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,}]}>{this.props.Language=='AR'?'العناوين':'Change Password'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.navigate('points')}
                  style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:fieldSize,height:40,alignItems:'center',justifyContent:'center',marginTop:15 , borderWidth: 1 , borderColor: 'gray' , borderRadius: 20 , padding: 20}]}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color: '#000000', fontSize: 18,}]}>{this.props.Language=='AR'?'العناوين':'Points'}</Text>
                     {this.props.Language=='AR'?
                     <Icon name="angle-left" size={25} color="#000000" style={{}} />
                     :
                     <Icon name="angle-right" size={25} color="#000000" style={{}} />
                     }
                  </TouchableOpacity>

                  <View style={[styles.row, { width: fieldSize,justifyContent: 'center', alignItems: 'center', marginTop: 36 }]}>
                            <TouchableOpacity 
                            onPress={() => { this.updateUser(this.props.User.token)}}
                             style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18, }}>
                                    {this.props.Language == "AR" ? ' تحديث' : 'Update'}
                                </Text>
                            </TouchableOpacity>
                        </View>
             </View>
            </ScrollView>
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
       UserData: state.AuthReducer.UserData
    }
 }
export default connect(mapStateToProps, { SetLoading , getUserProfile , UpdateUser})(MyProfile)

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
      marginHorizontal: 36
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
