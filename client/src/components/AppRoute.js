import React, {useContext} from 'react';
import {Routes, Route, Navigate, useParams} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRoute = observer(() => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route
                    key={path}
                    path={path}
                    element={<Component/>}
                    exact
                />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route
                    exact
                    path={path}
                    element={<Component/>}
                    key={path}

                />
            )}
            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    );
});

export default AppRoute;