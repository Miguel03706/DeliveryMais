import axios from 'axios'


const api = axios.create({
    baseURL: 'https://localhost:8082',
});


api.interceptors.request.use(req => {
    if(localStorage.getItem('sessionToken')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('sessionToken')}`
    }
    return req

}, (error) => {
    console.log(error)
})



api.interceptors.response.use(response => {
    return response
}, (error) => {
    if(error.response.status === 401){
        localStorage.removeItem('sessionToken')
        document.location = '/login'
    }
    return error
})

export default api;