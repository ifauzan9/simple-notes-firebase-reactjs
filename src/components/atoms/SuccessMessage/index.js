const SuccessMessage = ({ message, handleDelete, nameClass }) => {
    return (
        <div className={`${nameClass}-success`}>
            <p className="message-success">{message}</p>
            <span className="close-button" onClick={() => handleDelete()}>X</span>
        </div>
    )
}

export default SuccessMessage;