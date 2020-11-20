import { createBrowserApp } from "@react-navigation/web";
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home'
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
import CategoryView from './../Section/CategoryView'
import AboutUs from './../AboutUs'
import MyOrders from './MyOrders';
import MyProfile from './MyProfile';
import MyFavorites from './MyFavorites';
import MyPoints from './MyPoints';
import ForgetPassword from './../ForgetPassword';
import ContactUs from "./ContactUs";


const AppRoutes = createStackNavigator(
    {
      index: {
         screen: Home,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
        terms: {
            screen: TermsOfUse,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         return_policy: {
            screen: ReturnPolicy,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         privacy_policy: {
            screen: PrivacyPolicy,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         cart: {
            screen: Cart,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         products: {
            screen: Products,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         product_detail: {
            screen: ProductDetail,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         addresses_book: {
            screen: AddressesBook,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         edit_address: {
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
         profile: {
            screen: MyProfile,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
         categories: {
            screen: CategoryView,
            navigationOptions: ({ navigation }) => ({
               header: null,
            }),
         },
        about: {
           screen: AboutUs,
           navigationOptions: ({ navigation }) => ({
            header: null,
         }),
        },
        orders: {
         screen: MyOrders,
         navigationOptions: ({ navigation }) => ({
          header: null,
       }),
      },
      favorites:{
         screen: MyFavorites,
         navigationOptions: ({ navigation }) => ({
          header: null,
       }),
      },
      points:{
         screen: MyPoints,
         navigationOptions: ({ navigation }) => ({
          header: null,
       }),
      },
      change_password:{
         screen: ForgetPassword,
         navigationOptions: ({ navigation }) => ({
          header: null,
       }),
      },
      contact_us:{
         screen: ContactUs,
         navigationOptions: ({ navigation }) => ({
          header: null,
       }),
      }
    },
    {
      initialRouteName: 'index',
    },
  );
  
  const AppContainer = createBrowserApp(AppRoutes);
  export default AppContainer;

