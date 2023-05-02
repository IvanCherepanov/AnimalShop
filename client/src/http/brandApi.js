
import jwt_decode from "jwt-decode"
import {$authHost, $host} from "./index";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand?sort=id')
    return data
}

export const getById = async (id) => {
    const {data} = await $host.get(`api/brand/${id}`)
    return data
}

export const updateBrand = async (params) => {
    const {id, brand} = params;
    console.log("w", id, brand)
    const {data} = await $host.put(`api/brand/${id}`, brand)
    return data
}

export const deleteBrand = async (id) => {
    const {data} = await $host.delete(`api/brand/${id}`)
    return data
}


