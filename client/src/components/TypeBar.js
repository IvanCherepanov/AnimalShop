import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import {Card, Form} from "react-bootstrap";

const TypeBar = observer(() => {
    const {product} = useContext(Context);
    //console.log(product.types.map(brand => brand.id));
    return (
        <Form className='d-flex flex-wrap'>
            {product.types.map(type =>
                    <Card
                            style = {{cursor: 'pointer'}}
                            border = {type.id === product.selectedItemType.id ? 'danger' : 'light'}
                            className='p-1'
                            onClick={() => product.setSelectedItemType(type)}
                            key={type.id}
                        >
                            {type.itemTypeName}
                    </Card>
                )}
        </Form>
    );
});

export default TypeBar;