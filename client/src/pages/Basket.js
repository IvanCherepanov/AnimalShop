import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import {Context} from "../index";
import {buyFromBasket, getPurchase} from "../http/animal_shop/shopingBasketApi";
import {getItem} from "../http/animal_shop/itemApi";
import ProductItem from "../components/ProductItem";
import TableItem from "../components/TableItem";
import {observe} from "mobx";
import {observer} from "mobx-react-lite";
import {getBrandById} from "../http/animal_shop/brandApi";
import {toast} from "react-toastify";

const Basket =  () => {
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [item, setItem] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [purchaseData, setPurchaseData] = useState([]);
    const {user} = useContext(Context);
    //console.log(user.user.id)
    useEffect(() => {
        getPurchase(user.user.id).then(data => {
            setPurchaseData(data)

        })
    }, []);
    //console.log(purchaseData);
    // Вычисляем общую сумму цен на основе массива purchaseData
    // useEffect(() => {
    //     const totalPrice = purchaseData.reduce((acc, item) => acc + item.price, 0);
    //     setTotalCost(totalPrice);
    // }, [purchaseData]);
    useEffect(() => {
        // Calculate total price without discount
        const totalPriceWithoutDiscount = purchaseData.reduce((acc, item) => acc + item.price * item.amount, 0);
        //console.log(totalPriceWithoutDiscount);
        // Call getItem to get item data for each item in purchaseData
        Promise.all(purchaseData.map(item => getItem(item.itemId)))
            .then(itemDataArray => {
                // Calculate total discount amount
                const totalDiscountAmount = itemDataArray.reduce(async (accPromise, itemData, index) => {
                    // Retrieve brand_type_id from itemData
                    const brandTypeId = itemData.brandId;
                    // Call getBrandById to get brand data
                    const brandData = await getBrandById(brandTypeId);
                    // Retrieve sale from brandData and calculate discount amount for current item
                    const sale = brandData.sale;
                    //console.log("sale: ", sale);
                    //console.log(itemDataArray[index])
                    const discountAmount = ((itemDataArray[index].cost * sale) / 100) * purchaseData[index].amount;
                    //console.log("discountAmount: ", discountAmount);
                    // Update accumulator with current discount amount
                    return accPromise.then(acc => acc + discountAmount);
                }, Promise.resolve(0));

                // Calculate total price with discount
                return totalDiscountAmount.then(totalDiscountAmount => totalPriceWithoutDiscount - totalDiscountAmount);
            })
            .then(totalPriceWithDiscount => {
                // Update total cost state with calculated total price with discount
                //console.log(totalPriceWithDiscount);
                setTotalCost(totalPriceWithDiscount.toFixed(2));
            })
            .catch(error => {
                // Handle any errors that may occur during the promise execution
                console.error(error);
            });
    }, [purchaseData]);

    // const purchaseData =  getPurchase(user.user.id);
    // console.log(purchaseData);
    //console.log(purchaseData)

    const handleOrderSubmit = () => {
        //console.log("Address:", address);
        //console.log("Telephone:", telephone);
        buyFromBasket(user.user.id, address, telephone)
            .then(response => {
                if (response === "Purchases sent successfully.") {
                    toast.success("Заказ успешно добавлен в обработку. Ждите сообщений на почту");
                    //console.log("Successful")
                } else {
                    //console.log("No Successful")
                    toast.error("Произошла ошибка");
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Произошла ошибка");
            });
// Обработчик оформления заказа
// Реализация логики оформления заказа
    };

    return (
        <div>
            <Container className="mt-1">
                <h2 className="invisible">_</h2>
                <div>
                    {/* Используем метод map для итерации по массиву и выводим информацию о каждом объекте */}
                    {/*{purchaseData.map((item) => (*/}
                    {/*    <div key={item.itemId}>*/}
                    {/*        <p>itemId: {item.itemId}</p>*/}
                    {/*        <p>itemName: {item.itemName}</p>*/}
                    {/*        <p>amount: {item.amount}</p>*/}
                    {/*        <p>price: {item.price}</p>*/}
                    {/*        <p>totalPrice: {item.totalPrice}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
                <h3>Здравствуйте, {user.user.email}</h3>
                {purchaseData.length === 0 ? (
                    <h3>Корзина пуста</h3>
                ) : (
                    <h3>Корзина</h3>
                )}
                {purchaseData.length > 0 && (
                    <div>

                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Название</th>
                                <th>Цена за ед.</th>
                                <th>Цена по скидке</th>
                                <th>Сумма</th>
                                <th>Сумма по скидке</th>
                                <th>Количество</th>
                                <th>Изменить количество</th>
                                <th>Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            {purchaseData.map((purchase, index) => (
                                // <ProductItem key={product.id} product={product}/>
                                <TableItem key={purchase.id} purchase={purchase} index={index}/>
                            ))}
                            </tbody>
                        </Table>
                        <div className="mt-3">
                            <h4>Общая стоимость: {totalCost} р.</h4>
                        </div>
                        <div className="mt-3">
                            <h4>Адрес доставки</h4>
                            <Form.Group>
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    required
                                    value={address} // Bind the value to the state variable
                                    onChange={(e) => setAddress(e.target.value)} // Update the state on change
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="telephone"
                                    required
                                    value={telephone} // Bind the value to the state variable
                                    onChange={(e) => setTelephone(e.target.value)} // Update the state on change

                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={() => handleOrderSubmit()}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Basket;