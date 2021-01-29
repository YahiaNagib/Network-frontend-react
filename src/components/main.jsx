import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";
import Post from "./post";
import apiEndPoint from "../services/appService";

function Main() {
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
      <CreatePost addPost={addPost} />
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
}

export default Main;
