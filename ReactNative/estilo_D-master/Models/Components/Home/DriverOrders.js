import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,FlatList,AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import FlipToggle from 'react-native-flip-toggle-button'
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux' // redux
import { SetLoading } from '../../Actions' //redux

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },{ id: 5 }]

class DriverOrders extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
        };
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
             <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'تفاصيل الطلب':'Order Details'}</Text>
             <TouchableOpacity style={{width:25}}></TouchableOpacity>
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
            <View style={{width:width ,flex:1, alignItems:'center'}}>

            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('DriverOrderDetail')} 
            style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'80%',height:130,alignItems:'center',
            justifyContent:'center',marginTop:'15%',backgroundColor:'#FFCF01',borderRadius:5}]}>
                <Image source={require('./../../../image/pending.png')} resizeMode='contain'
                style={{ width: 40, height: 40,margin:30, }} />
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',color:'#383B43',fontSize:15,fontFamily:'nexa_light'}]}> {this.props.Language=='AR'?'الطلبات المعلقة':'Pending Orders'}</Text>
                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',color:'#383B43',fontSize:25,fontFamily:'nexa_bold',marginTop:3}]}> 07</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=>this.props.navigation.navigate('DriverOrderDetail')} 
            style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'80%',height:130,alignItems:'center',
            justifyContent:'center',marginTop:27,backgroundColor:'#383B43',borderRadius:5}]}>
                <Image source={require('./../../../image/trolley.png')} resizeMode='contain'
                style={{ width: 40, height: 40,margin:30 }} />
                 <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',color:'#fff',fontSize:15,fontFamily:'nexa_light'}]}> {this.props.Language=='AR'?'الطلبات المنتهية':'Delivered Orders'}</Text>
                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',color:'#fff',fontSize:25,fontFamily:'nexa_bold',marginTop:3}]}> 05</Text>
                </View>
            </TouchableOpacity>

            </View>
        </View>
        )
    }
}
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
    }
 }
export default connect(mapStateToProps, { SetLoading})(DriverOrders)

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