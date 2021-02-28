import React, { useState, useEffect } from "react";
import auth from "../services/authService";
import axios from "axios";
import Post from "./post";

// To access the profile of a user which contains all their posts
// Display follow or unfollow button if this propfile's user is not 
// the authenticated user
const Profile = (props) => {
  const apiEndPoint = "http://localhost:4000/api/";
  const id = props.match.params.id;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [authUser, setAuthUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [followingNum, setFollowingNum] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    // Get the authenticated user and store it in authUser
    const { _id: authId } = auth.getCurrentUser();
    const { data: authUser } = await axios.get(apiEndPoint + "users/" + authId);
    setAuthUser(authUser);

    // get the posts of the required user
    const { data: posts } = await axios.get(apiEndPoint + "posts/user/" + id);
    setPosts(posts);
    // get the data of required user
    const { data: user } = await axios.get(apiEndPoint + "users/" + id);
    setUser(user);

    // Show follow or unfollow based on if the auth
    setIsFollowed(authUser.following.includes(user._id) ? true : false);

    setFollowingNum(user.followers.length);
  };

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

  const renderFollow = () => {
    if (user && authUser && authUser._id === user._id) return null;
    return (
      <React.Fragment>
        <form onSubmit={followSubmit}>
          <input
            type="submit"
            className="btn btn-primary"
            value={isFollowed ? "Unfollow" : "Follow"}
          />
        </form>
      </React.Fragment>
    );
  };

  const followSubmit = (e) => {
    e.preventDefault();
    axios
      .put(apiEndPoint + "follow", { id1: authUser._id, id2: user._id })
      .then(() => {
        setFollowingNum((prevNum) => {
          return isFollowed ? prevNum - 1 : prevNum + 1;
        });
        setIsFollowed(!isFollowed);
      });
  };

  return (
    <React.Fragment>
      <div className="profile mb-4">
        <div className="profile-info mb-2">
          <h1 className="mr-4">{user && user.username}</h1>
          <h4 className="user-email">{user && user.email}</h4>
          {renderFollow()}
        </div>
        <span> Joined on {user && user.joinDate} </span>
        <div className="profile-info mt-2">
          <h3 className="mr-4">
            {followingNum}
            <span> Followers </span>
          </h3>
          <h3>
            {user && user.following && user.following.length}
            <span> Following</span>
          </h3>
        </div>
      </div>
      {renderPosts()}
    </React.Fragment>
  );
};

export default Profile;
