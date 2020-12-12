import api from './api'

export default function resetpassword({ password1 }) {

    const newPassword = {
        password: password1
    }

    return api.post(`/login/reset_password`, newPassword)
    
        .then(res => {
            
            return res.data
        })
        .catch(err => {

            return false
        })
}