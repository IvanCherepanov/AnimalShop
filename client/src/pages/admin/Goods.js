import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchDevices, fetchTypes} from "../../http/deviceApi";

import {Button, Row, Table} from "react-bootstrap";
import CreateBrand from "../../components/modals/CreateBrand";
import UpdateBrand from "../../components/modals/UpdateBrand";
import {fetchItems, fetchItemTypes, fetchPets} from "../../http/animal_shop/itemApi";
import ProductItem from "../../components/ProductItem";
import TableItem from "./TableItem";
import Create from "../../components/modals/Item/Create";
import CreateItem from "../../components/modals/Item/Create";
import {deleteBrand, fetchBrands} from "../../http/animal_shop/brandApi";


const Goods = observer(() => {
    const {product} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false);

    useEffect(()=>{
        fetchItemTypes().then(data => product.setTypes(data))
        fetchPets().then(data => product.setPets(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchItems(null, null, null,0).then(data =>
            product.setItems(data)
        )
    },[])

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
                <h1>Список товаров</h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <Button
                        variant={"outline-dark"}
                        className="mt-2"
                        onClick={() => setGoodsVisible(true)}
                    >
                        Add goods
                    </Button>
                    <CreateItem
                        show={goodsVisible}
                        onHide={() => setGoodsVisible(false)}
                    />
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Цена по скидке</th>
                    <th>Описание</th>
                    <th>Тип</th>
                    <th>Категория</th>
                    <th>Бренд</th>
                    <th>Изображение</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                    {product.items.map(
                        product =>
                            <TableItem key={product.itemId} item={product}/>
                    )}
                </tbody>
            </table>

        </div>

    );
});

export default Goods;