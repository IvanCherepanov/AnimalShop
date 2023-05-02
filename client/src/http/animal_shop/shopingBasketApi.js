import {$authHost, $host, $springAuthHost, $springHost} from "../index"

export const addItemToBasket = async (userId, itemId, amount) => {
    console.log(userId, itemId, amount)
    const {data} = await $springAuthHost.post('api/shopping_basket/addPurchase',{
        userId: userId,
        id: itemId,
        count: amount
    })
    return data
}

export const getPurchase = async (userId) => {
    const {data} = await $springAuthHost.get('api/shopping_basket/get', {
        params: {
                userId: userId
            }
    })
    return data
}

export const changeItemToBasket = async (userId, itemId, amount) => {
    console.log(userId, itemId, amount)
    const {data} = await $springAuthHost.post('api/shopping_basket/changeAmountPurchases',{
        userId: userId,
        id: itemId,
        amount: amount
    })
    return data
}

export const deleteItemFromBasket = async (itemId, userId) => {
    const {data} = await  $springAuthHost.delete(`/api/shopping_basket/remove?itemId=${itemId}&userId=${userId}`);
    return data
}

export const buyFromBasket = async (userId, address, telephone) => {
    const {data} = await  $springAuthHost.post(`/api/shopping_basket/sendPurchases?userId=${userId}&address=${address}&telephone=${telephone}`);
    return data
}