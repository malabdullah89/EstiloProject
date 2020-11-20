import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux' // redux

const { width } = Dimensions.get('window')

class Notifications extends Component{

    renderHeader() {
        return (
           <View style={[styles.flex, styles.shadow, { width: width, height: '27%', alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
             <View style={[this.props.Language==='AR' ? styles.row_res : styles.row,{width:'98%'}]}>
             <View style={{justifyContent:'center',margin:5,position:'absolute',top:'5%'}}>
              {this.props.Language==='AR'?
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
             <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:'7%'}}>
             <Image source={require('./../../../image/logo.png')} style={[styles.image, {  }]} resizeMode='contain' />
             </View>
           </View>
              <Text style={{ color: '#fff', fontSize: 27,fontFamily:'nexa_light',position:'absolute',bottom:'10%' }}>{this.props.Language==='AR'?'أنشاء حساب':'Sign Up'}</Text>
              <View></View>
           </View>
        )
  }

    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >

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
export default connect(mapStateToProps, {})(Notifications)

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
      right:20
   },
   left:{
      left:20
   }
 });
