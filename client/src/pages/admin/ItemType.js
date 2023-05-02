import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchDevices, fetchTypes} from "../../http/deviceApi";
import {deleteBrand, fetchBrands} from "../../http/brandApi";
import {Button} from "react-bootstrap";
import CreateBrand from "../../components/modals/CreateBrand";
import UpdateBrand from "../../components/modals/UpdateBrand";
import {fetchItems} from "../../http/animal_shop/itemApi";
import {deleteItemType, fetchItemTypes} from "../../http/animal_shop/itemTypeApi";
import Create from "../../components/modals/ItemType/Create";
import Update from "../../components/modals/ItemType/Update";


const ItemType = observer(() => {
    const {product} = useContext(Context)
    const [itemTypeVisible, setItemTypeVisible] = useState(false);
    const [itemTypeNewVisible, setItemTypeNewVisible] = useState(false);
    const [selectedItemTypeId, setSelectedItemTypeId] = useState(null);


    useEffect(() => {
        fetchItemTypes().then(data => product.setTypes(data))
    }, []) // todo device.brands

    const deleteItemTypeById = async (event, id) => {
        try {
            event.preventDefault();
            await deleteItemType(id); // make DELETE request to API endpoint
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container" style={{marginTop: "50px"}}>
            <div className="row">
                <h1>Список типов</h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <Button
                        variant={"outline-dark"}
                        className="mt-2"
                        onClick={() => setItemTypeVisible(true)}
                    >
                        Add item_type
                    </Button>
                    <Create
                        show={itemTypeVisible}
                        onHide={() => setItemTypeVisible(false)}
                    />
                </div>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {product.types.map((type) => (

                    <tr key={type.id}>

                        <td>{type.itemTypeName}</td>
                        <td>
                            <div className="d-flex align-items-center">
                                <Button
                                    variant={"outline-dark"}
                                    className="mr-3"
                                    onClick={() => {
                                        setItemTypeNewVisible(true);
                                        setSelectedItemTypeId(type.id);
                                    }}
                                >
                                    Update type
                                </Button>
                                <Update
                                    show={itemTypeNewVisible && selectedItemTypeId === type.id}
                                    onHide={() => setItemTypeNewVisible(false)}
                                    itemTypeId={selectedItemTypeId}
                                />
                                <div className="m-lg-2"></div>
                                <Button
                                    className="ml-2"
                                    variant="danger"
                                    onClick={(event) => deleteItemTypeById(event, type.id)}
                                >
                                    Удалить
                                </Button>

                            </div>


                        </td>
                    </tr>

                ))}
                </tbody>
            </table>

        </div>

    );
});

export default ItemType;