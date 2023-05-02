import React, {useContext, useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Button} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    return (
        <Container className="d-flex flex-column mt-4 p-2">
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={() => setTypeVisible(true)}
            >
                Add type
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={() => setBrandVisible(true)}
            >
                Add brand
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={() => setDeviceVisible(true)}
            >
                Add device
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>

    );
};

export default Admin;