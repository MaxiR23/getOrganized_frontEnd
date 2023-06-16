import CustomAlert from "../components/CustomAlert";
import ProjectsPreview from "../components/ProjectsPreview";
import useProjects from "../hooks/useProjects";

const Projects = () => {

  const { projects } = useProjects();
  const { msg } = alert;
  
  return (
    <>
      <h1 className="text-3xl font-black"> Proyectos </h1>

      {msg && <CustomAlert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ?
          projects.map(project => (
            <ProjectsPreview
              key={project._id}
              project={project} />
          ))
          : <p className="text-center
        text-gray-600 font-bold p-5"> No hay proyectos </p>}
      </div>
    </>
  )
}

export default Projects
