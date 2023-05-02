import {$springAuthHost, $springHost} from "../index";

export const fetchItemTypes = async () => {
    const {data} = await $springHost.get('api/item_type/list')
    return data
}

export const getItemTypeById = async (id) => {
    const {data} = await $springHost.get(`api/item_type/${id}`)
    return data
}

export const createItemType = async (itemType) => {
    const {data} = await $springAuthHost.post('api/item_type/create', itemType)
    return data
}
export const deleteItemType = async (id) => {
    const {data} = await $springAuthHost.delete(`api/item_type/${id}`)
    return data
}

export const updateItemType = async (params) => {
    const {id, itemType} = params;
    const {data} = await $springAuthHost.put(`api/item_type/${id}`, itemType)
    return data
}