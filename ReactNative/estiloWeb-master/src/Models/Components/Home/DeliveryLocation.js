import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer'
import Spinner from 'react-native-loading-spinner-overlay';
import MapView ,{PROVIDER_GOOGLE} from 'react-native-maps'
import { connect } from 'react-redux' // redux
import { SetLoading } from '../../Actions' //redux

const { width, height } = Dimensions.get('window')

class DeliveryLocation extends Component{
    constructor(props) {
        super(props);
        this.state = {
           Processing:false,
          
        };
     }
     
     UNSAFE_componentWillMount(){
      }

      renderHeader() {
        return (
           <View style={[this.props.Language==='AR'? styles.row:styles.rowReversed, styles.shadow, { width: width, height: '10%', alignItems: 'center', backgroundColor: '#383B43',
            paddingHorizontal: 18 }]} >
             <View style={{justifyContent:'center',margin:5,}}>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Cart')}>
             <Icon name="shopping-cart" size={30} color="#FFCF01" style={{}} />
             </TouchableOpacity>
             
             </View>
             <Text style={{ flex:1,textAlign:'center',color: '#fff', fontSize: 17,fontFamily:'nexa_bold',}}>{this.props.Language==='AR'?'مكان التوصيل':'Delivery Location'}</Text>
    
             <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
                <View style={{width:40,justifyContent:'center'}}>
                <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='contain' />
                <Image source={require('./../../../image/2.png')} style={{ width:'100%',height:7,margin:2 }} resizeMode='contain' />
                <Image source={require('./../../../image/1.png')} style={{ width:'100%',height:7 ,margin:2}} resizeMode='contain' />
                </View>
             </TouchableOpacity>
           </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Spinner
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
            {this.renderHeader()}
            <View style={{width:width,height:'86%',alignItems:'center'}}>
            <MapView  
            provider = {PROVIDER_GOOGLE}
            style={{flex:1,width:'100%',height:'100%'}} 
            region={{ latitude: 42.882004,
                longitude: 74.582748,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421}}
                showsUserLocation={true}/>
            </View>
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
export default connect(mapStateToProps, { SetLoading })(DeliveryLocation)

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
       elevation: 10,
    },
    container: {
      width:width,
      height:height,
       alignItems: 'center',
       backgroundColor: '#FFF',
    },
   Button: {
      width: '35%',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginBottom: 18,
      marginHorizontal: 36
  },
 });
