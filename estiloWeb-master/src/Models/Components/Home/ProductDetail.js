/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RelatedItems from './../Section/RelatedItems';
import LatestStores from './../Section/LatestStores';
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux' // redux
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';

const { width } = Dimensions.get('window')
const listSize = [{ id: 1 , name: 'L' }, { id: 2 , name: 'XL' }, { id: 3 , name: 'XXL' }, { id: 4 , name: 'S' },{ id: 5 , name: 'M' },{ id: 6 , name: 'M' }]
const listColor = [{ id: 1 , name: 'Red' }, { id: 2 ,name: 'Green'}, { id: 3 ,name: 'White' }, { id: 4 ,name: 'Blue' } , { id: 4 , name: 'Black' }]

class ProductDetail extends Component{
   constructor(props) {
      super(props);
      this.state = {
         img1: require('./../../../image/favorite.png'),
         img2: require('./../../../image/img1.png'),
         img3: require('./../../../image/intro.png'),
         flag_fav:2,
         Bg:'#F0F2F5',
         Txt:'#707070',
         clickedBg:'#383B43',
         clickedTxt:'#FFCF06',
         sizeId:null,
         colorId:null,
         isVisible: false,
         showLogin: false,
         drawer: false,

      };this.viewLogin = this.viewLogin.bind(this);
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
    
  renderSizeItem(item) {
     const {sizeId} = this.state
   return (
      <TouchableOpacity activeOpacity={1}
      onPress={()=>{
         this.setState({sizeId:item.id})
      }}
       style={[ { justifyContent: 'center',margin:4 }]} >
                  <View
                  style={{width:40,alignItems:'center',justifyContent:'center',margin:10,height:40,borderRadius:40/2,borderWidth:1,backgroundColor:item.id==sizeId?'#383B43':'#F0F2F5',borderColor:'#707070'}}>
                   <Text style={{color:item.id==sizeId?'#FFCF06':'#707070',fontSize:14,}}>{item.name}</Text>
                  </View>
      </TouchableOpacity>
   )
}

renderColorItem(item) {
   const {colorId} = this.state
   return (
      <TouchableOpacity activeOpacity={1}
      onPress={()=>{
         this.setState({colorId:item.id})
      }}
       style={[ { justifyContent: 'center',margin:4 }]} >
                  <View
                  style={{width:70,alignItems:'center',justifyContent:'center',margin:10,height:30,borderRadius:10,borderWidth:1,backgroundColor:item.id==colorId?'#383B43':'#F0F2F5',borderColor:'#707070'}}>
                   <Text style={{color:item.id==colorId?'#FFCF06':'#707070',fontSize:14,}}>{item.name}</Text>
                  </View>
      </TouchableOpacity>
   )
}

renderFavorite(){
   return(
      <View style={{flex:0.3}}>
                   <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:10}}>
                        {this.state.flag_fav==1?
                        <Icon name="heart" size={25} color="#FFCF01"
                        onPress={()=>{
                           if(this.state.flag_fav==1){
                              this.setState({flag_fav:2})
                           }else{
                              this.setState({flag_fav:1})
                           }
                        }}
                        style={{margin:5}}/>
                        :
                        <Icon name="heart" size={25} color="#707070"
                        onPress={()=>{
                        if(this.state.flag_fav==1){
                              this.setState({flag_fav:2})
                        }else{
                              this.setState({flag_fav:1})
                        }
                        }}
                        style={{margin:5}}/>
                        }
                        <Image source={require('./../../../image/share.png')} style={{ width:27,height:27 ,margin:5}} resizeMode='contain' />

                        </View>
                   </View>
   )
}

    render(){
        const images = [
            this.state.img1,
            this.state.img2,
            this.state.img3,
          ];
        return(
            <View style={ width < 1250 ? {} : styles.container } >
               {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='PRODUCT DETAIL' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Product Detail' iconName='tags' handlerLogin={this.viewLogin}/> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
               
                <View style={width <1250? {}: {flex:1 , flexDirection: 'row'}}>
                   <View style={{ margin:5 , }}>
                     <TouchableOpacity style={width < 1250 ? {width:'98vw',height:'98vw'  } : {width:'30vw',height:'30vw'  } }
                     onPress={()=>this.setState({isVisible:true})}>
                     <ImageSlider
                              loopBothSides={false}
                              autoPlayWithInterval={2000}
                              images={images}
                              resizeMode='contain'
                              style={{ borderRadius: 25 , borderWidth: 0.1 , borderColor: 'gray' , width: '100%' ,}}
                     />
                     </TouchableOpacity>
                     {width < 1250 ? this.renderFavorite() : null}

                   </View>
                   <View style={{flex:2.7 , marginHorizontal: 10}}>
                     <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '90%',alignItems:'center',}]}>
                        <View style={{flex:1}}>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:24,color:'#212121',marginTop:10}]}>
                        Fancy Dress for Women</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:18,color:'#707070',marginTop:5}]}>
                        Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
                        <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:18,color:'#707070',marginTop:10}]}>
                        Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
                        </View>

                        <View style={{margin:7,alignItems:"center",justifyContent:'center'}}>
                        </View>
                     </View>
                     <View style={{width:'100%',height:1,marginTop:30,backgroundColor:'#70707050'}}></View>
                     <View style={{width:'90%',alignItems:'center',justifyContent:'center'}}>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',fontSize:15,color:'#212121',marginTop:10}]}>
                        {this.props.Language=='AR'?'أقتراحات المقاسات':'Size Options'}</Text>
                     <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
                     data={listSize}
                     showsVerticalScrollIndicator={false}
                     horizontal={true}
                     renderItem={({ item }) => this.renderSizeItem(item)}
                     keyExtractor={(item, index) => index.toString()}
                  />
                     
                     </View>
                     <View style={{width:'100%',height:1,marginTop:10,backgroundColor:'#70707050'}}></View>

                     <View style={{width:'90%',marginTop:10,alignItems:'center',justifyContent:'center'}}>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',fontSize:15,color:'#212121',marginTop:10}]}>
                        {this.props.Language=='AR'?'أقتراحات الألوان':'Color Options'}</Text>
                     {/* flat */}
                     <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
                     data={listColor}
                     showsVerticalScrollIndicator={false}
                     horizontal={true}
                     renderItem={({ item }) => this.renderColorItem(item)}
                     keyExtractor={(item, index) => index.toString()}
                  />
                     </View>
                     <View style={{width:'100%',height:1,marginTop:10,backgroundColor:'#70707050'}}></View>
                     
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:15,color:'#212121',marginTop:10}]}>
                        {this.props.Language=='AR'?'ملاحظات ':'Notes'}</Text>
                     <View style={[styles.shadow,{width:'90%',height:80,alignItems:'center',justifyContent:'center',marginTop:10,borderRadius:30,backgroundColor:'#fff'}]}>
                     <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'95%',fontSize:14,color:'#707070'}]}>
                     Fancy Dress for Women Fancy Dress for Women Fancy Dress for Women</Text>
                     </View>   
                     
                     <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 36 }]}>
                        <View>
                           <Text style={{fontSize:15,color:'#212121',}}>
                           Price</Text>
                           <Text style={{fontSize:15,color:'#212121',}}>
                           40.000 KWD</Text>
                        </View>
                                 <TouchableOpacity onPress={()=>alert('Done')} style={[styles.Button, styles.shadow, { marginHorizontal: 20,width: '60%' ,backgroundColor: '#383B43' }]} >
                                    <Text style={{ color: '#FFCF06', fontSize: 18, }}>
                                          {this.props.Language == "AR" ? ' أضافة ألى المحفظة' : 'Add to Card'}
                                    </Text>
                                 </TouchableOpacity>
                              </View>
                   </View>
                   {width >= 1250 ? this.renderFavorite() : null}
                </View>
              {width < 1250 ? null :
               <View style={{width: '80%'}}>
                  <RelatedItems />
                  <LatestStores />
               </View>
              }
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
export default connect(mapStateToProps, {})(ProductDetail)

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
      width: '85%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      marginBottom: 18,
  },
  customImage:{
      width:'100%',
      height:'100%',
      borderBottomRightRadius:50,
      borderBottomLeftRadius:50
  },
  
 });
