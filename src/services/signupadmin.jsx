
import axios from 'axios';
import api from './api'
export default function signupadmin({ email, nombre, apellido, password1 }) {
    const user = {
        email: email,
        nombre: nombre,
        apellido: apellido,
        password: password1
    }
    return axios.post(`${api}admin/add/`, user)
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error
        })
}