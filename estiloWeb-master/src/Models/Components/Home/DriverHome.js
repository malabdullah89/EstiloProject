import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import { connect } from 'react-redux' // redux

const { width, height } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

class DriverHome extends Component{



   renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         onPress={() => this.props.navigation.navigate('DriverOrderDetail')} 
         key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
               <View style={[styles.shadow,{ width: '100%', height: height/7,alignItems:'center', borderRadius:10 ,backgroundColor:'#fff',padding:7}]}>
                  <View style={{width:'95%',justifyContent:'center',marginTop:10}}>
                  <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:13,color:'#212121',fontFamily:'nexa_bold'}]}>
                   Customer Name</Text>
                   <View style={[this.props.Language==='AR'?styles.rowReversed:styles.row,{alignItems:'center',marginTop:3}]}>
                   <Icon name="phone" size={20} color="#FFCF01" style={{}} />
                   <Text style={{fontSize:10,textAlign:'center',color:'#707070',fontFamily:'nexa_light',paddingHorizontal:5}}>
                    01090986367</Text>
                   </View>
                   
                  </View>

                  <View style={[this.props.Language==='AR'?styles.rowReversed:styles.row,{width:'95%',position:'absolute',bottom:15}]}>
                  <Text style={[this.props.Language==='AR'?styles.right:styles.left,{flex:1,fontSize:12,color:'#212121',fontFamily:'nexa_bold'}]}>
                   Order ID</Text>
                   <View style={[this.props.Language==='AR'?styles.rowReversed:styles.row,{alignItems:'center',justifyContent:'center'}]}>
                   <Text style={{fontSize:13,textAlign:'center',color:'#212121',fontFamily:'nexa_bold',paddingHorizontal:5}}>
                    {this.props.Language==='AR'?'أبدأ الطلب':'Start Order'}</Text>
                    {this.props.Language==='AR'?
                      <Icon name="angle-double-left" size={20} color="#70707070" style={{}}/>
                    :
                     <Icon name="angle-double-right" size={20} color="#70707070" style={{}}/>
                    }
                   </View>
                  </View>
                  
               </View>
         </TouchableOpacity>
      )
   }

   renderHeader() {
      return (
         <View style={[this.props.Language==='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>alert('Search')}>
           <Icon name="search" size={25} color="#fff" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language==='AR'?'الرئيسيـة':'Home'}</Text>
  
           <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
              <View style={{width:40,justifyContent:'center'}}>
              <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='contain' />
              <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='contain' />
              <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='contain' />
              </View>
           </TouchableOpacity>

         </View>
      )
  }

    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            {this.renderHeader(this.props.Language)}
            <View style={{width:width ,flex:1, alignItems:'center'}}>
              <View style={[this.props.Language==='AR'?styles.rowReversed:styles.row,{width:'97%',alignItems:'center',justifyContent:'center',height:80,backgroundColor:'#FFCF01',borderRadius:8,marginTop:10}]}>
              <Image source={require('./../../../image/driver.png')} style={{ width:70,height:70 ,position:'absolute',top:40,left:20}} resizeMode='contain' />
              <View style={{width:'12%'}}></View>
              <Text style={{ flex:1,textAlign:'center',color: '#212121', fontSize: 21,fontFamily:'nexa_light'}}>{this.props.Language==='AR'?'الطلبات المعلقة':'Pending Orders'}</Text>
              <Text style={{textAlign:'center',color: '#212121', fontSize: 27,fontFamily:'nexa_bold',paddingHorizontal:20}}>07</Text>
              </View>  
            <FlatList style={{ width: '90%',marginTop:30,marginBottom:5}}
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
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
    }
 }
export default connect(mapStateToProps, {})(DriverHome)

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
       backgroundColor: '#F0F2F5',
    },
   right:{
      textAlign:'right'
   },
   left:{
      textAlign:'left'
   },
   posRight:{
      right:10
   },
   posLeft:{
      left:10
   }
 });
