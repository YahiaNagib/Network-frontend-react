import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import apiEndPoint from "../services/appService";
import http from "../services/httpService";
import auth from "../services/authService";

function Post(props) {
  // Extracting properties from the post
  const { _id: postId, user, date, content, likes } = props.post;

  const [likeCount, setLikeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [postContent, setPostContent] = useState(content);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setLikeCount(likes.length);
  }, []);

  const authUser = auth.getCurrentUser();

  // If the user is not authenticated (anonymous user), then
  // the like button can not be triggered.

  const renderLike = () => {
    if (!authUser) {
      return (
        <React.Fragment>
          <i className="fa fa-heart-o"></i>
        </React.Fragment>
      );
    }
    // If the user is authenticated then add 'liked' class to
    // the i element which makes the button be triggered.
    // If the authenticated user is in the likes list of the post
    // then view the red heart.
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

  // Clicking on the like button.
  // The 'liked', 'fa-heart' and 'fa-heart-o' will be toggled
  // depending if the user had already liked the post or not.
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

  // To view the edit button.
  // First check if the post owner is the same as the authenticated user
  const renderEdit = () => {
    if (authUser._id === user._id) {
      return (
        <React.Fragment>
          <button
            className="btn btn-link edit-btn"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            Edit
          </button>
        </React.Fragment>
      );
    }
  };
  // To change the editedContent state when typing
  const handleContentChange = (e) => {
    setEditedContent(e.currentTarget.value);
  };

  // To handle the submit of edit post form.
  const handleEditSubmit = (e) => {
    e.preventDefault();
    http
      .put(apiEndPoint + "posts/" + postId, { content: editedContent })
      .then(() => {
        setPostContent(editedContent);
        setIsEditing(false);
      });
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
      {renderEdit()}
      <form
        className="edit-form"
        onSubmit={handleEditSubmit}
        style={{ display: isEditing ? "block" : "none" }}
      >
        <textarea
          name="content"
          cols="50"
          rows="5"
          className="form-control mb-3 post-content-area"
          required
          value={editedContent}
          onChange={handleContentChange}
        ></textarea>
        <input
          type="submit"
          value="Edit"
          className="btn btn-primary submit-btn"
        />
      </form>
      <p
        className="post-content"
        style={{ display: !isEditing ? "block" : "none" }}
      >
        {postContent}
      </p>

      <p className="post-like">
        {renderLike()}
        <span className="post-likes-number ml-1">{likeCount}</span>
      </p>
    </div>
  );
}

export default Post;
