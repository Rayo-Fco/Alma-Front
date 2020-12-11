import api from './api'

export default function findhelptoken({ helpToken }) {

    return api.get(`/gethelp?token=${helpToken}`, {
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}