import React, { useState } from 'react';
import { connect } from 'react-redux';
import { checkAgreement, uncheckAgreement } from '../../utils/old/agreementActions';
import MagicLicense from '../../components/UI/License';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AgreementForm = ({ isChecked, checkAgreement, uncheckAgreement }) => {
    const [showModal, setShowModal] = useState(true);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckBoxChange = event => {
        const { checked } = event.target;
        setIsCheckboxChecked(checked);
        if (checked) {
            checkAgreement();
        } else {
            uncheckAgreement();
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (isCheckboxChecked) {
            setShowModal(false);
        } else {
            alert('Please check the agreement to continue');
        }
    };

    return (
        <div>
            <Modal show={showModal} onHide={() => {}}>
                <Modal.Header >
                    <Modal.Title>Terms and conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MagicLicense />
                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="agreementCheckBox"
                            checked={isCheckboxChecked}
                            onChange={handleCheckBoxChange}
                        />
                        <label className="form-check-label" htmlFor="agreementCheckBox">
                            I agree to the terms and conditions
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSubmit}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    isChecked: state.isChecked,
});

const mapDispatchToProps = dispatch => ({
    checkAgreement: () => dispatch(checkAgreement()),
    uncheckAgreement: () => dispatch(uncheckAgreement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgreementForm);