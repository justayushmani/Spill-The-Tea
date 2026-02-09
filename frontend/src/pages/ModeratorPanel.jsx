import { useEffect, useState } from "react";
import api from "../api/axios";

const ModeratorPanel = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/api/trauma/pending").then(res => setPosts(res.data));
  }, []);

  const approve = async (id) => {
    await api.patch(`/api/trauma/approve/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="mod-container">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap');`}
        {`
          .mod-container {
            min-height: 100vh;
            background: #FDFBF7;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c2-2 5 2 7 0' stroke='%23E0E0E0' fill='none'/%3E%3Ccircle cx='50' cy='50' r='4' stroke='%23E0E0E0' fill='none'/%3E%3Cpath d='M80 20l5 5m0-5l-5 5' stroke='%23E0E0E0'/%3E%3Cpath d='M20 80q5-5 10 0' stroke='%23E0E0E0' fill='none'/%3E%3C/svg%3E");
            padding: 2rem;
            padding-top: 6rem;
            font-family: 'Happy Monkey', system-ui;
          }
          .mod-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          @media (max-width: 640px) {
            .mod-container {
              padding: 1rem;
              padding-top: 5rem;
            }
            .mod-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
        `}
      </style>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2.5rem", color: "#222" }}>Moderator Panel 🛡️</h2>
      
      <div className="mod-grid">
        {posts.length === 0 && <p style={{ textAlign: "center", gridColumn: "1/-1", fontSize: "1.2rem", color: "#555" }}>No pending posts.</p>}
        {posts.map(p => (
          <div key={p._id} className="mod-card">
            <p className="mod-content">{p.content}</p>
            <button onClick={() => approve(p._id)} className="approve-btn">Approve</button>
          </div>
        ))}
      </div>
      <style>{`
        .mod-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          border: 3px solid #000;
          box-shadow: 6px 6px 0px #FFD166;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mod-content {
          font-size: 1.1rem;
          color: #222;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .approve-btn {
          padding: 0.8rem;
          border-radius: 12px;
          border: 2px solid #000;
          background: #00b894;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          box-shadow: 2px 2px 0px #000;
        }
        .approve-btn:hover {
          background: #00a884;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #000;
        }
      `}</style>
    </div>
  );
};

export default ModeratorPanel;
