import api from './api'
export default function login({ email, password }) {
    const user = {
        email: email,
        password: password
    }
    return api.post(`/admin/login`, user, {
    })
        .then(res => {
            const { token } = res.data
            return token
        })
        .catch(err => {
            console.log(err.response.data.error)
            return null
        })
}