import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";

const Login = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const { setIsLogin, isLogin } = useContext(AuthContext);

  let navigate = useNavigate();

  const loginHandler = () => {
    const data = { username: enteredUsername, password: enteredPassword };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setIsLogin({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <input
        type="text"
        onChange={(event) => setEnteredUsername(event.target.value)}
      />
      <input
        type="password"
        onChange={(event) => setEnteredPassword(event.target.value)}
      />
      <button onClick={loginHandler}>Giriş</button>
    </div>
  );
};

export default Login;
