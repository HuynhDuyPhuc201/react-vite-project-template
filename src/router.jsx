import { lazy } from 'react';
import { path } from './config/path';
import Page404 from './pages/404';
const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));
const HeaderLayout = lazy(() => import('./layouts/HeaderLayout'));
const ProfileLayout = lazy(() => import('./layouts/ProfileLayout'));
const Home = lazy(() => import('./pages/index'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const OrderPage = lazy(() => import('./pages/OrderPage/OrderPage'));
const TypeProduct = lazy(() => import('./components/Type/TypeProduct'));
const ProductDetail = lazy(() => import('./pages/ProductPage/ProductDetail'));
const PersonalInfo = lazy(() => import('./pages/PersonalInfo'));
const Profile = lazy(() => import('./pages/Account/Profile'));

//  admin
const Admin = lazy(() => import('./pages/Admin/Admin'));
const routers = [
    {
        element: <DefaultLayout />,
        path: '/',
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: path.Product,
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
                path: path.PersonalInfo,
                element: <PersonalInfo />,
            },
            {
                path: path.Account.Profile,
                element: <ProfileLayout />,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                ],
            },
            {
                path: '*',
                element: <Page404 />,
            },
        ],
        // admin
    },
    {
        path: path.Admin,
        element: <Admin />,
    },
    // chỉ sử dụng header layout (test)
    // {
    //     element: <HeaderLayout />,
    //     path: '/',
    //     children: [
    //         {
    //             path: path.Product,
    //             element: <ProductPage />,
    //         },
    //     ],
    // },
];

export default routers;
