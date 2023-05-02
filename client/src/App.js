// import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./components/AppRoute";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import Footer from "./components/UI/Footer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import agreementReducer from "./utils/old/agreementReducer";
import {getUserByTokenPayload} from "./http/animal_shop/authApi";

const App = observer(() => {
    const {user} = useContext(Context)
    //console.log(user)
    const [loading, setLoading] = useState(true)
    const store = createStore(agreementReducer);

    useEffect(() => {
        getUserByTokenPayload()
            .then(result => {
                if (result !== null){
                    user.setUser(result)
                    user.setIsAuth(true)
                }else{
                    user.setUser({})
                    user.setIsAuth(false)
                }
            }).finally(() => setLoading(false))
    }, [])

    // useEffect(() => {
    //     check().then(data => {
    //         user.setUser(data)
    //         user.setIsAuth(true)
    //     }).finally(() => setLoading(false))
    // }, [])
    //console.log(user)

    if (loading){
        return <Spinner animation={"grow"}/>
    }

    // useEffect(() => {
    //     check().then(data => {
    //         user.setUser(data)
    //         user.setIsAuth(true)
    //     }).finally(() => setLoading(false))
    // }, [])
    // //console.log(user)
    // if (loading){
    //     return <Spinner animation={"grow"}/>
    // }

  return (
      <Provider store={store}>
          <BrowserRouter>
              <NavBar/>
              <AppRoute/>
              <Footer/>
          </BrowserRouter>
      </Provider>
  );
});

export default App;
