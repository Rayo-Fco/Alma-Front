import { useState } from 'react'
import findcheckServices from '../services/findcheckin'

export default function useFindCheckin() {
    const [state, setState] = useState({ succeed: false, loading: false, error: false, errormsj: '', checkin: '' })

    const findcheckin = ({ rut }) => {
        setState({ loading: true, error: false })

        findcheckServices({ rut })
            .then(checkinres => {
                if (checkinres) {
                    if (checkinres.length < 1){
                        setState({ succeed: true, loading: false, error: false, errormsj: '', checkin: '' })

                    }else{
                        setState({ succeed: true, loading: false, error: false, errormsj: '', checkin:checkinres })
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
                    setState({ succeed: false, loading: false, error: true, errormsj: errores, })

                }
            })
            .catch(err => {
                setState({ succeed: false, loading: false, error: true, errormsj: err, })
            })
    }

    return {
        findcheckin,
        isFindLoading: state.loading,
        hasFindError: state.error,
        succeedFind: state.succeed,
        errorFindMsj: state.errormsj,
        checkin: state.checkin
    }
}