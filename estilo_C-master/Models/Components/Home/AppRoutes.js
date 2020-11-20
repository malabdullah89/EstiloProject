import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home'
import DriverHome from './DriverHome'
import TermsOfUse from './TermsOfUse'
import ReturnPolicy from './ReturnPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import Cart from './Cart'
import Products from './Products'
import ProductDetail from './ProductDetail'
import AddressesBook from './AddressesBook'
import EditAddress from './EditAddress'
import AddNewAddress from './AddNewAddress'
import Checkout from './Checkout'
import CheckoutDone from './CheckoutDone'
import CheckoutFail from './CheckoutFail'
import Invoice from './Invoice'
import DriverOrderDetail from './DriverOrderDetail'
import DeliveryLocation from './DeliveryLocation'




const AppRoutes = createStackNavigator(
    {
      Home: {
         screen: Home,
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
         Cart: {
            screen: Cart,
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
         ProductDetail: {
            screen: ProductDetail,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         AddressesBook: {
            screen: AddressesBook,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         EditAddress: {
            screen: EditAddress,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         AddNewAddress: {
            screen: AddNewAddress,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         Checkout: {
            screen: Checkout,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         CheckoutDone: {
            screen: CheckoutDone,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         CheckoutFail: {
            screen: CheckoutFail,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         Invoice: {
            screen: Invoice,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         DriverHome: {
            screen: DriverHome,
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
         DeliveryLocation: {
            screen: DeliveryLocation,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
        
         
     
     
     
    },
    {
      initialRouteName: 'Home',
    },
  );
  
  const AppContainer = createAppContainer(AppRoutes);
  export default AppContainer;

