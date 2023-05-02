import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {DEVICE_PATH, PRODUCT_PATH} from "../utils/consts";
import {Card, Col, Image, Button, Form} from "react-bootstrap";
import star from "../assets/Vector.png";
import {Context} from "../index";
import {addItemToBasket} from "../http/animal_shop/shopingBasketApi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductItem = ({product}) => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const [count, setCount] = useState(1); // Хранение состояния счетчика
    //console.log(user.user.id)

    const handleDecrease = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleIncrease = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value >= 1 && value <= 10) {
            setCount(value);
        }
    };

    const handleAddToBasketClick = () => {
        handleAddToBasket(product.id, count);
    };

    const handleAddToBasket = (id, amount) => {
        if (amount > 10 || amount < 1){
            toast.warning("Купить можно от 1 до 10 товаров")
        }else {
            if (user.isAuth) {
                //console.log('Adding to basket:', id, "count", amount, "userID", user.user.id);
                addItemToBasket(user.user.id, id, amount)
                    .then(response => {
                        if (response === "OK") {
                            toast.success("Товар добавлен в корзину");
                            console.log("Successful")
                        } else {
                            console.log("No Successful")
                            toast.error("Произошла ошибка");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error("Произошла ошибка");
                    });
            } else {
                toast.info("Необходио войти в аккаунт");
            }
        }
    };


    const calculateDiscount = (cost, sale) => {
        // Функция для расчета скидки
        return (cost * 0.01 * (100 - sale)).toFixed(2);
    };


    return (
        <Col xl={3} lg={4} md={6} sm={8} className={'mb-3'}>
            <ToastContainer/>

            <Card border="light" className="d-flex flex-column justify-content-between h-100 m-2" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', height: '450px', overflow: 'hidden' }}>
                <Card.Img
                    src={product.imagePath}
                    alt="product-img"
                    style={{ height: '200px', objectFit: 'cover' }}
                    className="card-img-top"
                />
                <Card.Body className="text-dark bg-light d-flex flex-column justify-content-between">
                    <div>
                        <Card.Title className="text-truncate mb-0">{product.itemName}</Card.Title>
                        <Card.Text className="text-truncate text-secondary mb-2" style={{ fontSize: '0.9rem' }}>{product.description}</Card.Text>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-secondary font-weight-bold text-decoration-line-through">{product.cost.toLocaleString('ru-RU')} руб.</div>
                        <div className="text-danger font-weight-bold ml-2">{calculateDiscount(product.cost, 4).toLocaleString('ru-RU')} руб.</div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center my-2">
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            className="form-control"
                            style={{width: '4rem'}}
                        />
                        <p style={{visibility: "hidden"}}>_</p>
                        <Button
                            type="button"
                            className="btn btn-primary align-self-end"
                            onClick={handleAddToBasketClick}
                        >
                            Купить
                        </Button>
                    </div>


                </Card.Body>
            </Card>
        </Col>
    );

};

export default ProductItem;

// <Card border="dark" className="flex-column m-2">
//     <Card.Img
//         src={product.imagePath}
//         alt="product-img"
//         style={{maxHeight: '200px', objectFit: 'cover'}}
//         className="card-img-top"
//     />
//     <Card.Body className="text-white bg-dark mb-3">
//         <Card.Title>{product.itemName}</Card.Title>
//         <Card.Text
//             className="text-truncate"
//             style={{ width: '20ch' }}
//         >
//             {product.description}
//         </Card.Text>
//         <Card.Text>{product.cost}</Card.Text>
//         <div>
//             Скидка! <span>{calculateDiscount(product.cost, 4)}</span>
//         </div>
//         <div className="d-flex align-items-center mt-2">
//             <div className="input-group">
//                 {/*<Button*/}
//                 {/*    type="button"*/}
//                 {/*    className="btn btn-primary"*/}
//                 {/*    onClick={handleDecrease}*/}
//                 {/*>*/}
//                 {/*    -*/}
//                 {/*</Button>*/}
//                 <Form.Control
//                     name="count"
//                     type="number"
//                     size="sm"
//                     value={count}
//                     onChange={handleInputChange}
//                     min="1"
//                     max="10"
//                     className="text-center"
//                     style={{ maxWidth: '70px' }}
//                 />
//                 {/*<Button*/}
//                 {/*    type="button"*/}
//                 {/*    className="btn btn-primary"*/}
//                 {/*    onClick={handleIncrease}*/}
//                 {/*>*/}
//                 {/*    +*/}
//                 {/*</Button>*/}
//             </div>
//             <div style={{ width: '8px' }}></div>
//             <Button
//                 type="button"
//                 className="btn btn-primary ml-2"
//                 onClick={handleAddToBasketClick}
//             >
//                 Купить
//             </Button>
//         </div>
//     </Card.Body>
// </Card>