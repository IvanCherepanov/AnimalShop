import React, {useContext, useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";

import {Button} from "react-bootstrap";

import {Context} from "../../index";
import {fetchBrands, fetchDevices} from "../../http/deviceApi";
import {deleteBrand} from "../../http/brandApi";
import UpdateBrand from "../../components/modals/UpdateBrand";
import CreateBrand from "../../components/modals/CreateBrand";


const Test = observer(() => {
    const {device} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false);
    const [brandNewVisible, setBrandNewVisible] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    console.log(device.brands.map(brand => brand.name))

    useEffect(()=>{
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 3).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            }
        )
    }, []) // todo device.brands

    const deleteBrandById = async (event, id) => {
        try {
            event.preventDefault();
            await deleteBrand(id); // make DELETE request to API endpoint
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
                <h1>Список брендов</h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <Button
                        variant={"outline-dark"}
                        className="mt-2"
                        onClick={() => setBrandVisible(true)}
                    >
                        Add brand
                    </Button>
                    <CreateBrand
                        show={brandVisible}
                        onHide={() => setBrandVisible(false)}
                    />
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Название</th>
                    {/*<th>Величина скидки</th>*/}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {device.brands.map((brand) => (

                    <tr key={brand.id}>

                        <td>{brand.name}</td>
                        {/*<td>{brand.sale}</td>*/}
                        <td>
                            <div>
                                <Button
                                    variant={"outline-dark"}
                                    className="mt-2"
                                    onClick={() => {
                                        setBrandNewVisible(true);
                                        setSelectedBrandId(brand.id);
                                    }}
                                >
                                    Update brand
                                </Button>
                                <UpdateBrand
                                    show={brandNewVisible && selectedBrandId === brand.id}
                                    onHide={() => setBrandNewVisible(false)}
                                    brandId={selectedBrandId}
                                />
                            </div>

                            <a
                                href={'/brand/del/${brand.id}'}
                                className="btn btn-danger"
                                onClick={(event) => deleteBrandById(event, brand.id)}
                            >
                                Удалить
                            </a>
                        </td>
                    </tr>

                ))}
                </tbody>
            </table>

        </div>

    );
});

export default Test;