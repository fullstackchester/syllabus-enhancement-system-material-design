import {
    createBrowserRouter,
} from "react-router";
import Shell from "./core/shell";
import FacultyPage from "./pages/faculty/faculty";
import Dashboard from './pages/dashboard/dashboard'
import SchoolYearPage from "./pages/school_year/school_year";
import { Navigate } from "react-router";
import PublishedPage from "./pages/account/published";
import LoginPage from "./pages/login/login";
import NotFoundPage from "./pages/not_found/not_found";

const routes = createBrowserRouter([
    {
        path: 'login',
        Component: LoginPage,
    },
    {
        path: '/',
        Component: Shell,
        children: [
            {
                index: true,
                path: 'dashboard',
                Component: Dashboard
            },
            {
                path: 'faculty',
                Component: FacultyPage,
            },
            {  
                path: 'school-year',
                Component: SchoolYearPage
            },
            {  
                path: 'account',
                Component: null,
                children: [
                    {
                        index: true,
                        element: <Navigate to="profile" />,
                    },
                    {
                        path: 'profile',
                        Component: null
                    },
                    {
                        path: 'security',
                        Component: null
                    },
                    {
                        path: 'published',
                        Component: PublishedPage
                    }
                ]
            },
            
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
])

export default routes;