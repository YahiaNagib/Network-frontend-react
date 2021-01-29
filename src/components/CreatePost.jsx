import React, { useState } from "react";
import axios from "axios";
import apiEndPoint from "../services/appService";

function CreatePost(props) {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    const headers = {
      "x-auth-token": localStorage.getItem("token"),
    };

    axios
      .post(apiEndPoint + "posts", { content }, { headers })
      .then((response) => {
        props.addPost(response.data);
      });

    setContent("");
    e.preventDefault();
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h3>New Post</h3>
      <textarea
        name="content"
        cols="50"
        rows="5"
        className="form-control mb-3 post-content-area"
        required
        value={content}
        onChange={handleChange}
      ></textarea>
      <input
        type="submit"
        value="Post"
        className="btn btn-primary submit-btn"
      />
    </form>
  );
}

export default CreatePost;
