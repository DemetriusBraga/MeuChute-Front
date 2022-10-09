import { useLocalStorage } from 'react-use';
import { Navigate } from 'react-router-dom';

export const Home = () => {
    const [auth] = useLocalStorage('auth', {});

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div className="h-fit sm:h-screen p-4 bg-red-700 text-white flex flex-col items-center">
            <header className=" flex justify-center ">
                <img src="imgs/logo-fundo-vinho.svg" className="w-40" />
            </header>
            <div className="container max-w-5xl p-4 flex-1 flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="sm:flex-1 flex justify-center">
                    <img
                        src="imgs/photo.png"
                        className="w-full max-w-sm sm:max-w-lg"
                    />
                </div>
                <div className="sm:flex-1 flex flex-col justify-center space-y-4 max-w-md md:max-w-lg">
                    <h1 className="text-2xl text-center font-bold sm:text-left mx-3">
                        Dê seu palpite na Copa do Mundo do Catar 2022!
                    </h1>
                    <a
                        href="/cadastro"
                        className="text-center text-red-700 bg-white text-lg font-bold px-6 py-3 mx-3 rounded-xl"
                    >
                        Cirar minha conta
                    </a>
                    <a
                        href="/login"
                        className="text-center text-white font-bold border border-white text-lg px-6 py-3 mx-3 rounded-xl"
                    >
                        Fazer Login
                    </a>
                </div>
            </div>
        </div>
    );
};
