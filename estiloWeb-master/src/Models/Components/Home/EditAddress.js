/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Input} from 'native-base'
import { connect } from 'react-redux' // redux

const { width , height } = Dimensions.get('window')

class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
           addressName:'Lorim Ipsum',
           area:' Al Azla UK',
           streetName:'Street 1',
           blockNum:'Block 1',
           buildingNum:'15',
           floorNum:'9',
           aptNum:'20'
        };
    }

    render() {
            return (
                <View style={[styles.shadow, styles.container]} >
                    <StatusBar backgroundColor='#383B43' barStyle="light-content" />
                    <Text style={{margin: 10 , fontSize: 20, fontWeight: 'bold' ,textAlign: 'left' , alignSelf: 'flex-start' , flexDirection: 'row'}} >Edit Address</Text>
                    <KeyboardAvoidingView
                        enabled
                        behavior="height"
                        style={{ flex: 1 , width: '100%', }}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 18 }} >
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row,{flex:2 , justifyContent: 'space-between'} ]}>
                            <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} >{this.props.Language=='AR'?'أسم العنوان':'Adress name'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?'أسم العنوان':'Adress name'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                            <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} >{this.props.Language=='AR'?'أسم العنوان':'Area'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?'أسم العنوان':'Area'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                        </View>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} > {this.props.Language=='AR'?'أسم الشارع':'Street name'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?'أسم الشارع':'Street name'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                            <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} >{this.props.Language=='AR'?'رقم القطاع':'Block Number'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?'رقم القطاع':'Block no.'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                        </View>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} >{this.props.Language=='AR'?'رقم القطاع':'Building Number'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?' رقم المبنـى':' Building no.'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                            <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} >{this.props.Language=='AR'?'رقم القطاع':'Floor Number'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?'رقم الطابق':'Floor no.'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                        </View>
                        <View style={[width < 1250 ? {flexDirection:'column'} : styles.row,{flex:2 , justifyContent: 'space-between'} ]}>
                        <View style={{flex:1 , marginHorizontal: 40}}>
                                <Text style={styles.title} >{this.props.Language=='AR'?'رقم القطاع':'Apartament Number'}</Text>
                                <View style={{flex:1,  borderRadius:60,borderColor:'#707070',borderWidth:2,marginTop:10,paddingVertical:13}} >
                                        <Input
                                            underlineColorAndroid='transparent'
                                            placeholder={this.props.Language=='AR'?'رقم الشقة':'Apt no.'}
                                            style={{ color: '#000' , outline: 'none' }} textAlign={this.props.Language=='AR'?'right':'left'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                </View>
                            </View>
                            <View style={{flex:1 , marginHorizontal: 40}}></View>
                        </View>
                            <View style={[width < 1250 ? {flexDirection:'column'} : styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.1 }]}>
                                <TouchableOpacity onPress={() => { alert('Done') }} style={[styles.Button, styles.shadow, { backgroundColor: '#383B43' }]} >
                                    <Text style={{ color: '#FFCF06', fontSize: 18,}}>
                                        {this.props.Language === "AR" ? 'تنفيذ' : 'Update'}
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
export default connect(mapStateToProps, {  })(EditAddress)

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
        width:'95%',
        height:45,
    },
    Button: {
        width: '35%',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        marginBottom: 18,
        marginHorizontal: 36
    },
    image: {
        width: 190,
        height: 100,
    },
    title: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginTop: 25,
    },
});