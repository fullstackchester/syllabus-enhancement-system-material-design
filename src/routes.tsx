import {
    createBrowserRouter,
} from "react-router";
import Shell from "./core/shell";
import FacultyPage from "./pages/faculty/faculty";
import Dashboard from './pages/dashboard/dashboard'
import SchoolYearPage from "./pages/school_year/school_year";
import AccountPage from "./pages/account/account";
import { Navigate } from "react-router";

const routes = createBrowserRouter([
    // {
    //     path: 'login',
    //     Component: Login,
    // },
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
                Component: AccountPage,
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
                        Component: null
                    }
                ]
            },
            
        ]
    }
])

export default routes;