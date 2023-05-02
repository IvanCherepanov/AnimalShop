import React, {useContext, useEffect} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import TypeBar from "../../components/old/TypeBar";
import BrandBar from "../../components/old/BrandBar";
import DeviceList from "../../components/old/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceApi";
import Pages from "../../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context)
    useEffect(()=>{
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 3).then(data => {
                device.setDevices(data.rows)
                //device.setTotalCount(data.count)
            }
        )
    }, [])
    console.log(device)


    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            }
        )
    }, [device.page, device.selectedType, device.selectedBrand,])

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;