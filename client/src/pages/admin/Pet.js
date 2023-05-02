import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import {deleteItemType, fetchItemTypes} from "../../http/animal_shop/itemTypeApi";
import {deletePet, fetchPets} from "../../http/animal_shop/petApi";
import Create from "../../components/modals/Pet/Create";
import UpdatePet from "../../components/modals/Pet/Update";


const Pet = observer(() => {
    const {product} = useContext(Context)
    const [petVisible, setPetVisible] = useState(false);
    const [petNewVisible, setPetNewVisible] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState(null);


    useEffect(()=>{
        fetchPets().then(data => product.setPets(data))
    }, [])

    const deletePetById = async (event, id) => {
        try {
            event.preventDefault();
            await deletePet(id); // make DELETE request to API endpoint
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
                <h1>Список животных</h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <Button
                        variant={"outline-dark"}
                        className="mt-2"
                        onClick={() => setPetVisible(true)}
                    >
                        Add pet
                    </Button>
                    <Create
                        show={petVisible}
                        onHide={() => setPetVisible(false)}
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
                {product.pets.map((pet) => (

                    <tr key={pet.id}>

                        <td>{pet.petName}</td>
                        <td>
                            <div  className="d-flex align-items-center">
                                <Button
                                    variant={"outline-dark"}
                                    className="mr-3"
                                    onClick={() => {
                                        setPetNewVisible(true);
                                        setSelectedPetId(pet.id);
                                    }}
                                >
                                    Update pet
                                </Button>
                                <UpdatePet
                                    show={petNewVisible && selectedPetId === pet.id}
                                    onHide={() => setPetNewVisible(false)}
                                    petId={selectedPetId}
                                />
                                <div className="m-lg-2"></div>
                                <Button
                                    className="ml-2"
                                    variant="danger"
                                    onClick={(event) => deletePetById(event, pet.id)}
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

export default Pet;