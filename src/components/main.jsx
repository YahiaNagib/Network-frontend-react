import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";
import Post from "./post";

function Main() {
  const apiEndPoint = "http://localhost:4000/api/";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(apiEndPoint + "posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <CreatePost />
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
}

export default Main;
