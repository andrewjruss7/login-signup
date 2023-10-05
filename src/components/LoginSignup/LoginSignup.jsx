import React, {useState} from "react";
import './LoginSignup.css';
import Axios from 'axios';

import user_icon from '../assests/man.png';
import email_icon from '../assests/gmail.png';
import password_icon from '../assests/password.png';

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginResult, setLoginResult] = useState(null);

    const handleSubmit = async (e) => {
       if (e) {
           e.preventDefault();
           console.log('ok...?');
       }

       try {
           const response = await Axios.post('https://api.solodata.es/auth', {
               username: username,
               password: password
           });

           if(response.data.success) {
               setLoginResult('Success')
           } else {
               setLoginResult('Failed')
           }

           console.log('Response API', response.data);
       } catch (error) {
           setLoginResult('failed');
           console.log('Error', error);
       }
   };

    return (
        <div className='container'>

            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {action === 'Login' ? <div></div>: <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name"/>
                    </div> }
                    <div className="input">
                        <img src={email_icon} alt=""/>
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                    </div>
                </div>
                {action === "Sign Up" ? <div></div>: <div className="forgot-password">Lost password? <span>Click here!</span></div>}
                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray": "submit"} onClick={() => {setAction("Sign Up") }}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={() => {setAction("Login"); handleSubmit()}}>Login</div>
                </div>
                {loginResult === 'success' && (
                    <div className="alert-success">Inicio de sesión exitoso</div>
                )}
                {loginResult === 'failed' && (
                    <div className="alert-error">Inicio de sesión fallido</div>
                )}
            </form>
        </div>
    )
}

export default LoginSignup