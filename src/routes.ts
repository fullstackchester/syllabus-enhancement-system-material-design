import {
    createBrowserRouter,
} from "react-router";
// import Login from "../pages/login/Login";
import Shell from "./core/shell";
import FacultyPage from "./pages/faculty";
// import FacultyOverviewPage from "../pages/faculty/overview/overview";
// import FacultyPage from "../pages/faculty/Faculty";
// import Dashboard from "../pages/dashboard/Dashboard";
// import FacultyDetails from "../pages/faculty/faculty-details/FacultyDetails";

const routes = createBrowserRouter([
    // {
    //     path: 'login',
    //     Component: Login,
    // },
    {
        path: '/',
        Component: Shell,
        children: [
            // {
            //     index: true,
            //     path: 'dashboard',
            //     Component: Dashboard
            // },
            {
                path: 'faculty',
                Component: FacultyPage,
                // children: [
                //     {
                //         index: true,
                //         path: 'overview',
                //         Component: FacultyOverviewPage
                //     },
                //     {
                //         path: ':id',
                //         Component: FacultyDetails
                //     },
                // ]
            }
        ]
    }
])

export default routes;