import { useState } from 'react';
import resetpasswordservices from '../services/resetpassword';
export default function useResetPassword() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })
    let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

    const resetpassword = ({ password1, password2, email, token}) => {
        setState({ succeed: false, loading: true, error: false, errormsj: '' })
        if (password1 !== '' && password2 !== '') {
            if (password1 === password2) {
                if(pass.test(password1) && password1.length > 5)
                {
                resetpasswordservices({ password1, email, token })
                    .then(resetres => {
                        if (resetres === "ok") {
                            setState({ succeed: true, loading: false, error: false, errormsj: '' })

                        } else {
                            let errores = []
                            for (let i = 0; i < resetres.message.length; i++) {
                                errores.push(resetres.message[i].message)
                            }
                            setState({ succeed: false, loading: false, error: true, errormsj: errores })

                        }
                    })
                    .catch(err => {
                        let errores = []
                        errores.push('Ha ocurrido un error, ingrese bien los datos')
                        setState({ succeed: false, loading: false, error: true, errormsj: errores })

                    })
                }else{
                    let errores = []
                    errores.push('La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número, con 6 caracteres como mínimo')
                    setState({ succeed: false, loading: false, error: true, errormsj: errores })
                }
            }else{
                let errores = []
                errores.push('Las contraseñas no coinciden')
                setState({ succeed: false, loading: false, error: true, errormsj: errores })
            }
        } else {
            let errores = []
            errores.push('Primero debe ingresar las dos contraseñas')
            setState({ succeed: false, loading: false, error: true, errormsj: errores })
        }
    }

    return {
        resetpassword,
        hasResetError: state.error,
        succeedReset: state.succeed,
        isResetLoading: state.loading,
        errorMsj: state.errormsj
    }
}