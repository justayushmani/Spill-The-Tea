import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SubmitTrauma = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!content.trim()) return;
    await api.post("/trauma", { content });
    alert("Trauma submitted for approval");
    setContent("");
    navigate("/");
  };

  return (
    <div className="submit-container">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap');`}
        {`
          .submit-container {
            min-height: 100vh;
            background: #FDFBF7;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c2-2 5 2 7 0' stroke='%23E0E0E0' fill='none'/%3E%3Ccircle cx='50' cy='50' r='4' stroke='%23E0E0E0' fill='none'/%3E%3Cpath d='M80 20l5 5m0-5l-5 5' stroke='%23E0E0E0'/%3E%3Cpath d='M20 80q5-5 10 0' stroke='%23E0E0E0' fill='none'/%3E%3C/svg%3E");
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: 'Happy Monkey', system-ui;
          }
        `}
      </style>
      <div className="submit-card">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#222222", fontSize: "2rem" }}>What's the Tea 👻</h2>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="trauma-input"
        />
        <button onClick={submit} className="submit-btn">Submit</button>
      </div>
      <style>{`
        .submit-card {
          background: #ffffff;
          padding: 3rem;
          border-radius: 16px;
          border: 3px solid #000;
          box-shadow: 8px 8px 0px #FFD166;
          width: 100%;
          max-width: 600px;
        }
        .trauma-input {
          width: 100%;
          height: 200px;
          padding: 1rem;
          border-radius: 16px;
          border: 2px solid #000;
          font-size: 1.1rem;
          font-family: inherit;
          resize: none;
          outline: none;
          transition: all 0.3s ease;
          background: #fff;
          box-sizing: border-box;
          margin-bottom: 1.5rem;
          color: #222;
        }
        .trauma-input:focus {
          border-color: #FF6B35;
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          border-radius: 16px;
          border: 2px solid #000;
          background: #FF6B35;
          color: white;
          font-size: 1.2rem;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-weight: 600;
          box-shadow: 3px 3px 0px #000;
        }
        .submit-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0px #000;
          background: #FF0054;
        }
        .submit-btn:active {
          transform: translateY(0);
          box-shadow: 0px 0px 0px #000;
        }
        @media (max-width: 600px) {
          .submit-container { padding: 1rem; }
          .submit-card { padding: 1.5rem; width: 100%; }
          .trauma-input { height: 150px; }
          h2 { font-size: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default SubmitTrauma;
