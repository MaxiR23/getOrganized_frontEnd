import useProjects from "../hooks/useProjects";

const Collab = ({ collab }) => {

    const { name, email } = collab;

    const { handleDeleteCollabModel } = useProjects();

    return (
        <div className="border-b p-5 flex justify-between item-center">
            {/* Colaboradores */}
            <div>
                <p>{name}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
            {/* Acciones */}
            <div>
                <button type="button" className="bg-red-600 px-4 py-3 text-white
                uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleDeleteCollabModel(collab)}
                > Eliminar </button>
            </div>
        </div>
    )
}

export default Collab
