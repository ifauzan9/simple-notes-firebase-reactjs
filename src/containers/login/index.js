import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';

import ACT from '../../config/redux/globalAction';
import ErrorMessage from '../../components/atoms/ErrorMessage';
import { loginData } from '../../config/redux/action';
import Button from '../../components/atoms/button';
import { useHistory } from 'react-router';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.isLoading);
    const errorMessage = useSelector(state => state.errorMessage);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        return () => {
            dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
            dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
        }
    }, [])

    const handleSubmit = async () => {
        dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
        if (!email || !password) {
            dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Fill the Form!' } });
        } else {
            const data = {
                email,
                password
            }
            const res = await dispatch(loginData(data)).then(res => res).catch(err => 'failed');
            if (res === "failed") {
                dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: 'Email/Password Incorrect!' } })
                setPassword('');
            } else {
                // BARU SAMPE SINI (NANTI LANJUTKAN)
                // console.log('oke berhasil login');
                // console.log(res);
                localStorage.setItem("userData", JSON.stringify(res));
                history.push('/dashboard');
            }

        }
    }

    const handleDeleteMessage = () => {
        dispatch({ type: ACT.ERROR_MESSAGE, payload: { message: '' } });
        dispatch({ type: ACT.SUCCESS_MESSAGE, payload: { message: '' } });
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h3 className="login-title">Login</h3>
                {errorMessage && <ErrorMessage nameClass="login" handleDelete={handleDeleteMessage} message={errorMessage} />}
                <input className="login-input" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input className="login-input" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                {/* <button className="login-btn" onClick={handleSubmit}>Login</button> */}
                {/* <button className="login-btn loading">Loading</button> */}
                <Button loading={isLoading} submit={handleSubmit} nameClass="login" name="Login" />
            </div>
        </div>
    )
}

export default Login;