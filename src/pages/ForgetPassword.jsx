import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert.jsx';
import axiosClient from '../config/axiosClient.jsx';

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'Correo electronico obligatorio',
        error: true
      })
      return
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot-password`, { email });

      setAlert({ msg: data.msg, error: false })
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="mt-5 md:mt-10 text-sky-600 font-black text-5xl lg:text-6xl"> Recuperá tu acceso y no pierdas tus
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
        <input className="mb-5 bg-sky-700 w-full py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" type="submit" value={'Enviar instrucciones'} />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to='/' className='block text-center my-5 text-slate-500 text-sm'> Volver a inicio de sesión </Link>
        <Link to='/register' className='block text-center my-5 text-slate-500 text-sm'> No tenes una cuenta? </Link>
      </nav>
    </>
  )
}

export default ForgetPassword
