import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";

import {Card, Form, Row} from "react-bootstrap";
import {Context} from "../index";

const BrandBar = observer(() => {
    const {product} = useContext(Context);
    //console.log(product.brands)
    //console.log(product.brands.map(brand => brand.brandName));
    //console.log(product.selectedBrand)
    // Обработчик события изменения выбранного значения в выпадающем списке
    const handleBrandChange = (event) => {
        const selectedBrandId = parseInt(event.target.value);
        const selectedBrand = product.brands.find(brand => brand.id === selectedBrandId);
        product.setSelectedBrand(selectedBrand);
        //console.log("product.selectedPet: ", product.selectedBrand)
    }
    //console.log("product.selectedBrand.id: ", product.selectedBrand.id);

    return (
        <Form className='d-flex'>
            <Form.Control
                as="select"
                value={product.selectedBrand?.id} // Устанавливаем значение выбранного элемента
                onChange={handleBrandChange} // Подключаем обработчик события изменения значения
            >
                <option value="" disabled>Бренд</option>
                {/* Маппим элементы массива в опции выпадающего списка */}
                {product.brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                ))}
            </Form.Control>
        </Form>
    );
});

export default BrandBar;