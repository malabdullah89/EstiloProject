import React, { Component } from 'react';
import { View, Text , AsyncStorage , Alert} from 'react-native';
import NavigationServices from './../../NavigationServices';

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux

 class LogOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
           Processing:false,
           
        };
     }
  
  UNSAFE_componentWillMount(){
    this.signOut()
  }
   
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
  render() {
    return (
      <View>
        <Text>  </Text>
      </View>
    );
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
 // redux
 export default connect(mapStateToProps, { SetLoading  })(LogOut)
