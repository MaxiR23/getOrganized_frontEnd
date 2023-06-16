import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient.jsx";
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";

const ProjectContext = createContext()

// eslint-disable-next-line react/prop-types
const ProjectProvider = ({ children }) => {

    const auth = useAuth();

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});

    const [task, setTask] = useState({});

    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false)

    const [taskModalForm, setTaskModalForm] = useState(false);
    const [taskDeleteModal, setTaskDeleteModal] = useState(false);

    const [collab, setCollab] = useState({})
    const [deleteCollabModal, setDeleteCollabModal] = useState(false)

    const [search, setSearch] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/projects', config);
                setProjects(data)
            } catch (error) {
                console.warn(error)
            }
        }
        getProjects();
    }, [auth])

    const showAlert = (alert) => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 4000);
    }

    const submitProject = async (project) => {
        if (project.id) {
            await editProject(project);
        } else {
            await newProject(project);
        }
    }

    const editProject = async (project) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axiosClient.put(`/projects/${project.id}`, project, config);

            /* Sicronizar el state */

            /* data se le asigna al proyecto actualizado y project state al proyecto que ya esta en memoria */
            const updatedProjects = projects.map(projectState => projectState._id === data._id ? data : projectState);
            setProjects(updatedProjects);

            setAlert({ msg: 'Proyecto actualizado correctamente', error: false })

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 2000);
        } catch (error) {
            console.warn(error);
        }
    }

    const newProject = async (project) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/projects', project, config);

            setProjects([...projects, data]) //Copia de los proyectos anteriores y agregamos el nuevo.

            setAlert({ msg: 'Proyecto creado correctamente', error: false })

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 2000);

        } catch (error) {
            console.warn(error);
        }
    }

    const getProject = async (id) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/projects/${id}`, config);
            setProject(data)
            setAlert({})
        } catch (error) {
            navigate('/projects');

            setAlert({
                msg: error.response.data.msg,
                error: true,
            })

            setTimeout(() => {
                setAlert({})
            }, 3000);
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`projects/${id}`, config);

            const updatedProjects = projects.filter(projectState => projectState._id !== id);

            setProjects(updatedProjects);

            setAlert({ msg: data.msg, error: false })

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 2000);

        } catch (error) {
            console.warn(error);
        }
    }

    const handleTaskModal = () => {
        /* Si esta como true pasa a false, siempre va a ser lo contrario */
        setTaskModalForm(!taskModalForm)
        setTask({}) /* siempre que vayamos a crear una tarea nueva reiniciamos ese objeto y dejarlo vacio */
    }

    const submitTask = async (task) => {
        if (task?.id) {
            await editTask(task);
        } else {
            await createTask(task);
        }
    }

    const handleModalEditTask = (task) => {
        setTask(task);
        setTaskModalForm(true);
    }

    const handleModalDeleteTask = (task) => {
        setTask(task)
        setTaskDeleteModal(!taskDeleteModal)
    }

    const createTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/tasks', task, config)

            setAlert({
                msg: data.msg,
                error:false
            })

            const projectUpdated = { ...project };
            projectUpdated.tasks = [...projectUpdated.tasks, data];

            setProject(projectUpdated);
            setAlert({}); /* reseteo la alerta */
            setTaskModalForm(false); /* cierro modal */
        } catch (error) {
            console.warn(error)
        }
    }

    const editTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config)
            const projectUpdated = { ...project }
            projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data._id ? data : taskState)
            setProject(projectUpdated)

            setAlert({});
            setTaskModalForm(false);
        } catch (error) {
            console.warn(error)
        }
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);

            const projectUpdated = { ...project }
            projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id)
            setProject(projectUpdated)

            setAlert({
                msg: data.msg,
                error: false,
            });
            
            setTaskDeleteModal(false);
            /* socket.emit('delete task', task); */
            setTask({});
            setTimeout(() => {
                setAlert({})
            }, 3000);
        } catch (error) {
            console.warn(error);
        }
    }

    const submitCollab = async (email) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/projects/collabs', { email }, config);

            setCollab(data)
            setAlert({})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })

            setTimeout(() => {
                setAlert({})
            }, 5000);
        } finally {
            setLoading(false);
        }
    }

    const addCollab = async (email) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`/projects/collabs/${project._id}`, email, config);
            setAlert({
                msg: data.msg,
                error: false
            })
            setCollab({})

            setTimeout(() => {
                setAlert({})
            }, 3000);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            })
        }
    }

    const handleDeleteCollabModal = (collab) => {
        setCollab(collab);
        setDeleteCollabModal(!deleteCollabModal);
    }

    const deleteCollab = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/projects/delete-collab/${project._id}`, { id: collab._id }, config);

            const projectUpdated = { ...project };
            projectUpdated.collabs = projectUpdated.collabs.filter(collabsState => collabsState._id !== collab._id)

            setProject(projectUpdated);

            setAlert({
                msg: data.msg,
                error: false
            })

            setCollab({});
            setDeleteCollabModal(false);

            setTimeout(() => {
                setAlert({})
            }, 3000);
        } catch (error) {
            console.warn(error.response);
        }
    }

    const completeTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`/tasks/status/${id}`, {}, config);
            const projectUpdated = { ...project }
            projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data._id ? data : taskState);
            setProject(projectUpdated)
            setTask({})
            setAlert({});
            /* socket.emit('change state', data); */
        } catch (error) {
            console.warn(error.response)
        }
    }

    const handleSearch = () => {
        setSearch(!search)
    }

    const logOutProject = () => {
        setProjects([])
        setProject({})
        setAlert({})
    }

    /* Socket */
    /* const submitTaskProject = (task) => {
        const projectUpdated = { ...project };
        projectUpdated.tasks = [...projectUpdated, task];
        setProject(projectUpdated);
    } */

    /* const deleteTaskProject = (task) => {
        const projectUpdated = { ...project }
        projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id)
        setProject(projectUpdated)
    } */

    /* const updateTaskProject = (task) => {
        const projectUpdated = { ...project }
        projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProject(projectUpdated)
    } */

    /* const changeStateProject = (task) => {
        const projectUpdated = { ...project }
        projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState);
        setProject(projectUpdated)
    } */

    return (
        <ProjectContext.Provider
            value={{
                alert,
                addCollab,
                collab,
                completeTask,
                deleteCollab,
                deleteProject,
                deleteTask,
                deleteCollabModal,
                getProject,
                handleDeleteCollabModal,
                handleModalDeleteTask,
                handleModalEditTask,
                handleSearch,
                handleTaskModal,
                loading,
                logOutProject,
                taskModalForm,
                project,
                projects,
                search,
                showAlert,
                submitCollab,
                submitProject,
                submitTask,
                task,
                taskDeleteModal,
            }}>
            {children}
        </ProjectContext.Provider>
    )
}

export {
    ProjectProvider
}

export default ProjectContext;