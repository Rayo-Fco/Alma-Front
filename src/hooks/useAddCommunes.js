import { useState } from 'react';
import addcommunesservices from '../services/addcommunes';
export default function useAddCommune() {
    const [state, setState] = useState({ succeed: false, error: false, errormsj: '' })

    const addcommunes = ({ commune, phone, latitude, longitude }) => {
        addcommunesservices({ commune, phone, latitude, longitude  })
            .then(communeres => {
                if (communeres === "ok") {
                    console.log('llego')
                    setState({ succeed: true, error: false, errormsj: '' })

                } else {
                    let errores = []
                    console.log('llego 2')

                    for (let i = 0; i < communeres.message.length; i++) {
                        errores.push(communeres.message[i].message)
                        console.log(communeres.message[i].message)
                    }
                    setState({ succeed: false, error: true, errormsj: errores })
                }
            })
            .catch(err => {
                let errores = []

                errores.push('La comuna '+ commune +' ya ha sido registrado')
                setState({ succeed: false, error: true, errormsj: errores })

            })
    }

    return {
        addcommunes,
        hasAddError: state.error,
        succeedAdd: state.succeed,
        errorMsj: state.errormsj
    }
}