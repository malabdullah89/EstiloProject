/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput,Image, ScrollView  } from 'react-native';
import { Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Section/Header';
import MobileHeader from './../Section/MobileHeader';
import Footer from './../Section/Footer';
import MobileFooter from './../Section/MobileFooter';
import LoginSection from './../Section/LoginSection';
import Drawer from './../Section/Drawer';
import PaymentForm from './../Section/PaymentForm';
import { connect } from 'react-redux'; // redux
import AddNewAddress from './AddNewAddress';
const { width } = Dimensions.get('window')

class Checkout extends Component{
    constructor(props) {
        super(props);
        this.state = {
           add: false,
           cardNumber: '',
           expiricy: '',
           cvc: '',
           creditPayment : false,
            addresses:[
                {
                    label: 'Select Address',
                    value: 1,
                },
                {
                    label: 'Area 1',
                    value: 2,
                },
                {
                    label: 'Area 2',
                    value: 3,
                },
                {
                    label: 'Area 3',
                    value: 4,
                },
            ],
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
            bg3:'#D8D8D8',
            bg2:'#D8D8D8',
            bg1:'#FFCF01',
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
    handleCardNumberChange(text) {
       console.log(text)
    }  
    render(){
        return(
            <View style={styles.container} >
                {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='CHECKOUT' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Checkout' iconName='shopping-cart' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer />
                      :
                      null
                   }
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >

            <View style={[ width < 1250 ? {flexDirection: 'column'} : {flexDirection: 'row' , marginHorizontal: '15vw' }, { flex:3, alignItems:'center' , marginTop: 20 }]}>
                <View style={{ flex:2 ,}}>

                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',fontSize:14,color:'#383B43',}]}>
                {this.props.Language=='AR'?'أختر أو أضف عنوان':'Select Or Add Address'}</Text>
                <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed]}>
                    <TouchableOpacity 
                    onPress={()=>this.setState({add: !this.state.add})}
                    style={{width:40 , height:40 , borderRadius:40/2,backgroundColor:'#FFCF01',alignItems:'center' ,justifyContent:'center',margin:5}}>
                    <Icon style={{}} name="plus" size={20} color="#383B43"/>
                    </TouchableOpacity> 
                    <View style={[this.props.Language=='AR'?styles.padRight:styles.padLeft,{flex:1,alignItems:'center',justifyContent:'center',}]}>
                        <Picker
                            style={{width:'100%',alignItems:'center',color:'#383B43',justifyContent:'center',backgroundColor:'transparent', borderWidth: 0}}
                            itemStyle={{backgroundColor:'#fff',fontSize:14}}
                            onValueChange = {(address) =>{
                            this.setState({ address });}}
                            mode="dropdown" selectedValue = {this.state.address?this.state.address:1}>
                        {
                            this.state.addresses.map((i, index) => (
                            <Picker.Item
                            label = {i.label} value = {i.value} key={i.value} />))}
                            </Picker>
                        </View>  
                </View>
                {this.state.add ? <AddNewAddress navigation={this.props.navigation} /> : null }
                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,fontSize:15,color:'#212121',marginTop:10}]}>
                {this.props.Language=='AR'?'سيتم توصيل طلبك خلال 24 ساعة':'Your Order will be delivery with in 24 hour'}</Text>
                <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:14,color:'#383B43',marginTop:15}]}>
                {this.props.Language=='AR'?'فترة التسليم المفضلة':'Preferred Delivery Period '}</Text>
                <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.searchSection, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2}]} >
                        <View style={[this.props.Language=='AR'?styles.padRight:styles.padLeft,{flex:1,alignItems:'center',justifyContent:'center', paddingVertical: 10}]}>
                        <Picker
                            style={{width:'100%',alignItems:'center',color:'#383B43',justifyContent:'center',backgroundColor:'transparent' , borderWidth: 0}}
                            itemStyle={{backgroundColor:'#fff',}}
                            onValueChange = {(period) =>{
                            this.setState({ period });}}
                            mode="dropdown" selectedValue = {this.state.period?this.state.period:1}>
                        {
                            this.state.periods.map((i, index) => (
                            <Picker.Item
                            label = {i.label} value = {i.value} key={i.value} />))}
                            </Picker>
                        </View>  
                    </View>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'90%',fontSize:14,color:'#383B43',marginTop:20}]}>
                {this.props.Language=='AR'?'ملاحظات االتسليم':'Delivery Note '}</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    textAlign={this.props.Language=='AR'?'right':'left'}
                    onChangeText={(searchString) => {this.setState({searchString})}}
                    underlineColorAndroid="transparent"
                />
                    <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed,{marginTop:30}]}>
                    <TextInput
                    style={{flex:1,paddingHorizontal:10, paddingVertical: 15,fontSize:15 , outline: 'none'}}
                    placeholder="Enter Promo Code"
                    textAlign={this.props.Language=='AR'?'right':'left'}
                    onChangeText={(searchString) => {this.setState({searchString})}}
                    underlineColorAndroid="transparent"
                />
                </View>
                <View style={[styles.searchSection,this.props.Language=='AR'?styles.row:styles.rowReversed,{marginTop:20 , padding:10}]}>
                    <View style={{width:75 , height:40 , borderRadius:30,backgroundColor:'#FFCF01',alignItems:'center' ,justifyContent:'center',margin:5}}>
                    <Text style={{fontSize:14,textAlign:'center',color:'#383B43',}}>
                    {this.props.Language=='AR'?'تخليص':'Redeem'}</Text>
                    </View> 
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{flex:1,paddingHorizontal:10,fontSize:14,color:'#383B43',}]}>
                    {this.props.Language=='AR'?'ملاحظات االتسليم':'You Have 200 Points'}</Text>
                </View>
                </View>

                <View style={{flex:1}}>

        <View style={ [styles.shadow,{ flex:1 , backgroundColor: 'white' , alignItems:'stretch', borderRadius: 10 , margin: 20}]}>

               <View style={{alignItems:'center',marginTop:30}}>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center'}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,margin:5}}>
                      {this.props.Language == "AR" ? 'الأجمالى الخزئـى :' : 'Sub-Total :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,margin:5}]}>
                     400 KWD</Text>
                </View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center'}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,margin:5}}>
                      {this.props.Language == "AR" ? ' رسوم التوصـبل :' : 'Delivery Fees :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,margin:5}]}>
                     20 KWD</Text>
                </View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'90%',alignItems:'center',}]}>
                  <Text style={{flex:1,color:'#212121', fontSize:15,margin:5}}>
                      {this.props.Language == "AR" ? ' المبلغ الإجمالي :' : 'Total amount :'}</Text>
                  <Text style={[this.props.Language=='AR'?styles.left:styles.right,{flex:1,color:'#212121', fontSize:14,margin:5}]}>
                     420 KWD</Text>
                </View>
              </View>

              <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'100%',marginTop:10,padding:5,alignItems:'center',backgroundColor:'#383B43'}]}>
                  <Text style={{flex:2,color:'#FFFFFF', fontSize:14,paddingHorizontal:'5%'}}>
                      {this.props.Language == "AR" ? ' السعر بعد الخصم :' : 'Price after discount :'}</Text>
                  <Text style={{flex:1,textAlign:'right',color:'#FFCF06', paddingHorizontal:'5%',fontSize:14,margin:5}}>
                     350 KWD</Text>
                </View>
        </View>

        <View style={{ flex:1 }}>

            <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',fontSize:14,color:'#383B43',marginTop:15}]}>
            {this.props.Language=='AR'?'أختر طريقة الدفع':'Select Payment Method'}</Text>
            <View style={[this.props.Language=='AR'?styles.rowReversed:styles.column,{flex:4,marginTop:20,padding:5,alignItems:'stretch',justifyContent:'center'}]}>
            <TouchableOpacity 
                    onPress={()=>{
                        this.setState({bg2:'#D8D8D8' , bg1:'#FFCF01' , bg3:'#D8D8D8', creditPayment: false  })
                    }}>
                <View style={{flex:1,flexDirection:'row',margin:'3%' , borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg1  , paddingVertical: 10}}>
                    <View style={[styles.flex , {alignItems: 'center'}]}>
                        <Image source={require('./../../../image/cash.png')} style={{ width:60,height:60 }} resizeMode='contain'/>
                    </View>
                    <View style={styles.flex}>
                        <Text style={{flex:1,textAlign:'left',color:'#383B43',fontSize:14,}}>
                        Cash</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                    onPress={()=>{
                        this.setState({bg1:'#D8D8D8' , bg2:'#FFCF01' , bg3:'#D8D8D8', creditPayment: false })
                    }}>
                <View style={{flex:1,flexDirection:'row',margin:'3%' , borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg2  , paddingVertical: 10}}>
                    <View style={[styles.flex , {alignItems: 'center'}]}>
                        <Image source={require('./../../../image/net.png')} style={{ width:60,height:60 }} resizeMode='contain'/>
                    </View>
                    <View style={styles.flex}>
                        <Text style={{flex:1,textAlign:'left',color:'#383B43',fontSize:14,}}>
                        K-Net</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                    onPress={()=>{
                        this.setState({bg1:'#D8D8D8' , bg2:'#D8D8D8' ,bg3:'#FFCF01' , creditPayment: true })
                    }}>
                <View style={{flex:1,flexDirection:'row',margin:'3%' , borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg3  , paddingVertical: 10}}>
                    <View style={[styles.flex , {alignItems: 'center'}]}>
                        <Image source={require('./../../../image/credit.png')} style={{ width:60,height:60 }} resizeMode='contain'/>
                    </View>
                    <View style={styles.flex}>
                        <Text style={{flex:1,textAlign:'left',color:'#383B43',fontSize:14}}>
                        Credit Card</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>

        </View>
            </View>
                </View>
            </ScrollView>
            {this.state.creditPayment ? 
            <View style={[ styles.shadow , {alignSelf: 'center' , backgroundColor: 'white' , paddingHorizontal: 30 , paddingVertical: 20 , borderRadius: 20 , margin: 20}]}>
               <PaymentForm navigation={this.props.navigation} />
            </View>
            : null
    }
            {width < 1250 ? <MobileFooter /> : <Footer /> }
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
export default connect(mapStateToProps, {})(Checkout)

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
 image: {
    width: 120,
    height: 70
},
 });
