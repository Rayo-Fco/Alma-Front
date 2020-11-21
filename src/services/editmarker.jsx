import axios from 'axios';

export default function editmarker({ category, title}) {

    let categoryid = ""
    if(category === 'pdi'){
        categoryid = "5f5bc46af5b58a4258f0ec78"
    }else if (category === 'comisaria'){
        categoryid = "5f5bc481f5b58a4258f0ec79"
    }
    const marker = {
        category: categoryid,
        title: title,

    }

    const token = window.sessionStorage.getItem('tokenadmin')

    return axios.post(`http://localhost:3001/markers/edit`, marker, {
        headers: { Authorization: "Bearer " + token }
    })
        .then(res => {
            return "ok"
        })
        .catch(err => {
            return err.response.data.error[0]
        })
}