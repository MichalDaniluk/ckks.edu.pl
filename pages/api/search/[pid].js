//import axios from 'axios'

//export default async function handler(req, res) {
//  try {
//    const { pid } = req.query

//    //const result = await axios.get(`https://api.ckks.pl/api/search_get/${pid}`)
//    let response = await fetch(`https://api.ckks.pl/api/search_get/${pid}`)

//    if (response.ok) {
//      // if HTTP-status is 200-299
//      // get the response body (the method explained below)
//      let json = await response.json()
//      res.status(200).send(json)
//    }
//  } catch (response) {
//    alert('HTTP-Error: ' + response.status)
//  }
//}
