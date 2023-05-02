import React, {useState} from 'react';
import {connect} from "react-redux";
import {checkAgreement, uncheckAgreement} from '../../utils/old/agreementActions'
import MagicLicense from "../../components/UI/License";
import {fetchJoke} from "../../http/smileApi";

const AgreementForm = ({ isChecked, checkAgreement, uncheckAgreement }) => {
    const [joke, setJoke] = useState('');
    const handleCheckBoxChange = (event) => {
        if (event.target.checked) {
            checkAgreement();
        } else {
            uncheckAgreement();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // обработка подтверждения соглашения
        console.log('Form submitted');
    };

    const fetchData = async () => {
        const response = await fetchJoke();
        console.log(response)
        setJoke(response);
    };

    return (
        <div className="justify-content-center bg-secondary text-light">
            <div>
                <button onClick={fetchData}>Загрузить данные</button>
                <p>{joke && JSON.stringify(joke)}</p>
            </div>
            <div className="row">
                <div className="col">
            <MagicLicense/>
                </div>
            </div>
            <div className="row">
                <div className="col text-center mt-3">
                    <form onSubmit={handleSubmit} >
                        <label >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckBoxChange}
                            />
                            Я согласен с пользовательским соглашением
                        </label>
                        <button type="submit" disabled={!isChecked} >
                            Подтвердить соглашение
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isChecked: state.isChecked,
    };
};

export default connect(mapStateToProps,
    {
                    checkAgreement,
                    uncheckAgreement
                     }
                    )
        (
            AgreementForm
        );