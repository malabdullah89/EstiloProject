const initialState = {
    Processing: false,
    Message: null,
    User: null,
    UserData :null,
    Categories:[],
    Stores:[]
}
 

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ATTEMP':
            return {
                ...state,
                Message: null,
                Processing: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                Processing: false,
                User: {
                    token: action.payload.token ,
                    user_type: action.payload.user_type
                },
                Message: "Login Done",
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                Processing: false,
                Message: action.payload
            }

        case 'LOGOUT_ATTEMP':
            return { ...state, Processing: true, Message: null, }
        case 'LOGOUT_SUCCESS':
            return { ...state, Processing: false, User: null, Message: null, }
        case 'LOGOUT_FAILED':
            return { ...state, Processing: false, Message: action.payload }

        case 'REGISTER_ATTEMP':
            return {
                ...state,
                Message: null,
                Processing: true,
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                Processing: false,
                Message: "Register Done",
            }
        case 'REGISTER_FAILED':
            return { ...state, Processing: false, Message: action.payload }
        case 'LOADING_USER':
            return {
                ...state,
                Message: null,
                Processing: action.payload,
            }
        case 'UPDATEUSER_ATTEMP':
             return { ...state, Processing: true, Message: null, }
        case 'UPDATEUSER_SUCCESS':
             return { ...state, Processing: false, Message: 'Update User Done'}
        case 'UPDATEUSER_FAILED':
             return { ...state, Processing: false, Message: action.payload }
        case 'FORGETPWD_ATTEMP':
             return { ...state, Processing: true, Message: null, }
        case 'FORGETPWD_SUCCESS':
             return { ...state, Processing: false, Message: 'Forget Pwd Done'}
        case 'FORGETPWD_FAILED':
             return { ...state, Processing: false, Message: action.payload }
        case 'USERPROFILE_ATTEMP':
            return { ...state, Processing: true, Message: null, }
        case 'USERPROFILE_SUCCESS':
            return { ...state, 
                Processing: false,
                UserData: {
                    id: action.payload.id ,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    email: action.payload.email,
                    photo: action.payload.photo,
                    phone: action.payload.phone,
                    points: action.payload.points,
                    city: action.payload.city,
                    lon: action.payload.lon,
                    lat: action.payload.lat,
                    user_type: action.payload.user_type,
                },
                 Message: 'Get Profile Done'}
        case 'USERPROFILE_FAILED':
            return { ...state, Processing: false, Message: action.payload }  
        case 'CATEGORY_ATTEMP':
            return { ...state ,Message: null,}
        case 'CATEGORY_SUCCESS':
            return { ...state, Processing: false, Categories: action.payload}
        case 'CATEGORY_FAILED':
            return { ...state, Processing: false, Message: action.payload }       
        case 'STORES_ATTEMP':
            return { ...state ,Message: null, Processing: true}
        case 'STORES_SUCCESS':
            return { ...state, Processing: false, Stores: action.payload}
        case 'STORES_FAILED':
            return { ...state, Processing: false, Message: action.payload }
        case 'CHANGEPWD_ATTEMP':
            return { ...state ,Message: null,Processing: true}
        case 'CHANGEPWD_SUCCESS':
            return { ...state, Processing: false, Message: 'Change Password Done'}
        case 'CHANGEPWD_FAILED':
            return { ...state, Processing: false , Message: action.payload }

        default:
            return state
    }
};