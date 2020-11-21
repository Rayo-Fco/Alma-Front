import axios from 'axios';

export default function findhelptoken({ helpToken }) {

    return axios.get(`http://localhost:3001/gethelp/${helpToken}`, {
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}