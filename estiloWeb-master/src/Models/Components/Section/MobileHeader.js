import React, {Component} from 'react';
import {Link} from '@react-navigation/web'
import {View , Text, TouchableOpacity, Image, StyleSheet,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MobileHeader extends Component{
    render(){
        return (
           <View>
              <View>
               <View style={[styles.row, styles.shadow, { width: '100vw', height: '10vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
                        <Image source={require('./../../../image/logo.png')} style={{width:100 , height: 45 , marginVertical: 10  , alignSelf: "center"}} resizeMode='center' />
                     <View style={{ alignSelf:'flex-end', paddingVertical: 10 }}> 
                              </View>
                     </View>
              </View>
            <View style={[this.props.Language==='AR'? styles.row:styles.rowReversed, styles.shadow, { width: '100vw', height: '10vh', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
               <View style={{justifyContent:'center',padding:5,}}>
               <TouchableOpacity >
                        <Link routeName='cart' >
                           <Icon name="shopping-cart" size={30} color="#FFCF01" style={{position: 'absolute' , right: 1 ,top: -15}} />
                        </Link>
                        </TouchableOpacity>  
               </View>
               <Text style={{ flex:1,textAlign:'left',marginLeft:10,color: '#fff', fontSize: 17,}}>{this.props.title}</Text>
      
               <TouchableOpacity onPress={this.props.handlerDrawer}>
                  <View style={{width:40,justifyContent:'center'}}>
                  <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='contain' />
                  <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='contain' />
                  <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='contain' />
                  </View>
               </TouchableOpacity>
            </View>
           </View>
        )
      }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
     },
     rowReversed: {
        flexDirection: 'row-reverse'
     },
     shadow: {
        shadowColor: '#000',
        shadowOffset: {
           width: 0,
           height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
     },
})