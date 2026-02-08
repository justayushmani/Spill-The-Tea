import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Navbar from "./components/navbar";
import Wall from "./pages/Wall";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitTrauma from "./pages/SubmitTrauma";
import ModeratorPanel from "./pages/ModeratorPanel";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Wall />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/submit"
            element={
              <PrivateRoute>
                <SubmitTrauma />
              </PrivateRoute>
            }
          />

          <Route
            path="/moderator"
            element={
              <PrivateRoute roles={["moderator", "admin"]}>
                <ModeratorPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
