import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/cadastro',
        element: <Cadastro></Cadastro>,
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
    },
    {
        path: '/:username',
        element: <Profile></Profile>,
    },
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
