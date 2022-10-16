import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';

import { Spinner } from '~/components/Spinner';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';

const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha seu nome'),
    username: yup.string().required('Preencha seu nome de usuário'),
    email: yup.string().required('Preencha seu email'),
    password: yup.string().required('Digite sua senha'),
});

export const Cadastro = () => {
    const [data, setData] = useState();

    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/users',
                data: values,
            });

            console.log(res.data.id);
            setData(res.data);
        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
        validationSchema,
    });

    if (data?.id) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div>
            <header className=" flex p-4 border-b border-red-300 bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700">
                <div className="container flex justify-center">
                    <span className="text-lg font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 tracking-wider sm:text-3xl">
                        MeuChute
                    </span>
                </div>
            </header>
            <main className="container max-w-xl p-4">
                <div className="p-4 flex justify-center items-center space-x-4">
                    <a href="/">
                        <Icon name="back" className="h-6"></Icon>
                    </a>
                    <h2 className="text-xl text-red-700 font-bold">
                        Crie sua conta
                    </h2>
                </div>

                <form className="p-4 space-y-5" onSubmit={formik.handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        label="Seu nome"
                        placeholder="Digite seu nome e sobrenome"
                        error={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="text"
                        name="username"
                        label="Seu nome de usuário"
                        placeholder="Digite um nome de usuário"
                        error={
                            formik.touched.username && formik.errors.username
                        }
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="email"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        error={
                            formik.touched.password && formik.errors.password
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button
                        type="submit"
                        className="w-full text-center text-white bg-red-500 font-bold px-6 py-3 rounded-xl disabled:opacity-70"
                        disabled={!formik.isValid}
                    >
                        {formik.isSubmitting ? (
                            <Spinner />
                        ) : (
                            'Cirar minha conta'
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
};
