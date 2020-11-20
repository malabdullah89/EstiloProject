import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, TextInput,Image, ScrollView,ImageBackground,FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get('window')
import { DrawerActions } from 'react-navigation-drawer'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';


const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading , getCategory , getStores} from './../../Actions' //redux


class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         data:[],
         flag_search:1,
         flag_filter:1,
         radioSelected: null,
         itemID:1,
         Stores:[],
         filterStores:[],
         keyFilter:null
      };
   }

    componentWillMount(){
       this.props.getCategory()
   //   this.props.getStores()
      this.getStores()
      console.log(this.props.User.token)
    }


   getStores = () => {
      NetInfo.fetch().then(state =>{
         if (state.isConnected){
       try {
           this.setState({Processing: true})
           axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/seller/seller_list/')
           .then((response)=> {
            this.setState({Processing: false})
               const Data = response.data.list;
                const stores = []
                for (let index = 0; index < Data.length; index++) {
               var obj = {
                   id: Data[index].id,
                   store: Data[index].store,
                   email: Data[index].email,
                   photo: Data[index].photo,
                   describtion: Data[index].describtion,
                   phone: Data[index].phone,
                   deivery_method: Data[index].deivery_method,
                   credit_card: Data[index].credit_card,
                   cash: Data[index].cash,
                   k_net: Data[index].k_net,
               }
               stores.push(obj)
           }
           this.setState({Stores: stores})
           this.setState({filterStores: stores})
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
            alert("لا يوجد أتصال بالأنترنت" )
         }else{
            alert("No internet connection" )
         }
        }
      });
}

getFilterStores = (key) => {
   NetInfo.fetch().then(state =>{
      if (state.isConnected){
    try {
        this.setState({Processing: true})
        axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/seller/seller_list/',{
           params:{
            products__sub_category__name: key
           }
        })
        .then((response)=> {
         this.setState({Processing: false})
            const Data = response.data.list;
             const stores = []
             for (let index = 0; index < Data.length; index++) {
            var obj = {
                id: Data[index].id,
                store: Data[index].store,
                email: Data[index].email,
                photo: Data[index].photo,
                describtion: Data[index].describtion,
                phone: Data[index].phone,
                deivery_method: Data[index].deivery_method,
                credit_card: Data[index].credit_card,
                cash: Data[index].cash,
                k_net: Data[index].k_net,
            }
            stores.push(obj)
        }
        this.setState({Stores: stores})
        this.setState({filterStores: stores})
        if(stores.length==0){
           if(this.props.Language=='AR'){
            alert('لا يوجد نتائج')
           }else{
            alert('No product here')
           }
           
        }
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
         alert("لا يوجد أتصال بالأنترنت" )
      }else{
         alert("No internet connection" )
      }
     }
   });
}

search(word){
   const filterArray=[]
   if(word!=null || word!=''){
    this.state.Stores.forEach(element => {
      if(element.store.includes(word)){
         filterArray.push(element)
          this.setState({Stores: filterArray})
      }
   });
   }else{
    this.setState({Stores: this.state.filterData})
   }
    
 }

   renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[styles.shadow,{width:width,height:height*0.12,backgroundColor: '#383B43', }]}>
            <View style={[ styles.row,  { width: width, height:'40%',justifyContent: 'space-between',paddingHorizontal: 18 ,}]} >
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                  <Entypo name="shopping-cart" style={{ color: '#fff', fontSize: 30 ,marginTop:10}} />
               </TouchableOpacity>
               <Image source={require('./../../../image/logo.png')} style={[styles.image, { marginTop:10 }]} resizeMode='contain' />
               <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
                  {/* <Entypo name="menu" style={{ color: '#F67534', fontSize: 36 }} /> */}
                  <View style={{width:35,justifyContent:'center',marginTop:10}}>
                  <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='stretch' />
                  <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='stretch' />
                  <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='stretch' />
                  </View>
               </TouchableOpacity>
            </View>

            <View style={{width:'25%',height:'40%',flexDirection:'row-reverse',alignSelf:'flex-start',marginTop:7}} >
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               <Text style={{ color: '#FFCF01', fontSize: 12,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'تصنيف':'Filter'}</Text>
               <TouchableOpacity onPress={() => {
                   if(this.state.Stores.length !=0){
                     if(this.state.flag_filter==1){
                        this.setState({flag_filter:2})
                     }else{
                        this.setState({flag_filter:1})
                     }
                   }
               }} >
               <Image source={require('./../../../image/filter.png')} style={{ width:35,height:35 }} resizeMode='contain' />
               </TouchableOpacity>
               </View>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               <Text style={{ color: '#FFCF01', fontSize: 12,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'بحـث':'Search'}</Text>
               <TouchableOpacity onPress={() => {
                       if(this.state.flag_search==1){
                          this.setState({flag_search:2})
                       }else{
                          this.setState({flag_search:1})
                       }
                  }}>
               <Image source={require('./../../../image/search.png')} style={{ width:35 , height:35 }} resizeMode='contain' />
               </TouchableOpacity>
               </View>
              
            </View>
            </View>
         )
      } else {
         return (
            <View style={[styles.shadow,{width:width,height:height*0.12,backgroundColor: '#383B43',}]}>
            <View style={[styles.row,{ width: width,height:'40%' ,justifyContent: 'space-between', paddingHorizontal: 18,marginTop:3}]} >
               <TouchableOpacity 
               onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
               <View style={{width:35,justifyContent:'center',marginTop:10}}>
                  <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='stretch' />
                  <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='stretch' />
                  <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='stretch' />
                  </View>
                  {/* <Entypo name="menu" style={{ color: '#F67534', fontSize: 36 }} /> */}
               </TouchableOpacity>
               <Image source={require('./../../../image/logo.png')} style={[styles.image, { marginTop:10 }]} resizeMode='contain' />
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} >
                  <Entypo name="shopping-cart" style={{ color: '#fff', fontSize: 30 ,marginTop:10 }} />
               </TouchableOpacity>
            </View>

            <View style={{width:'25%',flexDirection:'row',alignSelf:'flex-end',height:'40%',marginTop:7}} >
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               <Text style={{ color: '#FFCF01', fontSize: 12,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'تصنيف':'Filter'}</Text>
               <TouchableOpacity onPress={() => {
                    if(this.state.Stores.length >0){
                    if(this.state.flag_filter==1){
                     this.setState({flag_filter:2})
                  }else{
                     this.setState({flag_filter:1})
                  }
               }
               }} >
               <Image source={require('./../../../image/filter.png')} style={{ width:30,height:30 }} resizeMode='contain' />
               </TouchableOpacity>
               </View>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               <Text style={{ color: '#FFCF01', fontSize: 12,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'بحـث':'Search'}</Text>
               <TouchableOpacity onPress={() => {
                    if(this.state.flag_search==1){
                     this.setState({flag_search:2})
                  }else{
                     this.setState({flag_search:1})
                  }
               }} >
               <Image source={require('./../../../image/search.png')} style={{ width:30 , height:30 }} resizeMode='contain' />
               </TouchableOpacity>
               </View>
              
            </View>

            </View>
         )
      }
   }

   renderRadio(clicked){
      return(
       <TouchableOpacity
       style={{width:25,height:25,borderRadius:25/2,borderColor:'#fff',borderWidth:1,margin:3,justifyContent:'center',alignItems:'center'}}
       onPress={()=>{
         this.setState({radioSelected:clicked})
          if(clicked==1){
            this.setState({keyFilter:'men'})
          }else if(clicked==2){
            this.setState({keyFilter:'women'})
          }else{
            this.setState({keyFilter:'kids'})
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

   renderItemRow(item) {
      const {itemID} = this.state
      return (
         <TouchableOpacity activeOpacity={1}
         onPress={() => {
            this.setState({itemID:item.id})
            if(item.id==1){
               this.getStores()
            }else{
               this.getFilterStores(item.name)
            }
         }} 
          style={[ { alignItems:'center',justifyContent: 'center',margin:4 }]} >
               <View style={[styles.shadow,{ width: 70, height: 70,alignItems:'center',justifyContent:'center', borderRadius:70/2 ,backgroundColor:item.id==itemID?'#383B43':'#fff'}]}>
                  <Image source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+item.image}} resizeMode='cover'
                  style={{ width: 50, height: 50, borderRadius:50/2 }} />
               </View>
            <Text style={{fontSize:12,color:'#111111',textAlign:'center',fontFamily:'nexa_bold',marginTop:3}}>
               {item.name}</Text>
         </TouchableOpacity>
      )
   }

   renderItemColom(index ,item) {
      return (
         <TouchableOpacity 
         activeOpacity={1} 
         onPress={() => this.props.navigation.navigate('Products',{ID: item.id})} 
         key={index.toString()} style={[styles.row, { justifyContent: 'center', marginTop: 12, }]} >
            <View style={[styles.flex, styles.row, { width: width - (10 * 2), height: height/4, borderRadius: 10, overflow: 'hidden', backgroundColor: '#707070' }]}>
            <ImageBackground
             resizeMode ="cover"
             source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+item.photo}}
             style={{  width: width, height: '100%', alignItems: 'center', borderRadius:15}} />
            <LinearGradient colors={['#1E1E1E','#353535']} style={styles.linearGradient}/>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:20,color:'#FFF',position: 'absolute',bottom:30,fontFamily:'nexa_bold'}]}>
               {item.describtion}</Text>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:14,color:'#FFF',position: 'absolute',bottom:15,fontFamily:'nexa_light'}]}>
               {item.store}</Text>
            </View>
         </TouchableOpacity>
      )
   }

   renderItem( index,item){
      return (
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Products',{ID: item.id})} 
        style={[styles.viewItem,{overflow: 'hidden',backgroundColor: '#FFF',elevation:3,borderRadius:10,marginBottom: 10,marginVertical:3}]}>
           <ImageBackground
               resizeMode ="cover"
               source={{uri: 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+item.photo}}
               style={{  width: width, height: '100%', alignItems: 'center', borderRadius:15}}/>
              <LinearGradient colors={['#38383810','#43434380']} style={styles.linearGradient}/>
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:20,color:'#FFF',position: 'absolute',bottom:30,fontFamily:'nexa_bold'}]}>
              {item.describtion}</Text>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:14,color:'#FFF',position: 'absolute',bottom:15,fontFamily:'nexa_light'}]}>
               {item.store}</Text>
        </TouchableOpacity>
      );
    }

   render() {
      return (
         <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Spinner
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
            {this.state.flag_filter==1?
             this.renderHeader(this.props.Language)
            :
            <View style={{display:'none'}}></View>
            }
           
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} >
            <View style={{width:width , alignItems:'center',}}>
               <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',height:height*0.13,alignItems:'center' ,justifyContent: 'center',backgroundColor:'#FFCF01',borderBottomColor:'#383B43',borderWidth:1, }]}>
                {this.props.Language=='AR'?
                <Entypo name="chevron-small-right" style={{ color: '#383B43', fontSize: 30 }} />
                :
                <Entypo name="chevron-small-left" style={{ color: '#383B43', fontSize: 30 }} />
                }
               
               <FlatList style={{flex:1,paddingHorizontal:'7%' }}
                data={this.props.Categories}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item }) => this.renderItemRow(item)}
                keyExtractor={(item, index) => index.toString()}
              />
               </View>
               {this.state.flag_search!=1?
               <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed]}>
                 <View style={{width:40 , height:40 , borderRadius:40/2,backgroundColor:'#383B43',alignItems:'center' ,justifyContent:'center',margin:5}}>
                 <Icon style={{}} name="search" size={20} color="#FFCF01"/>
                 </View> 
               <TextInput
                   style={styles.input}
                   placeholder="User Nickname"
                   textAlign={this.props.Language=='AR'?'right':'left'}
                   onChangeText={(searchString) => {
                     this.search(searchString)
                   }}
                   underlineColorAndroid="transparent"
               />
               </View>
               :
               <View style={{display:'none'}}></View>
               }

               <View style={{width:width,alignItems:'center' ,justifyContent: 'center'}}>
                <FlatList style={{ width: '98%',marginTop:10}}
                data={this.state.Stores}
                showsVerticalScrollIndicator={false}
                renderItem={({ index,item }) => this.renderItem(index,item)}
                keyExtractor={(item, index) => index.toString()}
              />
              </View>
              {this.state.flag_filter!=1?
                <View style={styles.filterSection}>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10,marginTop:15}]}>
                    <Text style={{flex:1,color:'#FFCF01',fontSize:20,fontFamily:'nexa_bold'}}>{this.props.Language=='AR'?'تصنيف حسب':'Filter By'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(1)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:18,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'رجالى':'Men'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(2)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:18,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'حريمى':'Women'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'10%'}]}>
                      {this.renderRadio(3)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:18,fontFamily:'nexa_light'}}>{this.props.Language=='AR'?'أطفالى':'Kids'}</Text>
                 </View>

                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10}]}>
                     <TouchableOpacity 
                     onPress={()=> {
                        this.getFilterStores(this.state.keyFilter)
                        if(this.state.flag_filter==1){
                           this.setState({flag_filter:2})
                         }else{
                           this.setState({flag_filter:1})
                         }
                     }}
                       style={{flex:1 ,alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1}}>
                       <Text style={{textAlignVertical:'center',color:'#FFFFFF',fontSize:18,fontFamily:'nexa_bold',paddingVertical:15}}>{this.props.Language=='AR'?'تنفيذ':'Apply'}</Text>
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
                       <Text style={{textAlignVertical:'center', color:'#FFFFFF',fontSize:18,fontFamily:'nexa_bold',paddingVertical:15}}>{this.props.Language=='AR'?'مسـح':'Clear'}</Text>
                     </TouchableOpacity>
                </View>
               </View>
               :
               <View style={{display:'none'}}></View>
               }
             </View>
            </ScrollView>
             
         </View>
         
      );
   }
}

//redux
const mapStateToProps = state => {
   return {
      Language: state.LanguageReducer.Language,
      Processing: state.AuthReducer.Processing,
      Message: state.AuthReducer.Message,
      User: state.AuthReducer.User,
      Categories: state.AuthReducer.Categories,
      Stores: state.AuthReducer.Stores
   }
}
// redux
export default connect(mapStateToProps, { SetLoading , getCategory , getStores })(Home)

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
      flex: 1,height:height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F2F5',
   },
   image: {
      width: 90,
      height: 50
  },
  right:{
     right:20
  },
  left:{
     left:20
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
linearGradient: {
   width:width,
   height:'100%',
   borderRadius:15,
   position:'absolute',
  },
  viewItem:{
   width:'100%',
   height:height / 4,
   alignItems:'center',
   justifyContent:'center',
 },
});