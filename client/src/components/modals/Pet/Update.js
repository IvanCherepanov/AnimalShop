import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {getBrandById, updateBrand} from "../../../http/animal_shop/brandApi";
import {getPetById, updatePet} from "../../../http/animal_shop/petApi";


const UpdatePet = ({show, onHide, petId}) => {
    const [value, setValue] = useState('')
    useEffect(() => {
        // загрузить текущее значение бренда с сервера
        getPetById(petId).then(pet => {
            // установить начальное значение для value равное значению бренда
            setValue(pet.petName);
        });
    }, [petId]);

    function refactorPet() {
        const params = {
            id: petId,
            pet:
                {
                    petName:value
                }
        }
        updatePet(params).then(data => {
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
                    Update pet
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
                <Button variant="outline-success"  onClick={refactorPet}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePet;