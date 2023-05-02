import {$authHost, $host, $springAuthHost, $springHost} from "../index";
import jwt_decode from "jwt-decode"

export const createBrand = async (brand) => {
    const {data} = await $springAuthHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $springHost.get('api/brand?sort=id')
    return data
}

export const getBrandById = async (id) => {
    const {data} = await $springHost.get(`api/brand/${id}`)
    return data
}

export const updateBrand = async (params) => {
    const {id, brand} = params;
    const {data} = await $springAuthHost.put(`api/brand/${id}`, brand)
    return data
}

export const deleteBrand = async (id) => {
    const {data} = await $springAuthHost.delete(`api/brand/${id}`)
    return data
}


