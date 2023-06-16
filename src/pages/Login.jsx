import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert.jsx';
import axiosClient from '../config/axiosClient.jsx';
import useAuth from '../hooks/useAuth.jsx';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});

    const navigate = useNavigate('/');

    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return
        }

        try {
            const { data } = await axiosClient.post('/users/login', { email, password });
            setAlert({})
            localStorage.setItem('token', data.token);
            setAuth(data)
            navigate('/projects')
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true })
        }
    }

    const { msg } = alert;

    return (
        <>
            <h1 className="mt-5 md:mt-10 text-sky-600 font-black text-5xl lg:text-6xl"> Inicia sesión para administrar tus
                <span className="text-slate-700"> proyectos </span> </h1>

            <form className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}>
                {msg && <CustomAlert alert={alert} />}
                <div className="my-5">
                    <label className="text-gray-600 block text-xl font-bold" htmlFor="email"> Correo electrónico </label>
                    <input type="email"
                        placeholder="Inserte correo electrónico"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label className="text-gray-600 block text-xl font-bold" htmlFor="password"> Contraseña </label>
                    <input type="password"
                        placeholder="Inserte contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input className="mb-5 bg-sky-700 w-full py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" type="submit" value={'Iniciar sesión'} />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link to='/register' className='block text-center my-5 text-slate-500 text-sm'> No tenes una cuenta? </Link>
                <Link to='/forgot-password' className='block text-center my-5 text-slate-500 text-sm'> Olvidé mi contraseña </Link>
            </nav>
        </>
    )
}

export default Login
