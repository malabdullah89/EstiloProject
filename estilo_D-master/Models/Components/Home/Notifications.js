import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,ImageBackground,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'
import { connect } from 'react-redux' // redux

class Notifications extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing: false,
         notifications:[]
      };
  }

    UNSAFE_componentWillMount= async()=>{
     this.getNotifications(this.props.User.token)
    }

    getNotifications = (Token) => {
      NetInfo.fetch().then(state =>{
         if (state.isConnected){
       try {
           this.setState({Processing: true})
           axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/notification/user_notifications/',{
            headers: {
               'Authorization': 'Token '+Token,
             }
           })
           .then((response)=> {
               this.setState({Processing: false})
               const Data = response.data.list;
                const stores = []
               // for (let index = 0; index < Data.length; index++) {
               // var obj = {
               //     id: Data[index].id,
               //     store: Data[index].store,
               //     email: Data[index].email,
               //     phone: Data[index].phone,
               //     deivery_method: Data[index].deivery_method,
               //     credit_card: Data[index].credit_card,
               //     cash: Data[index].cash,
               //     k_net: Data[index].k_net,
               // }
               // stores.push(obj)
          // }
           this.setState({notifications: Data})
           if(Data.length==0){
            alert('No Notifications Now')
         }
           }).catch((error) =>{
            this.setState({Processing: false})
               alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
         this.setState({Processing: false})
           alert("Something went wrong")
       }
      } else {
         if(this.props.Language=='AR'){
            alert('لا يوجد أتصال بالأنترنت')
         }else{
            alert("No internet connection" )
         }
        }
      });
      
}

   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity>
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'الأشعارات':'Notifications'}</Text>
  
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
            <View style={{width:width ,flex:1, alignItems:'center'}}>
            <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
                data={this.state.notifications}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
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
export default connect(mapStateToProps, {})(Notifications)

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
   }
 });
