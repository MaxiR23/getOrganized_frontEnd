import { Outlet } from 'react-router-dom'
//Outlet inyecta el contenido en los componentes hijos que hayamos definido en el routing
const AuthLayout = () => {
    return (
        <>
            <main className='container mx-auto p-5 md:flex md:justify-center'>
                <div className='md:w-2/3 lg:w-2/5'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default AuthLayout
