const ErrorMessage = ({ message, handleDelete, nameClass }) => {
    return (
        <div className={`${nameClass}-error`}>
            <p className="message-error">{message}</p>
            <span className="close-button" onClick={() => handleDelete()}>X</span>
        </div>
    )

    //         < div className = "login-error" >
    //     <p className="message-error">Error message!</p>
    //     <span className="close-button">X</span>
    // </div >
}

export default ErrorMessage;