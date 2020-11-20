import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,FlatList,AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import FlipToggle from 'react-native-flip-toggle-button'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';


import { connect } from 'react-redux' // redux
import { SetLoading } from '../../Actions' //redux
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },{ id: 5 }]

class TermsOfUse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
     }

     componentWillMount(){
      this.getUserTerms()
    }

     getUserTerms = ( ) => {
      NetInfo.fetch().then(state =>{
          if (state.isConnected){
      try {
          axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/configuration/get_terms')
          .then((response)=> {
              if(response.data.terms== null){
                 alert('No Terms Of Use')
              }else{
                this.setState({data:list})
              }
                 
          }).catch((error)=> {
             alert(error.message)
            //   if (error.response.data.detail) {
            //      alert(error.response.data.detail)
            //   } else {
            //      alert("Something went wrong")
            //   }
          }).finally(function () {
              // always executed
          });
      } catch (error) {
        alert("Something went wrong")
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


     renderHeader() {
        return (
           <View style={[this.props.Language=='AR'? styles.rowReversed:styles.row, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
             <View style={{justifyContent:'center',margin:5,}}>
             {this.props.Language=='AR'?
                 <TouchableOpacity
                 onPress={()=>this.props.navigation.goBack()}>
                <Icon name="angle-right" size={30} color="#fff" style={{margin:5}} />
                </TouchableOpacity>
                 :
                 <TouchableOpacity
                 onPress={()=>this.props.navigation.goBack()}>
                <Icon name="angle-left" size={30} color="#fff" style={{margin:5}} />
                </TouchableOpacity>
                 }
             
             </View>
             <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'شروط الأستخدام':'Terms of Use'}</Text>
             <TouchableOpacity style={{width:25}}></TouchableOpacity>
           </View>
        )
    }

     
    renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         // onPress={() => this.props.navigation.navigate('ProjectInfo')} 
         key={index.toString()} style={[ { justifyContent: 'center',marginTop:10 }]} >
               <View style={{ width: '100%',}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:15,color:'#393939',fontFamily:'nexa_bold'}]}>
                   Fancy Dress for Women</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:13,color:'#393939',fontFamily:'nexa_light',marginTop:5}]}>
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
               </View>
         </TouchableOpacity>
      )
   }
    render(){
        return(
         <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
           
            {this.renderHeader(this.props.Language)}
            <View style={{width:width ,flex:1, alignItems:'center'}}>
            <FlatList style={{ width: '90%',marginTop:20,marginBottom:5}}
                data={this.state.data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
        </View>
        )
    }
}
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
       User: state.AuthReducer.User,
       Processing: state.AuthReducer.Processing,
       Message: state.AuthReducer.Message,
    }
 }
export default connect(mapStateToProps, { SetLoading})(TermsOfUse)

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