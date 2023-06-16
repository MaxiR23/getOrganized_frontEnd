import useAuth from "./useAuth";
import useProjects from "./useProjects";

const useAdmin = () => {
    const { project } = useProjects();
    const { auth } = useAuth();
    //Administrador
    return project.creator === auth._id;
}

export default useAdmin;