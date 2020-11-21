import { useState } from 'react';
import signupAdminServices from '../services/signupadmin';

export default function useSignup() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const signupadmin = ({ email, nombre, apellido, password1, password2 }) => {
        if (password1 === password2) {
            signupAdminServices({ email, nombre, apellido, password1 })
                .then(registeres => {
                    if (registeres === "ok") {
                        setState({ succeed: true, error: false, errormsj: '' })

                    } else {
                        let errores = []
                        if (registeres.length === 22 || registeres.length === 24) {
                            errores.push(registeres)

                        } else {
                            for (let i = 0; i < registeres.length; i++) {
                                errores.push(registeres[i].message)
                            }
                        }
                        setState({ succeed: false, error: true, errormsj: errores })
                    }

                })
                .catch(err => {

                    console.log(err)

                })
        } else {
            let errores = []

            errores.push("No coinciden las contraseñas")

            setState({ succeed: false, error: true, errormsj: errores })
        }
    }

    return {
        signupadmin,
        hasSignError: state.error,
        succeedSign: state.succeed,
        errorMsj: state.errormsj

    }
}
