import { lazy } from 'react';
import { path } from './config/path';
import Page404 from './pages/404';
const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));
const HeaderLayout = lazy(() => import('./layouts/HeaderLayout'));
const Home = lazy(() => import('./pages/index'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const OrderPage = lazy(() => import('./pages/OrderPage/OrderPage'));
const TypeProduct = lazy(() => import('./components/Type/TypeProduct'));
const ProductDetail = lazy(() => import('./pages/ProductPage/ProductDetail'));
const routers = [
    {
        element: <DefaultLayout />,
        path: '/',
        children: [
            {
                path: path.Home,
                element: <Home />,
            },
            {
                path: path.Order,
                element: <OrderPage />,
            },
            {
                path: path.TypeProduct,
                element: <TypeProduct />,
            },
            {
                path: path.ProductDetail,
                element: <ProductDetail />,
            },
            {
                path: '*',
                element: <Page404 />,
            },
        ],
    },
    // chỉ sử dụng header layout (test)
    {
        element: <HeaderLayout />,
        path: '/',
        children: [
            {
                path: path.Product,
                element: <ProductPage />,
            },
        ],
    },
];

export default routers;
