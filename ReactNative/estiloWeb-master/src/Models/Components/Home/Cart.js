/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';

import { connect } from 'react-redux'; // redux
import RelatedItems from './../Section/RelatedItems';

const { width, height } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }]

class Cart extends Component{
   constructor(props) {
      super(props);
      this.state = {
         flag_list:2,
         number:1,
         items: 3,
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

   renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
               <View style={[styles.shadow,this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '100%', height: height*0.23,alignItems:'center', borderRadius:10 ,backgroundColor:'#fff'}]}>
                  <Image source={require('./../../../image/favorite.png')} resizeMode='cover'
                  style={[ width < 1250 ? {width: width*0.25 , height: width*0.25} : {width: 200 ,  height: 210} , { borderRadius:8,margin:5 }]} />
                  <View style={{flex:1,height:'95%',paddingTop:7}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:14,color:'#212121',margin:3}]}>
                   Fancy Dress for Women</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:10,color:'#707070',margin:3}]}>
                   Size: M</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:10,color:'#707070',margin:3}]}>
                   Color: Red</Text>
                  </View>
                  <View style={{height:'95%',margin:10,alignItems:'center'}}>
                  <Text style={{fontSize:13,color:'#212121',margin:3}}>
                   200 KWD</Text>
                   <Text style={{textAlign:'center',fontSize:10,color:'#707070',marginTop:5}}>
                   Quantity</Text>
                   <View style={{width:100,height:30,alignItems:'center',flexDirection:'row',justifyContent:"center",marginTop:5,borderRadius:60,borderColor:'#707070',borderWidth:1}}>
                   <Icon name="minus" size={12} color="#707070"
                   style={{position:'absolute',left:10}}
                   onPress={()=>{this.setState({number: this.state.number-1})}}/>
                   <View style={{width:27,height:27,borderRadius:27/2,alignItems:'center',justifyContent:'center',backgroundColor:'#FFCF01'}}>
                   <Text style={{textAlign:'center',fontSize:12,color:'#707070',}}>{this.state.number}</Text>
                   </View>
                   <Icon name="plus" size={12} color="#707070"
                   style={{position:'absolute',right:10}}
                   onPress={()=>{this.setState({number: this.state.number+1})}}/>
                   </View>
                  <Icon name="times-circle-o" size={25} color="#707070"
                //    onPress={()=>{this.setState({isVisible: true})}}
                   style={{marginTop:10}}/>
                </View>
               </View>
         </TouchableOpacity>
      )
   }
    render(){
        return(
           <View >

           <View>
           {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='CART' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Cart' iconName='shopping-cart' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer  handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
           </View>
           <View style={styles.container} >
               {this.state.flag_list == 1 ?
                <View style={{width:'80%',alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('./../../../image/cart.png')} style={{ width:80,height:80 ,margin:2}} resizeMode='contain' />
                   <Text style={{textAlign:'center',color:'#383B43', fontSize:20,margin:5}}>
                      {this.props.Language == "AR" ? 'المحـفظة فارغـة' : 'Cart is Empty'}
                  </Text>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20, }}>
                      {this.props.Language == "AR" ? 'أذهب للرئيسية' : 'Go Home'}
                     </Text>
                  </TouchableOpacity>
                </View>
               :
               <View style={[  width < 1250 ? {flexDirection: 'column'} : { flexDirection: 'row' } , { flex:3 ,alignItems:'center' }]}>
                  <View style={{flex:2}}>
                     {width < 1250 ? null : 
                     <View style={{backgroundColor:'rgb(200,201,205)' , borderRadius: 10 , marginRight: 25,marginTop: 20 , padding: 30}}>
                        <Text style={{fontSize: 20 , fontWeight: 'bold'}}>Your Cart ({this.state.items})</Text>
                     </View>
                     }
                     <FlatList style={{width: '98%',height:height*0.5,marginTop:10,marginBottom:10}}
                     data={list}
                     showsVerticalScrollIndicator={false}
                     renderItem={({ item }) => this.renderItem(item)}
                     keyExtractor={(item, index) => index.toString()}
                  />
                  </View>
              <View style={[styles.shadow,width < 1250 ? {alignSelf: 'center'} :{flex:1 , alignSelf: 'flex-start'} ,{marginVertical: 20,alignItems:'center', backgroundColor: 'white' , borderRadius: 10 , paddingVertical: 20}]}>
              <Icon name='shopping-cart' size={100} color="#FFCF01" />
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',alignItems:'center', borderTopWidth: 3 ,marginTop: 10 , borderTopColor: 'rgba(0,0,0,0.2)', paddingVertical: 15, paddingHorizontal: 10}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:18,margin:5}}>
                      {this.props.Language == "AR" ? 'الأجمالى الخزئـى :' : 'Sub-Total:'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:18,margin:5}]}>
                     400 KWD</Text>
                </View>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',alignItems:'center', paddingVertical: 15, paddingHorizontal: 10}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:18,margin:5}}>
                      {this.props.Language == "AR" ? ' رسوم التوصـبل :' : 'Delivery Fees:'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:18,margin:5}]}>
                     20 KWD</Text>
                </View>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',alignItems:'center', paddingVertical: 15 , paddingHorizontal: 10}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:18,margin:5}}>
                      {this.props.Language == "AR" ? ' خصم التوصيل :' : 'Delivery Discount:'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:18,margin:5}]}>
                     20 KWD</Text>
                </View>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',alignSelf:'stretch', alignItems:'center',marginTop:10 , paddingVertical: 15, backgroundColor:'#383B43', paddingHorizontal: 10 }]}>
                  <Text style={{flex:1,color:'white', fontSize:18,margin:5}}>
                      {this.props.Language == "AR" ? ' المبلغ الإجمالي :' : 'Total amount:'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'white', fontSize:18,margin:5}]}>
                     420 KWD</Text>
                </View>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('Checkout') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43',marginBottom:10, paddingVertical: 10 }]} >
                        <Text style={{ color: '#FFCF06', fontSize: 20,}}>
                        {this.props.Language == "AR" ? 'الدفع' : 'Checkout'}
                        </Text>
                     </TouchableOpacity>
              </View>
             </View>
               }
               {width < 1250 ? null :
                  <RelatedItems navigation={this.props.navigation} Language={this.props.Language}></RelatedItems>
               }
            </View>
               {width < 1250 ? <MobileFooter /> : <Footer /> }
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
export default connect(mapStateToProps, {})(Cart)

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
       shadowOpacity: 0.05,
       shadowRadius: 10,
       elevation: 5,
    },
    container: {
       backgroundColor: '#F0F2F5',
       justifyContent: 'center',
       paddingHorizontal: width < 1250? 10 : '15vw',
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
   posRight:{
      right:15
   },
   posLeft:{
      left:15
   },
   Button: {
      width: '37%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 7,
      marginTop: 15,
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
imageH: {
   width: 120,
   height: 70
},
 });
