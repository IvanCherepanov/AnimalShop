import {$springAuthHost, $springHost} from "../index";

export const getUserByUsername = async (name) => {
    const {data} = await $springAuthHost.get('api/user/username', {
        params: {
            userName: name
        }
    })
    console.log(data)
    return data
}

export const getUserList = async () => {
    const {data} = await $springAuthHost.get('api/user/list')
    return data
}

export const getUserById = async (id) => {
    const {data} = await $springHost.get(`api/user/${id}`)
    return data
}
export const updateUser = async (params) => {
    const {id, user} = params;
    console.log("w", id, user)
    const {data} = await $springAuthHost.put(`api/user/${id}`, user)
    return data
}

export const deleteUser = async (id) => {
    const {data} = await $springAuthHost.delete(`api/user/${id}`)
    return data
}

export const createUser = async (user) => {
    const {data} = await $springAuthHost.post('register',user)
    return data
}