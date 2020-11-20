import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,TextInput,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
const listFilter = [{ id: 4 , name:'Jeans' }, { id: 5 , name:'Pants' }, { id: 6 , name:'Shirts'},
 { id: 7 , name:'T-Shirts' }, { id: 8 , name:'Shoes'}, { id: 9 , name:'SportsWear'}]

class Products extends Component{
   constructor(props) {
      super(props);
      this.state = {
          flag_fav:1,
          flag_sort:1,
         flag_filter:1,
         radioSelected: null,
         radioSelected2: null,
         products:[],
         store:'',
         cat:'',
         sub_cat:'',
         sort:''
      };
   }

  UNSAFE_componentWillMount(){
    this.getProduct()
  }

  getProduct = () => {
   const { navigation } = this.props;
   const id = navigation.getParam('ID', 'NO-ID');
         NetInfo.fetch().then(state =>{
            if (state.isConnected){
          try {
              this.setState({Processing: true})
              axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/seller/get_seller_profile/'+id+'/',{
               headers: {
                  'Authorization': 'Token '+this.props.User.token
                },
              })
              .then((response)=> {
               this.setState({Processing: false})
                  const Data = response.data.products;
                  const store = response.data.store
                   this.setState({store})
                   const products = []
                   for (let index = 0; index < Data.length; index++) {
                  var obj = {
                      id: Data[index].id,
                      name: Data[index].name,
                      price: Data[index].price,
                      image: Data[index].image,
                      favourite: Data[index].favourite
                  }
                  products.push(obj)
              }
                this.setState({products})
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

   getProductFilter = () => {
      const { navigation } = this.props;
      const id = navigation.getParam('ID', 'NO-ID');
      const { cat , sub_cat }= this.state
      if(cat){
         if(sub_cat){
            NetInfo.fetch().then(state =>{
               if (state.isConnected){
             try {
                 this.setState({Processing: true})
                 axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/seller/get_seller_profile/'+id+'/',{
                  headers: {
                     'Authorization': 'Token '+this.props.User.token
                   },
                   params:{
                     name__startswith: this.state.sub_cat ,
                     sex: this.state.cat
                   }
                 })
                 .then((response)=> {
                  this.setState({Processing: false})
                     const Data = response.data.products;
                     const store = response.data.store
                      this.setState({store})
                      const products = []
                      for (let index = 0; index < Data.length; index++) {
                     var obj = {
                         id: Data[index].id,
                         name: Data[index].name,
                         price: Data[index].price,
                         image: Data[index].image,
                         favourite: Data[index].favourite
                     }
                     products.push(obj)
                 }
                   this.setState({products})
                   if(products.length==0){
                      alert('No Filter Data')
                   }
                   if(this.state.flag_filter==1){
                     this.setState({flag_filter:2})
                    }else{
                     this.setState({flag_filter:1})
                    }
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
         }else{
            alert('Enter SubCategory First')
         }

      }else{
         alert('Enter Category First')
      }
}
getProductSort = () => {
   const { navigation } = this.props;
   const id = navigation.getParam('ID', 'NO-ID');
   const { sort}= this.state
   if(sort){
         NetInfo.fetch().then(state =>{
            if (state.isConnected){
          try {
              this.setState({Processing: true})
              axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/seller/get_seller_profile/'+id+'/',{
               headers: {
                  'Authorization': 'Token '+this.props.User.token
                },
                params:{
                  order_by: sort ,
                }
              })
              .then((response)=> {
               this.setState({Processing: false})
                  const Data = response.data.products;
                  const store = response.data.store
                   this.setState({store})
                   const products = []
                   for (let index = 0; index < Data.length; index++) {
                  var obj = {
                      id: Data[index].id,
                      name: Data[index].name,
                      price: Data[index].price,
                      image: Data[index].image,
                      favourite: Data[index].favourite
                  }
                  products.push(obj)
              }
                this.setState({products})
                if(products.length==0){
                   alert('No Filter Data')
                }
                if(this.state.flag_sort==1){
                  this.setState({flag_sort:2})
                 }else{
                  this.setState({flag_sort:1})
                 }
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
     
   }else{
      alert('Enter your Sort First')
   }
}

 addToFav = (product ) => {
       NetInfo.fetch().then(state =>{
           if (state.isConnected){
            this.setState({Processing: true})
       try {
           axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/product/add_to_favourite/', {
             product
           },
           { 
             headers: {
               'Authorization': 'Token '+this.props.User.token
             }
               }).then((response)=> {
            this.setState({Processing: false})
               if(response.data.detail){
                   alert(response.data.detail)
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
   renderItem(index , item) {
      return (
         <TouchableOpacity activeOpacity={1}
         onPress={() => this.props.navigation.navigate('ProductDetail',{ID: item.id})}
         key={index.toString()} style={{flex:1,alignItems:'center',justifyContent: 'center',margin:4 }} >
               <View style={[styles.shadow,{width:'100%',height:height*0.4,alignItems:'center', justifyContent:'center',borderRadius:5 ,backgroundColor:'#fff'}]}>
                  <Image source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+item.image}} resizeMode='cover'
                  style={{ width: '100%', flex:1,}} />
                   
                <View style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{width:40,height:40,borderRadius:40/2,
                    backgroundColor:'#E8DEDE',alignItems:'center',justifyContent:'center',position:'absolute',top:10}]}>
                  {item.favourite?
                   <Icon name="heart" size={25} color="#FFCF01"
                   onPress={()=>{
                      
                    }}/>
                  :
                  <Icon name="heart" size={25} color="#707070"
                  onPress={()=>{
                    this.addToFav(item.id)
                  }}/>
                  }
                 
                </View>

                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:15,color:'#707070',fontFamily:'nexa_bold',marginTop:7}]}>
                   {item.name}</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:12,color:'#707070',fontFamily:'nexa_light',marginTop:20,marginBottom:10}]}>
                   {item.price}</Text>

               </View>
         </TouchableOpacity>
      )
   }

   renderRadio(clicked){
      return(
       <TouchableOpacity
       style={{width:20,height:20,borderRadius:20/2,borderColor:'#fff',borderWidth:1,margin:3,justifyContent:'center',alignItems:'center'}}
       onPress={()=>{
          this.setState({radioSelected:clicked})
          if(clicked==1){
             this.setState({cat: 'men'})
          }else if(clicked==2){
            this.setState({cat: 'women'})
          }else if(clicked==3){
            this.setState({cat: 'kids'})
          }else if(clicked=4){
            this.setState({sort:'best_seller'})
          }else if(clicked=4){
            this.setState({sort:'highest_price'})
          }else if(clicked=4){
            this.setState({sort:'lowest_price'})
         }else if(clicked=4){
            this.setState({sort:'newly_added'})
         }else{
            this.setState({sort:'alphabetically'})
         }
       }}>
         {this.state.radioSelected === clicked?
         <View  style={{width:15 ,height:15 ,borderRadius:15/2,backgroundColor:'#FFCF01'}}></View>
         :
         <View style={{display:'none'}}></View>
         }
       </TouchableOpacity>
      )
    }

     renderFilter(item){
        return(
           <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'80%',alignItems:'center',marginBottom:'3%'}]}>
            <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{item.name}</Text>
            <TouchableOpacity
             style={{width:20,height:20,borderRadius:20/2,borderColor:'#fff',borderWidth:1,margin:3,justifyContent:'center',alignItems:'center'}}
             onPress={()=>{
               this.setState({radioSelected2:item.id})
               this.setState({sub_cat: item.name.toLowerCase()})
             }}>
              {this.state.radioSelected2 === item.id?
              <View  style={{width:15 ,height:15 ,borderRadius:15/2,backgroundColor:'#FFCF01'}}></View>
             :
             <View style={{display:'none'}}></View>
             }
            </TouchableOpacity>
           </View>
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
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'المنتجات':'Products'}</Text>
  
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
            {this.state.flag_sort ==1 && this.state.flag_filter==1?
             this.renderHeader()
            :
            <View style={{display:'none'}}></View>
            }
            <View style={{width:width ,flex:1, alignItems:'center',justifyContent:'center'}}>
               <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'95%',alignItems:'center',justifyContent:'center',height:50,marginTop:10}]}>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color:'#383B43',fontSize:18,fontFamily:'nexa_bold',margin:5}]}>{this.state.store}</Text>
                   <TouchableOpacity
                    style={{flexDirection:'row'}}
                   onPress={() => {
                     if(this.state.flag_sort==1){
                      this.setState({flag_sort:2})
                   }else{
                      this.setState({flag_sort:1})
                   }
                }}>
                   <Text style={{color:'#383B43',fontSize:13,fontFamily:'nexa_bold',margin:5}}>{this.props.Language=='AR'?'ترتيـب':'Sort'}</Text>
                   <Image source={require('./../../../image/sort.png')} style={{ width:25,height:25 ,margin:2}} resizeMode='contain' />
                   <Image source={require('./../../../image/arr.png')} style={{ width:15,height:25}} resizeMode='contain' />
                   </TouchableOpacity>
                   <View style={{width:20}}></View>
                   <TouchableOpacity
                    style={{flexDirection:'row'}}
                   onPress={() => {
                     if(this.state.flag_filter==1){
                      this.setState({flag_filter:2})
                   }else{
                      this.setState({flag_filter:1})
                   }
                }}>
                   <Text style={{color:'#383B43',fontSize:13,fontFamily:'nexa_bold',margin:5}}> {this.props.Language=='AR'?'تصنيف':'Filter'}</Text>
                   <Image source={require('./../../../image/sort.png')} style={{ width:25,height:25 ,margin:2}} resizeMode='contain' />
                 </TouchableOpacity>
               </View>
               <FlatList style={{width:'99%',marginTop:5,marginBottom:5}}
               data={this.state.products}
               numColumns={2}
               showsVerticalScrollIndicator={false}
               renderItem={({index, item }) => this.renderItem(index,item)}
               keyExtractor={(item, index) => index.toString()}
             />
               
               {this.state.flag_sort!=1?
                <View style={styles.sotrSection}>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10,marginTop:15}]}>
                    <Text style={{flex:1,color:'#FFCF01',fontSize:20,fontFamily:'nexa_bold'}}>{this.props.Language=='AR'?'ترتيب حسب':'Sort By'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(4)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'أفضل بائع':'Best Seller'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(5)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'أعلى سعر':'Highest Price'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(6)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'أقل سعر':'Lowest Price'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(7)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'مضاف حديثا':'Newly Added'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'10%'}]}>
                      {this.renderRadio(8)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'الحروف الأبجدية':'Alphapitical'}</Text>
                 </View>


                 <TouchableOpacity 
                       onPress={() => {
                     //      this.setState({radioSelected: null})
                     //    if(this.state.flag_sort==1){
                     //     this.setState({flag_sort:2})
                     //   }else{
                     //     this.setState({flag_sort:1})
                     //   }
                     this.getProductSort()
                      }}
                     style={{width:'35%',alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1,marginBottom:10}}>
                       <Text style={{textAlignVertical:'center', color:'#FFFFFF',fontSize:18,fontFamily:'nexa_bold',paddingVertical:10}}>{this.props.Language=='AR'?'تنفيـذ':'Apply'}</Text>
                     </TouchableOpacity>


               </View>
               :
               <View style={{display:'none'}}></View>
               }

             {this.state.flag_filter!=1?
                <View style={styles.filterSection}>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10,marginTop:15}]}>
                    <Text style={{flex:1,color:'#FFCF01',fontSize:20,fontFamily:'nexa_bold'}}>{this.props.Language=='AR'?'تصنيف حسب':'Filter By'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(1)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'رجالى':'Men'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(2)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'حريمى':'Women'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'3%'}]}>
                      {this.renderRadio(3)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'أطفالى':'Kids'}</Text>
                 </View>
                 <View style={{width:"90%",height:1,backgroundColor:'#707070'}}></View>

               <View style={[styles.searchSection,{ height:40}]}>
               <TextInput
                   style={styles.input}
                   placeholder="Search filter"
                   placeholderTextColor='#000'
                   onChangeText={(searchString) => {this.setState({searchString})}}
                   underlineColorAndroid="transparent"
               />
               </View>
                
                 <View style={{width:"90%",height:1,backgroundColor:'#707070',marginTop:'3%',marginBottom:'3%'}}></View>

                 {/* <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(1)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'جيينز':'Jeans'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(2)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'بنطلونات':'Pants'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(3)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'قمصان':'Shirts'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(4)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?' تى شيرتات':'T-Shirts'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(5)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?' أحذية':'Shoes'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'3%'}]}>
                      {this.renderRadio(6)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?' ملابس رياضية':'SportsWear'}</Text>
                 </View> */}
                  {
                  listFilter.map((item) => {
                     return this.renderFilter(item)
                  })
                 }


                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10}]}>
                     <TouchableOpacity 
                       onPress={()=> {
                          this.getProductFilter()
                        }}
                       style={{flex:1 ,alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1}}>
                       <Text style={{textAlignVertical:'center',color:'#FFFFFF',fontSize:18,fontFamily:'nexa_bold',paddingVertical:10}}>{this.props.Language=='AR'?'تنفيذ':'Apply'}</Text>
                     </TouchableOpacity>
                      <View style={{width:'10%'}}></View>
                     <TouchableOpacity 
                       onPress={() => {
                          this.setState({radioSelected: null})
                        if(this.state.flag_filter==1){
                         this.setState({flag_filter:2})
                       }else{
                         this.setState({flag_filter:1})
                       }
                      }}
                     style={{flex:1 ,alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1}}>
                       <Text style={{textAlignVertical:'center', color:'#FFFFFF',fontSize:18,fontFamily:'nexa_bold',paddingVertical:10}}>{this.props.Language=='AR'?'مسـح':'Clear'}</Text>
                     </TouchableOpacity>
                </View>


               </View>
               :
               <View style={{display:'none'}}></View>
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
export default connect(mapStateToProps, {})(Products)

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
   backgroundColor: '#fff',
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
