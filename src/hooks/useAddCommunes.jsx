import { useState } from 'react';
import addcommunesservices from '../services/addcommunes';
export default function useAddCommune() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })

    const addcommunes = ({ commune, phone, coordinates }) => {
        setState({ succeed: false, loading: true, error: false, errormsj: '' })
        if (commune !== '' && phone !== '' && coordinates !== '') {
            addcommunesservices({ commune, phone, coordinates })
                .then(communeres => {
                    if (communeres === "ok") {
                        setState({ succeed: true, loading: false, error: false, errormsj: '' })

                    } else {
                        let errores = []
                        for (let i = 0; i < communeres.message.length; i++) {
                            errores.push(communeres.message[i].message)
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
            errores.push('Llene todo el formulario')
            setState({ succeed: false, loading: false, error: true, errormsj: errores })
        }
    }

    return {
        addcommunes,
        hasAddError: state.error,
        succeedAdd: state.succeed,
        isAddLoading: state.loading,
        errorMsj: state.errormsj
    }
}