import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Card, Form, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    console.log(device.brands.map(brand => brand.name));
    console.log(device.selectedBrand)
    return (
        <Form className='d-flex'>
            {device.brands.map(brand =>
            <Card
                style = {{cursor: 'pointer'}}
                key={brand.id}
                className='p-1'
                onClick={() => device.setSelectedBrand(brand)}
                border = {brand.id === device.selectedBrand.id ? 'danger' : 'light'}
            >
                {brand.name}
            </Card>
            )}
            
        </Form>
    );
});

export default BrandBar;