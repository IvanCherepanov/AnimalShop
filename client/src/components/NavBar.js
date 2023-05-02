import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    ADMIN_PATH,
    REGISTRATION_PATH,
    SHOP_PATH,
    LOGIN_PATH,
    BASKET_PATH,
    PRODUCTS_PATH,
    LOGIN_SPRING_PATH, REGISTRATION_SPRING_PATH, OWN_ORDER_PATH, ABOUT_PATH
} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { useNavigate } from "react-router-dom"
import {FaShoppingCart, FaSignOutAlt, FaUserPlus, FaUser, FaReceipt} from 'react-icons/fa';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href={SHOP_PATH}>BuySkyrim</Navbar.Brand>
                {/*{user.user.authorities.some(authority => authority.authority === 'ROLE_ADMIN') ?*/}
                {/*    <div style={{color:'white '}}>ADMIN</div>*/}
                {/*:*/}
                {/*    <div style={{color:'white '}}>USER</div>*/}
                {/*}*/}
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color:'white '}}>
                        {user.user.authorities.some(authority => authority.authority === 'ROLE_ADMIN') ?
                            <Button
                                className="ms-lg-3"
                                onClick={() => history(ADMIN_PATH)}
                            >
                                AdminPanel
                            </Button>
                            :
                            <Button
                                className="ms-lg-3"
                                onClick={() => history(ABOUT_PATH)}
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                О нас
                            </Button>
                        }
                        <Button
                            className="ms-lg-3"
                            onClick={() => history(PRODUCTS_PATH)}
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                        >
                            За покупками
                        </Button>
                        <Button
                            className="ms-lg-3"
                            onClick={() => history(OWN_ORDER_PATH)}
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                        >
                            <FaReceipt style={{ marginRight: '0.5rem' }} />  Заказы
                        </Button>
                        <Button
                            className="ms-lg-3"
                            onClick={() => history(BASKET_PATH)}
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                        >
                            <FaShoppingCart />
                        </Button>
                        <Button
                            className="ms-lg-3"
                            onClick={() => logOut()}
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                        >
                            <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
                        </Button>
                        {/*<Button className="ms-lg-3" onClick={() => user.setIsAuth(false)}>Logout</Button>*/}
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color:'white '}}>
                        <Container style={{display: 'flex'}}>
                            <Button
                                className="ms-lg-3"
                                onClick={() => history(ABOUT_PATH)}
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                О нас
                            </Button>
                            <Button
                                className="ms-lg-3"
                                onClick={() => history(PRODUCTS_PATH)}
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                За покупками
                            </Button>
                            <Button
                                style={{ marginLeft: '20px' }}
                                onClick={() => history(LOGIN_SPRING_PATH)}
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <FaUser style={{ marginRight: '0.5rem' }} /> Login
                            </Button>
                            <Button
                                className="ms-lg-3"
                                onClick={() => history(REGISTRATION_SPRING_PATH)}
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                                <FaUserPlus style={{ marginRight: '0.5rem' }} /> Registration
                            </Button>
                        </Container>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;