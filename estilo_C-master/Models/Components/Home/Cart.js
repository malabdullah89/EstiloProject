import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,ImageBackground,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
const list = [{ id: 1 }, { id: 2 }, { id: 3 }]

class Cart extends Component{
   constructor(props) {
      super(props);
      this.state = {
         flag_list:2,
         number:1,
         defNumber:1,
         cart:[],
         quantity: null,
         sub_total:null,
         delivery_fee:null,
         total_amount: null,
         itemID: null
      };
   }

  UNSAFE_componentWillMount(){
    this.getCart()
  }
    
  getCart = () => {
   NetInfo.fetch().then(state =>{
      if (state.isConnected){
    try {
        this.setState({Processing: true})
        axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/cart/user_cart/',{
         headers: {
            'Authorization': 'Token '+this.props.User.token
          }
        })
        .then((response)=> {
         this.setState({Processing: false})
            const Data = response.data.items;
             const cart = []
             this.setState({sub_total: response.data.sub_total})
             this.setState({delivery_fee: response.data.delivery_fee})
             this.setState({total_amount: response.data.total_amount})
             for (let index = 0; index < Data.length; index++) {
            var obj = {
                id: Data[index].id,
                product_name: Data[index].product_name,
                price: Data[index].price,
                image: Data[index].image,
                quantity: Data[index].quantity,
                product_size: Data[index].product_size,
                product_color: Data[index].product_color,
                product_describtion: Data[index].product_describtion,
            }
            cart.push(obj)
        }
          this.setState({cart})
        }).catch((error)=> {
         this.setState({Processing: false})
         if(error.response.data.detail){
            alert(error.response.data.detail)
         }else{
            alert(error)
         }
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

  delFromCart = (id ) => {
    NetInfo.fetch().then(state =>{
       if (state.isConnected){
        this.setState({Processing: true})
    try {
       axios.delete('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/cart/delete_item/'+id+'/')
       .then((response)=> {
        this.setState({Processing: false})
           if(response.data.detail){
               alert(response.data.detail)
               this.getCart()
           }
              
       }).catch((error)=> {
        this.setState({Processing: false})
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

updateQuantity = (id ,quantity ) => {
   NetInfo.fetch().then(state =>{
      if (state.isConnected){
       this.setState({Processing: true})
   try {
      axios.put('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/cart/update_quantity/',{
         id , quantity
      })
      .then((response)=> {
       this.setState({Processing: false})
          if(response.data.detail){
              alert(response.data.detail)
              this.getCart()
          }else if(response.data.error){
            alert(response.data.error)
         }
             
      }).catch((error)=> {
       this.setState({Processing: false})
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

   renderItem(index,item) {
      return (
         <TouchableOpacity activeOpacity={1}
         key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
               <View style={[styles.shadow,this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '100%', height: height*0.2,alignItems:'center', borderRadius:10 ,backgroundColor:'#fff'}]}>
                  <Image source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+item.image}} resizeMode='cover'
                  style={{ width: 120, height: '90%', borderRadius:8,margin:5 }} />
                  <View style={{flex:1,height:'95%',paddingTop:7}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:14,color:'#212121',fontFamily:'nexa_bold',margin:3}]}>
                   {item.product_name}</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:10,color:'#707070',fontFamily:'nexa_light',margin:3}]}>
                   Size: {item.product_size}</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:10,color:'#707070',fontFamily:'nexa_light',margin:3}]}>
                   Color: {item.product_color}</Text>
                  </View>
                  <View style={{height:'95%',margin:10,alignItems:'center'}}>
                  <Text style={{fontSize:13,color:'#212121',fontFamily:'nexa_bold',margin:3}}>
                   {item.price} KWD</Text>
                   <Text style={{textAlign:'center',fontSize:10,color:'#707070',fontFamily:'nexa_light',marginTop:5}}>
                   Quantity</Text>
                   <View style={{width:100,height:30,alignItems:'center',flexDirection:'row',justifyContent:"center",marginTop:5,borderRadius:60,borderColor:'#707070',borderWidth:1}}>
                   <Icon name="minus" size={12} color="#707070"
                   style={{position:'absolute',left:10}}
                   onPress={()=>{ 
                      if(item.quantity!=1){
                        this.updateQuantity(item.id , item.quantity-1)
                      }else{
                         if(this.props.Language=='AR'){
                             alert('غير مسموح بذلك')
                         }else{
                           alert('Not Allowed')
                         }
                      }
                      
                   }}/>
                   <View style={{width:27,height:27,borderRadius:27/2,alignItems:'center',justifyContent:'center',backgroundColor:'#FFCF01'}}>
                   <Text style={{textAlign:'center',fontSize:12,color:'#707070',fontFamily:'nexa_bold'}}>
                      {item.quantity}</Text>
                   </View>
                   <Icon name="plus" size={12} color="#707070"
                   style={{position:'absolute',right:10}}
                    onPress={()=>{
                        this.updateQuantity(item.id , item.quantity+1)
                      }}/>
                   </View>
                  <Icon name="times-circle-o" size={25} color="#707070" style={{marginTop:10}}
                   onPress={()=>{ this.delFromCart(item.id)}}/>
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
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'المحفظة':'Cart'}</Text>
  
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
               {this.state.cart.length == 0 ?
                <View style={{width:'80%',alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('./../../../image/cart.png')} style={{ width:80,height:80 ,margin:2}} resizeMode='contain' />
                   <Text style={{textAlign:'center',color:'#383B43', fontSize:20,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? 'المحـفظة فارغـة' : 'Cart is Empty'}
                  </Text>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20,fontFamily:'nexa_bold', }}>
                      {this.props.Language == "AR" ? 'أذهب للرئيسية' : 'Go Home'}
                     </Text>
                  </TouchableOpacity>
                </View>
               :
               <View style={{width:width ,height:'100%', alignItems:'center'}}>
               <FlatList style={{width: '98%',height:height*0.5,marginTop:10,marginBottom:10}}
               data={this.state.cart}
               showsVerticalScrollIndicator={false}
               renderItem={({index, item }) => this.renderItem(index,item)}
               keyExtractor={(item, index) => index.toString()}
             />
              <View style={{width:'90%',alignItems:'center',}}>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center'}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? 'الأجمالى الخزئـى :' : 'Sub-Total :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,fontFamily:'nexa_light',margin:5}]}>
                     {this.state.sub_total} </Text>
                </View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center'}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? ' رسوم التوصـبل :' : 'Delivery Fees :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,fontFamily:'nexa_light',margin:5}]}>
                     {this.state.delivery_fee} </Text>
                </View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',marginTop:10}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? ' المبلغ الإجمالي :' : 'Total amount :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,fontFamily:'nexa_light',margin:5}]}>
                     {this.state.total_amount} </Text>
                </View>

                <TouchableOpacity onPress={() => { 
                   const obj={
                      sub_total: this.state.sub_total,
                      delivery_fee: this.state.delivery_fee,
                      total_amount: this.state.total_amount
                   }
                   this.props.navigation.navigate('Checkout',{Check: JSON.stringify(obj)}) 
                  }} 
                style={[styles.Button, styles.shadow, { backgroundColor: '#383B43',marginBottom:10 }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20,fontFamily:'nexa_bold', }}>
                      {this.props.Language == "AR" ? 'الدفع' : 'Checkout'}
                     </Text>
                  </TouchableOpacity>
              </View>
             </View>
               
               }
           
            </View>

           
            
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
export default connect(mapStateToProps, {})(Cart)

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
   posRight:{
      right:15
   },
   posLeft:{
      left:15
   },
   Button: {
      width: '37%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 7,
      marginTop: 15,
  },
 });
