import { useParams, Link } from "react-router-dom"
import useProjects from "../hooks/useProjects";
import { useEffect } from "react";
import ModalFormTask from "../components/ModalFormTask";
import DeleteCollabModal from "../components/DeleteCollabModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Task from "../components/Task";
import Collab from "../components/Collab";
import useAdmin from "../hooks/useAdmin";
import CustomAlert from "../components/CustomAlert";

const Project = () => {
  const params = useParams();
  const { getProject, project, loading, handleTaskModal, alert } = useProjects();

  const admin = useAdmin();

  useEffect(() => {
    getProject(params.id)
  }, [])

  const { name } = project;

  if (loading) return 'Cargando...';

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl"> {name} </h1>

        {admin && (
          <div className="flex item-center gap-2 text-gray-400 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <Link className="uppercase font-bold" to={`/projects/edit/${params.id}`}>Editar</Link>
          </div>
        )}
      </div>

      {admin && (
        <button onClick={handleTaskModal} type="button" className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
          font-bold bg-blue-500 hover:bg-blue-600 transition-colors text-white text-center mt-2 flex gap-1 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Nueva tarea </button>
      )}

      <p className="font-bold text-xl mt-4"> Tareas del proyecto </p>

      {msg && <CustomAlert alert={alert}/>}

      <div className="bg-white shadow mt-6 rounded-lg">
        {project.tasks?.length ?
          project.tasks?.map(task => (
            <Task key={task._id} task={task} />
          ))
          :
          <p className="text-center my-5 p-10"> No hay tareas en este proyecto </p>
        } {/* ? para comprobar algo sin romper el código */}
      </div>

      {admin && (
        <>
          <div className="flex item-center justify-between mt-10">
            <p className="font-bold text-xl"> Colaboradores </p>
            <Link to={`/projects/add-collab/${project._id}`}
              className="text-gray-400 hover:text-black uppercase font-bold transition-colors"
            > Añadir colaboradores </Link>
          </div>

          <div className="bg-white shadow mt-6 rounded-lg">
            {project.collabs?.length ?
              project.collabs?.map(collab => (
                <Collab key={collab._id} collab={collab} />
              ))
              :
              <p className="text-center my-5 p-10"> No hay colaboradores en este proyecto </p>
            } {/* ? para comprobar algo sin romper el código */}
          </div>
        </>
      )}

      <ModalFormTask />
      <ConfirmDeleteModal />
      <DeleteCollabModal />
    </>
  )
}


export default Project
