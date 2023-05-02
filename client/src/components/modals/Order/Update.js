import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {getBrandById, updateBrand} from "../../../http/animal_shop/brandApi";
import {getOrderById, updateOrder} from "../../../http/animal_shop/orderApi";
import {ToastContainer} from "react-toastify";
import {getUserList} from "../../../http/animal_shop/userApi";


const UpdateOrder = ({show, onHide, brandId: orderId}) => {
    const [costOrder, setCostOrder] = useState(0);
    const [inputDate, setInputDate] = useState('');
    const [userId, setUserId] = useState(0);
    const [userIds, setUserIds] = useState([]);


    useEffect(() => {
        // загрузить текущее значение бренда с сервера
        getOrderById(orderId).then(order => {
            // установить начальное значение для value равное значению бренда
            setCostOrder(order.costOrder)
            setUserId(order.userId)
            setInputDate(order.inputDate)
        });
    }, [orderId]);

    function refactorOrder() {
        const params = {
            id: orderId,
            order: {
                userId: userId,
                costOrder: costOrder,
                inputDate: inputDate
            }
        }
        updateOrder(params).then(data => {
            onHide()
        })
    }

    useEffect(() => {
        getUserList()
            .then(data => {
                // extract the user IDs from the array of users
                setUserIds(data);
                console.log(userIds)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update order
                </Modal.Title>
                <ToastContainer/>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="costOrder">
                        <Form.Label>Cost Order</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="200"
                            value={costOrder}
                            onChange={(e) => setCostOrder(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="inputDate">
                        <Form.Label>Input Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="userId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control as="select" value={userId} onChange={(e) => setUserId(e.target.value)}>
                            <option value="0">select operator</option>
                            {userIds.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger"  onClick={onHide}>Close</Button>
                <Button variant="outline-success"  onClick={refactorOrder}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateOrder;