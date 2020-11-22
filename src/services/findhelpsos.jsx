import axios from 'axios';

export default function findhelpsos({ rut }) {

    const token = window.sessionStorage.getItem('tokenadmin')
    return axios.get(`http://localhost:3001/helpSOS/user/${rut}`, {
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