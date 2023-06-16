import { useEffect } from "react";
import useProjects from "../hooks/useProjects"
import { useParams } from 'react-router-dom'
import FromsProject from "../components/FromsProject";

const EditProject = () => {

    const params = useParams();

    const { getProject, project, loading, deleteProject } = useProjects();

    useEffect(() => {
        getProject(params.id)
    }, [])

    const handleClick = () => {
        if (confirm('¿Deseas eliminar este proyecto?')) {
            deleteProject(params.id);
        } else {
            console.log('NOP')
        }
    }

    const { name } = project;

    if (loading) return 'Cargando...';

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-black text-4xl"> Editar proyecto: {name} </h1>

                <div className="flex item-center gap-2 text-gray-400 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p onClick={handleClick} className="uppercase font-bold"> Eliminar </p>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <FromsProject />
            </div>

        </>
    )
}

export default EditProject
