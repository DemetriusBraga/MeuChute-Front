import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './router';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router />
        <ToastContainer></ToastContainer>
    </React.StrictMode>
);
