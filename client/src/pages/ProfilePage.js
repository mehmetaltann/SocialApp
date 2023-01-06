import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [listOfPost, setListOfPost] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth//basicInfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
      });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPost(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basciInfo">
        <h1>{username}</h1>
        {isLogin.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Şifre Değiştir
          </button>
        )}
      </div>
      <div className="listofPosts">
        {listOfPost.map((post, key) => (
          <div key={key} className="post">
            <div className="title">{post.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${post.id}`);
              }}
            >
              {post.postText}
            </div>
            <div className="footer">
              <div className="username">{post.username}</div>
              <div className="buttons">
                <label>{post.likes.length}</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
