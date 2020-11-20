import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ImageBackground,StatusBar, Image, ScrollView,TextInput,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';


const list = [{ id: 1}, { id: 2 }, { id: 3 }]
const listStores = [{ id: 1 }, { id: 2 }]


import { connect } from 'react-redux' // redux

class DriverOrderDetail extends Component{
   constructor(props) {
      super(props);
      this.state = {
          enableScrollViewScroll: false,
          isVisible: false,
          orderState: 1
      };
   }

   
   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>alert('search')}>
           <Icon name="search" size={25} color="#fff" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>#0215478</Text>
  
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

  renderStores(item , index){
      return(
    <View style={{width:'100%',alignItems:'center',justifyContent:'center',marginBottom:5}}>
        <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',alignItems:'center'}]}>
            <View style={{width:60,height:60,borderRadius:60/2,backgroundColor:'#FFCF01',alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#0D0D0D',fontSize:17,fontFamily:'nexa_bold',position:'absolute',bottom:1}}>{index+1}</Text>
            </View>  
            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',position:'absolute',top:0,left:'3%'}}>
             <Icon style={{}} name="map-marker" size={20} color="#383B43"/>
            </View> 
            <View style={{flex:1,alignItems:'center',marginTop:'6%'}}>
             <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:20,color:'#0D0D0D',fontFamily:'nexa_bold'}]}>
                Fashion Circle Trend</Text>
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:13,color:'#707070',fontFamily:'nexa_light'}]}>
                10 S Brook Street</Text>
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:13,marginTop:3,color:'#707070',fontFamily:'nexa_light'}]}>
                Plainview ,NY 125458</Text>
            </View>
            <View style={{ width:100,height:100,alignItems:'center',justifyContent:'center'}}>
             <Image
               source={require('./../../../image/map.png')}
               style={{  width: '100%', height: '100%',borderRadius:10}} />
               <Icon style={{position:'absolute'}} name="map-marker" size={30} color="#383B43"/>
            </View>
        </View>
         <View style={{width:'100%',height:1,backgroundColor:'#70707021',marginTop:10}}></View>
        </View>
      )
  }

  
    renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         // onPress={() => this.props.navigation.navigate('ProjectInfo')} 
         key={index.toString()} style={[ { justifyContent: 'center',margin:4 }]} >
               <View style={[styles.shadow,this.props.Language=='AR'?styles.rowReversed:styles.row,{ width: '100%', height: height*0.12,alignItems:'center', borderRadius:10 ,backgroundColor:'#fff'}]}>
                  <Image source={require('./../../../image/order.png')}
                  style={{ width: 90, height: '85%', borderRadius:5,margin:5}} />
                  <View style={{flex:1,height:'99%',justifyContent:'center'}}>
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:15,color:'#212121',fontFamily:'nexa_bold',margin:3}]}>
                   Product Name</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:13,color:'#707070',fontFamily:'nexa_light',margin:3}]}>
                   Size : Small</Text>
                   <Text style={[this.props.Language=='AR'?styles.right:styles.left,{fontSize:13,color:'#707070',fontFamily:'nexa_light',margin:3}]}>
                   Color : Brown</Text>
                  </View>
                   <Text style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{fontSize:13,color:'#707070',fontFamily:'nexa_light',position:'absolute',bottom:10}]}>
                   Quantity : 4</Text>
               </View>
         </TouchableOpacity>
      )
   }
 


   render(){
      titleAr1='هل أنت متأكد أنك تريد البدء في تسليم هذا الطلب؟'
      titleAr2='هل تريد بالتأكيد وضع علامة على هذا الطلب على أنه تم تسليمه؟'
      titleEn1='Are you sure you want to start delivering this order ?'
      titleEn2='Are you sure you want to mark this order as Delivered ?'
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
             {this.renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
               <View style={{width:width , height:'100%',alignItems:'center',justifyContent:'center'}}>
               <View style={{ width: '97%', height: height/4, alignItems:'center',justifyContent:'center',borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFF',marginTop:10 }}>
               <ImageBackground
               resizeMode ="cover"
               source={require('./../../../image/test.png')}
               style={{  width: width, height: '100%', alignItems: 'center', borderRadius:10}} />
              <LinearGradient colors={['#1E1E1E','#353535']} style={styles.linearGradient}/>
               <Text style={{fontSize:24,color:'#FFF',position: 'absolute',fontFamily:'nexa_bold'}}>
                2 Stores</Text>
              </View>
                <View style={{width:'100%',alignItems:'center'}}>
                 <FlatList style={{ width: '90%',marginTop:15}}
                data={listStores}
                showsVerticalScrollIndicator={false}
                renderItem={({ item , index}) => this.renderStores(item ,index)}
                keyExtractor={(item, index) => index.toString()}
              />
             </View>
               
             <View style={{width:'90%',alignItems:'center'}}>
              {/* <FlatList style={{ width: '90%',marginTop:15}}
                data={listStores}
                showsVerticalScrollIndicator={false}
                renderItem={({ item , index}) => this.renderItem(item ,index)}
                keyExtractor={(item, index) => index.toString()}
              /> */}
               {
                  list.map((item, index) => {
                     return this.renderItem(index)
                  })
               }
             </View>

             <View style={[this.state.Language=='AR'?styles.rowReversed:styles.row,styles.shadow,{width:'90%',alignItems:'center',padding:7,backgroundColor:'#fff',marginTop:15,borderRadius:10}]}>
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color:'#FFCF01',fontSize:15,fontFamily:'nexa_bold'}]}> John Dio</Text>
              <Text style={{textAlign:'center',color:'#707070',fontSize:12,fontFamily:'nexa_bold',paddingHorizontal:10}}> + 00215488858</Text>
            <View style={{width:40,height:40,borderRadius:40/2,backgroundColor:'#383B44',alignItems:'center',justifyContent:'center'}}>
             <Icon style={{}} name="phone" size={25} color="#FFCF06"/>
            </View>
             </View>

             <View style={[this.state.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',marginTop:40,}]}>
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color:'#212121',fontSize:17,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'عنوان العميل':'Client Address'}</Text>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
             <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:16,color:'#707070',fontFamily:'nexa_light'}]}>
                10 S Brook Street</Text>
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:16,marginTop:3,color:'#707070',fontFamily:'nexa_light'}]}>
                Plainview ,NY 125458</Text>
            </View>
            <View style={{width:40,height:40,borderRadius:40/2,backgroundColor:'#383B44',alignItems:'center',justifyContent:'center'}}>
             <Icon style={{}} name="map-marker" size={25} color="#FFCF06"/>
            </View>
             </View>
              <View style={{width:'100%',height:1,backgroundColor:'#70707021',marginTop:10}}></View>
              <View style={[this.state.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',marginTop:20,}]}>
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color:'#212121',fontSize:17,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'مدة التسليم':'Delivery Period'}</Text>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
             <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:16,color:'#707070',fontFamily:'nexa_light'}]}>
                8 to 12 hours</Text>
            </View>
             </View>
            <View style={{width:'100%',height:1,backgroundColor:'#70707021',marginTop:10}}></View>
              <View style={[this.state.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',marginTop:20,}]}>
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,color:'#212121',fontSize:17,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'عنوان العميل':'Due Amount'}</Text>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
             <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:16,color:'#707070',fontFamily:'nexa_light'}]}>
                250 KD</Text>
            </View>
             </View>
              
            <View style={[this.state.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',justifyContent:'center',marginTop:25,}]}>
            
               <TouchableOpacity onPress={() => { 
                  this.setState({orderState:1})
                  this.setState({isVisible:true})
                }} style={[styles.Button, styles.shadow, { backgroundColor: '#FFCF01',paddingVertical: 20,width:'45%' }]} >
                 <Text style={{ color: '#383B43', fontSize: 18,fontFamily:'nexa_bold', }}>
                   {this.props.Language == "AR" ? 'أبدأ المهمة' : 'Start Task'}
                  </Text>
              </TouchableOpacity> 

             <TouchableOpacity onPress={() => { 
                this.setState({orderState:2})
                this.setState({isVisible:true})
              }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43', paddingVertical: 20,width:'45%' }]} >
                <Text style={{ color: '#FFCF06', fontSize: 18,fontFamily:'nexa_bold', }}>
                {this.props.Language == "AR" ? 'تم التسليم' : 'Delivered'}
                 </Text>
            </TouchableOpacity>
            </View>
            
            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left">
          <View style={styles.modal}>
          <View style={{width: '100%',height:'95%',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:8}}>
             {this.state.orderState ==1?
              <Text style={{ width: '45%',textAlign:'center',color:'#707070', fontSize:17,fontFamily:'nexa_bold',margin:5}}>
              {this.props.Language == "AR" ? titleAr1 : titleEn1}
              </Text>
             :
             <Text style={{ width: '45%',textAlign:'center',color:'#707070', fontSize:17,fontFamily:'nexa_bold',margin:5}}>
             {this.props.Language == "AR" ? titleAr2 : titleEn2}
             </Text>
             }
            
            <View style={[this.state.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',justifyContent:'center',marginTop:25,}]}>
            
               <TouchableOpacity onPress={() => { 
                  this.setState({isVisible:false})
                }} style={[styles.Button, styles.shadow, { backgroundColor: '#FFCF01',paddingVertical: 10,width:'30%' }]} >
                 <Text style={{ color: '#383B43', fontSize: 18,fontFamily:'nexa_bold', }}>
                   {this.props.Language == "AR" ? 'نعم' : 'Yes'}
                  </Text>
              </TouchableOpacity> 

             <TouchableOpacity onPress={() => { 
                this.setState({isVisible:false})
              }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43',paddingVertical: 10,width:'30%' }]} >
                <Text style={{ color: '#FFCF06', fontSize: 18,fontFamily:'nexa_bold', }}>
                {this.props.Language == "AR" ? 'لا' : 'No'}
                 </Text>
            </TouchableOpacity>
            </View>

          </View>
            
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
    }
 }
export default connect(mapStateToProps, {})(DriverOrderDetail)

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
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      margin:7,
      marginBottom: 10,
  },
  modal:{
   width:'100%',
   height:'50%',
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'#FFCF01',
   borderRadius:8,
 },

 });
