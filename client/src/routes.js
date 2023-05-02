import AdminShop from "./pages/admin/AdminShop";
import {
    ABOUT_PATH,
    ADMIN_PATH,
    BASKET_PATH, BRAND_PATH,
    DEVICE_PATH, GOODS_PATH, ITEMTYPE_PATH, LICENSE_AG_PATH, LICENSE_PATH,
    LOGIN_PATH, LOGIN_SPRING_PATH, ORDER_DETAIL_PATH, ORDER_PATH, OWN_ORDER_PATH, PET_PATH, PRODUCT_PATH, PRODUCTS_PATH,
    REGISTRATION_PATH, REGISTRATION_SPRING_PATH,
    SHOP_PATH,
    TEST_PATH, USER_PATH
} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/old/Shop";
import DevicePage from "./pages/old/DevicePage";
import Auth from "./pages/Auth";
import Brand from "./pages/admin/Brand";
import AgreementForm from "./pages/old/AgreementForm";
import AgrementFormAgressive from "./pages/old/AgrementFormAgressive";
import ProductPage from "./pages/ProductPage";
import Products from "./pages/Products";
import Test from "./pages/old/Test";
import User from "./pages/admin/User";
import Pet from "./pages/admin/Pet";
import Item_type from "./pages/admin/ItemType";
import Order from "./pages/admin/Order";
import AuthSpring from "./pages/AuthSpring";
import OrderDetail from "./pages/admin/OrderDetail";
import MyOrder from "./pages/MyOrder";
import About from "./pages/About";
import Goods from "./pages/admin/Goods";

export const authRoutes = [
    {path: ADMIN_PATH, Component: AdminShop},
    {path: BASKET_PATH, Component: Basket},
    //{ path: "*", element: Error, exact: false }

    {path: DEVICE_PATH + '/:id', Component: DevicePage},
    {path: ORDER_DETAIL_PATH + '/:id', Component: OrderDetail},

    {path: TEST_PATH, Component: Test},
    {path: LICENSE_PATH, Component: AgreementForm},
    {path: LICENSE_AG_PATH, Component: AgrementFormAgressive},


    {path: PRODUCT_PATH + '/:id', Component: ProductPage},
    {path: BRAND_PATH, Component: Brand},
    {path: USER_PATH, Component: User},
    {path: PET_PATH, Component: Pet},
    {path: ITEMTYPE_PATH, Component: Item_type},
    {path: ORDER_PATH, Component: Order},
    {path: GOODS_PATH, Component: Goods},
]
export const publicRoutes = [
    {path: PRODUCTS_PATH, Component: Products},
    {path: ABOUT_PATH, Component: About},

    {path: SHOP_PATH, Component: Products},

    // {path: LOGIN_PATH, Component: Auth},
    {path: LOGIN_SPRING_PATH, Component: AuthSpring},

    // {path: REGISTRATION_PATH, Component: Auth},
    {path: REGISTRATION_SPRING_PATH, Component: AuthSpring},
    {path: OWN_ORDER_PATH, Component: MyOrder}
]