import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/animal_shop/brandApi";

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [sale, setSale] = useState(0);

    function addBrand() {
        createBrand({brandName: value, sale: sale}).then(data => {
            setValue('');
            setSale(0);
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
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Input type name"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sale</Form.Label>
                        <Form.Control
                            value={sale}
                            onChange={e => setSale(e.target.value)}
                            placeholder={"Input sale"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger"  onClick={onHide}>Close</Button>
                <Button variant="outline-success"  onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;