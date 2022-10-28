import { useLocalStorage } from 'react-use';
import { Navigate } from 'react-router-dom';
import WorldCupLogo from '../components/WorldCupLogo';

export const Home = () => {
    const [auth] = useLocalStorage('auth', {});

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div className="h-screen p-4 bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700  flex flex-col items-center">
            <header className=" flex items-end">
                <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 font-bold italic tracking-wider sm:text-3xl">
                    MeuChute
                </span>
            </header>
            <main className="container max-w-5xl p-4 flex-1 flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="sm:flex-1 flex justify-center">
                    <WorldCupLogo></WorldCupLogo>
                </div>
                <div className="sm:flex-1 flex flex-col justify-center space-y-4 max-w-md md:max-w-lg">
                    <h1 className="text-2xl text-white text-center font-bold sm:text-left mx-3">
                        Dê seu palpite na Copa do Mundo do Catar 2022!
                    </h1>
                    <a
                        href="/cadastro"
                        className="text-center bg-white text-slate-900 border border-gray-300 text-lg font-bold px-6 py-3 mx-3 rounded-xl hover:border-gray-100 hover:bg-slate-100 hover:text-slate-600"
                    >
                        Criar minha conta
                    </a>
                    <a
                        href="/login"
                        className="text-center text-white font-bold border border-white text-lg px-6 py-3 mx-3 rounded-xl  hover:border-red-700 hover:text-red-700 "
                    >
                        Fazer Login
                    </a>
                </div>
            </main>
        </div>
    );
};
