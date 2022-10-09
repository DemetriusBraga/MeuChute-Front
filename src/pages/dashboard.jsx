import { useAsyncFn, useLocalStorage } from 'react-use';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useEffect, useState } from 'react';

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
            <header className=" bg-red-500 text-white p-2">
                <div className="container max-w-xl flex justify-between p-2 ">
                    <img
                        src="imgs/logo-fundo-vermelho.svg"
                        className="w-32 md:w-40"
                    />
                    <a href={`/${auth?.user?.username}`}>
                        <Icon name="profile" className="w-8"></Icon>
                    </a>
                </div>
            </header>

            <main>
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-xl flex flex-col space-y-3 p-4">
                        <span className="text-lg">Olá Demetrius</span>
                        <h1 className="text-2xl font-bold">
                            Qual é seu palpite?
                        </h1>
                    </div>
                </section>

                <section
                    id="content"
                    className="container max-w-xl p-4 space-y-4"
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
                                            ?.homeTeamScore || ''
                                    }
                                    awayTeamScore={
                                        user?.hunches?.[game.id]
                                            ?.awayTeamScore || ''
                                    }
                                />
                            ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
