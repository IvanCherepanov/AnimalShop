import {$springHost} from "../index";

export const getOrderDetailListById = async (orderId) => {
    const {data} = await $springHost.get(`/api/orderDetail/list/${orderId}`)
    return data;
}