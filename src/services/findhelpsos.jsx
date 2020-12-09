import axios from 'axios';
import api from './api'

export default function findhelpsos({ rut }) {

    const token = window.sessionStorage.getItem('tokenadmin')
    return axios.get(`${api}helpSOS/user/${rut}`, {
        headers: { Authorization: "Bearer " + token }
    })
    
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {

            return false
        })
}