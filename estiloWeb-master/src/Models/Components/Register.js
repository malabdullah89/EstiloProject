/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Input, Item } from 'native-base'
import { CheckBox } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux' // redux
import { UserRegister , SetLoading } from './../Actions' //redux

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name:'',
            password: '',
            mobile: '',
            email: null,
            checked:false,
            locations:{
                city:'cairo',
                lat:'24.69497',
                lon:'46.72413'
            },
            radioSelected:null,
            gender:''
        };
    }
    goLogin(){
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ],
        }))
    }

    componentWillMount(){
        this.props.SetLoading(false)
    }

    emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
        if (nextProps.Message=='Register Done') {
            if(this.props.Language=='AR'){
                alert('تم التسجيل بنجاح')
            }else{
                alert('successfully sign up')
            }
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ],
            }))
        }else{
            alert(nextProps.Message)
        }
      }
    }

    Register() {
        const { first_name ,last_name, password, conf_password , mobile , email ,checked, gender,locations } = this.state
        if(first_name.length>=1){ 
            if(last_name.length>=1){
                if(email.length>=1){
                    if(this.emailIsValid(email)){
                        if(mobile){
                            // if(mobile.startsWith('00965')){
                                if(password.length>=1){
                                    if(password===conf_password){
                                        if(checked){
                                            this.props.UserRegister(first_name, last_name, email, mobile,password,checked ,gender,locations)
                                        }else{
                                            alert('You must accept terms of use')
                                        }
        
                                    }else{
                                        if(this.props.Language=='AR'){
                                            alert('الرقم السرى غير متطابق')
                                           }else{
                                            alert('Your Password Do not match')
                                           }
                                       
                                    }
        
                                }else{
                                    if(this.props.Language=='AR'){
                                        alert('يجب أدخال الرقم السرى')
                                       }else{
                                        alert('You Must Enter Your Password')
                                       }
                                    
                                }
                            // }else{
                            //     if(this.props.Language=='AR'){
                            //         alert('رقم الهاتف يجب أن يبدأ 00965')
                            //        }else{
                            //         alert('Phone must begin with 00965')
                            //        }
                            // }
                        }else{
                            if(this.props.Language=='AR'){
                                alert('يجب أدخال رقم الهاتف')
                               }else{
                                alert('You must enter your phone')
                               }
                          
                        }
                       
                    }else{
                        if(this.props.Language=='AR'){
                            alert('البريد الألكترونى غير صحيح')
                           }else{
                            alert('Email is not valid')
                           }
                        
                    }

                }else{
                    if(this.props.Language=='AR'){
                        alert('يجب أدخال البريد الألكترونى')
                       }else{
                        alert('You Must Enter Your Email')
                       }
                   
                }

            }else{
                if(this.props.Language=='AR'){
                    alert('يجب أدخال الأسم الأخير')
                   }else{
                    alert('You Must Enter Your Last Name')
                   }
                
            }

        }else{
            if(this.props.Language=='AR'){
                alert('يجب أدخال الأسم الاول')
               }else{
                alert('You Must Enter Your First Name')
               }
            
        }
    }
  
  renderRadio(clicked){
    return(
     <TouchableOpacity
     style={[styles.shadow,{width:20 ,height:20 ,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
     onPress={()=>{
            this.setState({radioSelected:clicked , gender: clicked})
     }}>
       {this.state.radioSelected === clicked?
       <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
       </LinearGradient>
       :
       <View style={{display:'none'}}></View>
       }
     </TouchableOpacity>
    )
  }

    render() {
        return (
            <View style={styles.container} >
                <View style={{width:'40%',height:5,backgroundColor:'#FFCF01' , alignSelf: 'flex-end' , marginRight: '10%'}}></View>
                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 }}>
                    
                    <View style={[{alignItems:'center',justifyContent:'center',marginTop:20,}]}>
                      <View style={{flex:1,}}>
                      <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'4%',paddingHorizontal:'10%'}}>{this.props.Language=='AR'?'الأسم الأول':'First Name'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{ borderRadius:60 }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ color: '#000',outline: 'none'  }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ first_name: text })}
                                />
                            </Item>
                        </View>
                      </View>
                       <View style={{width:10}}></View>
                      <View style={{flex:1,}}>
                      <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'4%',paddingHorizontal:'10%'}}>{this.props.Language=='AR'?'الأسم الأخير':'Last Name'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{ borderRadius:60 }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ outline: 'none' , color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ last_name: text })}
                                />
                            </Item>
                        </View>
                      </View>

                    </View>
                    <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'الايميل ':'Email ID '}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{  }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{outline: 'none' , color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Item>
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?' رقم الموبايل':' Mobile Number'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 12 }]} >
                            <Item style={[styles.inputFields,{}]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    style={{outline: 'none' , color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ mobile: text })} />
                            </Item>
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'الرقم السرى':'Password'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{  }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    secureTextEntry
                                    style={{outline: 'none' , color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </Item>
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'تأكيد الرقم السرى':'Confirm Password'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 12 }]} >
                            <Item style={[styles.inputFields,{}]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={{outline: 'none' , color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ conf_password: text })} />
                            </Item>
                        </View>

                        <View style={[this.props.Language=='AR' ? styles.row : styles.row_res, { marginTop: 7, justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ alignSelf: 'center', color: '#383B4370', fontSize: 14, }}>
                                {this.props.Language == "AR" ? 'موافق على الشروط المستخدمة' : 'I agree to the terms Of Use'}
                            </Text>
                            <CheckBox
                                checked={this.state.checked}
                                onPress={() =>{
                                    this.setState({checked: !this.state.checked});
                                    }}
                            />
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 7 }]}>
                            <TouchableOpacity onPress={() => { this.Register() }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18, }}>
                                    {this.props.Language == "AR" ? ' أنشاء الحساب' : 'SignUp'}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
export default connect(mapStateToProps, { UserRegister , SetLoading })(Register)

const styles = StyleSheet.create({
    flex: {
        flex: 0.2
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
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        height: '100vh',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
   
  
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputFields: {
        width:'90%',
        height:50,
        borderBottomColor: '#F0F2F5',
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
    image: {
        width: 150,
        height: 80,
    },
});