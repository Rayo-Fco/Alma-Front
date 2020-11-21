import { useState } from 'react';
import findcheckServices from '../services/findcheckin';

export default function useFindCheckin() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const findcheckin = ({ rut }) => {
        setState({ loading: true, error: false })

        findcheckServices({ rut })
            .then(checkinres => {
                console.log(rut)
                if (checkinres) {
                    console.log(checkinres)
                    if (checkinres.length < 1){
                        setState({ succeed: true, error: false, errormsj: '' })

                    }else{
                        setState({ succeed: true, error: false, errormsj: checkinres  })

                    }

                } else {
                    let errores = []
                    if (checkinres.length !== 41) {
                        for (let i = 0; i < checkinres.length; i++) {
                            errores.push(checkinres[i].message)

                        }
                    } else {
                        errores.push(checkinres)
                    }
                    console.log(checkinres)
                    setState({ succeed: false, error: true, errormsj: errores, })

                }
            })
            .catch(err => {
                setState({ succeed: false, error: true, errormsj: err, })
                console.log(err)
            })
    }

    return {
        findcheckin,
        hasFindError: state.error,
        succeedFind: state.succeed,
        errorFindMsj: state.errormsj,
    }
}