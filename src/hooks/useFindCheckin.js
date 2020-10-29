import { useCallback, useState } from 'react';
import findcheckServices from '../services/findcheckin';

export default function useFindCheckin() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '', product:''})

    const findcheckin = useCallback(({ rut }) => {
        findcheckServices({ rut })
            .then(checkinres => {
                console.log(rut)
                if (checkinres) {
                    setState({ succeed: true, error: false, errormsj: '', checkin: checkinres})

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
                    setState({ succeed: false, error: true, errormsj: errores, checkin: '' })

                }
            })
            .catch(err => {
                setState({ succeed: false, error: true, errormsj: err, checkin: '' })
                console.log(err)
            })
    })

    return {
        findcheckin,
        hasFindError: state.error,
        succeedFind: state.succeed,
        errorFindMsj: state.errormsj,
        checkin: state.checkin
    }
}