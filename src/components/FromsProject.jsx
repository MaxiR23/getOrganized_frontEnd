import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import CustomAlert from "./CustomAlert.jsx";

const FromsProject = () => {
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [client, setClient] = useState('');
    
    const { showAlert, alert, submitProject, project } = useProjects();

    const params = useParams();

    useEffect(() => {
        if (params.id) { //Si traemos algo
            //Contiene datos, por lo cual estamos editando
            setId(project._id)
            setName(project.name)
            setDescription(project.description)
            setDeliveryDate(project.project_delivery_date?.split('T')[0]); 
            setClient(project.client)
        }
    },[params])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, description, deliveryDate, client].includes('')) {
            showAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        //Pasamos los datos hacia el provider.
        await submitProject({id, name, description, deliveryDate, client});
        
        setId(null)
        setName('')
        setDescription('')
        setDeliveryDate('')
        setClient('')
    }

    const { msg } = alert;

    return (

        <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}>

            {msg && <CustomAlert alert={alert} />}

            <div className="mb-5">
                <label htmlFor="name" className="text-gray-700 uppecase 
            font-bold text-sm"> Nombre del proyecto </label>

                <input type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="name"
                    name="name"
                    placeholder="Ingrese nombre del proyecto"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="description" className="text-gray-700 uppecase 
            font-bold text-sm"> Descripción del proyecto </label>

                <input type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="description"
                    name="description"
                    placeholder="Ingrese descripción del proyecto"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="project_delivery_date" className="text-gray-700 uppecase 
            font-bold text-sm"> Fecha de entrega </label>

                <input type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="project_delivery_date"
                    name="project_delivery_date"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="client" className="text-gray-700 uppecase 
            font-bold text-sm"> Cliente </label>

                <input type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="client"
                    name="client"
                    placeholder="Ingrese cliente del proyecto"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                />
            </div>

            <input type="submit" className="bg-sky-600 w-full p-3 uppercase 
            font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" value={id ? 'Actualizar proyecto' : 'Crear proyecto'} />
        </form>
    )
}

export default FromsProject
