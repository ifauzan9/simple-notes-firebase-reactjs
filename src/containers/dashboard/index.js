import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ButtonNotes from "../../components/atoms/ButtonNotes";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import SuccessMessage from "../../components/atoms/SuccessMessage";
import { createNewNotes, readListNotes, updateChangeNotes, deleteNote } from "../../config/redux/action";
import ACT from "../../config/redux/globalAction";
import './Dashboard.scss';

const Dashboard = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const history = useHistory();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.errorMessage);
    const successMessage = useSelector(state => state.successMessage);

    const [reject, setReject] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [listNoteChange, setListNoteChange] = useState(false);
    const [getNotes, setGetNotes] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateNotes, setUpdateNotes] = useState({});

    const handleSubmit = async () => {
        dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
        if (!title || !content) {
            console.log('ga boleh kosong');
            dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Dont Empty The Form' } });
        } else {
            // console.log(userData);
            const data = {
                uid: userData.user.uid,
                title,
                content,
                date: Date.now()
            }
            if (isUpdate) {
                data['key'] = updateNotes.key;
                const updateResult = await dispatch(updateChangeNotes(data)).catch(err => err);
                if (updateResult) {
                    dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: 'Update Notes Success!' } });
                } else {
                    dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Error Update Note, Please Try Again!' } });
                }
                setListNoteChange(true);

            } else {
                dispatch(createNewNotes(data))
                    .then(res => {
                        console.log(res);
                        setListNoteChange(true);
                        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: 'Add Note Successfully' } })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            setIsUpdate(false);
            setTitle('');
            setContent('');
        }
    }

    const handleUpdate = e => {
        setUpdateNotes(e);
        setTitle(e.data.title);
        setContent(e.data.content);
        setIsUpdate(true);

    }

    const handleDeleteMessage = () => {
        dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
    }

    const cancelUpdate = () => {
        setIsUpdate(false);
        setTitle('');
        setContent('');
    }

    const handleDeleteNote = (a, id) => {
        a.stopPropagation();
        dispatch(deleteNote(userData.user.uid, id));
        setListNoteChange(true);
    }

    // start componen dashboard
    useEffect(() => {
        if (!userData) {
            setReject(true)
            history.push('/login');
        }
    }, []);

    // updating list notes
    useEffect(() => {
        if (!userData) {
            history.push('/login');
        } else {
            dispatch(readListNotes(userData.user.uid))
                .then(res => {
                    // console.log(res);
                    setGetNotes(res);
                })
            setListNoteChange(false);
        }
    }, [listNoteChange])

    return (
        <div className="container-dashboard">
            <div className="form-note">
                <h2 className="title-dashboard">Dashboard</h2>
                {errorMessage && <ErrorMessage nameClass="empty-form-dashboard" message="Dont Empty The Form" handleDelete={handleDeleteMessage} />}
                {successMessage && <SuccessMessage message={successMessage} handleDelete={handleDeleteMessage} nameClass="add-form-dashboard" />}
                <input className="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}>
                </textarea>
                <ButtonNotes isUpdate={isUpdate} handleSubmit={handleSubmit} cancelUpdate={cancelUpdate} />
            </div>
            {getNotes && getNotes.map(e => {
                return (
                    <div className="list-notes" key={e.key} onClick={() => handleUpdate(e)}>
                        <h3>{e.data.title}</h3>
                        <span>{e.data.date}</span>
                        <p>{e.data.content}</p>
                        <span className="btn-delete" onClick={(a) => handleDeleteNote(a, e.key)}>X</span>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Dashboard;