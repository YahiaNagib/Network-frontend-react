import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";
import Post from "./post";
import apiEndPoint from "../services/appService";

function Main({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint + "posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const addPost = (post) => {
    setPosts((prevPosts) => {
      return [post, ...prevPosts];
    });
  };

  return (
    <div>
      {user && <CreatePost addPost={addPost} />}
      <h2> All Posts </h2>
      {posts.map((post) => {
        return <Post post={post} key={post._id} authUser={user} />;
      })}
    </div>
  );
}

export default Main;
