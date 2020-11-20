/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image,TextInput,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import { connect } from 'react-redux' // redux

const { width, height } = Dimensions.get('window')
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]

class Products extends Component{
   constructor(props) {
      super(props);
      this.state = {
          flag_fav:1,
          flag_sort:1,
         flag_filter:1,
         radioSelected: null,
         colorFilter: '#F0F2F5',
         colorTextfilter: '#383B43',
         colorSort: '#F0F2F5',
         colorTextSort: '#383B43',
         showLogin: false,
         drawer: false,
      };
      this.viewLogin = this.viewLogin.bind(this);
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
         onPress={() => this.props.navigation.navigate('product_detail')}
         key={index.toString()} style={{flex:1,alignItems:'center',justifyContent: 'center',margin:20 }} >
               <View style={[styles.shadow,{width:'100%',height:height*0.4,alignItems:'center', justifyContent:'center',borderRadius:5 ,backgroundColor:'#fff'}]}>
                  <Image source={require('./../../../image/favorite.png')} resizeMode='cover'
                  style={{ width: '100%', flex:1,}} />
                   
                <View style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{width:40,height:40,borderRadius:40/2,
                    backgroundColor:'#E8DEDE',alignItems:'center',justifyContent:'center',position:'absolute',top:10}]}>
                  {this.state.flag_fav==1?
                   <Icon name="heart" size={25} color="#FFCF01"
                   onPress={()=>{
                      if(this.state.flag_fav==1){
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

   renderRadio(clicked){
      return(
       <TouchableOpacity
       style={{width:20,height:20,borderRadius:20/2,borderColor:'#fff',borderWidth:1,margin:3,justifyContent:'center',alignItems:'center'}}
       onPress={()=>{
          this.setState({radioSelected:clicked})
       }}>
         {this.state.radioSelected === clicked?
         <View  style={{width:15 ,height:15 ,borderRadius:15/2,backgroundColor:'#FFCF01'}}></View>
         :
         <View style={{display:'none'}}></View>
         }
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
                   {width < 1250 ? <MobileHeader title='PRODUCTS' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Products' iconName='tags' handlerLogin={this.viewLogin}/> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
            
            <View style={{width:'100vw' ,flex:1, alignItems:'center',justifyContent:'center'}}>
               <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'95%',alignItems:'center',justifyContent:'center',height:50,marginTop:10}]}>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color:'#383B43',fontSize:18,margin:5}]}> Zara Store</Text>
                   <TouchableOpacity
                    style={{flexDirection:'row' , backgroundColor:this.state.colorSort, borderTopLeftRadius: 20,borderTopRightRadius: 20, padding: 12}}
                   onPress={() => {
                     if(this.state.flag_sort==1){
                      this.setState({flag_sort:2 , colorSort:'#383B43' , colorTextSort: 'white'})
                   }else{
                      this.setState({flag_sort:1 , colorSort:'#F0F2F5' , colorTextSort: '#383B43'})
                   }
                }}>
                   <Text style={{color:this.state.colorTextSort,fontSize:13,margin:5}}>{this.props.Language=='AR'?'ترتيـب':'Sort'}</Text>
                   <Image source={require('./../../../image/sort.png')} style={{ width:25,height:25 ,margin:2}} resizeMode='contain' />
                   <Image source={require('./../../../image/arr.png')} style={{ width:15,height:25}} resizeMode='contain' />
                   </TouchableOpacity>
                   <View style={{width:20}}></View>
                   <TouchableOpacity
                    style={{flexDirection:'row' , backgroundColor:this.state.colorFilter, borderTopLeftRadius: 20,borderTopRightRadius: 20, padding: 12}}
                   onPress={() => {
                     if(this.state.flag_filter==1){
                        this.setState({flag_filter:2 , colorFilter:'#383B43' , colorTextfilter: 'white'})
                   }else{
                     this.setState({flag_filter:1 , colorFilter:'#F0F2F5' , colorTextfilter: '#383B43'})
                   }
                }}>
                   <Text style={{color:this.state.colorTextfilter,fontSize:13,margin:5}}> {this.props.Language=='AR'?'تصنيف':'Filter'}</Text>
                   <Image source={require('./../../../image/sort.png')} style={{ width:25,height:25 ,margin:2}} resizeMode='contain' />
                 </TouchableOpacity>
               </View>
               <FlatList style={{width:'99%',marginTop:5,marginBottom:5 }}
               data={list}
               numColumns={width < 1205 ? 1 : 4}
               showsVerticalScrollIndicator={false}
               renderItem={({ item }) => this.renderItem(item)}
               keyExtractor={(item, index) => index.toString()}
             />
               
               {this.state.flag_sort!=1?
                <View style={[styles.filterSection , width < 1250 ? {width : '100%' } : {width: '30%'} ,  { alignSelf:  'flex-end' , marginTop: 60, borderTopStartRadius: 30, borderBottomStartRadius:30 , borderBottomEndRadius: 30} ]}>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10,marginTop:15}]}>
                    <Text style={{flex:1,color:'#FFCF01',fontSize:20,}}>{this.props.Language=='AR'?'ترتيب حسب':'Sort By'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(1)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'أفضل بائع':'Best Seller'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(2)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'أعلى سعر':'Highest Price'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(3)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'أقل سعر':'Lowest Price'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(4)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'مضاف حديثا':'Newly Added'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'10%'}]}>
                      {this.renderRadio(5)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'الحروف الأبجدية':'Alphapitical'}</Text>
                 </View>


                 <TouchableOpacity 
                       onPress={() => {
                          this.setState({radioSelected: null})
                        if(this.state.flag_sort==1){
                           this.setState({flag_sort:2 , colorSort:'#383B43' , colorTextSort: 'white'})
                       }else{
                        this.setState({flag_sort:1 , colorSort:'#F0F2F5' , colorTextSort: '#383B43'})
                       }
                      }}
                     style={{width:'35%',alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1,marginBottom:10}}>
                       <Text style={{textAlignVertical:'center', color:'#FFFFFF',fontSize:18,paddingVertical:10}}>{this.props.Language=='AR'?'تنفيـذ':'Apply'}</Text>
                     </TouchableOpacity>


               </View>
               :
               <View style={{display:'none'}}></View>
               }

             {this.state.flag_filter!=1?
                <View style={[styles.filterSection , width < 1250 ? {width : '100%' } : {width: '30%'} , {alignSelf:  'flex-end' , marginTop: 60 , borderTopStartRadius: 30, borderBottomStartRadius:30 , borderBottomEndRadius: 30} ]}>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10,marginTop:15}]}>
                    <Text style={{flex:1,color:'#FFCF01',fontSize:20,}}>{this.props.Language=='AR'?'تصنيف حسب':'Filter By'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(1)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'رجالى':'Men'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(2)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'حريمى':'Women'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'3%'}]}>
                      {this.renderRadio(3)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'أطفالى':'Kids'}</Text>
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
                
                 <View style={{width:"90%",height:1,backgroundColor:'#707070',marginTop:'3%'}}></View>

                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(1)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'جيينز':'Jeans'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter]}>
                      {this.renderRadio(2)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'بنطلونات':'Pants'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(3)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?'قمصان':'Shirts'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(4)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?' تى شيرتات':'T-Shirts'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{}]}>
                      {this.renderRadio(5)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?' أحذية':'Shoes'}</Text>
                 </View>
                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:'3%'}]}>
                      {this.renderRadio(5)}
                      <Text style={{flex:1 , color:'#FFFFFF',fontSize:15,}}>{this.props.Language=='AR'?' ملابس رياضية':'SportsWear'}</Text>
                 </View>


                 <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.viewFilter,{marginBottom:10}]}>
                     <TouchableOpacity style={{flex:1 ,alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1}}>
                       <Text style={{textAlignVertical:'center',color:'#FFFFFF',fontSize:18,paddingVertical:10}}>{this.props.Language=='AR'?'تنفيذ':'Apply'}</Text>
                     </TouchableOpacity>
                      <View style={{width:'10%'}}></View>
                     <TouchableOpacity 
                       onPress={() => {
                          this.setState({radioSelected: null})
                        if(this.state.flag_filter==1){
                           this.setState({flag_filter:2 , colorFilter:'#383B43' , colorTextfilter: 'white'})
                       }else{
                        this.setState({flag_filter:1 , colorFilter:'#F0F2F5' , colorTextfilter: '#383B43'})
                       }
                      }}
                     style={{flex:1 ,alignItems:'center',justifyContent:'center',borderRadius:60,borderColor:'#fff',borderWidth:1}}>
                       <Text style={{textAlignVertical:'center', color:'#FFFFFF',fontSize:18,paddingVertical:10}}>{this.props.Language=='AR'?'مسـح':'Clear'}</Text>
                     </TouchableOpacity>
                </View>


               </View>
               :
               <View style={{display:'none'}}></View>
               }

            </View>
            {width < 1250 ? <MobileFooter /> : <Footer />}
         </View>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
    }
 }
export default connect(mapStateToProps, {})(Products)

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
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#F0F2F5',
       width: '100%',
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
quickLinks: {
   fontSize: 20 ,
   color: '#fff',
   fontWeight: 'light',
   textAlign: 'left',
   marginBottom: 10
},
footerTitles: {
   fontSize: 30 ,
   color: '#FFCF01',
   fontWeight: 'bold',
   textAlign: 'left',
   marginBottom: 20
},
imageH: {
   width: 120,
   height: 70
},
 });
