import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import ProductStore from "./store/ProductStore";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
console.log(process.env.REACT_APP_SPRING_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        product: new ProductStore()
    }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>,

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
