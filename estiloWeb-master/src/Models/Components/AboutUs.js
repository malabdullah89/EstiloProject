import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Section/Header';
import MobileHeader from './Section/MobileHeader';
import LoginSection from './Section/LoginSection';
import Drawer from './Section/Drawer';
import Footer from './Section/Footer';
import MobileFooter from './Section/MobileFooter';
import { connect } from 'react-redux' // redux
import { SetLoading } from './../Actions' //redux

const { width } = Dimensions.get('window')

class AboutUs extends Component{
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
         <View >
             {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='ABOUT US' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='About Us' iconName='briefcase' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{flexDirection: 'row' , flex: 2 , backgroundColor: 'rgb(241,242,246)' , paddingVertical: 30 , paddingHorizontal: '10vw'}}>
                {width < 1250 ? null :
                    <View style={{flex:1 , backgroundColor:'gray' , borderRadius: 15 , marginHorizontal: 20}}>
                    </View>
                }

                    <View style={{flex:1 , marginHorizontal: 20}}>
                        <Text style={{fontSize: 20 , fontWeight: 'bold' , marginBottom: 10}} >Lorem Ipsum dolor sit ammet</Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat nisl nec laoreet vehicula. 
                            Pellentesque nec elit aliquet, tempus urna id, feugiat diam. Suspendisse ac luctus orci. Phasellus at
                             mauris feugiat, tempor risus iaculis, eleifend dolor. Mauris ante urna, scelerisque in sodales sed, 
                             viverra id leo. Nunc aliquam nec ante sed blandit. Nullam fermentum, massa eget ornare posuere, dui 
                             arcu porta tellus, non fringilla justo tortor ut tortor. Nullam eget lobortis lacus. Proin vulputate 
                             arcu nec diam dictum laoreet. Praesent vulputate pellentesque velit ut ultricies. Class aptent taciti 
                             sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque pretium efficitur dui, 
                             vel imperdiet enim pulvinar id. Curabitur sit amet nisi urna. Sed est libero, dapibus et efficitur ac, 
                             fermentum vel lectus. Aliquam volutpat ullamcorper arcu. Curabitur vel lorem sed velit facilisis varius.
                             arcu nec diam dictum laoreet. Praesent vulputate pellentesque velit ut ultricies. Class aptent taciti 
                                    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque pretium efficitur dui, 
                                     vel imperdiet enim pulvinar id. Curabitur sit amet nisi urna. Sed est libero, dapibus et efficitur ac, 
                                    fermentum vel lectus. Aliquam volutpat ullamcorper arcu. Curabitur vel lorem sed velit facilisis varius.
                        </Text>
                    </View>
                </View>
                <View style={{flex:3 , alignItems: 'center' , paddingHorizontal: '10vw'}}>
                    <Text style={{fontSize: 20 , fontWeight: 'bold' , marginVertical: 20}}> Why Choose Estilo? </Text>
                    <View style={[ width < 1250 ? {width:'100%' ,} : {flexDirection: 'row'  , width:'100%'}]}>
                        <View style={[styles.shadow , width < 1250? {backgroundColor: 'white' , flex:1 , borderRadius: 15, marginVertical: '0.5em'} : {backgroundColor: 'white' , flex:1 , borderRadius: 15, margin: 15}]}>
                        {width < 1250 ? null :
                            <View style={{flexDirection: 'row' , justifyContent: 'center' , flex:1 , paddingVertical: 20 , borderBottomWidth: 4 , borderColor: 'rgb(249,205,22)'}}>
                                <Icon name='tag' color='gray' size={120} />
                            </View>
                        }
                                <Text style={{padding: 20, fontSize: 16, textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat nisl nec laoreet vehicula. 
                                    Pellentesque nec elit aliquet, tempus urna id, feugiat diam. Suspendisse ac luctus orci. Phasellus at
                                    mauris feugiat, tempor risus iaculis, eleifend dolor. Mauris ante urna, scelerisque in sodales sed, 
                                    viverra id leo. Nunc aliquam nec ante sed blandit. Nullam fermentum, massa eget ornare posuere, dui 
                                    arcu porta tellus, non fringilla justo tortor ut tortor. Nullam eget lobortis lacus. Proin vulputate 
                                    arcu nec diam dictum laoreet. Praesent vulputate pellentesque velit ut ultricies. Class aptent taciti 
                                    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque pretium efficitur dui, 
                                     vel imperdiet enim pulvinar id. Curabitur sit amet nisi urna. Sed est libero, dapibus et efficitur ac, 
                                    fermentum vel lectus. Aliquam volutpat ullamcorper arcu. Curabitur vel lorem sed velit facilisis varius.
                                </Text>
                        </View>
                        <View style={[styles.shadow , width < 1250? {backgroundColor: 'white' , flex:1 , borderRadius: 15, marginVertical: '0.5em'} : {backgroundColor: 'white' , flex:1 , borderRadius: 15, margin: 15}]}>
                        {width < 1250 ? null :
                            <View style={{flexDirection: 'row' , justifyContent: 'center' , flex:1 , paddingVertical: 20 , borderBottomWidth: 4 , borderColor: 'rgb(249,205,22)'}}>
                                <Icon name='tag' color='gray' size={120} />
                            </View>
                        }
                                <Text style={{padding: 20, fontSize: 16 , textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat nisl nec laoreet vehicula. 
                                    Pellentesque nec elit aliquet, tempus urna id, feugiat diam. Suspendisse ac luctus orci. Phasellus at
                                    mauris feugiat, tempor risus iaculis, eleifend dolor. Mauris ante urna, scelerisque in sodales sed, 
                                    viverra id leo. Nunc aliquam nec ante sed blandit. Nullam fermentum, massa eget ornare posuere, dui 
                                    arcu porta tellus, non fringilla justo tortor ut tortor. Nullam eget lobortis lacus. Proin vulputate 
                                    arcu nec diam dictum laoreet. Praesent vulputate pellentesque velit ut ultricies. Class aptent taciti 
                                    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque pretium efficitur dui, 
                                     vel imperdiet enim pulvinar id. Curabitur sit amet nisi urna. Sed est libero, dapibus et efficitur ac, 
                                    fermentum vel lectus. Aliquam volutpat ullamcorper arcu. Curabitur vel lorem sed velit facilisis varius.
                                    
                                </Text>
                        </View>
                        <View style={[styles.shadow , width < 1250? {backgroundColor: 'white' , flex:1 , borderRadius: 15, marginVertical: '0.5em'} : {backgroundColor: 'white' , flex:1 , borderRadius: 15, margin: 15}]}>
                        {width < 1250 ? null :
                            <View style={{flexDirection: 'row' , justifyContent: 'center' , flex:1 , paddingVertical: 20 , borderBottomWidth: 4 , borderColor: 'rgb(249,205,22)'}}>
                                <Icon name='tag' color='gray' size={120} />
                            </View>
                        }
                                <Text style={{padding: 20, fontSize: 16, textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat nisl nec laoreet vehicula. 
                                    Pellentesque nec elit aliquet, tempus urna id, feugiat diam. Suspendisse ac luctus orci. Phasellus at
                                    mauris feugiat, tempor risus iaculis, eleifend dolor. Mauris ante urna, scelerisque in sodales sed, 
                                    viverra id leo. Nunc aliquam nec ante sed blandit. Nullam fermentum, massa eget ornare posuere, dui 
                                    arcu porta tellus, non fringilla justo tortor ut tortor. Nullam eget lobortis lacus. Proin vulputate 
                                    arcu nec diam dictum laoreet. Praesent vulputate pellentesque velit ut ultricies. Class aptent taciti 
                                    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque pretium efficitur dui, 
                                     vel imperdiet enim pulvinar id. Curabitur sit amet nisi urna. Sed est libero, dapibus et efficitur ac, 
                                    fermentum vel lectus. Aliquam volutpat ullamcorper arcu. Curabitur vel lorem sed velit facilisis varius.
                                </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {width < 1250 ? <MobileFooter /> : <Footer />}
        </View>
        )
    }
}
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
    }
 }
export default connect(mapStateToProps, { SetLoading})(AboutUs)

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
       flex: 1,
       justifyContent: 'flex-start',
       alignItems: 'center',
       backgroundColor: 'rgb(233,233,233)',
       height: '100%',
       width: '100vw'
    },
    right:{
      textAlign:'right'
   },
   left:{
      textAlign:'left'
   },
 imageH: {
    width: 120,
    height: 70
 },
 });