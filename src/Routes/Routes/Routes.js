import { createBrowserRouter } from "react-router-dom";
import CourseMain from "../../Layout/CourseMain";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Components/Blog";
import CheckOut from "../../Pages/Components/CheckOut";
import CourseDetail from "../../Pages/Components/CourseDetail";
import Courses from "../../Pages/Components/Courses";
import FAQ from "../../Pages/Components/FAQ";
import Home from "../../Pages/Components/Home";
import Login from "../../Pages/Components/Login";
import NotFound from "../../Pages/Components/NotFound";
import Register from "../../Pages/Components/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blog></Blog>
            },
            {
                path: '/faq',
                element: <FAQ></FAQ>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/courses',
                element: <CourseMain></CourseMain>,
                children: [
                    {
                        path: '/courses',
                        element: <Courses></Courses>,
                        loader: () => fetch('https://study-net-server.vercel.app/courses')
                    },
                    {
                        path: '/courses/:id',
                        element: <CourseDetail></CourseDetail>,
                        loader: ({ params }) => fetch(`https://study-net-server.vercel.app/courses/${params.id}`)
                    }
                ]
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader: ({ params }) => fetch(`https://study-net-server.vercel.app/checkout/${params.id}`)
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])