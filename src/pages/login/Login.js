import React, {
    useEffect, useRef, useState
} from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { google, signin } from '../../actions/auth';
import {
    // Button, DialogActions, DialogContent, DialogTitle, Dialog, 
    Alert
} from '@mui/material';
import './Login.css';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const email = useRef();
    const password = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [openForgot, setOpenForgot] = useState(false);
    const { errorMsg } = useSelector((state) => state.auth);
    const [saveErrorMsg, setSaveErrorMsg] = useState("");
    const [showElement, setShowElement] = useState(true);

    useEffect(() => {
        if (errorMsg !== '') {
            setSaveErrorMsg(errorMsg);
            setTimeout(function () {
                setShowElement(false);
            }, 5000);
        }
    }, [errorMsg]);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        dispatch(google(result, token, history));
    };

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try Again Later!");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            const formData = {
                email: email.current.value,
                password: password.current.value
            };
            dispatch(signin(formData, history));
            setShowElement(true);
        } catch (error) {
            console.log(error.message);
        }
        setShowElement(true);
    };


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo"> SocialBook </h3>
                    <span className="loginDesc">Kết bạn với các bạn bè và thế giới xung quanh bạn trên SocialBook</span>
                    {
                        saveErrorMsg !== "" &&
                        (showElement ? <Alert className="loginError" variant="filled" severity="error">{saveErrorMsg}</Alert> : <></>)
                    }
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={(e) => handleLogin(e)}>
                        <input
                            placeholder="Email"
                            type="email"
                            className="loginInput"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(e) }}
                            ref={email}
                            required
                            autoComplete="off"
                        />
                        <input
                            placeholder="Mật khẩu"
                            type="password"
                            className="loginInput"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(e) }}
                            ref={password}
                            required
                            autoComplete="off"
                        />
                        <button className="loginButton" onClick={(e) => handleLogin(e)}>Đăng nhập</button>
                        <button className="loginForgot" onClick={() => setOpenForgot(!openForgot)}> Quên mật khẩu ?</button>
                        <button className="loginRegisterButton" onClick={() => history.push('/register')}>Tạo tài khoản mới</button>
                        <GoogleLogin
                            clientId="942604298897-gs8om3cnmj19gr4pc02enfpidos9ofb4.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    className="googleButton"
                                    disabled={renderProps.disabled}
                                >
                                    <img src={'/assets/googleicon.png'} alt="" className="googleImg" />
                                    <span className="googleText">Đăng nhập bằng Google</span>
                                </button>

                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={"single_host_origin"}
                        />
                    </form>

                    {/* <Dialog className="loginForgotDialog" open={openForgot} onClose={() => setOpenForgot(false)}>
                        <DialogTitle className="loginForgotDialogTitle"> Quên mật khẩu </DialogTitle>
                        <hr/>
                        <DialogContent className="loginForgotDialog">
                            <input placeholder="Email" type="email" className="loginInput" onKeyDown={(e) => { if(e.key === 'Enter') handleLogin() }} ref={email} required/>
                            <input placeholder="Mật khẩu" type="password" className="loginInput" onKeyDown={(e) => { if(e.key === 'Enter') handleLogin() }} ref={password} required/>
                            <button className="loginButton" onClick={handleLogin}>Đăng nhập</button>
                        </DialogContent>
                        <hr/>
                        <DialogActions>
                            <Button onClick={() => setOpenForgot(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => setOpenForgot(false)} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </div>

            </div>
        </div>

    )
}
