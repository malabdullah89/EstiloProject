import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView ,Image} from 'react-native';
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
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
                lat:'21.69497',
                lon:'48.72413'
            },
            radioSelected:1,
            gender:'male'
        };
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
                            if(mobile.startsWith('+20')){
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
                            }else{
                                if(this.props.Language=='AR'){
                                    alert('رقم الهاتف يجب أن يبدأ +20')
                                   }else{
                                    alert('Phone must begin with +20')
                                   }
                            }
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


    renderHeader() {
        return (
           <View style={[styles.flex, styles.shadow, { width: width, height: height*0.27, alignItems: 'center', backgroundColor: '#383B43', paddingHorizontal: 18 }]} >
             <View style={[this.props.Language=='AR' ? styles.row_res : styles.row,{width:'98%'}]}>
             <View style={{justifyContent:'center',margin:5,position:'absolute',top:'5%'}}>
              {this.props.Language=='AR'?
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
             <Image source={require('./../../image/logo.png')} style={[styles.image, {  }]} resizeMode='contain' />
             </View>
           </View>
              <Text style={{ color: '#fff', fontSize: 27,fontFamily:'nexa_light',position:'absolute',bottom:'10%' }}>{this.props.Language=='AR'?'أنشاء حساب':'Sign Up'}</Text>
              <View></View>
           </View>
        )
  }
  
  renderRadio(clicked){
    return(
     <TouchableOpacity
     style={[styles.shadow,{width:20 ,height:20 ,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
     onPress={()=>{
            this.setState({radioSelected:clicked })
            if(clicked==1){
                this.setState({gender:'male'})
            }else{
                this.setState({gender:'female'})
            }
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
                <StatusBar backgroundColor='#383B43' barStyle="light-content" />
                <Spinner
                    visible={this.props.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                {this.renderHeader()}
                <View style={{width:'30%',height:'1%',backgroundColor:'#FFCF01'}}></View>
                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 18 }} >
                    
                    <View style={[this.props.Language=='AR' ? styles.row_res : styles.row,{alignItems:'center',justifyContent:'center',marginTop:20,}]}>
                      <View style={{flex:1,}}>
                      <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'10%'}}>{this.props.Language=='AR'?'الأسم الأول':'First Name'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{ borderRadius:60 }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ first_name: text })}
                                />
                            </Item>
                        </View>
                      </View>
                       <View style={{width:10}}></View>
                      <View style={{flex:1,}}>
                      <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'10%'}}>{this.props.Language=='AR'?'الأسم الأخير':'Last Name'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{ borderRadius:60 }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ last_name: text })}
                                />
                            </Item>
                        </View>
                      </View>

                    </View>
                    <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'الايميل ':'Email ID '}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{  }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Item>
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?' رقم الموبايل':' Mobile Number'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 12 }]} >
                            <Item style={[styles.inputFields,{}]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    style={{ color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ mobile: text })} />
                            </Item>
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'الرقم السرى':'Password'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 10,}]} >
                            <Item style={[styles.inputFields,{  }]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    secureTextEntry
                                    style={{ color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </Item>
                        </View>
                        <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'تأكيد الرقم السرى':'Confirm Password'}</Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 12 }]} >
                            <Item style={[styles.inputFields,{}]}>
                                <Input
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={{ color: '#000' }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ conf_password: text })} />
                            </Item>
                        </View>

                       
                        <Text style={{ color: '#383B4370', fontSize: 14,fontFamily:'nexa_bold',marginTop:'4%',paddingHorizontal:'5%'}}>{this.props.Language=='AR'?'النـوع':'Gender'}</Text>
                        <View style={[this.props.Language == "AR" ? styles.row_res : styles.row, { justifyContent: 'center', alignItems: 'center',borderRadius:60,borderColor:'#707070',borderWidth:2,padding:5,marginTop:12 }]} >
                            <Text style={{ alignSelf: 'center', color: '#383B4370', fontSize: 16 ,fontFamily:'nexa_bold',margin:7 }}>
                                {this.props.Language == "AR" ? 'أنثـى' : 'Female'}
                            </Text>
                            {this.renderRadio(2)}
                           <View style={{width:'20%'}}></View>
                            <Text style={{ alignSelf: 'center', color: '#383B4370', fontSize: 16 ,fontFamily:'nexa_bold',margin:7 }}>
                                {this.props.Language == "AR" ? 'ذكـر' : 'Male'}
                            </Text>
                            {this.renderRadio(1)}
                        </View>

                       

                        <View style={[this.props.Language=='AR' ? styles.row : styles.row_res, { marginTop: 7, justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ alignSelf: 'center', color: '#383B4370', fontSize: 14,fontFamily:'nexa_light' }}>
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
                                <Text style={{ color: '#FFCF06', fontSize: 18,fontFamily:'nexa_bold', }}>
                                    {this.props.Language == "AR" ? ' أنشاء الحساب' : 'SignUp'}
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
export default connect(mapStateToProps, { UserRegister , SetLoading })(Register)

const styles = StyleSheet.create({
    flex: {
        flex: 0
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
        width: 190,
        height: height*0.12,
    },
});