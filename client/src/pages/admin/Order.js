import React, {useContext, useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";

import {Button} from "react-bootstrap";
import CreateBrand from "../../components/modals/CreateBrand";
import UpdateBrand from "../../components/modals/UpdateBrand";
import {fetchItems} from "../../http/animal_shop/itemApi";
import {deleteOrder, fetchOrders} from "../../http/animal_shop/orderApi";
import {toast, ToastContainer} from "react-toastify";
import Create from "../../components/modals/Order/Create";
import Update from "../../components/modals/Order/Update";
import {DEVICE_PATH, ORDER_DETAIL_PATH} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";


const Order = observer(() => {
    const {product} = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false);
    const [orderNewVisible, setOrderNewVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const history = useNavigate()

    useEffect(()=>{
        fetchOrders().then(data => product.setOrders(data))
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
                <div className="col-lg-3">
                    <Button
                        variant={"outline-dark"}
                        className="mt-2"
                        onClick={() => setOrderVisible(true)}
                    >
                        Add order
                    </Button>
                    <Create
                        show={orderVisible}
                        onHide={() => setOrderVisible(false)}
                    />
                </div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Заказчик</th>
                    <th>Время заказа</th>
                    <th>Цена заказа</th>
                    {/*<th>Величина скидки</th>*/}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {product.orders.map((order) => (

                    <tr key={order.id}>

                        <td>{order.id}</td>
                        <td>{order.userId}</td>
                        <td>{order.orderTime}</td>
                        <td>{order.costOrder}</td>
                        {/*<td>{brand.sale}</td>*/}
                        <td>
                            <div  className="d-flex align-items-center">
                                <Button
                                    variant={"outline-dark"}
                                    className="mr-3"
                                    onClick={() => {
                                        setOrderNewVisible(true);
                                        setSelectedOrderId(order.id);
                                    }}
                                >
                                    Update order
                                </Button>
                                <Update
                                    show={orderNewVisible && selectedOrderId === order.id}
                                    onHide={() => setOrderNewVisible(false)}
                                    brandId={selectedOrderId}
                                />
                                <div className="m-lg-2"></div>
                                <Button
                                    className="ml-2 mr-3"
                                    variant="danger"
                                    onClick={(event) => deleteOrderById(event, order.id)}
                                >
                                    Удалить
                                </Button>
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

export default Order;