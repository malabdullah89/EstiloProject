import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,Image, ImageBackground,FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Link} from '@react-navigation/web';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Footer from './Footer';
import MobileFooter from './MobileFooter';
import LoginSection from './LoginSection';
import Drawer from './Drawer';
const { width } = Dimensions.get('window')

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 } , { id: 7 } ,{ id: 8 } ,{ id: 9 }, { id: 10 }]

export default class CategoryView extends Component {
   constructor(props){
      super(props)
      this.state = {
         showLogin: false,
         drawer: false,
      };
      this.viewLogin = this.viewLogin.bind(this);
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


    renderStoreSwitch(){
        return(
           <View style={
              {
                 backgroundColor: '#383B43',
                 width: '100vw',
                 height: '30vh'
              }
           }>
  
           </View>
        )
     }
     renderItemColom(index) {
        
        return (
         <Link routeName='products'>
           <TouchableOpacity 
           activeOpacity={1} 
           key={index.toString()} style={[styles.row, { justifyContent: 'center', marginTop: 12, }]} >
              <View style={[styles.flex,styles.shadow , styles.row, width < 1250 ? {height : width*0.6, margin: 5} : {height : width*0.3 , margin: 10} , { width: width*0.3, borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFF' }]}>
              <ImageBackground
               resizeMode ="cover"
               source={require('./../../../image/test.png')}
               style={{  width: '100%', height: '100%', alignItems: 'center', borderRadius:15}} />
               <LinearGradient></LinearGradient>
              <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:20,color:'#FFF',position: 'absolute',bottom:30}]}>
                 offer sale 50%</Text>
              <Text style={[this.props.Language==='AR'?styles.right:styles.left,{flex:1,fontSize:12,color:'#FFF',position: 'absolute', left: 20 ,bottom:20}]}>
                 write here the description of item</Text>
              </View>
           </TouchableOpacity>
         </Link>
        )
     }
    
     renderRowNav( imgSize , iconSize , mrgVert , mrgHrzt , font ){
        return(
         <View style={{flexDirection:'row',width:'100vw' , justifyContent:'center' ,borderColor:'rgba(0,0,0,0)',backgroundColor:'#FFCF01',paddingTop:4 }}>
         <View style={{alignItems:'center', justifyContent: 'center'}}>
            <FlatList style={{ width: '100%'}}
            data={["Men" , "Women" , "Furniture" , "Fashion" , "Kids"]}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({ item }) => this.renderItemRow(item , imgSize , iconSize , mrgVert , mrgHrzt , font)}
            keyExtractor={(item, index) => index.toString()}
         />
         </View>
      </View>
        )
    }
    
    renderItemRow(item , imgSize , iconSize , mrgVert , mrgHrzt , font) {
      return (
            <TouchableOpacity activeOpacity={1} style={{marginVertical: mrgVert , marginHorizontal: mrgHrzt}}>
                  <View style={[styles.shadow,{ width:imgSize , height:imgSize, alignItems:'center' ,justifyContent:'center', borderRadius:100/2 ,backgroundColor:'#fff'}]}>
                     <Image source={require('./../../../image/house.png')} resizeMode='contain'
                     style={{ width: iconSize, height: iconSize, }} />
                  </View>
               <Text style={{fontSize:font,color:'#111111',textAlign:'center',margin:5}}>
                  {item}</Text>
            </TouchableOpacity>
      )
  }
    

    render(){
        return(
            <View>
                {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='CATEGORIES' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagIcon={true} title='Categories' iconName='archive' handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   } 
                   {width < 1250 ? this.renderRowNav( 50 , 30 , 2 , 5 , 10 ) : this.renderRowNav( 80 , 50 , 10 , 60 , 16 ) }
                <View style={{justifyContent: 'center' , flex: 1 , borderWidth: 0 }}>
                    <FlatList 
                    data={list}
                    showsVerticalScrollIndicator={false}
                    numColumns={width < 1205 ? 1 : 4}
                    renderItem={({ item }) => (
                      <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        {this.renderItemColom(item)}
                      </View>
                    )
                   }
                    keyExtractor={(item, index) => index.toString()}
                  />
                  </View>
                  {
                  width < 1250 ? <MobileFooter /> : <Footer />
                  }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
       flex: 1
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
       shadowOpacity: 0.2,
       shadowRadius: 10,
       elevation: 5,
    },
    image: {
       width: 126,
       height: 70
   },
   right:{
      right:20
   },
   left:{
      left:20
   },
 });