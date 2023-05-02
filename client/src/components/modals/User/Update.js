import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {getBrandById, updateBrand} from "../../../http/animal_shop/brandApi";
import {getUserById, updateUser} from "../../../http/animal_shop/userApi";


const UpdateBrand = ({show, onHide, userId:userId}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // загрузить текущее значение бренда с сервера
        getUserById(userId).then(user => {
            // установить начальное значение для value равное значению бренда
            setName(user.username)
            setEmail(user.email)
        });
    }, [userId]);

    function refactorUser() {
        const params = {
            id: userId,
            user: {
                username:name,
                email: email,
                password: "",
                role: ""}
        }
        updateUser(params).then(data => {
            setEmail('')
            setName('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={"Input name"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={"Input email"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger"  onClick={onHide}>Close</Button>
                <Button variant="outline-success"  onClick={refactorUser}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateBrand;