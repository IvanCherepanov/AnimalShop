import React from 'react';
import {Container, Card, Row, Col} from 'react-bootstrap';

const MagicLicense = () => {
    return (
        <Container>
            <Card>
                <Card.Body className="bg-secondary text-light">
                    <h1 className="text-center">Волшебные Правила</h1>
                        <p className="text-justify my-3">
                            Наш сайт предназначен только для использования взрослыми магами. Мы не несем ответственности за любые последствия использования нашего сайта неопытными молодыми волшебниками.
                        </p>
                        <p className="text-justify my-3">
                            Мы заботимся о Вас и стремимся предоставить Вам лучший сервис. Однако, мы не несём ответственности за любые ошибки или проблемы, возникающие при использовании нашего сайта.
                        </p>
                        <p className="text-justify my-3">
                            Мы уважаем Вашу конфиденциальность и не будем передавать Ваши данные третьим лицам. Однако, мы не несем ответственности за любые утечки данных, вызванные взломом или другими причинами, находящимися вне нашего контроля.
                        </p>
                        <p className="text-justify my-3">
                            Используя наш сайт, Вы соглашаетесь с данными правилами и условиями.
                        </p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MagicLicense;