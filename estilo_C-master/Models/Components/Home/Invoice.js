import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView,TextInput,FlatList } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'


import { connect } from 'react-redux' // redux

class Invoice extends Component{
   constructor(props) {
      super(props);
      this.state = {
        flag_btn: 1,
      };
   }


   renderHeader() {
    return (
       <View style={[this.props.Language=='AR'? styles.rowReversed:styles.row, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
         <View style={{justifyContent:'center',margin:5,}}>
         {this.props.Language=='AR'?
             <TouchableOpacity
             onPress={()=>this.props.navigation.goBack()}>
            <Icon name="angle-right" size={30} color="#fff" style={{margin:5}} />
            </TouchableOpacity>
             :
             <TouchableOpacity
             onPress={()=>this.props.navigation.goBack()}>
            <Icon name="angle-left" size={30} color="#fff" style={{margin:5}} />
            </TouchableOpacity>
             }
         
         </View>
         <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'الفاتورة':'Invoice'}</Text>
         <TouchableOpacity style={{width:25}}></TouchableOpacity>
       </View>
    )
}
    
    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
             {this.renderHeader()}
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
               <View style={{width:width , alignItems:'center',}}>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',alignItems:'center',justifyContent:'center',marginTop:10}]}>
                    <View style={{flex:1,alignItems:'center'}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'الوقت / التاريخ':'Data & Time'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>6/5/2020 - 3:00 Pm</Text>
                    </View>
                    <View style={{margin:5}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'رقم الفاتورة':'Invoice ID'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>21548587</Text>
                    </View>
                </View>
                <View style={{width:'92%',marginTop:20}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'تفاصيل العميل':'Customer Details'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>Omar AbdAllah Omar</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>01090986367</Text>
                </View>
                <View style={{width:'92%',marginTop:20}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'تفاصيل التسوق':'Shopping Details'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>Address Name</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>Al-Sabbahiya</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>Block: 10, St: 2, Lane: 4</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>House 40</Text>
                </View>
                <View style={{width:'92%',height:1,marginTop:15,backgroundColor:'#707070'}}></View>
             
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',marginTop:20}]}>
                    <View style={{flex:2,}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:15,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'الأسـم':'Name'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>Fancy Dress</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Size : M'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Color : Brown'}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:15,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'السعر':'Price (KD)'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>22.000</Text>
                    </View>
                    <View style={{flex:1,}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:15,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'الوقت / التاريخ':'Quantity'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>x 3</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:15,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'رقم الفاتورة':'Subtotal'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>66.000</Text>
                    </View>
                </View>
                <View style={{width:'92%',height:1,marginTop:15,backgroundColor:'#707070'}}></View>

                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',marginTop:20}]}>
                    <View style={{flex:2,alignItems:'center'}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>Fancy Dress</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Size : M'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:2}]}>{this.props.Language=='AR'?'الأسـم':'Color : Brown'}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>22.000</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>x 1</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:16,fontFamily:'nexa_bold',marginTop:5}]}>22.000</Text>
                    </View>
                </View>
                <View style={{width:'92%',height:1,marginTop:15,backgroundColor:'#707070'}}></View>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',alignItems:'center',justifyContent:'center',marginTop:20}]}>
                    <View style={{flex:1,alignItems:'center'}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'الاجمالى':'Total'}</Text>
                    </View>
                    <View style={{margin:5}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>44.000 KD</Text>
                    </View>
                </View>
                <View style={[this.props.Language=='AR'?styles.rowReversed:styles.row,{width:'92%',alignItems:'center',justifyContent:'center',marginTop:20}]}>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'المجموع الفرعى':'Subtotal'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>420 KD</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'رسوم التوصيل':'Delivery Fee'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>2 KD</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'الأجمالى':'Total'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>422 KD</Text>
                    </View>
                </View>
                <View style={{width:'92%',marginTop:25}}>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#212121',fontSize:18,fontFamily:'nexa_bold'}]}>{this.props.Language=='AR'?'طريقة الدفع':'Payment Method'}</Text>
                    <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'100%',color:'#707070',fontSize:17,fontFamily:'nexa_bold',marginTop:5}]}>K-Net</Text>
                </View>
                {this.state.flag_btn==1?
                 <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 30 }]}>
                 <TouchableOpacity onPress={() => { alert('Done') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                     <Text style={{ color: '#fff', fontSize: 18,fontFamily:'nexa_bold', }}>
                         {this.props.Language == "AR" ? 'أستمرار التسوق' : 'Continue Shopping'}
                     </Text>
                 </TouchableOpacity>
               </View>
                :
                <View style={{display:'none'}}></View>
                }
               

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
export default connect(mapStateToProps, {})(Invoice)

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
   Button: {
      width: '55%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      marginBottom: 18,
  },
 });
