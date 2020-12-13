import api from './api'

export default function resetpassword({ password1, email, token }) {

    const newPassword = {
        password: password1
    }

    return api.post(`/login/reset_password?email=${email}&token=${token}`, newPassword)
    
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return false
        })
}