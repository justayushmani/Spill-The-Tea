import { useEffect, useState } from "react";
import api from "../api/axios";
import TraumaCard from "../components/TraumaCard";
import FuzzyText from "../components/fuzzyText";

const Wall = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/api/trauma").then(res => setPosts(res.data));
    
    const colors = ['#FF6B35', '#FF0054', '#FFD166', '#06D6A0', '#118AB2'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <div className="wall-container">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap');`}
        {`
          .wall-container {
            min-height: 100vh;
            background: #FDFBF7;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c2-2 5 2 7 0' stroke='%23E0E0E0' fill='none'/%3E%3Ccircle cx='50' cy='50' r='4' stroke='%23E0E0E0' fill='none'/%3E%3Cpath d='M80 20l5 5m0-5l-5 5' stroke='%23E0E0E0'/%3E%3Cpath d='M20 80q5-5 10 0' stroke='%23E0E0E0' fill='none'/%3E%3C/svg%3E");
            padding: 2rem;
            padding-top: 6rem;
            font-family: 'Happy Monkey', system-ui;
          }
          .wall-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
          }
          @media (max-width: 640px) {
            .wall-container {
              padding: 1rem;
              padding-top: 5rem;
            }
            .wall-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
        `}
      </style>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
        <FuzzyText
          fontSize="clamp(2.5rem, 5vw, 4rem)"
          fontWeight={900}
          color="#222222"
          baseIntensity={0.15}
          hoverIntensity={0.5}
          enableHover={true}
        >
          Freshly Poured
        </FuzzyText>
      </div>
      <div className="wall-grid">
        {posts.map(post => (
          <TraumaCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Wall;
