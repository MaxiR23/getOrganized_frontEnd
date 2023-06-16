import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert.jsx';
import axiosClient from '../config/axiosClient.jsx';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true,
      })
      return
    }

    if (password.length < 6) {
      setAlert({
        msg: 'Asegurate de que la contraseña tenga mínimo 6 caracteres',
        error: true,
      })
      return
    }

    setAlert({})

    //Crear usuario en la API.
    try {
      const { data } = await axiosClient.post(`/users`,
        { name, email, password });
      setAlert({ msg: data.msg, error: false });

      setName('')
      setEmail('')
      setPassword('')
      setRepeatPassword('')
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="mt-5 md:mt-10 text-sky-600 font-black text-5xl lg:text-6xl"> Creá tu cuenta y administra tus
        <span className="text-slate-700"> proyectos </span> </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        {msg && <CustomAlert alert={alert} />}
        <div className="my-5">
          <label className="text-gray-600 block text-xl font-bold" htmlFor="name"> Nombre </label>
          <input type="text"
            placeholder="Inserte su nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

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

        <div className="my-5">
          <label className="text-gray-600 block text-xl font-bold" htmlFor="password2"> Repetir contraseña </label>
          <input type="password"
            placeholder="Repetir contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="password2"
            id="password2"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        </div>

        <input className="mb-5 bg-sky-700 w-full py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" type="submit" value={'Crear cuenta'} />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to='/' className='block text-center my-5 text-slate-500 text-sm'> Volver a inicio de sesión </Link>
        <Link to='/forgot-password' className='block text-center my-5 text-slate-500 text-sm'> Olvidé mi contraseña </Link>
      </nav>
    </>
  )
}

export default Register
