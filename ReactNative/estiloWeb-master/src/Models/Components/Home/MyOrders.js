import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, FlatList} from 'react-native';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import { connect } from 'react-redux' // redux

const { width, height } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

class MyOrders extends Component{
   constructor(props){
      super(props)
      this.state = {
         showLogin: false,
         drawer: false,
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


 renderItem(index , font , size) {
      return (
         <TouchableOpacity activeOpacity={1}
         // onPress={() => this.props.navigation.navigate('ProjectInfo')} 
         key={index.toString()} style={[ { justifyContent: 'center',marginHorizontal: '5vw' , marginVertical: 10 }]} >
               <View style={[styles.shadow,this.props.Language==='AR'?styles.rowReversed:styles.row,{ width: '100%', alignItems:'center',justifyContent: 'center', borderRadius:10 ,backgroundColor:'#fff'}]}>
                  <Image source={require('./../../../image/order.png')}
                  style={{ width: height*0.15, height: height*0.15, borderRadius:5,margin:5}} />
                  <View style={{flex:1,height:'99%',justifyContent:'center'}}>
                  <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:font,color:'#212121',margin:3}]}>
                   Fancy Dress for Women</Text>
                   <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:font-2,color:'#707070',margin:3}]}>
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
                   <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:font-2,color:'#212121',margin:3}]}>
                   Order ID: 1236584</Text>
                   <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:font-4,color:'#212121',margin:3}]}>
                   15 May</Text>
                  </View>

                  <View style={{width: size,height:'99%'}}>
                  <Text style={[this.props.Language==='AR'?styles.posRight:styles.posLeft,{fontSize:font,color:'#212121',position:'absolute',top:10}]}>
                   450 KWD</Text>
                   <Text style={[this.props.Language==='AR'?styles.posRight:styles.posLeft,{fontSize:font-2,color:'#FF0146',position:'absolute',bottom:10}]}>
                   Pending Delivery</Text>
                  </View>
                  
               </View>
         </TouchableOpacity>
      )
   }

    render(){
        return(
            <View style={styles.container} >
               {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='MY ORDERS' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='My Orders' iconName='shopping-cart' handlerLogin={this.viewLogin}/> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer  handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <FlatList style={{ width: '100%',marginTop:20,marginBottom:5}}
                data={list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => this.renderItem(item , width < 1250 ? 14 : 18 , width < 1250 ? 80 : 160)}
                keyExtractor={(item, index) => index.toString()}
              />
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
export default connect(mapStateToProps, {})(MyOrders)

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
   },
 });
