import {$springAuthHost, $springHost} from "../index";

export const fetchOrders = async () => {
    const {data} = await $springAuthHost.get('api/order/list')
    return data
}

export const createOrder = async (order) => {
    const {data} = await $springAuthHost.post('api/order/create', order)
    return data
}

export const getOrderByUser = async (userId) => {
    const {data} = await $springHost.get(`api/order/user/${userId}`)
    return data;
}

export const updateOrder = async (params) => {
    const {id, order} = params;
    console.log("w", id, order)
    const {data} = await $springAuthHost.put(`/api/order/${id}`, order)
    return data
}

export const deleteOrder = async (id) => {
    const {data} = await $springAuthHost.delete(`/api/order/${id}`)
    return data
}

export const getOrderById = async (id) => {
    const {data} = await $springAuthHost.get(`api/order/user/${id}`)
    return data
}