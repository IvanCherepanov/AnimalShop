import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchDevices, fetchTypes} from "../../http/deviceApi";
import {deleteBrand, fetchBrands} from "../../http/brandApi";
import {Button} from "react-bootstrap";
import CreateBrand from "../../components/modals/CreateBrand";
import UpdateBrand from "../../components/modals/UpdateBrand";
import {fetchItems} from "../../http/animal_shop/itemApi";
import {deleteUser, getUserList} from "../../http/animal_shop/userApi";
import Create from "../../components/modals/User/Create";
import Update from "../../components/modals/User/Update";
import CreateUser from "../../components/modals/User/Create";



const UserPanel = observer(() => {
    const [userVisible, setUserVisible] = useState(false);
    const [userNewVisible, setUserNewVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUserList().then(data => setUsers(data))

    }, []) // todo device.brands


    const deleteUserById = async (event, id) => {
        try {
            event.preventDefault();
            await deleteUser(id); // make DELETE request to API endpoint
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row">
                <h1>Список пользователей</h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <Button
                        variant={"outline-dark"}
                        className="mt-2"
                        onClick={() => setUserVisible(true)}
                    >
                        Add User
                    </Button>
                    <CreateUser
                        show={userVisible}
                        onHide={() => setUserVisible(false)}
                    />
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Имя</th>
                    <th>Пароль</th>
                    <th>Почта</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (

                    <tr key={user.id}>

                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        {/*<td>{brand.sale}</td>*/}
                        <td>
                            <div>
                                <Button
                                    variant={"outline-dark"}
                                    className="mt-2"
                                    onClick={() => {
                                        setUserNewVisible(true);
                                        setSelectedUserId(user.id);
                                    }}
                                >
                                    Update user
                                </Button>
                                <Update
                                    show={userNewVisible && selectedUserId === user.id}
                                    onHide={() => setUserNewVisible(false)}
                                    userId={selectedUserId}
                                />
                            </div>
                            <Button
                                className="ml-2"
                                variant="danger"
                                onClick={(event) => deleteUserById(event, user.id)}
                            >
                                Удалить
                            </Button>
                        </td>
                    </tr>

                ))}
                </tbody>
            </table>

        </div>

    );
});

export default UserPanel;