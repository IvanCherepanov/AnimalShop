import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const fetchJoke = async () => {
    const {data} = await $authHost.get('api/hehe')
    return data
}