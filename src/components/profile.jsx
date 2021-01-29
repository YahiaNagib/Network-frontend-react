import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post";

const Profile = (props) => {
  const apiEndPoint = "http://localhost:4000/api/";
  const id = props.match.params.id;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint + "posts/user/" + id).then((response) => {
      setPosts(response.data);
    });

    axios.get(apiEndPoint + "users/" + id).then((response) => {
      setUser(response.data);
    });
  }, []);

  console.log(user);
  return (
    <React.Fragment>
      <div className="profile mb-4">
        <div className="profile-info mb-2">
          <h1 className="mr-4">{user.name}</h1>
          <h4 className="user-email">{user.email}</h4>
        </div>
        <span> Joined on {user.joinDate} </span>
        <div className="profile-info mt-2">
          <h3 className="mr-4">
            {user.followers && user.followers.length}
            <span> Followers </span>
          </h3>
          <h3>
            {user.followings && user.followings.length}
            <span> Following</span>
          </h3>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default Profile;
