import React, { } from 'react';

const Button = ({ loading, submit, nameClass, name }) => {
    if (loading) {
        return (
            <button className={`${nameClass}-btn loading`}>Loading...</button>
        )
    } else {
        return (
            <button className={`${nameClass}-btn`} onClick={() => submit()}>{name}</button>
        )
    }


}

export default Button;