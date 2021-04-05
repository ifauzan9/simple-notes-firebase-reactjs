import firebase, { database } from '../../../config/firebase';
import ACT from '../globalAction';

export const registerData = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: ACT.CHANGE_LOADING, payload: { isLoading: true } });
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    // console.log(user);
                    dispatch({ type: ACT.CHANGE_LOADING, payload: { isLoading: false } });
                    resolve(user);
                })
                .catch(err => {
                    const errCode = err.code;
                    const errMessage = err.message;
                    dispatch({ type: ACT.CHANGE_LOADING, payload: { isLoading: false } });
                    reject(errCode);
                })
        })
    }
}

export const loginData = ({ email, password }) => {
    return dispatch => {
        // console.log(email, password);
        dispatch({ type: ACT.CHANGE_LOADING, payload: { isLoading: true } });
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    const userData = {
                        userId: user.user.uid,
                        email: user.user.email,
                        emailVerified: user.user.emailVerified,
                        refreshToken: user.user.refreshToken
                    }

                    dispatch({ type: ACT.CHANGE_USER, payload: { userData } });
                    dispatch({ type: ACT.CHANGE_LOADING, payload: { isLoading: false } });
                    resolve(user);
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    dispatch({ type: ACT.CHANGE_LOADING, payload: { isLoading: false } });
                    reject(errorCode);
                })
        })
    }
}

export const createNewNotes = (data) => {
    return (dispatch) => {
        // console.log(data);
        return new Promise((resolve, reject) => {
            database.ref(`notes/${data.uid}`).push({
                title: data.title,
                content: data.content,
                date: data.date
            })
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                })
        })
    }
}

export const readListNotes = (userId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const urlNotes = database.ref(`notes/${userId}`);
            urlNotes.on('value', snapshot => {
                const dataSnapshot = snapshot.val();
                // console.log(dataSnapshot);
                // console.log(Object.keys(dataSnapshot));
                const dataConvert = [];
                Object.keys(dataSnapshot).map(e => {
                    dataConvert.push({
                        key: e,
                        data: dataSnapshot[e]
                    })
                });
                resolve(dataConvert);
            })
        })

    }
}

export const updateChangeNotes = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            database.ref(`notes/${data.uid}/${data.key}`).set({
                title: data.title,
                content: data.content,
                date: data.date
            }, err => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            })
        })
    }
}

export const deleteNote = (userId, keyNote) => {
    return (dispatch) => {
        const urlDeleteNotes = database.ref(`notes/${userId}/${keyNote}`);
        urlDeleteNotes.remove();
        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: 'Note Success Deleted' } })
    }
}