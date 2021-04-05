import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebase';
import Button from '../../components/atoms/button';
import { useDispatch, useSelector } from 'react-redux';
import './Register.scss';
import { registerData } from '../../config/redux/action';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import ACT from '../../config/redux/globalAction';
import SuccessMessage from '../../components/atoms/SuccessMessage';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.isLoading);
    const errorMessage = useSelector(state => state.errorMessage);
    const successMessage = useSelector(state => state.successMessage);
    const dispatch = useDispatch();

    const reset = () => {
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        return () => {
            dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
            dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
        }
    }, [])

    const handleSubmit = () => {
        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
        dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
        if (!email || !password) {
            console.log('tidak boleh kosong');
            dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Your form is empty!' } });
        } else {
            const data = {
                email,
                password
            }
            dispatch(registerData(data))
                .then(res => {
                    console.log(res);
                    dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: 'Your account registered successfully' } })
                    reset();
                })
                .catch(err => {
                    // console.log(err);
                    const errCode = err.split('/')[1].split('-')[0];
                    // console.log(errCode);
                    errCode === "email" && dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Your Email Already Registered!' } }) && reset();
                    errCode === "invalid" && dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Invalid Email!' } }) && reset();
                    errCode === "weak" && dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Password Length Min. 8 Word!' } }) && setPassword('');


                })

        }
    }

    const handleDeleteMessage = () => {
        dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
    }

    return (
        <div className="register-container">
            <div className="register-form">
                <h3 className="register-title">Register Page</h3>
                {successMessage && <SuccessMessage message={successMessage} handleDelete={handleDeleteMessage} nameClass="register" />}
                {errorMessage && <ErrorMessage message={errorMessage} handleDelete={handleDeleteMessage} nameClass="register" />}
                <input className="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" name="email" />
                <input className="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" />
                <Button loading={isLoading} submit={handleSubmit} nameClass='register' name="Register" />
            </div>
        </div>
    )
}

export default Register;