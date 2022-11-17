import axios from 'axios';
import { useFormik } from 'formik';
import { CheckCircle } from 'phosphor-react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required(),
});

export const Card = ({
    gameId,
    homeTeam,
    awayTeam,
    gameTime,
    homeTeamScore,
    awayTeamScore,
    disabled,
    dontShow,
}) => {
    const [auth] = useLocalStorage('auth');

    const formik = useFormik({
        initialValues: {
            homeTeamScore,
            awayTeamScore,
        },
        onSubmit: (values) => {
            axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/hunches',
                headers: {
                    authorization: `Bearer ${auth.accessToken}`,
                },
                data: {
                    ...values,
                    gameId,
                },
            });
        },
        validationSchema,
    });

    let hide = dontShow;
    if (hide === true) {
        hide = 'none';
    } else {
        hide = 'block';
    }

    return (
        <div className=" border border-gray-300 rounded-xl p-4 text-center space-y-4 max-w-sm sm:max-w-xl">
            <span className="text-sm sm:text-base text-gray-700 font-bold">
                {gameTime}
            </span>

            <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-center items-center space-x-1 sm:space-x-4 mb-3">
                    <span className="uppercase">{homeTeam}</span>
                    <img src={`flags/${homeTeam}.png`} />

                    <input
                        className="bg-red-300/[0.2] text-red-700 font-bold text-xl text-center w-[55px] h-[55px] rounded-md"
                        type="number"
                        name="homeTeamScore"
                        value={formik.values.homeTeamScore}
                        min={0}
                        onChange={formik.handleChange}
                        disabled={disabled}
                    />
                    <span className="text-red-500 font-bold">X</span>
                    <input
                        className="bg-red-300/[0.2] text-red-700 font-bold text-xl text-center w-[55px] h-[55px] rounded-md"
                        type="number"
                        name="awayTeamScore"
                        value={formik.values.awayTeamScore}
                        min={0}
                        onChange={formik.handleChange}
                        disabled={disabled}
                    />

                    <img src={`flags/${awayTeam}.png`} />
                    <span className="uppercase">{awayTeam}</span>
                </div>
                <div style={{ display: hide }}>
                    <button
                        type="submit"
                        onSubmit={formik.handleSubmit}
                        onClick={() => {
                            toast.success(
                                'Palpite salvo com sucesso! Visite seu perfil para conferir!'
                            );
                        }}
                        className="text-green-800 text-sm px-4 py-2"
                    >
                        <CheckCircle
                            className="hover:text-green-600"
                            size={36}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};
