import { useState } from 'react';
import addmarkerservices from '../services/addmarker';
export default function useAddMarker() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })
   
    const addmarker = ({ category, title, latitude, longitude }) => {
        setState({ loading: true, error: false })
        let errores = []
        if (latitude !== undefined && longitude !== undefined) {


            addmarkerservices({ category, title, latitude, longitude })
                .then(markerres => {
                    if (markerres === "ok") {
                        setState({ succeed: true, loading: false, error: false, errormsj: '' })

                    } else {
                        for (let i = 0; i < markerres.message.length; i++) {
                            errores.push(markerres.message[i].message)
                        }
                        setState({ succeed: false, loading: false, error: true, errormsj: errores })
                    }
                })
                .catch(err => {
                    setState({ succeed: false, loading: false, error: true, errormsj: '' })
                })
        } else {
            errores.push("Ingrese una Longitud y Latitud")
            setState({ succeed: false, loading: false, error: true, errormsj: errores })

        }
    }

    return {
        addmarker,
        hasAddError: state.error,
        succeedAdd: state.succeed,
        isAddLoading: state.loading,
        errorMsj: state.errormsj

    }
}