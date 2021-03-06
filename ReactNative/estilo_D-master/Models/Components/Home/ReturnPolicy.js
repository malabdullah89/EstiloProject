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

class ReturnPolicy extends Component{
    constructor(props) {
        super(props);
        this.state = {
           toggleLang:this.props.Language,
           toggleNotifi: true
        };
     }
   
     renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         // onPress={() => this.props.navigation.navigate('ProjectInfo')} 
         key={index.toString()} style={[ { justifyContent: 'center',marginTop:10 }]} >
               <View style={{ width: '100%',}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:15,color:'#393939',fontFamily:'nexa_bold',}]}>
                   Fancy Dress for Women</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:13,color:'#393939',fontFamily:'nexa_light',marginTop:5}]}>
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
               </View>
         </TouchableOpacity>
      )
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
             <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'سياسية العائدات':'Return Policy'}</Text>
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
             <View style={[{width:'90%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:15}]}>
             <Image source={require('./../../../image/return1.png')} style={{ width:50,height:50 ,margin:2}} resizeMode='contain' />
             <Image source={require('./../../../image/arrow.png')} style={{ width:50,height:20 ,margin:2}} resizeMode='contain' />
             <Image source={require('./../../../image/return2.png')} style={{ width:50,height:50 ,margin:2}} resizeMode='contain' />
             <Image source={require('./../../../image/arrow.png')} style={{ width:50,height:20 ,margin:2}} resizeMode='contain' />
             <Image source={require('./../../../image/return3.png')} style={{ width:50,height:50 ,margin:2}} resizeMode='contain' />
            </View>  
            <FlatList style={{ width: '90%',marginTop:10,marginBottom:5}}
                data={list}
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
    }
 }
export default connect(mapStateToProps, { SetLoading})(ReturnPolicy)

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