const ButtonNotes = ({ isUpdate, handleSubmit, cancelUpdate }) => {
    if (isUpdate) {
        return (
            <div className="btn-update">
                <button className="cancel-update" onClick={() => cancelUpdate()}>Cancel</button>
                <button className="save-update" onClick={() => handleSubmit()}>Update</button>
            </div>
        )
    }
    else {
        return (
            <button className="btn-add" onClick={() => handleSubmit()}>Tambah</button>
        )
    }
}

export default ButtonNotes;