import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import apiEndPoint from "../services/appService";
import http from "../services/httpService";
import auth from "../services/authService";

function Post(props) {
  const { _id: postId, user, date, content, likes } = props.post;

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(likes.length);
  },[]);

  const authUser = auth.getCurrentUser();

  //console.log(likes);

  const renderLike = () => {
    if (!authUser) {
      return (
        <React.Fragment>
          <i className="fa fa-heart-o"></i>
        </React.Fragment>
      );
    }

    return (
      <i
        onClick={handleClick}
        className={
          likes && likes.includes(authUser._id)
            ? "fa fa-heart liked"
            : "fa fa-heart-o"
        }
      ></i>
    );
  };
  const handleClick = (e) => {
    if (e.currentTarget.classList.contains("liked")) {
      e.currentTarget.classList.remove("fa-heart");
      e.currentTarget.classList.remove("liked");
      e.currentTarget.classList.add("fa-heart-o");
      http
        .put(apiEndPoint + "like", { postId, userId: authUser._id })
        .then(() => {
          setLikeCount((prevCount) => {
            return prevCount - 1;
          });
        });
    } else {
      e.currentTarget.classList.remove("fa-heart-o");
      e.currentTarget.classList.add("fa-heart");
      e.currentTarget.classList.add("liked");
      http
        .put(apiEndPoint + "like", { postId, userId: authUser._id })
        .then(() => {
          setLikeCount((prevCount) => {
            return prevCount + 1;
          });
        });
    }
  };
  return (
    <div className="post">
      <div className="post-owner">
        <h2 className="post-username">
          <NavLink
            className="post-username"
            to={`/profile/${user && user._id}`}
          >
            {user && user.username}
          </NavLink>
        </h2>
        <p className="user-email">{user && user.email}</p>
        <p className="post-date">{date.substring(0, 10)}</p>
      </div>
      {/* {% if user == post.user %}
                <button class="btn btn-link edit-btn">Edit</button>
                <form class="edit-form" action="{% url 'save-post' %}" method="POST">
                    <input name="id" value="{{post.id}}" hidden>
                    <textarea name="content" cols="50" rows="5" class="form-control mb-3 post-content-area" required>{{post.content}}</textarea>
                    <input type="submit" value="Edit" class="btn btn-primary submit-btn">
                </form>
            {% endif %} */}

      <p className="post-content">{content}</p>

      <p className="post-like">
        {renderLike()}
        <span className="post-likes-number ml-1">{likeCount}</span>
      </p>
    </div>
  );
}

export default Post;
