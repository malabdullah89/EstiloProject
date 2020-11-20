import React, {Component} from 'react';
import {View , Text, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Link} from '@react-navigation/web';

const { width } = Dimensions.get('window')

export default class Footer extends Component {
    render(){
        return(
           <View>
              <View style={
                 {
                    backgroundColor: "#FFCF01",
                    width: '100vw',
                    paddingVertical: 15
                 }
              }>
                 <Text style={
                    {
                       fontSize: 44 ,
                       color: '#383B43',
                       fontWeight: 'bold',
                       textAlign: 'center'
                       }
                    }>
                    Delivered faster to your door!
                 </Text>
              </View>
              <View style={
                 {
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: "#383B43",
                    height: 300,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    justifyContent: 'center'
                 }
              }>
                 <View style={
                    {
                       flex: 1,
                       flexDirection: 'column',
                       justifyContent: 'flex-start',
                       marginLeft: '8vw',
                    }
                 }>
                    <Image source={require('./../../../image/logo.png')} 
                       style={
                          {
                             width: 190,
                             height: 80
                          }
                       }
                    />
                 </View>
                 <View style={
                    {
                       flex: 0.5,
                       flexDirection: 'column',
                       justifyContent: 'flex-start',
                       marginTop: 15,
                    }
                 }>
                    <Text style={ styles.footerTitles}>
                       Quick Links
                    </Text>
                    <TouchableOpacity>
                        <Link routeName='index' >
                                 <Text style={[styles.quickLinks , {position:'absolute' }]}> Home </Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='categories' >
                                 <Text style={[styles.quickLinks , {position:'absolute' , top: 40}]}> Categories </Text>
                              </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='cart' >
                                 <Text style={[styles.quickLinks , {position:'absolute' , top: 80}]}> Contact Us </Text>
                              </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='about' >
                                 <Text style={[styles.quickLinks , {position:'absolute' , top: 120}]}> About Us </Text>
                              </Link>
                    </TouchableOpacity>
                 </View>
                 <View style={
                    {
                       flex: 0.5,
                       flexDirection: 'column',
       
                       marginTop: 15,
                       marginHorizontal: 10
                    }
                 }>
                    <Text style={ styles.footerTitles}>
                       Privacy Links
                    </Text>
                    <TouchableOpacity>
                        <Link routeName='terms' >
                                 <Text style={[styles.quickLinks , {position:'absolute' }]}> Terms and Conditions </Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='privacy_policy' >
                                 <Text style={[styles.quickLinks , {position:'absolute' , top: 40 }]}> Privacy and Policy </Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='return_policy' >
                                 <Text style={[styles.quickLinks , {position:'absolute' , top: 80 }]}> Return Policy </Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='index' >
                                 <Text style={[styles.quickLinks , {position:'absolute', top: 120 }]}> FAQs </Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Link routeName='index' >
                                 <Text style={[styles.quickLinks , {position:'absolute', top: 160 }]}> Live Chat </Text>
                        </Link>
                    </TouchableOpacity>
                 </View>
                 <View style={
                    {
                       flex: 1,
                       flexDirection: 'column',
                       justifyContent: 'center',
                    }
                 }>
                    <Text style={ styles.footerTitles}>
                       Follow Us
                    </Text>
                    <View style={{flexDirection: 'row' ,}}>
                       <TouchableOpacity>
                          <Icon style={{marginHorizontal: 8}} name='facebook-official' color={'#fff'} size={40} />
                       </TouchableOpacity>
                       <TouchableOpacity>
                          <Icon style={{marginHorizontal: 8}} name='instagram' color={'#fff'} size={40} />
                       </TouchableOpacity>
                       <TouchableOpacity>
                          <Icon style={{marginHorizontal: 8}} name='twitter-square' color={'#fff'} size={40} />
                       </TouchableOpacity>
                       <TouchableOpacity>
                          <Icon style={{marginHorizontal: 8}} name='snapchat-square' color={'#fff'} size={40} />
                       </TouchableOpacity>
                    </View>
                 </View>
              </View>
           </View>
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
    column: {
       flexDirection: 'column'
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
    modalContent: {
       backgroundColor: "white",
       padding: 22,
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 4,
       borderColor: "rgba(0, 0, 0, 0.1)"
     },
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#F0F2F5',
    },
    image: {
       width: 126,
       height: 70
   },
   right:{
      right:20
   },
   left:{
      left:20
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
 filterSection:{
    width:width,
    backgroundColor:'#383B43',
    alignItems:'center',
    position:'absolute',top:0
 },
 viewFilter:{
    width:'80%',height:50,
    alignItems:'center',justifyContent:'center'
 },
 quickLinks: {
    fontSize: 20 ,
    color: '#fff',
    fontWeight: 'light',
    textAlign: 'left',
    marginBottom: 10
 },
 footerTitles: {
    fontSize: 20 ,
    color: '#FFCF01',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10
 },
 titleInfo: {
    fontSize: 30,
    color: '#383B43',
    fontWeight: 'bold'
 }
 });