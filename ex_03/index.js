const axios = require('axios');
const urls = ['https://www.ejemplo1.com', 'https://www.ejemplo2.com', 'https://www.example.org'];



const getContent = () =>{
    urls.forEach(url =>{
        
       axios.get(url)
      
        .then(response =>{
            response.status === 200 ? console.log(response.data) : console.error(`Error ${response.status}`)
        })
        .catch(error =>{
            console.error(`Error en hacer la petición a  ${url} . \n Mensaje de ${error} `)
        })
         
    })
}
getContent()
