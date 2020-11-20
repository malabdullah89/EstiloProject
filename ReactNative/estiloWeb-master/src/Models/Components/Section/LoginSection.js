import React, { Component } from 'react';
import {View, Image , TouchableOpacity, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './../Login';
import Register from './../Register';
const { width } = Dimensions.get('window')

export default class LoginSection extends Component {
    constructor(props){
        super(props)
        this.state = {
            flagLogin: true,
            flagRegister: false,
            heightSize: 500,
        }
    }
    renderHeader() {
        return (
            <View style={[ { alignSelf:'stretch',alignItems: 'center', backgroundColor: '#383B43', borderTopStartRadius: 20 , borderTopEndRadius: 20 }]}>
                <TouchableOpacity style={{ marginTop: 10  , alignSelf: 'flex-end' , marginRight: 10}}
            onPress={this.props.handlerLogin} >
               <Icon name='times' size={30} color={'white'}/>
            </TouchableOpacity>
                <Image source={require('./../../../image/logo.png')} style={[{ flex:2,width: 150, height: 80 }]} resizeMode='contain' />
                    <View style={{ flex: 1, flexDirection: 'row' ,  justifyContent: 'center' , width: '20vw' }}>
                        <View style={{marginHorizontal: 30}}>
                            <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    flagLogin: true,
                                    flagRegister: false,
                                    heightSize: 480,
                                })
                            }}>
                                <Text style={{ color: '#fff', fontSize: 27,paddingTop: 20,}}>{this.props.Language==='AR'?'تسجيل الدخول':'Log In'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginHorizontal: 30}}>
                            <TouchableOpacity 
                            onPress={() => {
                                this.setState({
                                    flagLogin: false,
                                    flagRegister: true,
                                    heightSize: 900,
                                })
                            }}>
                                <Text style={{ color: '#fff', fontSize: 27,paddingTop: 20, }}>{this.props.Language==='AR'?'أنشاء حساب':'Sign Up'}</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
  }
    render(){
        return(
        <View style={{zIndex: 1,width: '100%' , height: '100%' , backgroundColor:'rgba(0,0,0,0.6)' , position: 'absolute' , justifyContent: 'center' , flexDirection: 'row'}}>
                <View style={{width: width < 1250? '90vw' :450 , height: this.state.heightSize , marginTop: '8vw'}}>
                    {this.renderHeader()}
                {this.state.flagLogin && !this.state.flagRegister? 
                  <Login flagLogin={this.state.flagLogin} flagRegister={this.state.flagRegister} />
                  : (this.state.flagRegister && !this.state.flagLogin ? 
                    <Register />
                    : null
                    )
                }
                </View>
        </View>
        )
    }
}