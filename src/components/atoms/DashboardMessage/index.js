const DashboardMessage = ({ nameClass, message }) => {
    return (
        <p className={`${nameClass}-form-dashboard`}>{message}</p>
    )
}

export default DashboardMessage;