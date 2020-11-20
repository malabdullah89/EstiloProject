import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,ImageBackground,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'

import { connect } from 'react-redux' // redux
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

class MyFavorites extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing: false,
         isVisible: false,
         flag_list:2,
         favourites:[],
         id: null
      };
   }
  
    UNSAFE_componentWillMount(){
       this.getFavourites(this.props.User.token)
    }

   getFavourites = (Token) => {
      NetInfo.fetch().then(state =>{
         if (state.isConnected){
       try {
           this.setState({Processing: true})
           axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/product/favourite_list/',{
            headers: {
               'Authorization': 'Token '+Token
             }
           })
           .then((response)=> {
               this.setState({Processing: false})
               const Data = response.data.list;
               const products = []
               for (let index = 0; index < Data.length; index++) {
              var obj = {
                  id: Data[index].id,
                  name: Data[index].name,
                  price: Data[index].price,
                  image: Data[index].image,
                  favourite: Data[index].favourite,
                  describtion: Data[index].describtion,
                  notes: Data[index].notes
              }
              products.push(obj)
          }
           this.setState({favourites: products})
           }).catch(function (error) {
            this.setState({Processing: false})
                   alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
         this.setState({Processing: false})
           alert("Something went wrong")
       }
      } else {
         if(this.props.Language=='AR'){
            alert('لا يوجد أتصال بالانترنت')
          }else{
            alert('No internet connection')
          }
        }
      });
      
}
 
delFromFav = (product ) => {
   NetInfo.fetch().then(state =>{
       if (state.isConnected){
        
   try {
       axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/product/remove_favourite/', {
         product
       },
       { 
         headers: {
           'Authorization': 'Token '+this.props.User.token
         }
           }).then((response)=> {
        
           if(response.data.detail){
               alert(response.data.detail)
               this.getFavourites(this.props.User.token)
           }
              
       }).catch((error)=> {
        
          alert(error)
       }).finally(function () {
           // always executed
       });
   } catch (error) {
       alert("Something went wrong")
   }
} else {
   if(this.props.Language=='AR'){
     alert('لا يوجد أتصال بالانترنت')
   }else{
     alert('No internet connection')
   }
   
  }
});
}

   renderItem(index , item) {
      return (
         <TouchableOpacity activeOpacity={1}
         key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
               <View style={[styles.shadow,this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '100%', height: height*0.2,alignItems:'center', borderRadius:10 ,backgroundColor:'#fff'}]}>
                  <Image source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+item.image}} resizeMode='cover'
                  style={{ width: 120, height: '95%', borderRadius:8,margin:7 }} />
                  <View style={{flex:1,height:'95%',justifyContent:'center'}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:15,color:'#212121',fontFamily:'nexa_bold',margin:3}]}>
                   {item.name}</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:10,color:'#707070',fontFamily:'nexa_light',margin:3}]}>
                   {item.describtion}</Text>
                   <Text style={this.props.Language=='AR'?styles.right:styles.left,{fontSize:10,color:'#707070',fontFamily:'nexa_light',marginTop:10,margin:3}}>
                   {item.notes}</Text>
                  </View>
                  <View style={{width:50,height:'98%',}}>
                  <Icon name="heart" size={25} color="#FFCF01"
                   onPress={()=>{
                      this.setState({id: item.id})
                      this.setState({isVisible: true})
                     }}
                  style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{position:'absolute',top:10}]}/>
                </View>
                  
               </View>
         </TouchableOpacity>
      )
   }

   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Cart')}>
           <Icon name="shopping-cart" size={30} color="#FFCF01" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'المفضلة':'Favorites'}</Text>
  
           <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
              <View style={{width:35,justifyContent:'center'}}>
              <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='stretch' />
              <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='stretch' />
              <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='stretch' />
              </View>
           </TouchableOpacity>
         </View>
      )
  }

    render(){
       const titleAr1 = 'هل أنت متأكد من '
       const titleEn1 = ' ARE YOU SURE YOU WANT TO '
       const titleAr2 = ' حذف المنتج من المفضلة'
       const titleEn2 = ' REMOVE ITEM FROM FAVORITE'
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Spinner
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
            {this.renderHeader(this.props.Language)}
            <View style={{width:width ,flex:1, alignItems:'center',justifyContent:'center'}}>
               {this.state.favourites.length==0?
                <View style={{width:'80%',alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('./../../../image/fav.png')} style={{ width:80,height:80 ,margin:2}} resizeMode='contain' />
                   <Text style={{textAlign:'center',color:'#383B43', fontSize:18,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? 'لم تقم بالاعجاب' : 'YOU DONNOT LIKE'}
                  </Text>
                   <Text style={{textAlign:'center',color:'#383B43', fontSize:18,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? 'على أي منتج حاليا' : 'ANYTHING YET!'}
                  </Text>
                </View>
               :
               <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
               data={this.state.favourites}
               showsVerticalScrollIndicator={false}
               renderItem={({ index,item }) => this.renderItem(index,item)}
               keyExtractor={(item, index) => index.toString()}
             />
               
               }
           
            </View>

            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left">
          <View style={{width:'100%',}}>
             <View style={[styles.shadow,{width:'99%', height:130,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:10}]}>
             <Text style={{ width: '80%',textAlign:'center',color:'#383B43', fontSize:18,fontFamily:'nexa_bold',margin:5}}>
            {this.props.Language == "AR" ? titleAr1 : titleEn1}
            </Text>
            <Text style={{ width: '80%',textAlign:'center',color:'#383B43', fontSize:18,fontFamily:'nexa_bold',margin:5}}>
            {this.props.Language == "AR" ? titleAr2 : titleEn2}
            </Text>
             </View>
           
             <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.1 }]}>
                   <TouchableOpacity onPress={() => { this.setState({isVisible:false}) }} 
                   style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20,fontFamily:'nexa_bold', }}>
                          {this.props.Language == "AR" ? 'ألغاء' : 'Cancel'}
                      </Text>
                   </TouchableOpacity>
            </View>

            <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 30 }]}>
                <TouchableOpacity onPress={() => {
                   this.setState({isVisible: false})
                    this.delFromFav(this.state.id)
                   }} 
                style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                      <Text style={{ color: '#FFCF06', fontSize: 20,fontFamily:'nexa_bold', }}>
                      {this.props.Language == "AR" ? ' نعـم' : 'Yes'}
                     </Text>
                </TouchableOpacity>
            </View>
                  
           
         </View>
         
          </Modal>
            
         </View>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
      Language: state.LanguageReducer.Language,
      User: state.AuthReducer.User,
      Processing: state.AuthReducer.Processing,
      Message: state.AuthReducer.Message,
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
      width:'30%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginBottom: 18,
      marginHorizontal: 36
  },
 });
