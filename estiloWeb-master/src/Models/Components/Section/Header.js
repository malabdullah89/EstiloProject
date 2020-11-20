import React, {Component} from 'react';
import {View , Text, ImageBackground, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Link} from '@react-navigation/web';

export default class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
           logged: false,
        };
     }
   
   renderSearch(){
      return(
         <View style={{alignSelf:'center', marginTop: '25vh' , marginBottom: '10vh'}}>
            <Text style={{fontSize: 44 , color: '#505050' , fontWeight: 'bold'}}>
                    Find the best product ...
            </Text>
            <View style={[styles.searchSection,this.props.Language==='AR'?styles.row:styles.rowReversed , { borderColor:'rgba(0,0,0,0.2)'}]}>
               <TouchableOpacity>
                  <View style={{width:40 , height:40 , borderRadius:40/2,backgroundColor:'#383B43',alignItems:'center' ,justifyContent:'center',margin:5}}>
                     <Icon style={{}} name="search" size={20} color="#FFCF01"/>
                  </View> 
               </TouchableOpacity>
               <TextInput
                  style={[styles.input,{outline: 'none'}]}
                  placeholder="User Nickname"
                  onChangeText={(searchString) => {this.setState({searchString})}}
                  underlineColorAndroid="transparent"
               />
            </View>
         </View>
      )
   }

   renderIcon(Title , iconName){
      return(
         <View style={{alignSelf:'center', marginVertical: '1vh' }}>
            <Text style={{fontSize: 44 , color: '#505050' , fontWeight: 'bold' , textAlign: 'center'}}>
               {Title}
            </Text>
            <View style={[styles.row, { borderColor:'rgba(0,0,0,0.2)' , justifyContent: 'center'}]}>
               <View style={{width:'10vw' , height:'10vw' , borderRadius:'5vw',backgroundColor:'#383B43',alignItems:'center' ,justifyContent:'center',margin:5}}>
                  <Icon style={{}} name={iconName} size={50} color="#FFCF01"/>
               </View> 
            </View>
         </View>
      )
   }
  
   render() {
        return (
           <ImageBackground style={{width: '100vw' , }} source={require('./../../../image/backgroundHome.jpg')}>
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(56, 59, 67,0.7)' ,  marginVertical: 20 ,marginHorizontal: '10vw', borderRadius: 10}} >
                 <View style={{paddingVertical: 20 , flexDirection: 'row' , width: '100%' , alignItems:'stretch' }}>
                    <View style={{flex: 0.5,paddingLeft: 30 ,paddingRight: 30}}>
                       <Image source={require('./../../../image/logo.png')} style={[styles.image]} resizeMode='contain' />
                    </View>
                    <View style={{flex: 10,flexDirection:'row' , justifyContent:'center' ,paddingVertical: 20}}>
                       <View style={{ flex: 1,paddingHorizontal: 5}}>
                          <TouchableOpacity >
                             <Link routeName='index' >
                                <Text style={{position:'absolute',right:10, color: 'white',fontSize: 15}}> HOME </Text>
                             </Link>
                          </TouchableOpacity>  
                       </View>
                       <View style={{flex: 1,paddingHorizontal: 5 }}>
                          <TouchableOpacity>
                             <Link routeName='categories' >
                                <Text style={{position:'absolute',right:10, color: 'white',fontSize: 15}}> CATEGORIES </Text>
                             </Link>
                          </TouchableOpacity>  
                       </View>
                       <View style={{flex: 1,paddingHorizontal: 5 }}>
                          <TouchableOpacity>
                          <Link routeName='contact_us' >
                                <Text style={{position:'absolute',right:10, color: 'white',fontSize: 15}}> CONTACT US </Text>
                             </Link>
                          </TouchableOpacity>  
                       </View>
                       <View style={{  flex: 1,paddingHorizontal: 5}}>
                          <TouchableOpacity>
                             <Link routeName='about' >
                                <Text style={{position:'absolute',right:10, color: 'white',fontSize: 15}}> ABOUT US </Text>
                             </Link>
                          </TouchableOpacity>
                       </View>
                       <View style={{ flex: 1,paddingHorizontal: 5}}>
                             <Link routeName='orders' >
                                <Text style={{position:'absolute',right:10, color: 'white',fontSize: 15}}> MY ORDERS </Text>
                             </Link>  
                       </View>
                       <View style={{  flex: 0.4,paddingHorizontal: 5}}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} >
                             <View style={{ flexDirection: 'row'}}>
                                <Image source={require('./../../../image/city.png')} style={{width:40 , height: 25 , marginRight: 5}} />
                                <Icon name={'angle-down'} size={25} color={'white'} />
                             </View>
                          </TouchableOpacity>  
                       </View>
                       <View style={{ flexDirection:'row',flex: 0.4,paddingHorizontal: 10}}>
                          <TouchableOpacity style={{marginRight: 10}} onPress={() => this.props.navigation.navigate('Cart')} >
                             <Icon name="apple" size={25} color="white" style={{}} />
                          </TouchableOpacity>  
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} >
                             <Icon name="android" size={25} color="white" style={{}} />
                          </TouchableOpacity>  
                       </View>
                       <View style={{ flex: 1,paddingHorizontal: 5 }}>
                          {!this.state.logged ? 
                          <TouchableOpacity onPress={ this.props.handlerLogin } >
                             <Text style={{color: '#FFCF01', fontSize: 15}}> LOGIN/SIGNUP </Text>
                          </TouchableOpacity>
                          :
                          <Link routeName='profile' >
                                <Text style={{position:'absolute', left: 20, color: '#FFCF01',fontSize: 15}}> PROFILE </Text>
                          </Link>
                          }
                       </View>
                       <View style={{ flex: 0.2,paddingHorizontal: 10}}>
                       <TouchableOpacity >
                       <Link routeName='cart' >
                          <Icon name="shopping-cart" size={25} color="#FFCF01" style={{position: 'absolute'}} />
                       </Link>
                       </TouchableOpacity>  
                    </View>
                    </View>
                 </View>
              </View>
                 {this.props.flagSearch ?
                  this.renderSearch() : null
                 }
                 {this.props.flagIcon ?
                  this.renderIcon( this.props.title , this.props.iconName ) : null
                 }
           </ImageBackground>  
        )
  }
}

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
    image: {
       width: 126,
       height: 70
   },
   searchSection: {
      width:'100%',
      borderRadius:60,
      borderColor:'#707070',
      borderWidth:1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10,
      backgroundColor:'#FFFFFF'
 },
 input: {
    flex:1,
    paddingHorizontal:12,
    padding:0,
    color: '#424242',
 },
 });