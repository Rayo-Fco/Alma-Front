import { useState } from 'react';
import addcommunes from '../services/addcommunes';
export default function useAddMarker() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const addcommunes = ({ comuna, latitude, longitude, telefono }) => {
        addcommunesservices({ comuna, latitude, longitude, telefono })
            .then(communeres => {
                if (communeres === "ok") {
                    setState({ succeed: true, error: false, errormsj: '' })

                } else {
                    let errores = []
                    for (let i = 0; i < communeres.message.length; i++) {
                        errores.push(communeres.message[i].message)
                    }
                    setState({ succeed: false, error: true, errormsj: errores })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return {
        addcommunes,
        hasAddError: state.error,
        succeedAdd: state.succeed,
        errorMsj: state.errormsj
    }
}