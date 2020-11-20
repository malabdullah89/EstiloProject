import React from 'react';
import { createBrowserApp } from "@react-navigation/web";
import { createStackNavigator } from 'react-navigation-stack';
import HomeSectionView from './Components/Section/HomeSectionView';
import CategoryView from './Components/Section/CategoryView';
import Products from './Components/Home/Products';
import Cart from './Components/Home/Cart';

const Routes = createStackNavigator(
    {
       HomeSectionView: {
          screen: HomeSectionView,
          navigationOptions: ({ navigation }) => ({
             header: null,
          }),
       },
       CategoryView: {
         screen: CategoryView,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      Products: {
         screen: Products,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      Cart: {
         screen: Cart,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      }
    },
    {
       initialRouteName: "Cart"
    }
 );
 
 const HomeViewContainer = createBrowserApp(Routes);
 
 export default HomeViewContainer;