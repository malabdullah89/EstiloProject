import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image,  FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import { connect } from 'react-redux' // redux
import { SetLoading } from '../../Actions' //redux

const { width } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },{ id: 5 },{ id: 6 },{ id:7 },{ id: 8 },{ id: 9 },{ id: 10 }]

class TermsOfUse extends Component{
    constructor(props) {
        super(props);
        this.state = {
           toggleLang:this.props.Language,
           toggleNotifi: true,
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
         // onPress={() => this.props.navigation.navigate('ProjectInfo')} 
         key={index.toString()} style={[ { justifyContent: 'center',marginTop:10 }]} >
               <View style={{ width: '100%',}}>
                  <Text style={[this.props.Language==='AR'?styles.right:styles.left,{flex:1,fontSize:24,color:'#393939',fontWeight: 'bold', marginVertical: 20}]}>
                   Fancy Dress for Women</Text>
                   <Text style={[this.props.Language==='AR'?styles.right:styles.left,{flex:1,fontSize:18,color:'#393939',marginTop:5}]}>
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
            {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='TERMS & CONDITIONS' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Terms & Conditions' iconName='briefcase' handlerLogin={this.viewLogin}/> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
                   {width < 1250 ? null : 
                     <View style={{flexDirection: 'row'  ,justifyContent:'center', alignContent: 'center', marginVertical: 20}}>
                     <Image source={require('./../../../image/left.png')} resizeMode='cover' style={{ width: 120}}/>
                     <Text style= { {  color: '#FFCF01', fontSize: 40 , fontWeight: '600' , marginRight: 10} }>
                        TERMS
                     </Text>
                     <Text style= { {  color: '#383B43', fontSize: 40 , fontWeight: '600'}}>
                        & CONDITIONS
                     </Text>
                     <Image source={require('./../../../image/right.png')} style={{ width: 120}}/>
                  </View>
                   }
               <View style={{flex:5,flexDirection: 'row',}}>
                  { width < 1250 ? null : 
                     <View style={{flex:1, marginBottom: 30}}>
                     <View style={{flex:1.5 , backgroundColor: '#FFCF01', paddingVertical: 20 , alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='file-text-o' size={180} color='#020202' />
                     </View>
                     <View style={{flex:4 , backgroundColor: 'gray'}}>
                        
                     </View>
                  </View>
                  }
                  <View style={{flex: 4}}>
                     <View style={{ flex:1, alignItems:'center' , marginRight: 30}}>
                     <FlatList style={{ width: '90%',marginTop:10,marginBottom:5}}
                        data={list}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                     />
                     </View>
                  </View>
               </View>
               {width < 1250 ? <MobileFooter /> : <Footer /> }
        </View>
        )
    }
}
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
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
   image: {
         width: 120,
         height: 70
     },
   titleInfo: {
      fontSize: 30,
      color: '#383B43',
      fontWeight: 'bold'
   }
 });