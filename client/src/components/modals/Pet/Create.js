import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/animal_shop/brandApi";
import {createPet} from "../../../http/animal_shop/petApi";

const CreatePet = ({show, onHide}) => {
    const [value, setValue] = useState('')

    function addPet() {
        createPet(
            {
                petName: value
            }
        )
            .then(data => {
                setValue('');
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
                    Add pet
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Input type name"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger"  onClick={onHide}>Close</Button>
                <Button variant="outline-success"  onClick={addPet}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePet;