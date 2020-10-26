import { useState } from 'react';
import addmarkerervices from '../services/addmarker';
export default function useAddMarker() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const addmarker = ({ category, title, latitude, longitude }) => {
        addmarkerervices({ category, title, latitude, longitude })
            .then(markerres => {
                if (markerres === "ok") {
                    setState({ succeed: true, error: false, errormsj: '' })

                } else {
                    let errores = []
                    for (let i = 0; i < markerres.message.length; i++) {
                        errores.push(markerres.message[i].message)
                    }
                    setState({ succeed: false, error: true, errormsj: errores })
                }
            })
            .catch(err => {

                console.log(err)
            })
    }

    return {
        addmarker,
        hasAddError: state.error,
        succeedAdd: state.succeed,
        errorMsj: state.errormsj
    }
}