/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,  ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';

import { connect } from 'react-redux' // redux

const { width } = Dimensions.get('window')

class Invoice extends Component{
   constructor(props) {
      super(props);
      this.state = {
        flag_btn: 1,
      };
      this.viewLogin = this.viewLogin.bind(this);
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
    
    render(){
       const size = width < 1250 ? 13 : 18
        return(
            <View  >
               {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='INVOICE' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Invoice' iconName='file-text-o' handlerLogin={this.viewLogin}/> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
            
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
                {width < 1250 ? null : 
               <View style={{flexDirection: 'row'  ,justifyContent:'center', alignContent: 'center', marginVertical: 20}}>
                              <Image source={require('./../../../image/left.png')} resizeMode='cover' style={{ width: 120}}/>
                              <Text style= { {  color: '#383B43', fontSize: 40 , fontWeight: '600'}}>
                                 INVOICE
                              </Text>
                              <Image source={require('./../../../image/right.png')} style={{ width: 120}}/>
                           </View>
                }
               <View style={{flex:5,flexDirection: 'row', marginTop: 5}}>
                  {width < 1250? null : 
                  <View style={{flex:1, marginLeft:50 }}>
                     <View style={{flex:2 , backgroundColor: '#FFCF01' , alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='file-text-o' size={140} color='#020202' />
                     </View>
                     <View style={{flex:4 , backgroundColor: 'gray'}}>
                        
                     </View>
                  </View>
                  }
                  <View style={[styles.shadow , {flex: 4 , backgroundColor: 'white' , marginHorizontal: 20}]}>
                     <View style={{ flex:1, alignItems:'center' , marginRight: 30}}>
                     <View style={{width:'100%', alignItems:'center',}}>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row , {flex:2 ,alignSelf: 'stretch' , marginTop:50}]}>
                    <View style={{width:'92%',marginVertical:20, marginLeft: width < 1250? 20 : 60 , flex: 1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size,}]}>{this.props.Language=='AR'?'الوقت / التاريخ':'Data & Time'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5}]}>6/5/2020 - 3:00 Pm</Text>
                    </View>
                    <View style={{width:'92%',marginVertical:20 , flex: 1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size}]}>{this.props.Language=='AR'?'رقم الفاتورة':'Invoice ID'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5}]}>21548587</Text>
                    </View>
                </View>
                <View style={[styles.row , {flex: 2,alignSelf: 'stretch'}]}>
                    <View style={{width:'92%',marginTop:20 , marginLeft: width < 1250? 20 : 60 , flex: 1}}>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size}]}>{this.props.Language=='AR'?'تفاصيل العميل':'Customer Details'}</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5}]}>Omar AbdAllah Omar</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>01090986367</Text>
                    </View>
                    <View style={{width:'92%',marginTop:20 , flex: 1}}>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size,}]}>{this.props.Language=='AR'?'تفاصيل التسوق':'Shopping Details'}</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5}]}>Address Name</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>Al-Sabbahiya</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>Block: 10, St: 2, Lane: 4</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>House 40</Text>
                    </View>
                </View>
                <View style={{width:'92%',height:1,marginTop:15,backgroundColor:'#707070'}}></View>
             
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',marginTop:20}]}>
                    <View style={{flex:2, marginHorizontal: width < 1250? 0 : 50 }}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-2, marginBottom:10}]}>{this.props.Language=='AR'?'الأسـم':'Name'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>Fancy Dress</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Size : M'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Color : Brown'}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-2, marginBottom:10}]}>{this.props.Language=='AR'?'السعر':'Price (KD)'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>22.000</Text>
                    </View>
                    <View style={{flex:1,}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-2, marginBottom:10}]}>{this.props.Language=='AR'?'الوقت / التاريخ':'Quantity'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>x 3</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-2, marginBottom:10}]}>{this.props.Language=='AR'?'رقم الفاتورة':'Subtotal'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>66.000</Text>
                    </View>
                </View>
                <View style={{width:'92%',height:1,marginTop:15,backgroundColor:'#707070'}}></View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',marginTop:20}]}>
                    <View style={{flex:2,alignItems:'center', marginHorizontal: width < 1250? 0 : 50 }}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>Fancy Dress</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Size : M'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Color : Brown'}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>22.000</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>x 1</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size-2,marginTop:5}]}>22.000</Text>
                    </View>
                </View>
                <View style={{width:'92%',height:1,marginTop:15,backgroundColor:'#707070'}}>
                    
                </View>
                <View style={{width: '100%',alignSelf:'flex-start' , marginHorizontal: width < 1250? 10 : 100 , marginVertical: 30 }}>
                    <View style={[{flex:2 ,alignSelf: 'stretch' , justifyContent: 'center'}]}>
                        <View style={{flex:1 , flexDirection: 'row',marginVertical:10}}>
                            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,}]}>{this.props.Language=='AR'?'الاجمالى':'Total'}</Text>
                            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size,}]}>44.000 KD</Text>
                        </View>
                        <View style={{flex:1 , flexDirection: 'row',marginTop:10 , marginBottom: 20}}>
                            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,}]}>{this.props.Language=='AR'?'الاجمالى':'Total Redeem Points'}</Text>
                            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size,}]}>200 Points</Text>
                        </View>
                        <View style={{flex:1 , flexDirection: 'row',marginVertical:8}}>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size,}]}>{this.props.Language=='AR'?'المجموع الفرعى':'Subtotal'}</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1}]}>420 KD</Text>
                        </View>
                        <View style={{flex:1 , flexDirection: 'row',marginVertical:8}}>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size,}]}>{this.props.Language=='AR'?'رسوم التوصيل':'Delivery Fee'}</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5}]}>2 KD</Text>
                        </View>
                        <View style={{flex:1 , flexDirection: 'row',marginVertical:8}}>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size}]}>{this.props.Language=='AR'?'الأجمالى':'Total'}</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5}]}>422 KD</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'92%',marginTop:25}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:size}]}>{this.props.Language=='AR'?'طريقة الدفع':'Payment Method'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:size-1,marginTop:5 , marginBottom: 30}]}>K-Net</Text>
                </View>
              </View>
                     </View>
                  </View>
               </View>
                  <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 30 }]}>
                 <TouchableOpacity onPress={() => { alert('Done') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                     <Text style={{ color: '#fff', fontSize: size+1, }}>
                         {this.props.Language == "AR" ? 'أستمرار التسوق' : 'Continue Shopping'}
                     </Text>
                 </TouchableOpacity>
               </View>
           </ScrollView>
           {width < 1250 ? <MobileFooter /> : <Footer />}
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
export default connect(mapStateToProps, {})(Invoice)

const styles = StyleSheet.create({
    flex: {
       flex: 1
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
       shadowOpacity: 0.1,
       shadowRadius: 10,
       elevation: 5,
    },
    container: {
       flex: 1,
       backgroundColor: '#F0F2F5',
       marginHorizontal: '10vw',
    },
   right:{
      textAlign:'right'
   },
   left:{
      textAlign:'left'
   },
   Button: {
      width: width < 1250? '50%' : '25%' ,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      marginBottom: 18,
  },
 });
/*

*/