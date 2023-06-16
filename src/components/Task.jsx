import formatDate from "../../helpers/formatDate.jsx";
import useAdmin from "../hooks/useAdmin.jsx";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
    const { _id, name, description, project_delivery_date, priority, status } = task;
    const { completeTask, handleModalEditTask, handleModalDeleteTask } = useProjects();
    const admin = useAdmin();

    return (
        <div className="border-b p-5 flex justify-between items-center">
            {/* Agrupo la informacion de la tarea */}
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl"> {name} </p>
                <p className="mb-1 text-sm text-gray-500"> {description} </p>
                <p className="mb-1 text-sm"> {formatDate(project_delivery_date)} </p>
                <p className="mb-1 text-sm text-gray-700"> Prioridad: {priority} </p>
                { status && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg
                text-white"> Completado por: {task.completedBy.name} </p> }
            </div>

            {/* Acciones de la tarea: Completar tarea, editar, eliminar */}
            <div className="flex flex-col lg:flex-row gap-2">
                {admin && (
                    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEditTask(task)}
                    > Editar </button>
                )}

                <button className={`${status ? 'bg-green-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completeTask(_id)}> {status ? 'Completa' : 'Incompleta'} </button>

                {admin && (
                    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalDeleteTask(task)}
                    > Eliminar </button>
                )}
            </div>
        </div>
    )
}

export default Task
