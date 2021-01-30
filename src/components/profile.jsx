import React, { useState, useEffect } from "react";
import auth from "../services/authService";
import axios from "axios";
import Post from "./post";

const Profile = (props) => {
  const apiEndPoint = "http://localhost:4000/api/";
  const id = props.match.params.id;
  const authUser = auth.getCurrentUser();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  console.log(authUser.following.includes(user._id));

  useEffect(() => {
    // get the posts of this user
    axios.get(apiEndPoint + "posts/user/" + id).then((response) => {
      setPosts(response.data);
    });

    // get the data of this user
    axios.get(apiEndPoint + "users/" + id).then((response) => {
      setUser(response.data);
    });
  }, []);

  const renderPosts = () => {
    if (posts.length === 0) {
      return <h2> No posts yet! </h2>;
    } else {
      return (
        <div className="posts">
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="profile mb-4">
        <div className="profile-info mb-2">
          <h1 className="mr-4">{user.username}</h1>
          <h4 className="user-email">{user.email}</h4>
        </div>
        <span> Joined on {user.joinDate} </span>
        <div className="profile-info mt-2">
          <h3 className="mr-4">
            {user.followers && user.followers.length}
            <span> Followers </span>
          </h3>
          <h3>
            {user.following && user.following.length}
            <span> Following</span>
          </h3>
        </div>
      </div>
      {renderPosts()}
    </React.Fragment>
  );
};

export default Profile;
