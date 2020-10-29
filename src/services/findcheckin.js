import axios from 'axios';

export default function findproducto({ rut }){
       
    return axios.get('http://localhost:3001/user/ '+rut, {
      })
        .then(res => {
            console.log()
            return res.data.stock
        })
        .catch(err => {
           
            return false
        })
}