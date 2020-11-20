/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList,} from 'react-native';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux' // redux
import RelatedItems from './../Section/RelatedItems';

const { width, height } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

class MyFavorites extends Component{
   constructor(props) {
      super(props);
      this.state = {
         isVisible: false,
         flag_list:2,
         items: 6,
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
   
   renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         key={index.toString()} style={[ { justifyContent: 'center',margin:10 }]} >
               <View style={[styles.shadow,this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '100%', height: height*0.25,alignItems:'center', borderRadius:10 ,backgroundColor:'#fff'}]}>
                  <Image source={require('./../../../image/favorite.png')} resizeMode='cover'
                  style={{ width: 120, height: '90%', borderRadius:8,margin:10 }} />
                  <View style={{flex:1,height:'95%',justifyContent:'center'}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:20,color:'#212121',margin:3}]}>
                   Fancy Dress for Women</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:15,color:'#707070',margin:3}]}>
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women Women Fancy Dress for Women</Text>
                   <Text style={this.props.Language=='AR'?styles.right:styles.left,{fontSize:15,color:'#707070',marginTop:10,margin:3}}>
                   Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:20,color:'#212121',margin:30}]}>
                   450 KWD</Text>
                  </View>
                  <View style={{width:50,height:'98%',}}>
                  <Icon name="heart" size={25} color="#FFCF01"
                   onPress={()=>{this.setState({isVisible: true})}}
                  style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{position:'absolute',top:10}]}/>
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
                   {width < 1250 ? <MobileHeader title='FAVORITES' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Favorites' iconName='heart' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
            <View style={{width: '100%', flex:1, alignItems:'center',justifyContent:'center'}}>
               {width < 1250 ? null :
               <View style={{width: '80vw' ,backgroundColor:'rgb(200,201,205)' , borderRadius: 10 ,marginTop: 20 , padding: 30, marginHorizontal: '5vw'}}>
                        <Text style={{fontSize: 20 , fontWeight: 'bold'}}>Your favorite items ({this.state.items})</Text>
                     </View>
               }
               {this.state.flag_list == 1 ?
                <View style={{alignItems:'center',justifyContent:'center' , margin: 50}}>
                   <Image source={require('./../../../image/fav.png')} style={{ width:80,height:80 ,margin:2}} resizeMode='contain' />
                   <Text style={{textAlign:'center',color:'#383B43', fontSize:18,margin:5}}>
                      {this.props.Language == "AR" ? 'لم تقم بالاعجاب' : 'YOU DONNOT LIKE'}
                  </Text>
                   <Text style={{textAlign:'center',color:'#383B43', fontSize:18,margin:5}}>
                      {this.props.Language == "AR" ? 'على أي منتج حاليا' : 'ANYTHING YET!'}
                  </Text>
                </View>
               :
               <FlatList style={{ marginTop:20,marginBottom:5, marginHorizontal: '5vw'}}
               data={list}
               showsVerticalScrollIndicator={false}
               numColumns={width < 1205 ? 1 : 2}
               renderItem={({ item }) => this.renderItem(item)}
               keyExtractor={(item, index) => index.toString()}
             />
               }
            </View>
            {width < 1250 ? null :
            <View style={{width: '80vw'}}>
               <RelatedItems />
            </View>
            }
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
export default connect(mapStateToProps, {})(MyFavorites)

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
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#F0F2F5',
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
      width:'30%',
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
