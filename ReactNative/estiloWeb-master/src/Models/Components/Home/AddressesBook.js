/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import { connect } from 'react-redux' // redux
import AddNewAddress from './AddNewAddress';
import EditAddress from './EditAddress';

const { width } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }]

class AddressesBook extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         add: false,
         edit: false,
         button_I: 'plus',
         button_F: 'minus',
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
   
   UNSAFE_componentWillMount(){
      
    }
    
   renderItem(index) {
      return (
         
                <View style={[styles.shadow,{ flex:6,flexDirection: 'row', padding: 20,justifyContent:'space-between',alignItems:'center', borderRadius:10 ,backgroundColor:'#fff',margin: 8}]}>
                   <View style={{ marginLeft: 20}}>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:13,color:'#212121',margin:3}]}>
                     Fancy Dress for Women</Text>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:11,color:'#707070',margin:3}]}>
                     Fancy Dress for Women</Text>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:11,color:'#707070',margin:3}]}>
                     Order ID: 1236584</Text>
                   </View>
                  <View style={{flexDirection:'row' , marginRight: 20}}>
                     <TouchableOpacity activeOpacity={1}
                        onPress={() => this.props.navigation.navigate('EditAddress')} 
                        key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
                        <Icon style={{margin:10}} name='trash-o' color={'gray'} size={25} />
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={1}
                        onPress={() => !this.state.add? this.setState({edit: !this.state.edit}) : null} 
                        key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
                        <Icon style={{margin:10}} name='pencil' color={'gray'} size={25} />
                     </TouchableOpacity>
                  </View>
               </View>
      )
   }

    render(){
        return(
            <View  >
            {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='ADDRESS BOOK' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Address Book' iconName='map-o' handlerLogin={this.viewLogin}/> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer  handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
            <View style={{width: width < 1250 ? '100vw' : '80vw' ,flex:1, alignItems:'center' , alignSelf: 'center'}}>
            <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed , {width: width < 1250 ? '80%' : '25%' ,backgroundColor: '#F0F2F5',}]}>
                 <TouchableOpacity
                 style={{flex:1}}
                 onPress={()=> !this.state.edit ? this.setState({add: !this.state.add , button_I: this.state.button_F , button_F : this.state.button_I}):null }>
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:15,padding:10,color:'#383B43',textAlign:'center',margin:3}]}>
                 {this.props.Language=='AR'?'أضافة عنوان جديد':'Add New Address'}</Text>
                 </TouchableOpacity>
                 <Icon style={{marginLeft: 20}} name={this.state.button_I} color='#383B43' size={25} />
               </View>
               <View style={{width: width < 1250 ? '100%' : '80%'}}>
                  {this.state.add ? <AddNewAddress navigation={this.props.navigation} /> : (this.state.edit ? <EditAddress /> : null ) }
               </View>
               <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'85%',marginTop:20,alignItems:'center',justifyContent:'center'}]}>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:18,color:'#383B43',margin:3}]}>
               {this.props.Language=='AR'?'عناوينى':'My Addresses'}</Text>
               <Image source={require('./../../../image/writing.png')} style={{ width:30,height:30,margin:2}} resizeMode='contain' />
               </View>
              <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
                data={list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
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
export default connect(mapStateToProps, {})(AddressesBook)

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
   searchSection: {
    width:'85%',
    borderRadius:60,
    borderColor:'#707070',
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    backgroundColor:'#FFFFFF'
},
input: {
  flex:1,
  paddingHorizontal:12,
  padding:0,
  fontSize:14,
  color: '#383B43',
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
