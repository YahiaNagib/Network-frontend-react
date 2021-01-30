import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post";
import apiEndPoint from "../services/appService";

function Following(props) {
  const [posts, setPosts] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    axios.get(apiEndPoint + "posts/following/" + id).then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <h2> Users that you follow </h2>
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
}

export default Following;
