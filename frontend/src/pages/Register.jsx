import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await register({ username, email, password });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap');`}
        {`
          .register-container {
            min-height: 100vh;
            background: #FDFBF7;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c2-2 5 2 7 0' stroke='%23E0E0E0' fill='none'/%3E%3Ccircle cx='50' cy='50' r='4' stroke='%23E0E0E0' fill='none'/%3E%3Cpath d='M80 20l5 5m0-5l-5 5' stroke='%23E0E0E0'/%3E%3Cpath d='M20 80q5-5 10 0' stroke='%23E0E0E0' fill='none'/%3E%3C/svg%3E");
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Happy Monkey', system-ui;
          }
        `}
      </style>
      <div className="register-card">
        <h1 className="register-title">Join the Mess</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <input
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className="register-input"
          />
          <button onClick={submit} className="register-button">Register</button>
        </div>
      </div>
      <style>{`
        .register-card {
          background: #ffffff;
          padding: 3rem;
          border-radius: 16px;
          border: 3px solid #000;
          box-shadow: 8px 8px 0px #FFD166;
          width: 90%;
          max-width: 420px;
        }
        .register-title { font-size: 2.5rem; margin-bottom: 2rem; text-align: center; color: #222; }
        .register-input { width: 100%; padding: 1rem 1.5rem; border-radius: 16px; border: 2px solid #000; font-size: 1.1rem; font-family: inherit; outline: none; transition: all 0.3s ease; background: #fff; box-sizing: border-box; color: #222; }
        .register-input:focus { border-color: #FF6B35; }
        .register-button { margin-top: 1rem; padding: 1rem; border-radius: 16px; border: 2px solid #000; background: #FF6B35; color: white; font-size: 1.2rem; font-family: inherit; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 3px 3px 0px #000; width: 100%; font-weight: 600; }
        .register-button:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0px #000; background: #FF0054; }
        .register-button:active { transform: translateY(0); box-shadow: 0px 0px 0px #000; }
        @media (max-width: 480px) {
          .register-card { padding: 2rem; width: 95%; }
          .register-title { font-size: 2rem; margin-bottom: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Register;
