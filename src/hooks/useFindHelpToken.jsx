import { useState } from 'react'
import findhelptokenServices from '../services/findhelptoken'

export default function useFindCheckin() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })

    const findhelptoken = ({ helpToken }) => {
        setState({ succeed: false, loading: true, error: false, errormsj: '' })
        findhelptokenServices({ helpToken })
            .then(helptokenres => {
                if (helptokenres) {
                    if (helptokenres === 'ok') {
                        setState({ succeed: true, loading: false, error: false, errormsj: '' })
                    } else {
                        setState({ succeed: false, loading: false, error: true, errormsj: helptokenres })
                    }
                } else {
                    let errores = []
                    if (helptokenres.length !== 41) {
                        for (let i = 0; i < helptokenres.length; i++) {
                            errores.push(helptokenres[i].message)
                        }
                    } else {
                        errores.push(helptokenres)
                    }
                    setState({ succeed: false, loading: false, error: true, errormsj: errores })
                }
            })
            .catch(err => {
                setState({ succeed: false, loading: false, error: true, errormsj: err })
            })
    }

    return {
        findhelptoken,
        hasFindError: state.error,
        isFindLoading: state.loading,
        succeedFind: state.succeed,
        errorFindMsj: state.errormsj,
    }
}