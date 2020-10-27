import { useState } from 'react';
import findcommunesservices from '../services/findcommunes';
export default function useAddMarker() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const findcommunes = ({ category, title, latitude, longitude }) => {
        findcommunesservices({ category, title, latitude, longitude })
            .then(findres => {
                if (findres === "ok") {
                    setState({ succeed: true, error: false, errormsj: '' })

                } else {
                    let errores = []
                    for (let i = 0; i < findres.message.length; i++) {
                        errores.push(findres.message[i].message)
                    }
                    setState({ succeed: false, error: true, errormsj: errores })
                }
            })
            .catch(err => {

                console.log(err)
            })
    }

    return {
        findcommunes,
        hasAddError: state.error,
        succeedAdd: state.succeed,
        errorMsj: state.errormsj
    }
}