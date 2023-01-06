import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword"
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";

function App() {
  const initialUserState = {
    username: "",
    id: 0,
    status: false,
  };

  const [isLogin, setIsLogin] = useState(initialUserState);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/test", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setIsLogin({ ...isLogin, status: false });
        } else {
          setIsLogin({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLogin, setIsLogin, initialUserState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home replace to="/home" />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
