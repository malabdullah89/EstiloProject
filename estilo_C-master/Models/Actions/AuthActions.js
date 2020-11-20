import axios from 'axios'
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { StackActions, NavigationActions } from 'react-navigation'



export const UserLogin = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/login/', {
                email , password
            }).then((response)=> {
                if(response.data){
                    // alert(response.data.token +response.data.user_type )
                    const usr = {
                        token: response.data.token ,
                        user_type: response.data.user_type
                    }
                    // alert(JSON.stringify(usr))
                    AsyncStorage.setItem('User', JSON.stringify(usr))
                    dispatch({ type: 'LOGIN_SUCCESS', payload: usr })
                }
                   
            }).catch((error)=> {
                dispatch({ type: 'LOGIN_FAILED', payload: error.message })
                if (error.response.data.error) {
                    dispatch({ type: 'LOGIN_FAILED', payload: error.response.data.error })
                } else {
                    dispatch({ type: 'LOGIN_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'LOGIN_FAILED', payload: "No internet connection" })
       }
     });
    }
}

export const SaveUser = (usr) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: usr })
    }
}

export const UserRegister = (first_name, last_name, email, phone, password , terms_of_use ,gender, locations) => {
    return async (dispatch) => {
        dispatch({ type: 'REGISTER_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/signup/', {
                first_name, last_name, email, phone, password, terms_of_use ,gender,locations
            }).then((response)=> {
                if(response.data.detail=='successfully sign up'){
                    dispatch({ type: 'REGISTER_SUCCESS' })
                }
               
               
            }).catch( (error)=> {
                // dispatch({ type: 'REGISTER_FAILED', payload: error.message })
                console.log(error.response.data.error)
                if(error.response.data.error){
                    if (error.response.data.error.email) {
                        dispatch({ type: 'REGISTER_FAILED', payload: 'user with this Email already exists.' })
                    } else if(error.response.data.error.phone){
                        dispatch({ type: 'REGISTER_FAILED', payload: 'user with user with this Phone already exists.' })
                    }
                    else {
                        dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
                    }
                }
               
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'REGISTER_FAILED', payload: "No internet connection" })
       }
     });
    }
}

export const UpdateUser = (usr , token) => {
    return (dispatch) => {
        dispatch({ type: 'UPDATEUSER_ATTEMP' })
        try {
            axios.put('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile/'+ token , {
                first_name: usr.first_name,
                last_name: usr.last_name,
                phone: usr.phone, 
                email: usr.email, 
                photo: usr.photo,
            }).then(function (response) {
                   if(response.data){
                    dispatch({ type: 'UPDATEUSER_SUCCESS'})
                   }
            }).catch(function (error) {
                dispatch({ type: 'UPDATEUSER_FAILED', payload: error.message })
                if (error.response.data.detail) {
                    dispatch({ type: 'UPDATEUSER_FAILED', payload: error.response.data.detail })
                } else {
                    dispatch({ type: 'UPDATEUSER_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'UPDATEUSER_FAILED', payload: "Something went wrong" })
        }
    }
}

export const SetLoading = ( bool ) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER', payload: bool })
    }
}
export const Logout = (usr) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGOUT_ATTEMP' })
        try {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ],
            }))
            dispatch({ type: 'LOGOUT_SUCCESS', payload: usr })
        } catch (error) {
            dispatch({ type: 'LOGOUT_FAILED', payload: error.message })
        }
    }
}

export const ForgetPwd = (email) => {
    return async (dispatch) => {
        dispatch({ type: 'FORGETPWD_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/forget_password/', {
                email 
            }).then((response)=> {
                if(response.data.detail=='reset code sent successfully.'){
                    dispatch({ type: 'FORGETPWD_SUCCESS' })
                }
                   
            }).catch((error)=> {
                dispatch({ type: 'FORGETPWD_FAILED', payload: error.message })
                if (error.response.data.error) {
                    dispatch({ type: 'FORGETPWD_FAILED', payload: error.response.data.error })
                } else {
                    dispatch({ type: 'FORGETPWD_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'FORGETPWD_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'FORGETPWD_FAILED', payload: "No internet connection" })
       }
     });
    }
} 
export const getUserProfile = (Token ) => {
    return async (dispatch) => {
        dispatch({ type: 'USERPROFILE_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile', {
                headers: {
                    'Authorization': 'Token '+Token,
                  }
            }).then((response)=> {
                if(response.data.profile){
                    const userData = {
                        id: response.data.profile.id ,
                        first_name: response.data.profile.first_name,
                        last_name: response.data.profile.last_name,
                        email: response.data.profile.email,
                        photo: response.data.profile.photo,
                        phone: response.data.profile.phone,
                        points: response.data.profile.points,
                        city: response.data.profile.city,
                        lon: response.data.profile.lon,
                        lat: response.data.profile.lat,
                        user_type: response.data.profile.user_type,
                    }
                    dispatch({ type: 'USERPROFILE_SUCCESS', payload: userData })
                }
                   
            }).catch((error)=> {
                dispatch({ type: 'USERPROFILE_FAILED', payload: error.message })
                if (error.response.data.detail) {
                    dispatch({ type: 'USERPROFILE_FAILED', payload: error.response.data.detail })
                } else {
                    dispatch({ type: 'USERPROFILE_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'USERPROFILE_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'USERPROFILE_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const getCategory = () => {
    return async (dispatch) => {
        dispatch({ type: 'CATEGORY_ATTEMP' })
        try {
            axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/product/categories/')
            .then(function (response) {
                const Data = response.data;
                 const category = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    name:Data[index].name,
                    describtion: Data[index].describtion,
                    id:Data[index].id,
                    image:Data[index].image
                }
             
                category.push(obj)
            }
            dispatch({ type: 'CATEGORY_SUCCESS', payload: category })
            }).catch(function (error) {
                    dispatch({ type: 'CATEGORY_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'CATEGORY_FAILED', payload: "Something went wrong" })
        }
    }
       
}

export const getStores = () => {
    return async (dispatch) => {
        dispatch({ type: 'STORES_ATTEMP' })
        try {
            axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/seller/seller_list/')
            .then(function (response) {
                const Data = response.data.list;
                 const stores = []
                 for (let index = 0; index < Data.length; index++) {
                var obj = {
                    id: Data[index].id,
                    store: Data[index].store,
                    email: Data[index].email,
                    phone: Data[index].phone,
                    deivery_method: Data[index].deivery_method,
                    credit_card: Data[index].credit_card,
                    cash: Data[index].cash,
                    k_net: Data[index].k_net,
                }
                stores.push(obj)
            }
            dispatch({ type: 'STORES_SUCCESS', payload: stores })
            }).catch(function (error) {
                    dispatch({ type: 'STORES_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'STORES_FAILED', payload: "Something went wrong" })
        }
    }
       
}

export const ChangePwd=(Token , password , new_password )=>{
    return async (dispatch) => {
        dispatch({ type: 'CHANGEPWD_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/change_password/',{
              password , new_password
            }, 
            {
                headers: {
                    'Authorization': 'Token '+Token,
                  }
            }).then((response)=> {
                if(response.data.detail){
                    alert(response.data.detail)
                    dispatch({ type: 'CHANGEPWD_SUCCESS'})
                }
               
            }).catch((error)=> {
                if(error.response.data.password){
                    dispatch({ type: 'CHANGEPWD_FAILED', payload: error.response.data.password })
                }else{
                    dispatch({ type: 'CHANGEPWD_FAILED', payload: error.message })
                }
                
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'CHANGEPWD_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'CHANGEPWD_FAILED', payload: "No internet connection" })
       }
     });
    }
}