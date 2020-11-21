import axios from 'axios';

export default function deletemarker({ idMarker }) {

    const marker = {
        _id: idMarker,
    }

    const token = window.sessionStorage.getItem('tokenadmin')

    return axios.post(`http://localhost:3001/markers/delete`, marker, {
        headers: { Authorization: "Bearer " + token }
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}