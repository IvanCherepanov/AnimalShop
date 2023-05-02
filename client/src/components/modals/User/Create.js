import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/animal_shop/brandApi";
import {createUser} from "../../../http/animal_shop/userApi";

const CreateUser = ({show, onHide}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    function addUser() {
        createUser(
            {
                name: name,
                email: email,
                password: password,
                managerToken: token
            })
                .then(data => {
                    setName('')
                    setToken('')
                    setPassword('')
                    setEmail('')
                    onHide();
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
                    Add brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={"Input type name"}
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
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder={"Input password"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Manager-token</Form.Label>
                        <Form.Control
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            placeholder={"Input type name"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger"  onClick={onHide}>Close</Button>
                <Button variant="outline-success"  onClick={addUser}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUser;