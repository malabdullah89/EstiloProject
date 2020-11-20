import React from 'react';
import Cards from 'react-credit-cards';
import {View, Text , TouchableOpacity, StyleSheet , TextInput , Dimensions} from 'react-native';
//import publicIp from 'public-ip';
import 'react-credit-cards/es/styles-compiled.css';
//import Axios from 'axios';

const { width } = Dimensions.get('window')

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    country: '',
    ip: '',
    testApi: 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  createToken(){
      let request = new Request('https://api.tap.company/v2/tokens' , {
          method: 'POST',
          headers: new Headers({
              'Authorization' : 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ',
              'Content-type': 'application/json',
              'Host':'https://api.tap.company',
              'Accept': '**',
          }),
          mode: 'no-cors',
          body: JSON.stringify({
            card: {
                number: this.state.number,
                exp_month: Number(this.state.expiry.substring(0,2)),
                exp_year: Number(this.state.expiry.substring(2,4)),
                cvc: Number(this.state.cvc),
                name: 'juan velazco',
                address: {
                    country: "Kuwait",
                    line1: "Salmiya, 21",
                    city: "Kuwait city",
                    street: "Salim",
                    avenue: "Gulf",
                }
            },
            client_ip: this.state.ip,
            })
      })
      fetch(request)
      /*
    Axios.post('https://api.tap.company/v2/tokens',{
        card: {
            number: this.state.number,
            exp_month: Number(this.state.expiry.substring(0,2)),
            exp_year: Number(this.state.expiry.substring(2,4)),
            cvc: Number(this.state.cvc),
            name: 'juan velazco',
            address: {
                country: "Kuwait",
                line1: "Salmiya, 21",
                city: "Kuwait city",
                street: "Salim",
                avenue: "Gulf",
            }
        },
        client_ip: this.state.ip
    },{
        headers:{
            Authorization : 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ',
        } 
    }).then((response) => {
        console.log(response);
    }).catch((e) => {
        console.log(e);
    })*/
  }

  render() {
    return (
      <View style={{margin: 5}}>
          <View style={{marginBottom: 20}}>
            <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
            />
          </View>
          <View style={{flexDirection: 'row'}} >
                  <View>
                  <TextInput
                  style={{fontSize: 20 , outline: 'none' , paddingHorizontal: 10 , borderBottomColor: '#383B43' , borderBottomWidth: 1 , margin: 10}}
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
                <View style={width < 1250 ? {} : {flexDirection: 'row'}}>
                     <TextInput
                     style={{fontSize: 20 , outline: 'none' , paddingHorizontal: 10 , borderBottomColor: '#383B43' , borderBottomWidth: 1 , margin: 10}}
                name="expiry"
                placeholder="Exp Month"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
            />
            <TextInput
                style={{fontSize: 20 , outline: 'none' , paddingHorizontal: 10 , borderBottomColor: '#383B43' , borderBottomWidth: 1 , margin: 10}}
              type="tel"
              name="cvc"
              placeholder="cvc"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
                 </View>
                 <TextInput
                 style={{fontSize: 20 , outline: 'none' , paddingHorizontal: 10 , borderBottomColor: '#383B43' , borderBottomWidth: 1 , margin: 10}}
              name="name"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            
            </View>
        </View>
            <TouchableOpacity onPress={() => { (async () => {
                //this.setState({ip: await publicIp.v4()})
                this.createToken();
                
            })(); this.props.navigation.navigate('invoice')}}
            style={[styles.Button, styles.shadow, { alignSelf: 'center',backgroundColor: '#383B43',marginBottom:20 }]} >
                     <Text style={{ color: '#FFCF06', fontSize: 20, }}>
                      {this.props.Language === "AR" ? 'أدفع الأن' : 'Pay Now'}
                     </Text>
                  </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
     Button: {
        width: '35%',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 15,
        marginHorizontal: 36
    },
})