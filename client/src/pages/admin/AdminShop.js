import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    BRAND_PATH, GOODS_PATH,
    ITEMTYPE_PATH,
    ORDER_PATH,
    PET_PATH,
    PRODUCTS_PATH,
    TEST_PATH,
    USER_PATH,
} from '../../utils/consts';
import CatAdminComponent from "../../components/CatAdminComponent";

const AdminShop = () => {
    const history = useNavigate();

    return (
        <Container className="mt-4 p-2 text-center">
            <h2>Административная панель</h2>
            <div className="d-flex justify-content-center mt-4">

                <Button
                    className="mx-3"
                    onClick={() => history(BRAND_PATH)}
                    variant="outline-primary"
                    style={{ transition: 'background-color 0.3s' }}
                >
                    Бренды
                </Button>
                <Button
                    className="mx-3"
                    onClick={() => history(USER_PATH)}
                    variant="outline-primary"
                    style={{ transition: 'background-color 0.3s' }}
                >
                    Пользователи
                </Button>
                <Button
                    className="mx-3"
                    onClick={() => history(PET_PATH)}
                    variant="outline-primary"
                    style={{ transition: 'background-color 0.3s' }}
                >
                    Животные
                </Button>
                <Button
                    className="mx-3"
                    onClick={() => history(ITEMTYPE_PATH)}
                    variant="outline-primary"
                    style={{ transition: 'background-color 0.3s' }}
                >
                    Типы товаров
                </Button>
                <Button
                    className="mx-3"
                    onClick={() => history(GOODS_PATH)}
                    variant="outline-primary"
                    style={{ transition: 'background-color 0.3s' }}
                >
                    Товары
                </Button>
                <Button
                    className="mx-3"
                    onClick={() => history(ORDER_PATH)}
                    variant="outline-primary"
                    style={{ transition: 'background-color 0.3s' }}
                >
                    Заказы
                </Button>
            </div>
            <CatAdminComponent/>
        </Container>
    );
};

export default AdminShop;
