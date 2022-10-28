import { useAsyncFn, useLocalStorage } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useEffect, useState } from 'react';

import { Icon } from '../components/Icon';
import { Card } from '../components/Card';
import { DateSelect } from '../components/DateSelect';
import { SignOut } from 'phosphor-react';

export const Profile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
    const [auth, setAuth] = useLocalStorage('auth', {});

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(
        async () => {
            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: `/${params.username}`,
            });

            const hunches = res.data.hunches.reduce((acc, hunch) => {
                acc[hunch.gameId] = hunch;
                return acc;
            }, {});

            return {
                ...res.data,
                hunches,
            };
        }
    );

    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params,
        });
        return res.data;
    });

    const logout = () => {
        setAuth({});
        navigate('/login');
    };

    const isLoading = games.loading || loading;
    const hasError = games.error || error;
    const isDone = !isLoading && !hasError;

    useEffect(() => {
        fetchHunches();
    }, []);

    useEffect(() => {
        fetchGames({ gameTime: currentDate });
    }, [currentDate]);

    // if (!auth?.user?.id) {
    //     return <Navigate to="/" replace={true} />;
    // }

    return (
        <div>
            <header className=" bg-red-500 text-white p-2 bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700">
                <div className="container max-w-xl flex justify-between p-2 ">
                    <span className="text-lg text-transparent  bg-clip-text bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 font-bold italic tracking-wider sm:text-3xl">
                        MeuChute
                    </span>

                    {auth?.user?.id && (
                        <div
                            className=" cursor-pointer text-red-700"
                            onClick={logout}
                        >
                            <SignOut
                                size={28}
                                className="text-slate-300 sm:text-red-700"
                            />
                        </div>
                    )}
                </div>
            </header>

            <main className="space-y-6">
                <section
                    id="header"
                    className="bg-red-500 text-white bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700"
                >
                    <div className="container text-red-700 max-w-xl flex flex-col p-4">
                        <a href="/dashboard">
                            <Icon
                                name="back"
                                className="w-7 sm:w-8 pb-2"
                            ></Icon>
                        </a>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            {user?.name}
                        </h1>
                    </div>
                </section>

                <section
                    id="content"
                    className="container max-w-xl p-4 space-y-4"
                >
                    <h2 className="text-red-500 text-xl font-bold">
                        Seus Palpites
                    </h2>

                    <DateSelect currentDate={currentDate} onChange={setDate} />

                    <div className="space-y-4">
                        {isLoading && 'Carregando jogos...'}
                        {hasError && 'Ops... Ago deu errado.'}

                        {isDone &&
                            games.value?.map((game) => (
                                <Card
                                    key={game.id}
                                    gameId={game.id}
                                    homeTeam={game.homeTeam}
                                    awayTeam={game.awayTeam}
                                    gameTime={format(
                                        new Date(game.gameTime),
                                        'H:mm'
                                    )}
                                    homeTeamScore={
                                        user?.hunches?.[game.id]
                                            ?.homeTeamScore || 0
                                    }
                                    awayTeamScore={
                                        user?.hunches?.[game.id]
                                            ?.awayTeamScore || 0
                                    }
                                    disabled={true}
                                ></Card>
                            ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
