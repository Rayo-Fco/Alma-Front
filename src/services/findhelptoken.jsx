import axios from 'axios';

export default function findcommunes({ helptoken }) {



    return axios.post(`http://localhost:3001/${helptoken}`, {
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}