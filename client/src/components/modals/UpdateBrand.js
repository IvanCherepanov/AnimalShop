import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand, createType} from "../../http/deviceApi";
import {getById, updateBrand} from "../../http/brandApi";

const UpdateBrand = ({show, onHide, brandId}) => {
    const [value, setValue] = useState('')
    console.log(brandId)
    useEffect(() => {
            // загрузить текущее значение бренда с сервера
            getById(brandId).then(brand => {
                // установить начальное значение для value равное значению бренда
                setValue(brand.name);
            });
        }, [brandId]);

    function refactorBrand() {
        console.log("1", value, brandId)
        const params = {id: brandId, brand: {name:value}}
        updateBrand(params).then(data => {
            console.log("update!!")
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
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Input type name"}
                    />
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