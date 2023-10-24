import { lazy } from "react";
import { path } from "./config/path";
import Page404 from "./pages/404";

const Home = lazy(() => import('./pages/index'))

const routers = [
    {
        path: path.Home,
        element: <Home />
    },
    {
        path: '*',
        element: <Page404 />
    }
]

export default routers