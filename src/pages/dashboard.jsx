import { useAsyncFn, useLocalStorage } from 'react-use';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

import { Icon } from '../components/Icon';
import { Card } from '../components/Card';
import { DateSelect } from '../components/DateSelect';

export const Dashboard = () => {
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
    const [auth] = useLocalStorage('auth', {});

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(
        async () => {
            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: `/${auth.user.username}`,
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

    const isLoading = games.loading || loading;
    const hasError = games.error || error;
    const isDone = !isLoading && !hasError;

    useEffect(() => {
        fetchHunches();
    }, []);

    useEffect(() => {
        fetchGames({ gameTime: currentDate });
    }, [currentDate]);

    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div>
            <header className=" bg-red-500 text-white p-2 bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700">
                <div className="container max-w-xl flex justify-between p-2 sm:max-w-xl">
                    <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 font-bold italic tracking-wider sm:text-3xl">
                        MeuChute
                    </span>

                    <a
                        className="text-red-700 text-lg sm:text-3xl"
                        href={`/${auth?.user?.username}`}
                    >
                        <Icon
                            name="profile"
                            className="w-7 text-slate-300 sm:text-red-700"
                        ></Icon>
                    </a>
                </div>
            </header>

            <main>
                <section
                    id="header"
                    className=" bg-red-500 text-red-700 bg-gradient-to-r from-yellow-200 via-rose-400 to-red-700"
                >
                    <div className="container max-w-xl flex flex-col space-y-3 p-4">
                        <span className="text-md sm:text-lg">{`Olá, ${user?.name}`}</span>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Qual é seu palpite?
                        </h1>
                    </div>
                </section>

                <section
                    id="content"
                    className="container min-w-fit max-w-xl p-4 space-y-4 "
                >
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
                                />
                            ))}
                    </div>
                    <div className="flex justify-center items-center space-x-4 p-4">
                        <button
                            className="border bg-red-500 text-white p-2 rounded-full hover:text-black"
                            onClick={() => {
                                window.location.reload();
                                // toast.success('Palpite salvo com sucesso');
                            }}
                        >
                            Salvar Palpite
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};
