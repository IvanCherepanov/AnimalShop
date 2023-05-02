import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProductList from "../components/ProductList";
import {Context} from "../index";
import {fetchItems, fetchItemsPagination, fetchItemTypes, fetchPets, getItemByName} from "../http/animal_shop/itemApi";


import DeviceList from "../components/old/DeviceList";
import {observer} from "mobx-react-lite";
import {fetchBrands} from "../http/animal_shop/brandApi";
import BrandBar from "../components/BrandBar";
import TypeBar from "../components/TypeBar";
import PetBar from "../components/PetBar";
import {toast} from "react-toastify";
import Pages from "./Pages";

const Products = observer(() => {
    const {product} = useContext(Context)
    const [sortId, setSortId] = useState(0); // 0 for ascending, 1 for descending
    const [searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        fetchItemTypes().then(data => product.setTypes(data))
        fetchPets().then(data => product.setPets(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchItems(null, null, null,0).then(data =>
            product.setItems(data)
        )
        fetchItemsPagination(null, null, null, 0, product.page, product.limit).then(data =>{
                product.setItemsPag(data.item)
                product.setTotalCount(data.amount)
            }
        )

    },[])
    //console.log(product)
    //console.log(product.types)

    // useEffect(()=>{
    //         fetchItems(
    //             product.selectedPet.id,
    //             product.selectedItemType.id,
    //             product.selectedBrand.id,
    //             sortId
    //         ).then(data => {
    //                 product.setItems(data)
    //             }
    //         )
    //
    // }, [
    //     product.selectedPet,
    //     product.selectedItemType,
    //     product.selectedBrand,
    //     sortId]
    // )
    useEffect(()=>{
            fetchItemsPagination(
                product.selectedPet.id,
                product.selectedItemType.id,
                product.selectedBrand.id,
                sortId,
                product.page,
                product.limit,
                product.selectedName
            ).then(data => {
                    product.setItemsPag(data.item)
                    product.setTotalCount(data.amount)
                }
            )

        }, [
            product.selectedPet,
            product.selectedItemType,
            product.selectedBrand,
            sortId,
            product.page,
            product.limit,
            product.selectedName
        ]
    )

    const handleSortChange = (sortId) => {
        setSortId(sortId);
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        product.setSelectedName(searchValue);
        if (searchValue !== '') {
            try {
                getItemByName(searchValue)
                    .then(response => {
                        // if (response === "Purchases sent successfully.") {
                        //     toast.success("Поиск успешен");
                        //     product.setItems()
                        //     console.log("Successful")
                        // } else {
                        //     console.log("No Successful")
                        //     toast.error("Произошла ошибка");
                        // }
                        product.setItems(response);

                    })
                    .catch(error => {
                        console.log(error);
                        toast.error("Произошла ошибка");
                    });

            } catch (error) {
                console.error('Error searching for item:', error);
            }
        }
    }

    const handleResetFilters = () => {
        product.setSelectedItemType([]);
        product.setSelectedPet([]);
        product.setSelectedBrand([]);
        product.setSelectedName(null);
        setSortId(0);
        setSearchValue('');
        // fetchItems(null, null, null,0).then(data =>
        //     product.setItems(data)
        // )
    }

    // console.log(product)
    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <div className="d-flex justify-content-center mb-4"  style={{ fontSize: '1.2rem', fontWeight: 'bold'}} >Фильтры</div>
                    <div className='mb-4'>
                        <BrandBar />
                    </div>
                    <div className='mb-4'>
                        <PetBar />
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                        <select
                            className="form-select"
                            value={sortId}
                            onChange={(e) => handleSortChange(parseInt(e.target.value))}
                        >
                            <option value={0}>Sort by Ascending</option>
                            <option value={1}>Sort by Descending</option>
                        </select>
                    </div>
                    <form onSubmit={handleSearchSubmit}  className='mb-4'>
                        <div className='d-flex'>
                            <input
                                type='text'
                                placeholder='Search by name'
                                value={searchValue}
                                onChange={handleSearchChange}
                                className='form-control me-2'
                            />
                            <button type='submit' className='btn btn-primary'>
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-danger" onClick={handleResetFilters}>Reset Filters</button>
                    </div>
                </Col>
                <Col md={9}>
                    <div className='mb-4'>
                        <TypeBar />
                    </div>
                    <ProductList/>
                    <Pages/>
                    {/*<Pages/>*/}
                </Col>
            </Row>
        </Container>
    );
});

export default Products;