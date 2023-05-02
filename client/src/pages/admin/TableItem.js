import React, {useContext, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";


import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {deleteItem, getItem} from "../../http/animal_shop/itemApi";
import {deleteBrand, getBrandById} from "../../http/animal_shop/brandApi";
import {Context} from "../../index";
import {getPetById} from "../../http/animal_shop/petApi";
import {getItemTypeById} from "../../http/animal_shop/itemTypeApi";
import Update from "../../components/modals/Item/Update";


const TableItem = ({item, index}) => {
    const [sale, setSale] = useState(0);
    const [type, setType] = useState('');
    const [pet, setPet] = useState('')
    const [brand, setBrand] = useState('')
    const [itemNewVisible, setItemNewVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);


    getPetById(item.petTypeId)
        .then((data) =>{
            setPet(data.petName)
        })

    getBrandById(item.brandId)
        .then((data) => {
            setBrand(data.brandName)
        })

    getItemTypeById(item.itemTypeId)
        .then((data) => {
            setType(data.itemTypeName)
        })


    const deleteItemById =async (event, id) => {
        try {
            event.preventDefault();
            await deleteItem(id); // make DELETE request to API endpoint
        } catch (e) {
            console.error(e);
        }
    };

    return (
            <tr key={item.id}>
                <input
                    type="hidden"
                    name="purchaseIds[]"
                    value={item.id}
                />
                <td>
                    {item.id}
                    <ToastContainer/>
                </td>
                <td>
                    {item.itemName}
                </td>
                <td>{item.cost} р.</td>
                <td>
                    <div>
                        <span>
                            {(item.cost * 0.01 * (100 - sale)).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td>
                    {item.description}
                </td>
                <td>{type}</td>
                <td>{pet}</td>
                <td>{brand}</td>
                <td>
                    <Card.Img
                        src={item.imagePath}
                        alt="product-img"
                        style={{ maxHeight: '200px' }}
                        className="card-img-top"
                    />
                </td>

                <td>
                    <Button
                        variant={"outline-dark"}
                        className="mr-3"
                        onClick={() => {
                            setItemNewVisible(true);
                            setSelectedItemId(item.id);
                        }}
                    >
                        Update order
                    </Button>
                    <Update
                        show={itemNewVisible && selectedItemId === item.id}
                        onHide={() => setItemNewVisible(false)}
                        itemId={selectedItemId}
                    />
                    <Button
                        className="ml-2"
                        variant="danger"
                        onClick={(event) => deleteItemById(event, item.id)}
                    >
                        Удалить
                    </Button>
                </td>
            </tr>
    );
};

export default TableItem;