import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const Navbar = () => {
  const { isLogin, setIsLogin, initialUserState } = useContext(AuthContext);

  let navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(initialUserState);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="links">
        {!isLogin.status ? (
          <>
            <Link to="/login"> Giriş </Link>
            <Link to="/registration"> Kayıt</Link>
          </>
        ) : (
          <>
            <Link to="/"> Ana Sayfa </Link>
            <Link to="/createpost"> Yeni Gönderi</Link>
          </>
        )}
        <div className="loggedInContainer">
          <h1>{isLogin.username}</h1>
          {isLogin.status && (
            <button onClick={logOutHandler}> Çıkış Yap </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
