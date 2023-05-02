import {useContext, useEffect, useState} from "react";

import {fetchOrders} from "../../http/animal_shop/orderApi";

import TableOrderDetailItem from "./TableOrderDetailItem";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import {getOrderDetailListById} from "../../http/animal_shop/orderDetailApi";
import {fetchItems, fetchItemTypes, fetchPets} from "../../http/animal_shop/itemApi";
import {fetchBrands} from "../../http/animal_shop/brandApi";

const OrderDetail = () => {
    const {product} = useContext(Context)
    const [orderDetails, setOrderDetails] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getOrderDetailListById(id)
            .then(data =>
                setOrderDetails(data.orderItems)
            )
    }, [])

    useEffect(()=>{
        fetchItemTypes().then(data => product.setTypes(data))
        fetchPets().then(data => product.setPets(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchItems(null, null, null,0).then(data =>
            product.setItems(data)
        )
    },[])

    return (

        <div className="container">
            <h1>Список товаров в заказе</h1>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Цена по скидке</th>
                    <th>Описание</th>
                    <th>Количество</th>
                    <th>Изображение</th>
                </tr>
                </thead>
                <tbody>
                {orderDetails.map((itemOrder) => (
                    <TableOrderDetailItem key={itemOrder.id} purchase={itemOrder}/>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default OrderDetail;