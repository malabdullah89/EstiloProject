import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import DriverHome from './DriverHome'
import TermsOfUse from './TermsOfUse'
import ReturnPolicy from './ReturnPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import DriverOrderDetail from './DriverOrderDetail'
import MyProfile from './MyProfile'





const AppRoutes = createStackNavigator(
    {
      DriverHome: {
         screen: DriverHome,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
        TermsOfUse: {
            screen: TermsOfUse,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         ReturnPolicy: {
            screen: ReturnPolicy,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         PrivacyPolicy: {
            screen: PrivacyPolicy,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         DriverOrderDetail: {
            screen: DriverOrderDetail,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         MyProfile: {
            screen: MyProfile,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
        
         
     
     
     
    },
    {
      initialRouteName: 'DriverHome',
    },
  );
  
  const AppContainer = createAppContainer(AppRoutes);
  export default AppContainer;

