export const SetLanguage = (lang) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LANGUAGE', payload: { Language: lang } })
    }
};

export const SetLogged = (logged) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LOGGED', payload: { Logged: logged } })
    }
}