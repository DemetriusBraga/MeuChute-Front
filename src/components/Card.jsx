import axios from 'axios';
import { useFormik } from 'formik';
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
}) => {
    const [auth] = useLocalStorage('auth');

    const formik = useFormik({
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
        initialValues: {
            homeTeamScore,
            awayTeamScore,
        },
        validationSchema,
    });

    return (
        <div className="border border-gray-300 rounded-xl p-4 text-center space-y-4 max-w-sm sm:max-w-xl">
            <span className="text-sm sm:text-base text-gray-700 font-bold">
                {gameTime}
            </span>

            <form className="flex justify-center items-center space-x-4 ">
                <span className="uppercase">{homeTeam}</span>
                <img src={`flags/${homeTeam}.png`} />

                <input
                    className="bg-red-300/[0.2] text-red-700 font-bold text-xl text-center w-[55px] h-[55px] rounded-md"
                    type="number"
                    name="homeTeamScore"
                    value={formik.values.homeTeamScore}
                    min={0}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
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
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                />

                <img src={`flags/${awayTeam}.png`} />
                <span className="uppercase">{awayTeam}</span>
            </form>
        </div>
    );
};
