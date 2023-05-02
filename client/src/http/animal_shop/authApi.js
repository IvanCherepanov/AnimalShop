import jwt_decode from "jwt-decode"
import {$springAuthHost, $springHost} from "../index";
export const registrationSpring = async (email, password, name) => {
    const {data} = await $springHost.post('register', {
        email: email,
        password: password,
        name: name
    })
    console.log(data);
    return data;
}

export const loginSpring = async (username, password) => {
    const {data} = await $springHost.post('auth', {
        email:username,
        password:password})
    // console.log(data.authToken)
    // console.log(data.token)
    localStorage.setItem('token', data.authToken)
    return jwt_decode(data.authToken)
}

export const getUserByTokenPayload = async () => {
    const token = localStorage.getItem('token');
    if (token){
        const decodedToken = jwt_decode(token);
        const username = decodedToken.sub;
        //console.log("username from authApi: ", username)
        const {data} = await $springAuthHost.get('load_user')
        //console.log(data)
        if (data){
            return (data)
        }
        else{
            return (null)
        }
    }else{
        return null
    }
}