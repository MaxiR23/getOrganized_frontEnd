import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import axiosClient from "../config/axiosClient.jsx";
import CustomAlert from "../components/CustomAlert.jsx";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({})
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const navigate = useNavigate()
  const params = useParams(); //traerá los parametros que estan en la url 
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient(`/users/confirm-account/${id}`);

        setAlert({
          msg: data.msg,
          error: false
        })

        setConfirmedAccount(true)

        setTimeout(() => {
          navigate('/')
        }, 5000)

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="mt-5 md:mt-10 text-sky-600 font-black text-5xl lg:text-6xl"> Confirma tu cuenta para comenzar a crear tus
        <span className="text-slate-700"> proyectos </span> </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <CustomAlert alert={alert} />}
        {confirmedAccount &&
          <p> Esta siendo redirigido.. en caso de que no sea redirigido haga click aqui: <Link to='/' className='block text-center my-5 text-slate-500 text-sm'> Volver a inicio de sesión </Link> </p>
        }
      </div>
    </>
  )
}

export default ConfirmAccount
