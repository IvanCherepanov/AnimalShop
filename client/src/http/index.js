import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $springHost = axios.create({
    baseURL: process.env.REACT_APP_SPRING_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $springAuthHost = axios.create({
    baseURL: process.env.REACT_APP_SPRING_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

const authSpringInterceptor = config => {
    config.headers.Authorization = `${localStorage.getItem('token')}`
    return config
}

$springAuthHost.interceptors.request.use(authSpringInterceptor)
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $springHost,
    $springAuthHost
}