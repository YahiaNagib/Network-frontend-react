import React, { useState } from "react";
import axios from "axios";
import apiEndPoint from "../services/appService";

function CreatePost(props) {

  const [content, setContent] = useState([]);

  const handleChange = (e) => {
    setContent(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    const headers = {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDExZTk3MGQwMWRhZjM0MjBkZmE3NjciLCJpYXQiOjE2MTE4NDU5NTl9.L81Lz6h8vzjkT4MKaFw0AqlR8EVM2RvyalaULQrjwvE",
    };

    axios
      .post(apiEndPoint + "posts", { content }, { headers })
      .then((response) => {
        console.log(response);
        props.addPost(response.data);
      });


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
