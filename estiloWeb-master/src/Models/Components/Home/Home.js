import React, { Component } from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux' // redux
import { SetLoading , getCategory} from './../../Actions' //redux
import HomeSectionView from '../Section/HomeSectionView';

class Home extends Component {
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
      };
   }

    UNSAFE_componentWillMount(){
     this.props.getCategory()
    }

   render() {
      return (
         <View style={{flex: 1 , flexDirection: 'column'}}>
               <HomeSectionView navigation={this.props.navigation}/>
         </View>
      )}
}

//redux
const mapStateToProps = state => {
   return {
      Language: state.LanguageReducer.Language,
      Processing: state.AuthReducer.Processing,
      Message: state.AuthReducer.Message,
      User: state.AuthReducer.User,
      Categories: state.AuthReducer.Categories
   }
}
// redux
export default connect(mapStateToProps, { SetLoading , getCategory  })(Home)
