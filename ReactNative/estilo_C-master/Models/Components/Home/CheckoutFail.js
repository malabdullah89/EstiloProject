import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView ,Image} from 'react-native';
import { Input, Item , Picker} from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from 'react-navigation-drawer'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux' // redux
import { } from './../../Actions' //redux

class CheckoutFail extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
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
             <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language=='AR'?'الدفــع':'Checkout'}</Text>
             <TouchableOpacity style={{width:25}}></TouchableOpacity>
           </View>
        )
    }

    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Spinner
                visible={this.props.Processing}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            {this.renderHeader()}
            <View style={{width:width ,flex:1, alignItems:'center',justifyContent:'center'}}>
                <View style={{width:80 , height:80 ,borderRadius:80/2,alignItems:'center',justifyContent:'center',backgroundColor:'#FFCF01'}}>
                <Image source={require('./../../../image/fail.png')} style={{ width:40,height:40}} resizeMode='contain' />
                </View>
                <Text style={{textAlign:'center',color: '#383B43', fontSize: 24,fontFamily:'nexa_bold',marginTop:'8%'}}>{this.props.Language=='AR'?'فشلت عملية الدفع!':'Payment Failed!'}</Text>
                <Text style={{width:'55%',textAlign:'center',color: '#707070', fontSize: 15,fontFamily:'nexa_light',marginTop:'5%'}}>{this.props.Language=='AR'?'يبدو أننا لم نتلق أي أموال':'it seems we have not recived money'}</Text>
              
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Checkout') }} 
                style={[styles.Button, styles.shadow, { backgroundColor: '#383B43',marginTop:30 }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20,fontFamily:'nexa_bold',}}>
                      {this.props.Language == "AR" ? 'حاول مرة أخرى' : 'Try Again'}
                     </Text>
                  </TouchableOpacity>
            </View>
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
// redux
export default connect(mapStateToProps, { })(CheckoutFail)

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    row: {
        flexDirection: 'row'
    },
    rowReversed:{
        flexDirection:'row-reverse'
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
        elevation: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
    },
    Button: {
        width: '50%',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        marginHorizontal: 36
    },
});