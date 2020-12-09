import axios from 'axios';
import api from './api'

export default function findcheckin({ rut }) {

    const token = window.sessionStorage.getItem('tokenadmin')
    return axios.get(`${api}checkin/user/${rut}`, {
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