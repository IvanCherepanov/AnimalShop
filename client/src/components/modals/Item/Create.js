import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/animal_shop/brandApi";
import {createItem} from "../../../http/animal_shop/itemApi";
import {Context} from "../../../index";

const CreateItem = ({show, onHide}) => {
    const {product} = useContext(Context)
    const [cost, setCost] = useState(0);
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [itemTypeId, setItemTypeId] = useState(0);
    const [petTypeId, setPetTypeId] = useState(0);
    const [brandId, setBrandId] = useState(0);
    const [imagePath, setImagePath] = useState("");

    function addItem() {
        createItem({
            cost: cost,
            itemName: itemName,
            description: description,
            itemTypeId:itemTypeId,
            petTypeId: petTypeId,
            brandId: brandId,
            imagePath: imagePath
        })
            .then(data => {
            setCost(0);
            setItemName('');
            setDescription('');
            setItemTypeId(0);
            setPetTypeId(0);
            setBrandId(0);
            setImagePath("");
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
                        <Form.Label>Cost</Form.Label>
                        <Form.Control
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                            placeholder={"Input cost"}
                            type={"number"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={itemName}
                            onChange={e => setItemName(e.target.value)}
                            placeholder={"Input type ItemName"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Desc</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder={"Input type desc"}
                        />
                    </Form.Group>

                    <Form.Group controlId="userId">
                        <Form.Label>Тип товара</Form.Label>
                        <Form.Control as="select"
                                      value={itemTypeId}
                                      onChange={(e) => setItemTypeId(e.target.value)}
                        >
                            <option value="0">select operator</option>
                            {product.types.map(item => (
                                <option key={item.id} value={item.id}>{item.itemTypeName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="userId">
                        <Form.Label>Животное</Form.Label>
                        <Form.Control as="select"
                                      value={petTypeId}
                                      onChange={(e) => setPetTypeId(e.target.value)}
                        >
                            <option value="0">select operator</option>
                            {product.pets.map(item => (
                                <option key={item.id} value={item.id}>{item.petName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="userId">
                        <Form.Label>Бренд</Form.Label>
                        <Form.Control as="select"
                                      value={brandId}
                                      onChange={(e) => setBrandId(e.target.value)}
                        >
                            <option value="0">select operator</option>
                            {product.brands.map(item => (
                                <option key={item.id} value={item.id}>{item.brandName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            value={imagePath}
                            onChange={e => setImagePath(e.target.value)}
                            placeholder={"Input type desc"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger"  onClick={onHide}>Close</Button>
                <Button variant="outline-success"  onClick={addItem}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateItem;