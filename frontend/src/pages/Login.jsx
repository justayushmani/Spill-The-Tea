import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import gsap from "gsap";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cardRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        rotate: 0
      });

    }, bgRef);

    return () => ctx.revert();
  }, []);

  const submit = async () => {
    try {
      await login(email, password);
      navigate("/submit");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div ref={bgRef} style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#FDFBF7",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c2-2 5 2 7 0' stroke='%23E0E0E0' fill='none'/%3E%3Ccircle cx='50' cy='50' r='4' stroke='%23E0E0E0' fill='none'/%3E%3Cpath d='M80 20l5 5m0-5l-5 5' stroke='%23E0E0E0'/%3E%3Cpath d='M20 80q5-5 10 0' stroke='%23E0E0E0' fill='none'/%3E%3C/svg%3E")`,
      position: "relative",
      overflow: "hidden",
      fontFamily: '"Happy Monkey", system-ui'
    }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap');`}
      </style>

      <div ref={cardRef} className="login-card">
        <h1 className="login-title">
          Welcome Back!
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={submit} className="login-button">Login</button>
        </div>
      </div>
      <style>{`
        .login-card {
          background: #ffffff;
          padding: 3rem;
          border-radius: 16px;
          border: 3px solid #000;
          box-shadow: 8px 8px 0px #FFD166;
          width: 90%;
          max-width: 420px;
          transform: rotate(-2deg);
          z-index: 10;
        }
        .login-title { font-size: 3rem; margin-bottom: 2rem; text-align: center; color: #222; text-shadow: 2px 2px 0px #E0E0E0; }
        .login-input { width: 100%; padding: 1rem 1.5rem; border-radius: 16px; border: 2px solid #000; font-size: 1.1rem; font-family: inherit; outline: none; transition: all 0.3s ease; background: #fff; box-sizing: border-box; color: #222; }
        .login-input:focus { border-color: #FF6B35; }
        .login-button { margin-top: 1rem; padding: 1rem; border-radius: 16px; border: 2px solid #000; background: #FF6B35; color: white; font-size: 1.2rem; font-family: inherit; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 3px 3px 0px #000; width: 100%; font-weight: 600; }
        .login-button:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0px #000; background: #FF0054; }
        .login-button:active { transform: translateY(0); box-shadow: 0px 0px 0px #000; }
        @media (max-width: 480px) {
          .login-card { padding: 2rem; width: 95%; transform: none; }
          .login-title { font-size: 2rem; margin-bottom: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Login;
