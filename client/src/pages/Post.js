import "../App.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";

const Post = () => {
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [enteredComment, setEnteredComment] = useState("");
  const { isLogin } = useContext(AuthContext);

  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byid/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addCommentHandler = () => {
    const newComment = {
      commentsText: enteredComment,
      postId: id,
    };
    axios
      .post(`http://localhost:3001/comments`, newComment, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          newComment.username = response.data.username;
          setComments([...comments, newComment]);
          setEnteredComment("");
        }
      });
  };

  const deleteCommentHandler = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  const deletePostHandler = (postId) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPostHandler = (option) => {
    if (option === "title") {
      let newTitle = prompt("Yeni Başlık:", postObject.title);
      axios.put(
        `http://localhost:3001/posts/title`,
        { newTitle, id },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newPostText = prompt("Yeni İçerik:", postObject.postText);
      axios.put(
        `http://localhost:3001/posts/postText`,
        { newPostText, id },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostObject({ ...postObject, postText: newPostText });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (isLogin.username === postObject.username) {
                editPostHandler("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (isLogin.username === postObject.username) {
                editPostHandler("text");
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {postObject.username}
            {isLogin.username === postObject.username && (
              <button onClick={() => deletePostHandler(postObject.id)}>
                Sil
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Yorum ..."
            autoComplete="false"
            value={enteredComment}
            onChange={(event) => setEnteredComment(event.target.value)}
          />
          <button onClick={addCommentHandler}> Yorum Ekle</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentsText}
                <label>Kullanıcı: {comment.username}</label>
                {isLogin.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteCommentHandler(comment.id);
                    }}
                  >
                    Sil
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
