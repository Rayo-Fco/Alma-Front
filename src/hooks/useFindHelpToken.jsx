import { useState } from 'react';
import findhelptokenServices from '../services/findhelptoken';

export default function useFindCheckin() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '' })

    const findhelptoken = ({ helpToken }) => {
        console.log(helpToken)
        setState({ succeed: false, loading: true, error: false, errormsj: '' })
        findhelptokenServices({ helpToken })
            .then(helptokenres => {
                if (helptokenres) {
                    console.log(helptokenres);
                    if (helptokenres === "ok") {
                        setState({ succeed: true, loading: false, error: false, errormsj: '' })
                        console.log("sd");
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
                console.log(err)
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