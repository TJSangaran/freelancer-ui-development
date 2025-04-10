import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

//layouts
import HomeLayout from "./components/layout/HomeLayout";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";

//pages
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Chats from "./pages/chats/Chats";
import Job from "./pages/job";
import Errands from "./pages/errands";
import Profile from "./pages/profile";
import JobView from "./pages/jobView";
import EditProfile from "./pages/editProfile";
import JobPosts, { MyJobPosts, NewJobPost } from "./pages/jobPosts";

const Routes = ({ type }) => {
    let router = useRoutes([
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                ...(!type ? [
                    // job poster routes
                    {
                        path: "errands",
                        children: [
                            { path: '', element: <Errands />, },
                            { path: ':id', element: <Profile /> },
                        ]
                    },
                    {
                        path: 'myJobPosts',
                        children: [
                            { path: '', element: <MyJobPosts /> },
                            { path: 'new', element: <NewJobPost /> },
                            { path: 'edit/:id', element: <NewJobPost /> },
                        ]
                    }
                ] : [
                    // errands routes
                    {
                        path: 'jobPosts',
                        children: [
                            { path: '', element: <JobPosts /> },
                        ]
                    }
                ]),
                { path: "messages", element: <Chats />, },
                { path: "messages/:id", element: <Chats />, },
                { path: 'jobs', element: <Job /> },
                { path: 'jobs/:jobId', element: <JobView /> },
                {
                    path: 'profile',
                    children: [
                        { path: '', element: <Profile /> },
                        { path: 'edit', element: <EditProfile /> }
                    ]
                },
                {
                    path: 'jobPosters',
                    children: [
                        { path: ':id', element: <Profile /> }
                    ]
                }
                // { path: "/", element: <Navigate to="errands" /> },
            ],
        },
        // { path: "team", element: <>hi about</> },
        // { path: "/", element: <Navigate to="errands" /> },
        // { path: "*", element: <Navigate to="errands" /> },
        ...(!type ? [
            // job poster routes
            { path: "/", element: <Navigate to="errands" /> },
            { path: "*", element: <Navigate to="errands" /> },
        ] : [
            //Errand routes
            { path: "/", element: <Navigate to="jobPosts" /> },
            { path: "*", element: <Navigate to="jobPosts" /> },
        ])
    ]);

    return router;
}

const AuthRoutes = () => {
    let authRouter = useRoutes([
        {
            path: "auth",
            element: <AuthenticationLayout />,
            children: [
                {
                    path: "signin",
                    element: <SignIn />,
                },
                {
                    path: "signup",
                    element: <SignUp />
                },
            ],
        },
        { path: "/", element: <Navigate to="/auth/signin" /> },
        { path: "*", element: <Navigate to="/auth/signin" /> },
    ])

    return authRouter
}
export {
    Routes,
    AuthRoutes
} 