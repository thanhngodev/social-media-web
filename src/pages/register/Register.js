import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../actions/auth';
import './Register.css';

export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleRegister = (e) => {
        e.preventDefault();
        if(password.current.value !== confirmPassword.current.value) {
            alert("Nhập lại mật khẩu sai!");
        } else {
            const formData = {
                email: email.current.value,
                password: password.current.value,
                name: name.current.value
            };
            dispatch(signup(formData,history));
        }
    };
    
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo"> SocialBook </h3>
                    <span className="loginDesc">
                        Kết bạn với các bạn bè và thế giới xung quanh bạn trên SocialBook
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleRegister}>
                        <input placeholder="Họ tên" type="text" className="loginInput" ref={name} required />
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required />
                        <input placeholder="Mật khẩu" type="password" className="loginInput" ref={password} required />
                        <input placeholder="Xác nhận mật khẩu" type="password" className="loginInput" ref={confirmPassword} required />
                        <button className="loginButton" type="submit" >Đăng ký</button>
                        <button className="loginRegisterButton" onClick={() => history.push('/login')} >
                            Đăng nhập tài khoản
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}