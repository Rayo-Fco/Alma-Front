import axios from 'axios';

export default function addcommunes({ commune, phone, coordinates }) {


    console.log(commune, phone, coordinates)
    const comuna = {
        comuna: commune,
        phone: phone,
        coordinates: coordinates
    }
    const token = window.sessionStorage.getItem('tokenadmin')

    return axios.post(`http://localhost:3001/comuna/add`, comuna, {
        headers: { Authorization: "Bearer " + token }
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return "error"
        })
}