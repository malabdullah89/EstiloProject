import React, {Component} from 'react';
import {View , Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MobileFooter extends Component{
    render(){
        return(
           <View>
              <View style={
                 {
                    backgroundColor: "#FFCF01",
                    width: '100vw',
                    paddingVertical: 10
                 }
              }>
                 <Text style={
                    {
                       fontSize: 24 ,
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
                    flex: 1,
                    backgroundColor: "#383B43",
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                 }
              }>
                 <View style={
                    {
                       flex: 0.1,
                       flexDirection: 'column',
                       justifyContent: 'center',
  
                    }
                 }>
                    <Image source={require('./../../../image/logo.png')} 
                         style={
                            {
                               width: 190,
                               height: 80,
                               marginBottom: 20,
                            }
                         }
                      />
                    <View style={{flexDirection: 'row' , alignSelf: 'center'}}>
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