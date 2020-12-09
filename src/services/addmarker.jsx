import axios from 'axios';
import api from './api'

export default function addmarker({ category, title, latitude, longitude }) {

    let latitudefloat = latitude.toString()
    let longitudefloat = longitude.toString()
    let categoryid = ""
    if(category === 'pdi'){
        categoryid = "5f5bc46af5b58a4258f0ec78"
    }else if (category === 'comisaria'){
        categoryid = "5f5bc481f5b58a4258f0ec79"
    }
    const marker = {
        category: categoryid,
        title: title,
        latitude: latitudefloat,
        longitude: longitudefloat
    }

    const token = window.sessionStorage.getItem('tokenadmin')

    return axios.post(`${api}markers/add`, marker, {
        headers: { Authorization: "Bearer " + token }
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}