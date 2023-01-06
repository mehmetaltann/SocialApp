import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";

const Home = () => {
  const [listOfPost, setListOfPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { isLogin } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPost(response.data.listOfPost);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const onLikeHandler = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setListOfPost(
          listOfPost.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.likes, 0] };
              } else {
                const likesArray = post.likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="App">
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
            <div className="username">
              <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
            </div>
            <div className="buttons">
              <ThumbUpIcon
                onClick={() => {
                  onLikeHandler(post.id);
                }}
                className={
                  likedPosts.includes(post.id) ? "unlikeBttn" : "likeBttn"
                }
              />
              <label>{post.likes.length}</label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
