import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor() {
        this._types = [
            // {id: 1, name: 'refrigerators'},
            // {id:2, name: 'smartphones'},
            // {id:3, name: 'laptop'}
        ]
        this._brands = [
            // {
            //     id: 1,
            //     name: "Apple"
            // },
            // {
            //     id: 2,
            //     name: "Realme"
            // },
            // {
            //     id: 3,
            //     name: "Gorenje"
            // }
        ]
        this._devices = [
            // {
            //     id: 1,
            //     name: "Realme 9 Pro 5 G",
            //     price: 21800,
            //     rating: 4.5,
            //     img: "6813627a-3797-454d-8a61-b81cc598070d.jpg",
            //     typeId: 2,
            //     brandId: 2
            // },
            // {
            //     id: 2,
            //     name: "Холодильник Gorenje NRM8181UX",
            //     price: 89999,
            //     rating: 5,
            //     img: "dcb97504-a21c-4d54-a165-c4779656fd97.jpg",
            //     typeId: 1,
            //     brandId: 3
            // },
            // {
            //     id: 3,
            //     name: "Холодильник Gorenje 999",
            //     price: 8999,
            //     rating: 3,
            //     img: "6b910842-f5ef-4cb9-aa80-3faa4c44db88.jpg",
            //     typeId: 1,
            //     brandId: 3
            // },
            // {
            //     id: 4,
            //     name: "Холодильник Apple 999",
            //     price: 8999,
            //     rating: 1,
            //     img: "4d39ab40-9f3b-4498-b4a0-d6096c5d5a57.jpg",
            //     typeId: 1,
            //     brandId: 1
            // },
            // {
            //     id: 5,
            //     name: "Холодильник Apple 999",
            //     price: 8999,
            //     rating: 1,
            //     img: "4d39ab40-9f3b-4498-b4a0-d6096c5d5a57.jpg",
            //     typeId: 1,
            //     brandId: 1
            // },
            // {
            //     id: 6,
            //     name: "Холодильник Apple 999",
            //     price: 8999,
            //     rating: 1,
            //     img: "4d39ab40-9f3b-4498-b4a0-d6096c5d5a57.jpg",
            //     typeId: 1,
            //     brandId: 1
            // },
            // {
            //     id: 7,
            //     name: "Apple 17 pro",
            //     price: 198999,
            //     rating: 4,
            //     img: "6f43a40c-4fb4-45f2-b351-daaf625252a4.jpg",
            //     typeId: 2,
            //     brandId: 1
            // },
            // {
            //     id: 8,
            //     name: "Холодильник Apple 999",
            //     price: 8999,
            //     rating: 1,
            //     img: "4d39ab40-9f3b-4498-b4a0-d6096c5d5a57.jpg",
            //     typeId: 1,
            //     brandId: 1
            // },
            // {
            //     id: 9,
            //     name: "Холодильник Apple 999",
            //     price: 8999,
            //     rating: 1,
            //     img: "4d39ab40-9f3b-4498-b4a0-d6096c5d5a57.jpg",
            //     typeId: 1,
            //     brandId: 1
            // },
            // {
            //     id: 10,
            //     name: "Apple 17 pro",
            //     price: 198999,
            //     rating: 4,
            //     img: "6f43a40c-4fb4-45f2-b351-daaf625252a4.jpg",
            //     typeId: 2,
            //     brandId: 1
            // }
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 0
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setLimit(limit){
        this._limit = limit
    }

    setDevices(devices){
        this._devices = devices
    }

    get types(){
        return this._types
    }

    get brands(){
        return this._brands
    }

    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }
}