import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,TextInput,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Modal from 'react-native-modal';
import ImageSlider from 'react-native-image-slider';
import { SliderBox } from "react-native-image-slider-box";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';



import { connect } from 'react-redux' // redux

class ProductDetail extends Component{
   constructor(props) {
      super(props);
      this.state = {
         Processing: false,
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
         images:[],
         data:{},
         listSize: [],
         listColor: []

      };
   }


   UNSAFE_componentWillMount(){
          this.getDetail()
   }

  getDetail = () => {
      const { navigation } = this.props;
      const id = navigation.getParam('ID', 'NO-ID');
      NetInfo.fetch().then(state =>{
         if (state.isConnected){
       try {
           this.setState({Processing: true})
           axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/product/detail/'+id+'/',{
            headers: {
               'Authorization': 'Token '+this.props.User.token
             }
           })
           .then((response)=> {
            this.setState({Processing: false})
               const Data = response.data;
               var images =[]
               Data.images.forEach(element => {
                    const img = 'http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com'+ element
                    images.push(img)
               });
               this.setState({images})
               const data = {
                  id: Data.id,
                  favourite: Data.favourite,
                  name: Data.name,
                  describtion: Data.describtion,
                  image: Data.image,
                  size: Data.size,
                  color: Data.color,
                  quantity: Data.quantity,
                  price: Data.price,
                  discount: Data.discount,
                  notes: Data.notes,
                  sub_category: Data.sub_category,
                  category: Data.category,
                  location: Data.location
               }
               const obj1={
                  id: 1,
                  name: Data.size
               }
               const obj2={
                  id: 1,
                  name: Data.color
               }
               this.state.listSize.push(obj1)
               this.state.listColor.push(obj2)
               
             this.setState({data})
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

addToFav = (product ) => {
   NetInfo.fetch().then(state =>{
       if (state.isConnected){
   try {
       axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/product/add_to_favourite/', {
         product
       },
       { 
         headers: {
           'Authorization': 'Token '+this.props.User.token
         }
           }).then((response)=> {
           if(response.data.detail){
               
               if(this.props.Language=='AR'){
                  alert('تمت الأضافة ألى المفضلة')
                }else{
                  alert(response.data.detail)
                }
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
    
addToCart = (product ) => {
   NetInfo.fetch().then(state =>{
       if (state.isConnected){
        this.setState({Processing: true})
   try {
       axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/cart/add_to_cart/', {
         product,
         quantity: 1
       },
       { 
         headers: {
           'Authorization': 'Token '+this.props.User.token
         }
           }).then((response)=> {
        this.setState({Processing: false})
           if(response.data){
            if(this.props.Language=='AR'){
               alert('تم الأضافة الي المحفظة')
             }else{
               alert('Added to Cart done')
             }
           }
              
       }).catch((error)=> {
        this.setState({Processing: false})
        if(error.response.data.error){
         alert(error.response.data.error)
        }else{
         alert(error)
        }
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

   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Cart')}>
           <Icon name="shopping-cart" size={30} color="#FFCF01" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.state.data.name}</Text>
  
           {this.props.Language=='AR'?
              <TouchableOpacity
              onPress={()=>this.props.navigation.goBack()}>
             <Icon name="angle-right" size={30} color="#fff" style={{}} />
             </TouchableOpacity>
              :
              <TouchableOpacity
              onPress={()=>this.props.navigation.goBack()}>
             <Icon name="angle-left" size={30} color="#fff" style={{}} />
             </TouchableOpacity>
              }
         </View>
      )
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
                   <Text style={{color:item.id==sizeId?'#FFCF06':'#707070',fontSize:14,fontFamily:'nexa_bold'}}>{item.name}</Text>
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
                   <Text style={{color:item.id==colorId?'#FFCF06':'#707070',fontSize:14,fontFamily:'nexa_bold'}}>{item.name}</Text>
                  </View>
      </TouchableOpacity>
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
             {this.renderHeader()}
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
               <View style={{width:width , alignItems:'center',justifyContent:'center'}}>
                 {/* <SliderBox
                  images={images}
                  sliderBoxHeight={height*0.3}
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                  autoplay
                  circleLoop
                  resizeMode={'cover'}
                //  dotStyle={{width: 10,height: 10,borderRadius: 5,marginHorizontal: 0,backgroundColor: "rgba(128, 128, 128, 0.92)"}}
                 ImageComponentStyle={{borderBottomLeftRadius:50,borderBottomRightRadius:50,height:height*0.3 ,width: '100%'}}
                imageLoadingColor="#2196F3"
                /> */}
                <TouchableOpacity style={{width:'100%',height:250}}
                onPress={()=>this.setState({isVisible:true})}>
                 <ImageSlider
                        loopBothSides={false}
                         autoPlayWithInterval={2000}
                         images={this.state.images}
                        //  customSlide={({ index, item, style, width }) => (
                        // <View key={index} style={[style,{width:'100%' , height:'100%'}]}>
                        //  <Image source={{ uri: item }} style={styles.customImage} />
                        // </View>
                        // )}
                 />
                 </TouchableOpacity>
                 <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '90%',alignItems:'center',marginTop:20}]}>
                  <View style={{flex:1}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:15,color:'#212121',fontFamily:'nexa_bold',marginTop:10}]}>
                   {this.state.data.name}</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:13,color:'#707070',fontFamily:'nexa_light',marginTop:5}]}>
                   {this.state.data.describtion}</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:13,color:'#707070',fontFamily:'nexa_light',marginTop:10}]}>
                   {this.state.data.notes}</Text>
                  </View>

                  <View style={{margin:7,alignItems:"center",justifyContent:'center'}}>
                  <Text style={{fontSize:15,color:'#212121',fontFamily:'nexa_bold'}}>
                  {this.state.data.price}</Text>
                   <Text style={{fontSize:15,color:'#212121',fontFamily:'nexa_bold'}}>
                   K.D.</Text>
                   <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:10}}>
                   {this.state.data.favourite?
                   <Icon name="heart" size={25} color="#FFCF01"
                    style={{margin:5}}/>
                  :
                  <Icon name="heart" size={25} color="#707070"
                  onPress={()=>{
                   this.addToFav(this.state.data.id)
                  }}
                  style={{margin:5}}/>
                  }
                   {/* <Icon name="heart" size={25} color="#707070" style={{margin:5}}/> */}
                   <Image source={require('./../../../image/share.png')} style={{ width:27,height:27 ,margin:5}} resizeMode='contain' />

                   </View>
                  </View>
               </View>
               <View style={{width:'100%',height:1,marginTop:30,backgroundColor:'#70707050'}}></View>
               <View style={{width:'90%',alignItems:'center',justifyContent:'center'}}>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',fontSize:15,color:'#212121',fontFamily:'nexa_bold',marginTop:10}]}>
                   {this.props.Language=='AR'?'أقتراحات المقاسات':'Size Options'}</Text>
               {/* flat */}
               <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
               data={this.state.listSize}
               showsVerticalScrollIndicator={false}
               horizontal={true}
               renderItem={({ item }) => this.renderSizeItem(item)}
               keyExtractor={(item, index) => index.toString()}
             />
               
               </View>
               <View style={{width:'100%',height:1,marginTop:10,backgroundColor:'#70707050'}}></View>

               <View style={{width:'90%',marginTop:10,alignItems:'center',justifyContent:'center'}}>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',fontSize:15,color:'#212121',fontFamily:'nexa_bold',marginTop:10}]}>
                   {this.props.Language=='AR'?'أقتراحات الألوان':'Color Options'}</Text>
               {/* flat */}
               <FlatList style={{ width: '98%',marginTop:20,marginBottom:5}}
               data={this.state.listColor}
               showsVerticalScrollIndicator={false}
               horizontal={true}
               renderItem={({ item }) => this.renderColorItem(item)}
               keyExtractor={(item, index) => index.toString()}
             />
               </View>
               <View style={{width:'100%',height:1,marginTop:10,backgroundColor:'#70707050'}}></View>
               
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:15,color:'#212121',fontFamily:'nexa_bold',marginTop:10}]}>
                   {this.props.Language=='AR'?'ملاحظات ':'Notes'}</Text>
                <View style={[styles.shadow,{width:'90%',height:80,alignItems:'center',justifyContent:'center',marginTop:10,borderRadius:30,backgroundColor:'#fff'}]}>
                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'95%',fontSize:14,color:'#707070',fontFamily:'nexa_light'}]}>
                {this.state.data.notes}</Text>
                </View>   
               
                <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 36 }]}>
                            <TouchableOpacity onPress={()=> this.addToCart(this.state.data.id)} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18,fontFamily:'nexa_bold', }}>
                                    {this.props.Language == "AR" ? ' أضافة ألى المحفظة' : 'Add to Card'}
                                </Text>
                            </TouchableOpacity>
                        </View>

            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left">
          <View style={[styles.modal,{justifyContent:'center'}]}>
            
             <SliderBox
                  images={this.state.images}
                  sliderBoxHeight='100%'
                  dotColor="#FFEE58"
                  inactiveDotColor="#90A4AE"
                  autoplay={false}
                  circleLoop
                  resizeMode={'cover'}
                 dotStyle={{width: 15,height: 15,borderRadius: 15/2,marginHorizontal: 0,backgroundColor: "rgba(128, 128, 128, 0.92)"}}
                 ImageComponentStyle={{borderRadius:10,height:'97%' ,width: '80%'}}
                imageLoadingColor="#2196F3"
                />
         </View>
          </Modal>       
              </View>
           </ScrollView>
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
export default connect(mapStateToProps, {})(ProductDetail)

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
  modal:{
   width:'100%',
   height:'80%',
   alignItems:'center',
   backgroundColor:'#fff',
   borderRadius:10,
   borderColor:'#707070',
   borderWidth:1,
 },
  
 });
