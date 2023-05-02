import React, {useContext, useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";

import {Button} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import UpdateBrand from "../components/modals/UpdateBrand";
import {fetchItems} from "../http/animal_shop/itemApi";
import {deleteOrder, fetchOrders, getOrderById} from "../http/animal_shop/orderApi";
import {toast, ToastContainer} from "react-toastify";
import Create from "../components/modals/Order/Create";
import Update from "../components/modals/Order/Update";
import {DEVICE_PATH, ORDER_DETAIL_PATH} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";


const MyOrder = observer(() => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const [myOrder, setMyOrder]= useState([])
    const history = useNavigate()

    useEffect(()=>{
        getOrderById(user.user.id).then(data => setMyOrder(data))
    }, []) // todo device.brands

    const deleteOrderById = async (event, id) => {
        try {
            event.preventDefault();
            await deleteOrder(id); // make DELETE request to API endpoint
            toast.success("Delete successful")
        } catch (e) {
            toast.error("try again")
            console.error(e);
        }
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
                <h1>Список Заказов</h1>
            </div>
            <ToastContainer/>
            <div className="row">
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Время заказа</th>
                    <th>Цена заказа</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {myOrder.map((order) => (
                    <tr key={order.id}>
                        <td>{order.orderTime}</td>
                        <td>{order.costOrder}</td>
                        <td>
                            <div  className="d-flex align-items-center">

                                <Button
                                    className="ml-2"
                                    onClick={() => history(ORDER_DETAIL_PATH + '/' + order.id)}
                                >
                                    Детали
                                </Button>

                            </div>


                        </td>
                    </tr>

                ))}
                </tbody>
            </table>

        </div>

    );
});

export default MyOrder;