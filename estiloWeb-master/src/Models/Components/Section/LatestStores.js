/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import {View , Text, TouchableOpacity, Image, Dimensions, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const list = [{ id: 1 }, { id: 2 }];

export default class LatestStores extends Component {
    constructor(props){
        super(props);
        this.state= {
            flag_fav : 1,
        }
    }
    renderItem(index) {
        return (
           <TouchableOpacity activeOpacity={1}
           onPress={() => this.props.navigation.navigate('ProductDetail')}
           key={index.toString()} style={{flex:1,alignItems:'center',justifyContent: 'center',margin:4 }} >
                 <View style={[styles.shadow,{width:'100%',height:height*0.4,alignItems:'center', justifyContent:'center',borderRadius:5 ,backgroundColor:'#fff'}]}>
                     
                        <Image source={require('./../../../image/favorite.png')} resizeMode='cover'
                        style={{ width: '100%', flex:1,}} />
                     
                     
                  <View style={[this.props.Language==='AR'?styles.posLeft:styles.posRight,{width:40,height:40,borderRadius:40/2,
                      backgroundColor:'#E8DEDE',alignItems:'center',justifyContent:'center',position:'absolute',top:10}]}>
                    {this.state.flag_fav===1?
                     <Icon name="heart" size={25} color="#FFCF01"
                     onPress={()=>{
                        if(this.state.flag_fav===1){
                            this.setState({flag_fav:2})
                        }else{
                            this.setState({flag_fav:1})
                        }
                      }}/>
                    :
                    <Icon name="heart" size={25} color="#707070"
                    onPress={()=>{
                      if(this.state.flag_fav==1){
                          this.setState({flag_fav:2})
                      }else{
                          this.setState({flag_fav:1})
                      }
                    }}/>
                    }
                   
                  </View>
  
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:15,color:'#707070',marginTop:7}]}>
                     Fancy Dress for Women</Text>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:12,color:'#707070',marginTop:20,marginBottom:10}]}>
                     400 KWD</Text>
  
                 </View>
           </TouchableOpacity>
        )
     }
    render() {
        return(
            <View >
                <View style={{flexDirection: 'row',  justifyContent: 'center' , alignContent: 'center', marginVertical: 20}}>
                    <Image source={require('./../../../image/left.png')} resizeMode='cover' style={{ width: 120}}/>
                    <Text style= { {  color: '#FFCF01', fontSize: 40 , fontWeight: '600' , marginRight: 10} }>
                       LATEST
                    </Text>
                    <Text style= { {  color: '#383B43', fontSize: 40 , fontWeight: '600'}}>
                       STORES
                    </Text>
                    <Image source={require('./../../../image/right.png')} style={{ width: 120}}/>
                 </View>
                 <View style={{flexDirection: 'row',  justifyContent: 'center' , alignContent: 'center'}}>
                    <FlatList style={{marginTop:5,marginBottom:5}}
               data={list}
               numColumns={2}
               showsVerticalScrollIndicator={false}
               renderItem={({ item }) => this.renderItem(item)}
               keyExtractor={(item, index) => index.toString()}
               />
               </View>
            </View>
        )
    }
}

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
      width: width - (170 * 2) + 10,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginBottom: 18,
      marginHorizontal: 36
  },
  sotrSection:{
   width:width,
   backgroundColor:'#383B43',
   alignItems:'center',
   position:'absolute',top:0
},
viewFilter:{
   width:'80%',height:40,
   alignItems:'center',justifyContent:'center'
},
searchSection: {
   width:'85%',
   borderRadius:60,
   borderColor:'#707070',
   borderWidth:1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:10,
   backgroundColor:'#FFFFFF'
},
filterSection:{
   width:width,
   backgroundColor:'#383B43',
   alignItems:'center',
   position:'absolute',top:0
},
input: {
   flex:1,
   color: '#000',
},
 });