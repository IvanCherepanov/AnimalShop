// import React, {useContext, useState} from 'react';
// import {Button, Card, Container, Form, Row} from "react-bootstrap";
// import {NavLink, useLocation, useNavigate} from "react-router-dom";
// import {LOGIN_PATH, REGISTRATION_PATH, SHOP_PATH} from "../utils/consts";
// import {login, registration} from "../http/userApi";
// import {observer} from "mobx-react-lite";
// import {Context} from "../index";
//
// const Auth = observer(() => {
//     const {user} = useContext(Context)
//     const location = useLocation()
//     const history = useNavigate()
//     const isLogin = location.pathname === LOGIN_PATH
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     console.log(location)
//
//     const click = async () => {
//         try{
//             let data;
//             if (isLogin){
//                 data = await login(email, password);
//             } else{
//                 data = await registration(email, password);
//             }
//             // todo заменить на user
//             user.setUser(data)
//             user.setIsAuth(true)
//             history(SHOP_PATH)
//         } catch (e){
//             alert(e.response.data.message)
//         }
//
//     }
//
//     return (
//         <Container
//             className='d-flex justify-content-center align-items-center'
//             style = {{height: window.innerHeight - 54}}
//         >
//             <Card style={{width:600}} className="p-5">
//                 <h2 className='m-auto'>{isLogin ? 'Login' : 'Registration'}</h2>
//                 <Form className="d-flex flex-column">
//                     <Form.Control
//                         className="mt-3"
//                         placeholder="Input email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     />
//                     <Form.Control
//                         className="mt-3"
//                         placeholder="Input password"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         type='password'
//                     />
//                     <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
//                         {isLogin ?
//                             <div>
//                                 No account?
//                                 <NavLink to={REGISTRATION_PATH}>
//                                     Registration
//                                 </NavLink>
//                             </div>
//                             :
//                             <div>
//                                 Do you have account?
//                                 <NavLink to={LOGIN_PATH}>
//                                     Login
//                                 </NavLink>
//                             </div>
//                         }
//
//                         <Button
//                             variant={'outline-success'}
//                             onClick={click}
//                         >
//                             {isLogin ? 'Lets go' : 'registration'}
//                         </Button>
//                     </Form>
//
//                 </Form>
//             </Card>
//         </Container>
//     );
// });
//
// export default Auth;