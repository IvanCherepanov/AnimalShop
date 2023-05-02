import {makeAutoObservable} from "mobx";

export default  class ProductStore{
    constructor() {
        this._itemTypes = []
        this._brands = []
        this._items = []
        this._itemsPag = []
        this._pets = []
        this._orders = []
        this._selectedItemType = {}
        this._selectedBrand = {}
        this._selectedPet = {}
        this._page = 0
        this._totalCount = 0
        this._limit = 9
        this._selectedName = null
        makeAutoObservable(this)
    }

    setSelectedName(name){
        this.setPage(0);
        this._selectedName = (name);
    }
    setSelectedItemType(itemType){
        this.setPage(0);
        this._selectedItemType = itemType
    }
    setSelectedBrand(brand){
        this.setPage(0)
        this._selectedBrand = brand
    }
    setSelectedPet(pet){
        this.setPage(0)
        this._selectedPet = pet
    }
    setTypes(itemTypes){
        this._itemTypes = itemTypes
    }
    setOrders(orders){
        this._orders = orders
    }
    setBrands(brands){
        this._brands = brands
    }
    setItems(items){
        this._items = items
    }

    setItemsPag(itemsPag){
        this._itemsPag = itemsPag
    }

    setPets(pets){
        this._pets = pets
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
    get types(){
        return this._itemTypes
    }

    get selectedName(){
        return this._selectedName
    }

    get brands(){
        return this._brands
    }

    get pets(){
        return this._pets
    }
    get items(){
        return this._items
    }

    get itemsPag(){
        return this._itemsPag
    }
    get orders(){
        return this._orders
    }

    get page(){
        return this._page
    }
    get selectedBrand(){
        return this._selectedBrand
    }

    get selectedItemType(){
        return this._selectedItemType
    }

    get selectedPet(){
        return this._selectedPet
    }
    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }
}