/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
const CustomAlert = ({ alert }) => {
    return (
        <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-2`}>
            {alert.msg}
        </div>
    )
}

export default CustomAlert
