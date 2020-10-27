import axios from 'axios';

export default function findcommunes({ category, title, latitude, longitude }) {

    const token = window.sessionStorage.getItem('tokenadmin')


    return axios.post(`http://localhost:3001/`, marker, {
        headers: { Authorization: "Bearer " + token }
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}