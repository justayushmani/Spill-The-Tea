import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
        <img src="/main logo.png" alt="Logo" style={{ height: '40px' }} />
        <span className="logo-text">Spill The Tea </span>
      </Link>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>The Mess</Link>
        {user && <Link to="/submit" className="nav-item" onClick={() => setIsOpen(false)}>Submit Tea</Link>}
        {user && (user.role === 'moderator' || user.role === 'admin') && (
          <Link to="/moderator" className="nav-item" onClick={() => setIsOpen(false)}>Moderator</Link>
        )}
        
        {!user ? (
          <>
            <Link to="/login" className="nav-item" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="nav-button" onClick={() => setIsOpen(false)}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-button">Logout</button>
        )}
      </div>

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: #ffffff;
          border-bottom: 3px solid #000;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          box-sizing: border-box;
          font-family: "Happy Monkey", system-ui;
        }
        .logo-link { display: flex; align-items: center; text-decoration: none; gap: 10px; z-index: 1001; }
        .logo-text { font-size: 1.5rem; font-weight: bold; color: #222; }
        
        .nav-links { display: flex; gap: 1.5rem; align-items: center; }
        .nav-item { text-decoration: none; color: #222; font-weight: 600; font-size: 1.1rem; cursor: pointer; transition: color 0.2s; }
        .nav-item:hover { color: #FF6B35; }
        
        .nav-button {
          padding: 0.5rem 1.5rem;
          background: #FF6B35;
          color: #fff;
          border: 2px solid #000;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          font-family: inherit;
          text-decoration: none;
          box-shadow: 2px 2px 0px #000;
          transition: all 0.2s;
        }
        .nav-button:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0px #000; background: #FF0054; }
        .nav-button:active { transform: translate(0, 0); box-shadow: 0px 0px 0px #000; }

        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 1001; }
        .bar { width: 25px; height: 3px; background-color: #222; transition: all 0.3s ease; }

        @media (max-width: 768px) {
          .navbar { padding: 0.8rem 1.5rem; }
          .hamburger { display: flex; }
          .logo-text { font-size: 1.2rem; }
          .logo-link img { height: 32px !important; }
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 70%;
            background: #ffffff;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.3s ease-in-out;
            border-left: 3px solid #000;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            gap: 2rem;
          }
          .nav-links.open { right: 0; }
          .hamburger.open .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
          .hamburger.open .bar:nth-child(2) { opacity: 0; }
          .hamburger.open .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
