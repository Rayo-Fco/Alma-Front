import axios from 'axios';

export default function addcommunes({ comuna, latitude, longitude, telefono }) {

    let latitudefloat = latitude.toString()
    let longitudefloat = longitude.toString()

    const commune = {
        comuna: comuna,
        coordinates: {
            latitud: latitudefloat,
            longitude: longitudefloat,
        },
        telefono: telefono
    }
    const token = window.sessionStorage.getItem('tokenadmin')

    return axios.post(`http://localhost:3001/comuna/add`, commune, {
        headers: { Authorization: "Bearer " + token }
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}