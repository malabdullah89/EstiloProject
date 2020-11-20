/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppRoutes from './Models/Components/Home/AppRoutes';

import {createStore, applyMiddleware} from 'redux';
import NavigationServices from './Models/NavigationServices';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './Models/Reducers';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppRoutes
          ref={navigatorRef => {
            NavigationServices.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}



export default App;
