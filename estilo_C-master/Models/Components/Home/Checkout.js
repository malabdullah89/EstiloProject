import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, TextInput,Image, ScrollView,FlatList, AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Input, Item , Picker} from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux' // redux
const list = [{ id: 1 }, { id: 2 }, { id: 3 }]

class Checkout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            locations:[],
            periods:[
                {
                    label: '2 Hours to 4 Hours',
                    value: 1,
                },
                {
                    label: '4 Hours to 8 Hours',
                    value: 2,
                },
                {
                    label: '8 Hours to 12 Hours',
                    value: 3,
                },
            ],
            address: null,
            period: null,
            color1:'#707070',
            color2:'#707070',
            bg3:'#D8D8D8',
            bg2:'#D8D8D8',
            bg1:'#FFCF01',
            point: null,
            payment_method:'cash',
            check:{}
        };
    }

    UNSAFE_componentWillMount= async()=>{
        this.getUserLocation(this.props.User.token)
        const { navigation } = this.props;
        const check = navigation.getParam('Check');
        const obj = JSON.parse(check);
        this.setState({ check: obj })
        const point = await AsyncStorage.getItem('UserPoint')
        if(point){
            this.setState({point})
        }
        
     }

     getUserLocation = (Token) => {
        NetInfo.fetch().then(state =>{
           if (state.isConnected){
         try {
             this.setState({Processing: true})
             axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/location/',{
              headers: {
                 'Authorization': 'Token '+Token
               }
             })
             .then((response)=> {
                 this.setState({Processing: false})
                 const Data = response.data.list;
                 const locations = []
                 for (let index = 0; index < Data.length; index++) {
                var obj = {
                    id: Data[index].id,
                    location_name: Data[index].location_name,
                    area: Data[index].area,
                }
                locations.push(obj)
            }
             this.setState({locations})
             }).catch((error)=> {
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

  checkOut = (Token) => {
    NetInfo.fetch().then(state =>{
       if (state.isConnected){
     try {
         this.setState({Processing: true})
         axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/order/checkout',{
            payment_method: this.state.payment_method
         },{
          headers: {
             'Authorization': 'Token '+Token
           }
         })
         .then((response)=> {
             this.setState({Processing: false})
             if(response.data.Item){
                this.props.navigation.navigate('CheckoutDone')
             }
            
         }).catch((error)=> {
          this.setState({Processing: false})
            this.props.navigation.navigate('CheckoutFail')
           
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

   

   renderHeader() {
      return (
         <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
           <View style={{justifyContent:'center',margin:5,}}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Cart')}>
           <Icon2 name="shopping-cart" size={30} color="#FFCF01" style={{}} />
           </TouchableOpacity>
           
           </View>
           <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'الدفــع':'Ckeckout'}</Text>
  
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style={{width:width ,flex:1, alignItems:'center'}}>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:14,color:'#383B43',fontFamily:'nexa_bold',marginTop:15}]}>
            {this.props.Language=='AR'?'أختر أو أضف عنوان':'Select Or Add Address'}</Text>
            <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed]}>
                 <TouchableOpacity 
                 onPress={()=>this.props.navigation.navigate('AddNewAddress')}
                 style={{width:40 , height:40 , borderRadius:40/2,backgroundColor:'#FFCF01',alignItems:'center' ,justifyContent:'center',margin:5}}>
                 <Icon style={{}} name="plus" size={20} color="#383B43"/>
                 </TouchableOpacity> 
                  <View style={[this.props.Language=='AR'?styles.padRight:styles.padLeft,{flex:1,alignItems:'center',justifyContent:'center',}]}>
                      
                <ModalDropdown
                   options={this.state.locations} // data
                   defaultValue={this.props.Language=='AR'?'أختار الموقع':'Select Address'}
                   onSelect={(index, value) => { 
                     this.setState({ address: value.id ,color1:'#000'}) 
                    }}
                   renderButtonText={(rowData) =>(rowData.location_name)} // ba3d ma t5tar
                   style={{ width:'90%',}} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color1,fontFamily:'adobe'}]}
                  dropdownStyle={[styles.shadow,{ width: '50%', height:150,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted){
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 16, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                     {rowData.location_name}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />    
                     </View>  
               </View>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:15,color:'#212121',fontFamily:'nexa_light',marginTop:10}]}>
               {this.props.Language=='AR'?'سيتم توصيل طلبك خلال 24 ساعة':'Your Order will be delivery with in 24 hour'}</Text>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:14,color:'#383B43',fontFamily:'nexa_bold',marginTop:15}]}>
               {this.props.Language=='AR'?'فترة التسليم المفضلة':'Preferred Delivery Period '}</Text>
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.searchSection, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2}]} >
                        <Icon2 name="angle-down" size={20} color="#707070" style={{margin:10,paddingHorizontal:10}} />
                       <View style={[this.props.Language=='AR'?styles.padRight:styles.padLeft,{flex:1,alignItems:'center',justifyContent:'center'}]}>
                       {/* <Picker
                         style={{width:'100%',alignItems:'center',color:'#383B43',justifyContent:'center',fontFamily:'segoe',backgroundColor:'transparent'}}
                        itemStyle={{backgroundColor:'#fff',fontFamily:'segoe',}}
                        onValueChange = {(period) =>{
                           this.setState({ period });}}
                          mode="dropdown" selectedValue = {this.state.period?this.state.period:1}>
                       {
                         this.state.periods.map((i, index) => (
                        <Picker.Item
                          label = {i.label} value = {i.value} key={i.value} />))}
                           </Picker> */}

                    <ModalDropdown
                   options={this.state.periods} // data
                   defaultValue={this.props.Language=='AR'?'أختار الوقــت':'Select Time'}
                   onSelect={(index, value) => { 
                     this.setState({ period: value.value ,color2:'#000'}) 
                    }}
                   renderButtonText={(rowData) =>(rowData.label)} // ba3d ma t5tar
                   style={{ width:'90%',}} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color2,fontFamily:'adobe'}]}
                  dropdownStyle={[styles.shadow,{ width: '50%', height:150,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted){
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 16, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                     {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />    
                          
                     </View>  
                 </View>
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:14,color:'#383B43',fontFamily:'nexa_bold',marginTop:20}]}>
               {this.props.Language=='AR'?'ملاحظات االتسليم':'Delivery Note '}</Text>
               <TextInput
                   style={styles.input}
                   textAlign={this.props.Language=='AR'?'right':'left'}
                   onChangeText={(searchString) => {this.setState({searchString})}}
                   underlineColorAndroid="transparent"
               />
                <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed,{marginTop:30}]}>
                 <View style={{width:75 , height:40 , borderRadius:30,backgroundColor:'#FFCF01',alignItems:'center' ,justifyContent:'center',margin:5}}>
                 <Text style={{fontSize:14,textAlign:'center',color:'#383B43',fontFamily:'nexa_bold',}}>
                {this.props.Language=='AR'?'تنفيـذ':'Apply'}</Text>
                 </View> 
                 <TextInput
                   style={{flex:1,paddingHorizontal:10,fontSize:15}}
                   placeholder="Enter Promo Code"
                   textAlign={this.props.Language=='AR'?'right':'left'}
                   onChangeText={(searchString) => {this.setState({searchString})}}
                   underlineColorAndroid="transparent"
               />
               </View>
               <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed,{marginTop:20}]}>
                
                 <View style={{width:75 , height:40 , borderRadius:30,backgroundColor:this.state.point>=200?'#FFCF01':'#A6A7A8',alignItems:'center' ,justifyContent:'center',margin:5}}>
                 <Text style={{fontSize:14,textAlign:'center',color:'#383B43',fontFamily:'nexa_bold',}}>
                   {this.props.Language=='AR'?'تخليص':'Redeem'}</Text>
                 </View> 
                 {this.state.point == 0?
                  <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,paddingHorizontal:10,fontSize:14,color:'#383B43',fontFamily:'nexa_light'}]}>
                  {this.props.Language=='AR'?'تـم نفاذ نقاطــك':'You points has been Redeemed!'}</Text>
                 :
                 this.props.Language=='AR'?
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,paddingHorizontal:10,fontSize:14,color:'#383B43',fontFamily:'nexa_light'}]}>
                 لديــك {this.state.point} نقطــة</Text>
                 :
                 <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,paddingHorizontal:10,fontSize:14,color:'#383B43',fontFamily:'nexa_light'}]}>
                 You have {this.state.point} points</Text>
                 
                 }
                
             
               </View>
               <View style={{width:'90%',alignItems:'center',marginTop:30}}>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center'}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? 'الأجمالى الخزئـى :' : 'Sub-Total :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,fontFamily:'nexa_light',margin:5}]}>
                     {this.state.check.sub_total}</Text>
                </View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center'}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? ' رسوم التوصـبل :' : 'Delivery Fees :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,fontFamily:'nexa_light',margin:5}]}>
                  {this.state.check.delivery_fee}</Text>
                </View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,fontFamily:'nexa_bold',margin:5}}>
                      {this.props.Language == "AR" ? ' المبلغ الإجمالي :' : 'Total amount :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,fontFamily:'nexa_light',margin:5}]}>
                  {this.state.check.total_amount}</Text>
                </View>
              </View>

              <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',marginTop:10,padding:5,alignItems:'center',backgroundColor:'#383B43'}]}>
                  <Text style={{flex:2,color:'#FFFFFF', fontSize:14,fontFamily:'nexa_bold',paddingHorizontal:'5%'}}>
                      {this.props.Language == "AR" ? ' السعر بعد الخصم :' : 'Price after discount :'}</Text>
                  <Text style={{flex:1,textAlign:'right',color:'#FFCF06', paddingHorizontal:'5%',fontSize:14,fontFamily:'nexa_light',margin:5}}>
                     350 KWD</Text>
                </View>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:14,color:'#383B43',fontFamily:'nexa_bold',marginTop:15}]}>
            {this.props.Language=='AR'?'أختر طريقة الدفع':'Select Payment Method'}</Text>
            <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',marginTop:20,padding:5,alignItems:'center',justifyContent:'center'}]}>
            <TouchableOpacity 
            onPress={()=>{
                this.setState({bg1:'#FFCF01' , bg2:'#D8D8D8' , bg3:'#D8D8D8' })
                this.setState({payment_method:'cash'})
            }}
            style={{flex:1,margin:'3%' ,height:100 ,borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg1}}>
              <Image source={require('./../../../image/cash.png')} style={{ width:50,height:50,position:'absolute',top:10}} resizeMode='contain'/>
              <Text style={{flex:1,textAlign:'right',color:'#383B43',fontSize:14,fontFamily:'nexa_light',position:'absolute',bottom:10}}>
              Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>{
                this.setState({bg1:'#D8D8D8' , bg2:'#FFCF01' , bg3:'#D8D8D8' })
                this.setState({payment_method:'k_net'})
            }}
            style={{flex:1,margin:'3%' ,height:100 , borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg2}}>
            <Image source={require('./../../../image/net.png')} style={{ width:50,height:50,position:'absolute',top:10}} resizeMode='contain'/>
            <Text style={{flex:1,textAlign:'right',color:'#383B43',fontSize:14,fontFamily:'nexa_light',position:'absolute',bottom:10}}>
              K-Net</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>{
                this.setState({bg1:'#D8D8D8' , bg2:'#D8D8D8' , bg3:'#FFCF01' })
                this.setState({payment_method:'credit_card'})
            }}
            style={{flex:1,margin:'3%' ,height:100 , borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg3}}>
            <Image source={require('./../../../image/credit.png')} style={{ width:50,height:50,position:'absolute',top:10}} resizeMode='contain'/>
            <Text style={{flex:1,textAlign:'right',color:'#383B43',fontSize:14,fontFamily:'nexa_light',position:'absolute',bottom:10}}>
              Credit Card</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { this.checkOut(this.props.User.token) }} 
            style={[styles.Button, styles.shadow, { backgroundColor: '#383B43',marginBottom:20 }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20,fontFamily:'nexa_bold', }}>
                      {this.props.Language == "AR" ? 'أدفع الأن' : 'Pay Now'}
                     </Text>
                  </TouchableOpacity>
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
       Processing: state.AuthReducer.Processing,
      Message: state.AuthReducer.Message,
      User: state.AuthReducer.User,
    }
 }
export default connect(mapStateToProps, {})(Checkout)

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
   right:{
      textAlign:'right'
   },
   left:{
      textAlign:'left'
   },
   searchSection: {
    width:'90%',
    borderRadius:60,
    borderColor:'#707070',
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
},
input: {
  width:'90%',
  height:100,
  fontSize:14,
  marginTop:5,
  borderColor:'#707070',
  borderRadius:7,
  paddingHorizontal:10,
  borderWidth:2,
  color: '#383B43',
  textAlignVertical:'top',
  fontFamily:'nexa_bold'
},
Button: {
    width: '35%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 15,
    marginHorizontal: 36
},
padRight:{
    marginStart:'40%'
},
padLeft:{
    paddingHorizontal:10
}
 });
