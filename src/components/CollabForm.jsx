import { useState } from "react"
import useProjects from "../hooks/useProjects";
import CustomAlert from "./CustomAlert";

const CollabForm = () => {

    const [email, setEmail] = useState('');

    const { showAlert, alert, submitCollab } = useProjects();

    const handleSubmit = (e) => {
        e.preventDefault(e)

        if (email === '') {
            showAlert({
                msg: 'El correo electronico es obligatorio',
                error: true
            })
            return
        }

        submitCollab(email)
    }

    const { msg } = alert;

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <CustomAlert alert={alert} />}

            <div className="mb-5">
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor="email">
                    Correo electrónico de colaborador
                </label>
                <input id='email' type="email"
                    placeholder='Ingrese el correo electrónico del colaborador'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <input type='submit' className='bg-sky-600 hover:bg-sky-700 
                w-full p-3 text-white uppercase font-bold cursor-pointer 
                transition-colors rounded text-sm'
                value={'Buscar colaborador'} />
        </form>
    )
}

export default CollabForm
