import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalStorage } from 'react-use';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Spinner } from '~/components/Spinner';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';
// ~ alias criado no vite.config para acessar a pasta src direto

const validationSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Preencha seu e-mail'),
    password: yup
        .string()
        .min(3, 'Senha muito curta!')
        .required('Digite sua senha'),
});

export const Login = () => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    // const [credentialError, setCredentialError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                    username: values.email,
                    password: values.password,
                },
            }).catch((error) => {
                toast.error('Email e/ou senha inválido(s)!');
            });
            setAuth(res.data);
            toast.success('Você está conectado(a)!');
        },
        validationSchema,
    });

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div>
            <header className=" flex bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700 p-4 border-b border-red-300">
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
                        Entre na sua conta
                    </h2>
                </div>

                <form className="p-4 space-y-5 " onSubmit={formik.handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></Input>

                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite ssua senha"
                        error={
                            formik.touched.password && formik.errors.password
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></Input>

                    <button
                        type="submit"
                        className="w-full text-center text-white bg-red-500 font-bold px-6 py-3 rounded-xl disabled:opacity-70"
                        disabled={!formik.isValid}
                    >
                        {formik.isSubmitting ? <Spinner /> : 'Entrar'}
                    </button>
                </form>
            </main>
        </div>
    );
};
