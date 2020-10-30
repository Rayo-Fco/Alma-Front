import {useCallback, useContext, useState} from 'react';
import Context from '../context/UserContext';
import loginServices from '../services/login';

export default function useUser() {
    const {token, setTOKEN} = useContext(Context);
    const [state, setState] = useState({ loading: false, error: false})

    const login = useCallback(({email, password}) => {
        setState({loading: true, error: false})
        loginServices({email, password})
        .then( token => {
            if (token != null){
                localStorage.setItem('email', email);
                window.sessionStorage.setItem('tokenadmin', token)

                setState({loading: false, error: false})
                setTOKEN(token);
            }else{
                localStorage.removeItem('email');
                window.sessionStorage.removeItem('tokenadmin')
                setState({loading: false, error: true})
            }
           
            
        })
        .catch(err => {
            localStorage.removeItem('email');
            window.sessionStorage.removeItem('tokenadmin')
            setState({loading: false, error: true})
            
        })
    }, [setTOKEN])

    const logout = useCallback(() =>{
        localStorage.removeItem('email');
        window.sessionStorage.removeItem('tokenadmin')
        localStorage.clear()
        window.sessionStorage.clear()
        setTOKEN(null)
    }, [setTOKEN])


    return {
        
        isLogged: Boolean(token),
        isLoginLoading: state.loading,
        hasLoginError: state.error, 
        login,
        logout
    }
}
