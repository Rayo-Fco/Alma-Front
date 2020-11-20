import { useState } from 'react';
import editmarkerservices from '../services/editmarker';
export default function useEditMarker() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })

    const editmarker = ({ category, title }) => {
        setState({ loading: true, error: false })
        let errores = []

        editmarkerservices({ category, title })
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
                console.log(err)
            })

    }

    return {
        editmarker,
        hasEditError: state.error,
        succeedEdit: state.succeed,
        isEditLoading: state.loading,
        errorMsj: state.errormsj

    }
}