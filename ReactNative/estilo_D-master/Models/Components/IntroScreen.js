import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar,ImageBackground , Dimensions ,TouchableOpacity , Text} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
const { width, height } = Dimensions.get('window')

//import { AsyncStorage } from 'react-native';

export default class IntroScreen extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      setTimeout(() => {
         this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
               NavigationActions.navigate({ routeName: 'ChooseLanguage' })
            ],
         }))
      }, 3000)
   }

   render() {
      return (
         <ImageBackground style={styles.container} 
         source={require('./../../image/intro.png')}>
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Image source={require('./../../image/intro2.png')} style={[styles.image, { marginTop: '55%' }]} resizeMode='contain' />
         <TouchableOpacity 
            //  onPress={() => {
            //     this.props.navigation.dispatch(StackActions.reset({
            //         index: 0,
            //         actions: [
            //            NavigationActions.navigate({ routeName: 'ChooseLanguage' })
            //         ],
            //      }))
            //  }}
            style={[styles.button]} >
             <Text style={{ color: '#383B43', fontSize: 18,fontFamily:'nexa_bold', }}>
                Skip
            </Text>
         </TouchableOpacity>
         </ImageBackground>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#FFF',
   },
   image: {
      width: 200,
      height: 200,
      alignItems:'center'
   },
   button: {
    width:'23%',
    backgroundColor: '#FFCF01',
    borderColor:'#707070',
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    paddingVertical:5,
    position:'absolute',
    bottom:'5%'
 }
});