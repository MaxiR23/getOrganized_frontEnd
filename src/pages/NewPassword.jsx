import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import axiosClient from "../config/axiosClient.jsx"
import CustomAlert from "../components/CustomAlert.jsx"

const NewPassword = () => {

  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState('');
  const [changedPassword] = useState(false);

  const params = useParams();
  const { token } = params;
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }

    }
    checkToken();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: 'La contraseña debe ser mínimo de 6 caracteres.',
        error: true
      })
      return
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot-password/${token}`, { password });
      setAlert({
        msg: data.msg,
        error: false
      })

      changedPassword(true)

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alert;

  return (
    <>
      <h1 className="mt-5 md:mt-10 text-sky-600 font-black text-5xl lg:text-6xl"> Restablece tu contraseña y no pierdas acceso a tus
        <span className="text-slate-700"> proyectos </span> </h1>

      {validToken && (
        <form className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          {msg && <CustomAlert alert={alert} />}
          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold" htmlFor="password"> Nueva contraseña </label>
            <input type="password"
              placeholder="Inserte la nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input className="mb-5 bg-sky-700 w-full py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" type="submit" value={'Registrar nueva contraseña'} />
        </form>
      )}

      {validToken &&
        <p> Esta siendo redirigido.. en caso de que no sea redirigido haga click aqui: <Link to='/' className='block text-center my-5 text-slate-500 text-sm'> Volver a inicio de sesión </Link> </p>
      }
    </>
  )
}

export default NewPassword
