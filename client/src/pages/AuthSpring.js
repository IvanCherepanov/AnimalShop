import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {
    LOGIN_PATH,
    LOGIN_SPRING_PATH,
    PRODUCT_PATH, PRODUCTS_PATH,
    REGISTRATION_PATH,
    REGISTRATION_SPRING_PATH,
    SHOP_PATH
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {loginSpring, registrationSpring} from "../http/animal_shop/authApi";
import {getUserByUsername} from "../http/animal_shop/userApi";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_SPRING_PATH
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //console.log(location)

    const click = async () => {
        try{
            let data;
            if (isLogin){
                data = await loginSpring(name, password);
                let current_user;
                current_user = await getUserByUsername(name);
                //console.log(current_user)
                user.setUser(current_user)
                //console.log(user.user)
                user.setIsAuth(true)
                history(PRODUCTS_PATH);
            } else{
                data = await registrationSpring(email, password, name);
                history(LOGIN_SPRING_PATH)
            }
        } catch (e){
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style = {{height: window.innerHeight - 54}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? 'Login' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type='text'
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Input password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    {isLogin ?
                        <div>
                        </div>
                        :
                        <Form.Control
                            className="mt-3"
                            placeholder="Input email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                    }
                    <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                No account?
                                <NavLink to={REGISTRATION_SPRING_PATH}>
                                    Registration
                                </NavLink>
                            </div>
                            :
                            <div>
                                Do you have account?
                                <NavLink to={LOGIN_SPRING_PATH}>
                                    Login
                                </NavLink>
                            </div>
                        }

                        <Button
                            variant={'outline-success'}
                            onClick={click}
                        >
                            {isLogin ? 'Lets go' : 'registration'}
                        </Button>
                    </div>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;