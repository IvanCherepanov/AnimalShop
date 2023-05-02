import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

import {Button} from "react-bootstrap";

import {fetchItems} from "../../http/animal_shop/itemApi";
import {deleteBrand, fetchBrands} from "../../http/animal_shop/brandApi";
import CreateBrand from "../../components/modals/Brand/CreateBrand";
import UpdateBrand from "../../components/modals/Brand/UpdateBrand";


const Brand = observer(() => {
    const {product} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false);
    const [brandNewVisible, setBrandNewVisible] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState(null);

    useEffect(()=>{
        fetchBrands().then(data => product.setBrands(data))
        fetchItems(null, null, 1, 3).then(data => {
                product.setItems(data.rows)
                product.setTotalCount(data.count)
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
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Название</th>
                    <th>Величина скидки</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {product.brands.map((brand) => (

                    <tr key={brand.id}>

                        <td>{brand.brandName}</td>
                        <td>{brand.sale}</td>
                        <td>
                            <div  className="d-flex align-items-center">
                                <Button
                                    variant={"outline-dark"}
                                    className="mr-3"
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
                                <div className="m-lg-2"></div>
                                <Button
                                    className="ml-2"
                                    variant="danger"
                                    onClick={(event) => deleteBrandById(event, brand.id)}
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

export default Brand;