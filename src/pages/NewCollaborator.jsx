import { useEffect } from "react"
import CollabForm from "../components/CollabForm"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

const NewCollaborator = () => {
    const { alert, getProject, project, loading, collab, addCollab } = useProjects();
    const params = useParams();

    useEffect(() => {
        getProject(params.id)
    }, [])

    if (!project?._id) return <CustomAlert alert={alert}/>

    return (
        <>
            <h1 className="text-3xl font-black"> Añadir colaborador al proyecto: {project.name} </h1>

            <div className="mt-10 flex justify-center">
                <CollabForm collab={collab} />
            </div>

            {loading ? <p className="text-center"> Cargando... </p> : collab?._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                        <h2 className="text-center mb-10 text-2xl font-bold"> Resultado </h2>
                        <div className="flex justify-between item-center">
                            <p> {collab.name} </p>
                            <button type="button" className="bg-slate-500 px-5 py-2 rounded-lg uppercase
                            text-white font-bold text-sm"
                            onClick={() => addCollab({ email: collab.email })}
                            > Agregar al proyecto </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NewCollaborator
