import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, YellowBox } from 'react-native';
import { Input, Item } from 'native-base'
import Header from './Section/Header';
import MobileHeader from './Section/MobileHeader';
import Footer from './Section/Footer';
import MobileFooter from './Section/MobileFooter';
import LoginSection from './Section/LoginSection';
import Drawer from './Section/Drawer';
import { connect } from 'react-redux' // redux
import { SetLanguage, SetLoading , ForgetPwd } from '../Actions' //redux

const { width } = Dimensions.get('window')

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:''
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

    componentDidMount() {
      
    }
  
    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
        if (nextProps.Message ==='Forget Pwd Done') {
            if(this.props.Language==='AR'){
                alert('تم أرسال الكود بنجاح')
            }else{
                alert('reset code sent successfully.')
            }
           this.setState({email:''})
        }else{
            alert(nextProps.Message)
        }
      }
    }
      
    render() {
        return (
            <View style={styles.container} >
                {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='CHANGE PASSWORD' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Change Password' iconName='lock' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
                <View style={[styles.column]} >

                <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'25%',paddingHorizontal:'5%'}}>{this.props.Language==='AR'?'الايميل':'Email ID'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: '3%',}]} >
                            <Item style={[styles.inputFields,{  }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ color: '#000' }} textAlign={'center'}
                                    defaultValue={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: '10%' }]}>
                            <TouchableOpacity onPress={() => {
                                const {email} = this.state
                                if(email){
                                    this.props.ForgetPwd(email)
                                } else{
                                    if(this.props.Language==='AR'){
                                       alert('أدخل البريد الألكترونى')
                                    }else{
                                       alert('Enter your email')
                                    }
                                }
                                }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18, }}>
                                    {this.props.Language === "AR" ? 'تنفيذ' : 'Submit'}
                                </Text>
                            </TouchableOpacity>
                        </View>


                </View>
                {width < 1250 ? <MobileFooter /> : <Footer /> }
            </View>
        );
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
export default connect(mapStateToProps, { SetLanguage, SetLoading , ForgetPwd})(ForgetPassword)

const styles = StyleSheet.create({
    flex: {
        flex: 0.4
    },
    row: {
        flexDirection: 'row'
    },
    row_res:{
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
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
    },
    container: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        height: '100vh',
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
    text:{
        width:140,height:40,
        borderColor:'#fff',
        borderWidth:1, 
        textAlign:'center',
        textAlignVertical:'center'
    },
    inputFields: {
        width:'85%',
        height:55,
    },
    image: {
        width: 150,
        height: 80
    },
});