import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {getItem} from "../http/animal_shop/itemApi";
import {Context} from "../index";
import {getBrandById} from "../http/animal_shop/brandApi";
import {changeItemToBasket, deleteItemFromBasket} from "../http/animal_shop/shopingBasketApi";
import {toast, ToastContainer} from "react-toastify";

const TableItem = ({purchase, index}) => {
    const {user} = useContext(Context);
    const [sale, setSale] = useState(0);
    const [amount, setAmount] = useState(purchase.amount); // состояние для хранения количества покупок

    getItem(purchase.itemId)
        .then((itemData) => {
            //console.log({purchase});
            //console.log(itemData);

            const brandTypeId = itemData.brandId;
            // Call getBrandById to get brand data
            return getBrandById(brandTypeId);
        })
        .then((brandData) => {
            // Retrieve sale from brandData
            const sale = brandData.sale;
            setSale(sale);
            //console.log(sale);
        })
        .catch((error) => {
            // Handle any errors that may occur during the promise execution
            console.error(error);
        });
    //console.log({sale});

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value >= 1 && value <= 10) {
            setAmount(value);
        }
    };
    const handleAmountChange = () => {
// Обработчик изменения количества товара в корзине
// Реализация логики изменения количества товара
        console.log(purchase.itemId, user.user.id, amount)
        changeItemToBasket(user.user.id, purchase.itemId, amount)
            .then(response => {
                if (response === "Purchase amount updated successfully.") {
                    toast.success("Число товаров обновлено");
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
    };

    const handlePurchaseDelete = (itemId) => {
        deleteItemFromBasket(itemId, user.user.id)
            .then(response => {
                if (response === "OK") {
                    toast.success("Товар удален из корзины");
                    //console.log("Successful")
                } else {
                    //console.log("No Successful")
                    toast.error("Произошла ошибка");
                }
            })
            .catch(error => {
                //console.log(error);
                toast.error("Произошла ошибка");
            });
    };


    return (

            <tr key={purchase.itemId}>

                <input
                    type="hidden"
                    name="purchaseIds[]"
                    value={purchase.itemId}

                />
                <td>
                    {index + 1}
                    <ToastContainer/>
                </td>
                <td style={{width: "1000px"}}>
                    {purchase.itemName}
                </td>
                <td>{purchase.price} р.</td>
                <td>
                    <div>
                        <span>
                            {(purchase.price * 0.01 * (100 - sale)).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td>
                    {(purchase.price * purchase.amount).toFixed(2)}{" "}р.
                </td>
                <td>
                    <div>
                        <span>
                            {(purchase.price * 0.01 * (100 - sale) * purchase.amount).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td>
                    <Form
                        method="POST"
                        action="/shopping_basket/changeAmountPurchases"
                        style={{display: "flex", marginTop: "20px"}}
                    >
                        <input
                            type="hidden"
                            name="purchaseId"
                            value={purchase.id}
                        />
                        <div>
                            <Form.Control
                                name="amount"
                                className="count"
                                type="number"
                                size="sm"
                                min={1}
                                max={10}
                                defaultValue={purchase.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Form>
                </td>
                <td>
                    <Button
                        type="button"
                        className="btn btn-primary ml-2"
                        onClick={handleAmountChange}
                    >
                        Изменить
                    </Button>
                </td>
                <td>
                    <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => handlePurchaseDelete(purchase.itemId)}
                    >
                        Удалить
                    </Button>
                </td>
            </tr>
    );
};

export default TableItem;