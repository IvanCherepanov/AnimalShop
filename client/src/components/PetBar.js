import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";

import {Card, Form, Row} from "react-bootstrap";
import {Context} from "../index";

const PetBar = observer(() => {
    const {product} = useContext(Context);
    //console.log(product.pets)
    //console.log(product.pets.map(pet => pet.petName));
    //console.log(product.selectedPet)
    // Обработчик события изменения выбранного значения в выпадающем списке
    const handlePetChange = (event) => {
        const selectedPetId = parseInt(event.target.value);
        const selectedPet = product.pets.find(pet => pet.id === selectedPetId);
        product.setSelectedPet(selectedPet);
        //console.log("product.selectedPet: ", product.selectedPet)
    }

    return (
        <Form className='d-flex'>
            <Form.Control
                as="select"
                value={product.selectedPet?.id} // Устанавливаем значение выбранного элемента
                onChange={handlePetChange} // Подключаем обработчик события изменения значения
            >
                <option value="" disabled>Животное</option>
                {/* Маппим элементы массива в опции выпадающего списка */}
                {product.pets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.petName}</option>
                ))}
            </Form.Control>
        </Form>
    );
});

export default PetBar;