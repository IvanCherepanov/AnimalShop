import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {getBrandById, updateBrand} from "../../../http/animal_shop/brandApi";
import {getItemTypeById, updateItemType} from "../../../http/animal_shop/itemTypeApi";


const UpdateItemType = ({show, onHide, itemTypeId: itemTypeId}) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        // загрузить текущее значение бренда с сервера
        getItemTypeById(itemTypeId).then(itemType => {
            // установить начальное значение для value равное значению бренда
            setValue(itemType.itemTypeName);
        });
    }, [itemTypeId]);

    function refactorItemType() {
        const params = {
            id: itemTypeId,
            itemType: {
                itemTypeName:value
        }}
        updateItemType(params).then(data => {
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
                    Update itemType
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
                <Button variant="outline-success"  onClick={refactorItemType}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateItemType;