import { useState } from 'react';
import findhelsosServices from '../services/findhelpsos';

export default function useFindHelpSOS() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const findhelpsos = ({ rut }) => {
        setState({ loading: true, error: false })

        findhelsosServices({ rut })
            .then(helpsosres => {
                if (helpsosres) {
                    if (helpsosres === "ok" ){
                        setState({ succeed: true, error: false, errormsj: '' })

                    }else{
                        setState({ succeed: true, error: false, errormsj: '', helpsos:helpsosres  })
                    }

                } else {
                    let errores = []
                    if (helpsosres.length !== 41) {
                        for (let i = 0; i < helpsosres.length; i++) {
                            errores.push(helpsosres[i].message)

                        }
                    } else {
                        errores.push(helpsosres)
                    }
                    console.log(helpsosres)
                    setState({ succeed: false, error: true, errormsj: errores, })

                }
            })
            .catch(err => {
                setState({ succeed: false, error: true, errormsj: err, })
                console.log(err)
            })
    }

    return {
        findhelpsos,
        hasFindError: state.error,
        succeedFind: state.succeed,
        errorFindMsj: state.errormsj,
        helpsos: state.helpsos
    }
}