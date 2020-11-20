import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,Image, ImageBackground, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import LatestStores from './LatestStores';
import Footer from './Footer';
import MobileFooter from './MobileFooter';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Drawer from './Drawer';
import LoginSection from './LoginSection';
const { width } = Dimensions.get('window')

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 } , { id: 7 } ,{ id: 8 } ,{ id: 9 }, { id: 10 }, { id: 7 } ,{ id: 8 } ,{ id: 9 }, { id: 10 }]

export default class HomeSectionView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         logged: false,
         Processing:false,
         data:[],
         flag_search:1,
         flag_filter:1,
         radioSelected: null,
         itemID:null,
         showLogin: false,
         drawer: false,
      };
      this.viewLogin = this.viewLogin.bind(this)
      this.viewDrawer = this.viewDrawer.bind(this)
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
              }
            }>
               <LatestStores />
           </View>
        )
     }

     renderAboutInfo(){
        return(
           <View style={
              {
                 backgroundColor: '#F0F2F5',
                 width: '100vw',
                 marginVertical: 20
              }
           }>
              <View styles={{ flex: 1 , flexDirection: 'column',}}>
                 <View style={{ flex: 1,flexDirection: 'row',justifyContent: 'center' , alignContent: 'center', marginTop: 20}}>
                    <Text style={{fontSize: 20}}>
                       Best Product, Best Service
                    </Text>
                 </View>
                 <View style={{flex: 1,flexDirection: 'row',  justifyContent: 'center' , alignContent: 'center'}}>
                    <Text style= { {  color: '#FFCF01', fontSize: 50 , fontWeight: '600' , marginRight: 10} }>
                       About
                    </Text>
                    <Text style= { {  color: '#383B43', fontSize: 50 , fontWeight: '600'}}>
                       Estilo
                    </Text>
                 </View>
                 <View>
                    <View style={[ width < 1205 ? styles.column : styles.row ,{ flex: 1 , marginHorizontal: '10vw' , marginTop: 30, borderTopColor: 'rgba(0,0,0,0.1)' , borderTopWidth: 3 , paddingTop: 10}]}>
                       <View style={{ flex: 1 , marginHorizontal: 10 }}>
                          <Text style={styles.titleInfo}>
                             Title
                          </Text>
                          <Text>
                             content content content content content content content content content content content content content
                             content content content content content content content content content content content content content
                             content
                             content content content
                          </Text>
  
                       </View>
                       <View style={{ flex: 1 , marginHorizontal: 10}}>
                       <Text style={styles.titleInfo}>
                             Title
                          </Text>
                          <Text>
                             content content content content content content content content content content content content content
                             content content content content content content content content content content content content content
                             content
                             content content content
                          </Text>
                       </View>
                       <View style={{ flex: 1 , marginHorizontal: 10}}>
                       <Text style={styles.titleInfo}>
                             Title
                          </Text>
                          <Text>
                             content content content content content content content content content content content content content
                             content content content content content content content content content content content content content
                             content
                             content content content
                          </Text>
                       </View>
                    </View>
                 </View>
              </View>
           </View>
        )
     }

     renderEstiloMobileApp(){
        return(
           <View style={
              {
                 backgroundColor: 'rgb(111 , 128 , 174)',
                 width: '100vw',
                 alignItems: 'center',
              }
           }>
              <View style={{flexDirection: 'row',width: '70%'}}>
                  <View style={{flex:1 , justifyContent: 'center'}}>
                     <Text style={{fontSize: 90, fontWeight: '600' , color: '#FFCF01' , marginBottom: 30}}>Estilo App</Text>
                     <Text style={{color: 'white' , paddingRight: 40}}> 
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat nisl nec laoreet vehicula. 
                           Pellentesque nec elit aliquet, tempus urna id, feugiat diam. Suspendisse ac luctus orci. Phasellus at
                           mauris feugiat, tempor risus iaculis, eleifend dolor. Mauris ante urna, scelerisque in sodales sed, 
                           viverra id leo. Nunc aliquam nec ante sed blandit.
                     </Text>
                     <View style={{flexDirection: 'row' , justifyContent:'center', marginVertical: 30}}>
                        <TouchableOpacity style={{margin: 20,}}>
                           <Image source={require('./../../../image/app_store.PNG')} style={{width: 200 , height: 50 , borderRadius: 10}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin: 20,}}>
                           <Image source={require('./../../../image/google_play.PNG')} style={{width: 200 , height: 50 , borderRadius: 10}} />
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View style={{flex:1 , flexDirection: 'row'}}>
                     <Image source={require('./../../../image/Screen1.PNG')} style={[styles.shadow , {margin: 20,width: 240 , height: 500 , borderRadius: 30}]} />
                     <Image source={require('./../../../image/Screen2.PNG')} style={[styles.shadow , {marginHorizontal: 20, marginTop: 130,marginBottom: 30,width: 240 , height: 500 , borderRadius: 30}]} />
                  </View>
              </View>
           </View>
        )
     }
     
     renderItemColom(index) {
        return (
           <TouchableOpacity 
           activeOpacity={1} 
           onPress={() => this.props.navigation.navigate('categories')} 
           key={index.toString()} style={[styles.row, { justifyContent: 'center' }]} >
              <View style={[styles.flex, styles.row, styles.shadow , width < 1250 ? {height : width*0.6, margin: 5} : {height : width*0.3 , margin: 10} ,{ width: width*0.3, borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFF' }]}>
              <ImageBackground
               resizeMode ="cover"
               source={require('./../../../image/test.png')}
               style={{  width: width, height: '100%', alignItems: 'center', borderRadius:15}} />
               <LinearGradient></LinearGradient>
              
              <Text style={[this.props.Language==='AR'?styles.right:styles.left,{fontSize:20,color:'#FFF',position: 'absolute',bottom:30,}]}>
                 offer sale 50%</Text>
              <Text style={[this.props.Language==='AR'?styles.right:styles.left,{flex:1,fontSize:12,color:'#FFF',position: 'absolute', left: 20 ,bottom:20,}]}>
                 write here the description of item</Text>
              </View>
           </TouchableOpacity>
        )
     }

    renderItemRow(item) {
        return (
           <View style={[ { width: '100%', flexDirection: 'column', flex: 1 , justifyContent: 'center' ,alignItems: 'center' , marginHorizontal: '4vw'  }]} >
              <TouchableOpacity activeOpacity={1} onPress={()=> (this.props.navigation.navigate("CategoryView"))}>
                    <View style={[styles.shadow,{ width:100 , height:100, alignItems:'center' ,justifyContent:'center', borderRadius:100/2 ,backgroundColor:'#fff'}]}>
                       <Image source={require('./../../../image/house.png')} resizeMode='contain'
                       style={{ width: 60, height: 60, }} />
                    </View>
                 <Text style={{fontSize:12,color:'#111111',textAlign:'center',margin:5}}>
                    {item}</Text>
              </TouchableOpacity>
           </View>
        )
    }
    renderRowNav(){
        return(
            <View style={{flexDirection:'row',width:'100vw' , height:'15vh', alignContent:'space-between' ,borderColor:'rgba(0,0,0,0)',backgroundColor:'#FFCF01',paddingTop:4 }}>
                  <View  style={{flex:0.1 , flexDirection: 'column' ,alignItems:'center', justifyContent:'center'}}>
                     <TouchableOpacity activeOpacity={1}>
                        <Icon name='angle-left' style={{}} size={50} color={'#383B43'} />
                     </TouchableOpacity>
                  </View>
                  <View style={{flex: 1 , flexDirection: 'column' , alignItems:'center', justifyContent: 'center'}}>
                     <FlatList style={{ width: '80%'}}
                     data={["Men" , "Women" , "Furniture" , "Fashion" , "Kids"]}
                     showsHorizontalScrollIndicator={false}
                     horizontal={true}
                     renderItem={({ item }) => this.renderItemRow(item)}
                     keyExtractor={(item, index) => index.toString()}
                  />
                  </View>
              <View style={{flex:0.1 , flexDirection: 'column' ,alignItems:'center', justifyContent:'center'}}>
                     <TouchableOpacity activeOpacity={1}>
                        <Icon name='angle-right' style={{ }} size={50} color={'#383B43'} />
                     </TouchableOpacity>
                  </View>
               </View>
        )
    }
    
    render(){
        return(
            <View>
               {this.state.showLogin ?
               <LoginSection handlerLogin={this.viewLogin} />
            : null
            }
                   {width < 1250 ? <MobileHeader title='HOME' handlerDrawer={this.viewDrawer} /> : 
                   <Header flagSearch={true} handlerLogin={this.viewLogin} /> 
                   }
                   {
                      this.state.drawer ? 
                        <Drawer handlerLogin={this.viewLogin}/>
                      :
                      null
                   }
                   {width < 1250 ? null :  
               <View style={{flexDirection: 'row'  ,justifyContent:'center', alignContent: 'center', marginVertical: 20}}>
                           <Image source={require('./../../../image/left.png')} resizeMode='cover' style={{ width: 120}}/>
                           <Text style= { {  color: '#FFCF01', fontSize: 40 , fontWeight: '600' , marginRight: 10} }>
                              LATEST
                           </Text>
                           <Text style= { {  color: '#383B43', fontSize: 40 , fontWeight: '600'}}>
                              STORES
                           </Text>
                           <Image source={require('./../../../image/right.png')} style={{ width: 120}}/>
                        </View>
                   }
                <View style={{justifyContent: 'center' , flex: 1 , borderWidth: 0 }}>
                    <FlatList 
                    data={list}
                    showsVerticalScrollIndicator={false}
                    numColumns={width < 1250 ? 1 : 3 }
                    renderItem={({ item }) => (
                      <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        {this.renderItemColom(item)}
                      </View>
                    )
                   }
                    keyExtractor={(item, index) => index.toString()}
                  />
                  </View>
                  {this.renderAboutInfo()}
                  {width < 1250 ?  null : this.renderEstiloMobileApp() }
                  {width < 1250 ? <MobileFooter /> : <Footer /> }
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
          height: 7,
       },
       shadowOpacity: 0.3,
       shadowRadius: 10,
       elevation: 5,
    },
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#F0F2F5',
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
   }
 });