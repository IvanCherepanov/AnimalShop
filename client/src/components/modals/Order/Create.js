import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/animal_shop/brandApi";
import {createOrder} from "../../../http/animal_shop/orderApi";
import {getUserList} from "../../../http/animal_shop/userApi";
import {toast, ToastContainer} from "react-toastify";

const CreateBrand = ({show, onHide}) => {

    const [costOrder, setCostOrder] = useState(0);
    const [inputDate, setInputDate] = useState('');
    const [userId, setUserId] = useState(0);
    const [userIds, setUserIds] = useState([]);

    function addOrder() {
        createOrder({
            costOrder: costOrder,
            inputDate: inputDate,
            userId: userId
        }).then(data => {
            setCostOrder(0);
            setInputDate("");
            setUserId(0)
            onHide();
            toast.success("Create order successfull")
        })
            .catch(error =>{
                toast.error("Error during create order, try again")
            })
    }
    useEffect(() => {
        getUserList()
            .then(data => {
                // extract the user IDs from the array of users
                setUserIds(data);
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
                    Add order
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
                <Button variant="outline-success"  onClick={addOrder}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;