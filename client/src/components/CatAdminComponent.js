import React from 'react';

const CatAdminComponent = () => {
    return (
        <div className="content padding-site m-3">
            <p className="invisible"> temp</p>
            <div className="container">
                {/*<p>Панель администратора доступна. Если вы не являетесь администратором, пожалуйста, сообщите об*/}
                {/*    этом.</p>*/}
                <div className="row">
                    <div className="text-center">
                        <img className="mx-auto d-block"
                             src="https://static.tildacdn.com/tild3165-6463-4563-a333-643137616537/cat-computer-veryfas.gif"
                             alt="Котик"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatAdminComponent;