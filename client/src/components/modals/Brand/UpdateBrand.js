import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {getBrandById, updateBrand} from "../../../http/animal_shop/brandApi";


const UpdateBrand = ({show, onHide, brandId}) => {
    const [value, setValue] = useState('')
    const [sale, setSale] = useState(0);

    useEffect(() => {
            // загрузить текущее значение бренда с сервера
            getBrandById(brandId).then(brand => {
                // установить начальное значение для value равное значению бренда
                setValue(brand.brandName);
                setSale(brand.sale);
            });
        }, [brandId]);//

    function refactorBrand() {
        const params = {id: brandId, brand: {brandName:value, sale: sale}}
        updateBrand(params).then(data => {
            setValue('')
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
                    Update brand
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
                <Button variant="outline-success"  onClick={refactorBrand}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateBrand;