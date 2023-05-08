import {$springAuthHost, $springHost} from "../index";

export const getOrderDetailListById = async (orderId) => {
    const {data} = await $springAuthHost.get(`/api/orderDetail/list/${orderId}`)
    return data;
}