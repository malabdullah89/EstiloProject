/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput , KeyboardAvoidingView, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux' // redux
import { SetLoading , UserLogin } from './../Actions' //redux

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
    }

    componentWillMount(){
        this.props.SetLoading(false)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
        if (nextProps.Message =='Login Done') {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeRoutes' })
                ],
            }))
        }else{
            alert(nextProps.Message)
        }
      }
    }

    Login() {
        const { username, password } = this.state
        if(username){
           if(password){
            this.props.UserLogin(username, password)
           }else{
               if(this.props.Language=='AR'){
                alert('أدخل الرقم السرى')
               }else{
                alert('Enter your Password')
               }
           }
        }else{
            if(this.props.Language=='AR'){
                alert('أدخل البريد الألكترونى')
               }else{
                alert('Enter your Email')
               }
            
        }
    }

    goHome() {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeRoutes' })
            ],
        }))
    }

    goRegister() {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style={styles.container}>
                 <View style={{width:'40%',height:5,backgroundColor:'#FFCF01' , alignSelf: 'flex-start' , marginLeft: '10%'}}></View>

                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
                   
                    <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'10%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'الايميل رقم الموبايل':'Email ID / Mobile Number'}</Text>
                        <View >
                                <TextInput
                                    style={ {outline: 'none' ,paddingLeft:10, justifyContent: 'center', alignItems: 'center' ,backgroundColor: '#F0F2F5', borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: '3%', width: '20vh' , height: '5vh'}}
                                    onChangeText={(text) => this.setState({ username: text })}
                                />
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'7%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'الرقم السرى':'Password'}</Text>
                        <View >
                                <TextInput
                                    style={ {outline: 'none', paddingLeft:10, justifyContent: 'center', alignItems: 'center' ,backgroundColor: '#F0F2F5', borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: '3%', width: '20vh' , height: '5vh'}}
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ password: text })} />
                        </View>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                        <TouchableOpacity 
                        style={{width:'80%',}}
                        onPress={() =>         this.props.navigation.navigate('ForgetPassword')}>
                            <Text style={{ width:'100%',textAlign:'right',fontSize: 13, color:'#383B4370',margin:3 }} >
                                {this.props.Language == "AR" ? 'فقدت كلمة المرور؟' : 'Forgot Password?'}
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 36 }]}>
                            <TouchableOpacity onPress={() => { this.Login() }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18, }}>
                                    {this.props.Language == "AR" ? 'تسجيل الدخول' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

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
export default connect(mapStateToProps, { SetLoading , UserLogin })(Login)

const styles = StyleSheet.create({
    flex: {
        flex: 0.2
    },
    row: {
        flexDirection: 'row'
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
        elevation: 3,
    },
    container: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        height: '100vh',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    inputFields: {
        width:'85%',
        height:50,
    },
    Button: {
        width:'60%',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 18,
        marginHorizontal: 36
    },
    image: {
        width: 150,
        height: 80
    },
});