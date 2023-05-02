import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from '../../assets/bigtar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../../http/deviceApi";
const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    console.log(device)
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>

                <Col md={4}>
                    <Form>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex  align-items-center justify-content-center'
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Form>
                </Col>

                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-center'
                        style ={{width: 300, height:300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price} y.e</h3>
                        <Button variant={'outline-dark'}>Buy(to basket)</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-5'>
                <h1>Information</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightblue': 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;