/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Input, Picker} from 'native-base'
import { connect } from 'react-redux' // redux
import { } from './../../Actions' //redux

const { width, height } = Dimensions.get('window')
class AddNewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areas:[
                {
                    label: 'Area / Governate',
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
            area: null,
        };
    }

    render() {
        return (
            <View style={[styles.shadow, styles.container]} >
                <StatusBar backgroundColor='#383B43' barStyle="light-content" />
                <Text style={{margin: 10 , fontSize: 20, fontWeight: 'bold' ,textAlign: 'left' , alignSelf: 'flex-start' , flexDirection: 'row'}} >Add Address</Text>
                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 , width: '100%', }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 18 }} >
                    <View style={[width < 1250 ? {flexDirection:'column'} : styles.row ,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:30, marginHorizontal: 40,paddingVertical:13}} >
                                <Input
                                    underlineColorAndroid='transparent'
                                    placeholder={this.props.Language=='AR'?'أسم العنوان':'Adress name'}
                                    style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                        </View>
                       <View style={[{flex:1,alignItems:'center',justifyContent:'center',borderRadius:60,paddingRight:10,borderColor:'#707070',borderWidth:2,marginTop:30, marginRight: 40 , marginLeft:40}]}>
                       <Picker
                         style={{width:'100%',alignItems:'center',color:'#000',justifyContent:'center',backgroundColor:'transparent' , borderWidth: 0, }}
                        itemStyle={{backgroundColor:'#fff',}}
                        onValueChange = {(area) =>{
                           this.setState({ area });}}
                          mode="dropdown" selectedValue = {this.state.area?this.state.area:1}>
                       {
                         this.state.areas.map((i, index) => (
                        <Picker.Item
                          label = {i.label} value = {i.value} key={i.value} />))}
                           </Picker>
                        </View>  
                    </View>
                    <View style={[width < 1250 ? {flexDirection:'column'} : styles.row ,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row, { flex:1 ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 25, marginHorizontal: 40}]} >
                                <Input
                                    underlineColorAndroid='transparent'
                                    placeholder={this.props.Language=='AR'?'أسم الشارع':'Street name'}
                                    style={{ color: '#000', outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                        </View>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row, {flex: 1,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 25, marginHorizontal: 40 }]} >
                                <Input
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    placeholder={this.props.Language=='AR'?'رقم القطاع':'Block no.'}
                                    style={{ color: '#000', outline: 'none'}} textAlign={this.props.Language=='AR'?'right':'left'}
                                    onChangeText={(text) => this.setState({ conf_password: text })} />
                        </View>
                    </View>
                    <View style={[width < 1250 ? {flexDirection:'column'} : styles.row,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row, { flex:1 ,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 25, marginHorizontal: 40}]} >
                                <Input
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    placeholder={this.props.Language=='AR'?' رقم المبنـى':' Building no.'}
                                    style={{ color: '#000' ,outline: 'none'}} textAlign={this.props.Language=='AR'?'right':'left'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                        </View>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row, { flex: 1,borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 25 , marginHorizontal: 40}]} >
                                <Input
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    placeholder={this.props.Language=='AR'?'رقم الطابق':'Floor no.'}
                                    style={{ color: '#000',outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                    onChangeText={(text) => this.setState({ mobile: text })} />
                        </View>
                    </View>
                    <View style={[width < 1250 ? {flexDirection:'column'} : styles.row ,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={[{flex:1, borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop: 25, marginHorizontal: 40,paddingVertical:13}]} >
                                <Input
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    placeholder={this.props.Language=='AR'?'رقم الشقة':'Apt no.'}
                                    style={{ color: '#000', outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                        </View>
                        <View style={{flex:1 , marginHorizontal: 40}}></View>
                    </View>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.1 }]}>
                            <TouchableOpacity onPress={() => { alert('Done') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                <Text style={{ color: '#FFCF06', fontSize: 18, }}>
                                    {this.props.Language == "AR" ? 'تنفيذ' : 'Submit'}
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
export default connect(mapStateToProps, { })(AddNewAddress)

const styles = StyleSheet.create({
    flex: {
        flex: 1
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
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderRadius: 10
    },
   
  
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputFields: {
        height:55,
        borderBottomColor: '#F0F2F5',
        borderWidth:0
    },
    Button: {
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        marginBottom: 18,
        marginHorizontal: 36,
        width: width < 1250 ? '50%' : '15%'
    },
    image: {
        width: 190,
        height: 100,
    },
    padRight:{
        marginStart:'40%'
    },
    padLeft:{
        paddingHorizontal:10
    }
});