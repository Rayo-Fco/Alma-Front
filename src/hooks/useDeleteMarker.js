import { useState } from 'react';
import deletemarkerservices from '../services/deletemarker';
export default function useDeleteMarker() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })
   
    const deletemarker = ({ idMarker }) => {
        setState({ loading: true, error: false })
        let errores = []

            deletemarkerservices({ idMarker })
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
        deletemarker,
        hasDeleteError: state.error,
        succeedDelete: state.succeed,
        isDeleteLoading: state.loading,
        errorMsj: state.errormsj

    }
}