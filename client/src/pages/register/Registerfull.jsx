import "./register.css";
import { Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export default function Registerfull() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
   setError(false);
    try {
      const res = await axios.post("https://mern-test-blog.onrender.com/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.data) {
        setRegistrationSuccess(true);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(true);
    }
  };


    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="registerButton" type="submit">Register</button>
      </form>
      {registrationSuccess ? (
        <div>
          <p style={{color:"green", marginTop:"10px"}}>Registration successful!</p>
          <button className="registerLoginButton">
            <Link className="link" to="/login">Go to Login</Link>
          </button>
        </div>
      ) : (
        <button className="registerLoginButton" disabled>Go to Login</button>
      )}
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
    )
}

