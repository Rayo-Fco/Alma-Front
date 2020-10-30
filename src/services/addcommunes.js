import axios from 'axios';

export default function addcommunes({ commune, phone, latitude, longitude  }) {

    let latitudefloat = latitude.toString()
    let longitudefloat = longitude.toString()
    console.log(commune, phone, latitude, longitude)
    const comuna = {
        comuna: commune,
        phone: phone,
        coordinates: [{
            latitude: latitudefloat,
            longitude: longitudefloat,
        }]
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