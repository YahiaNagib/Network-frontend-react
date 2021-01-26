import React, { useState } from "react";

function CreatePost(props) {
  return (
    <form class="mb-4" action="{% url 'save-post' %}" method="POST">
      <h3>New Post</h3>
      <textarea
        name="content"
        cols="50"
        rows="5"
        class="form-control mb-3 post-content-area"
        required
      ></textarea>
      <input type="submit" value="Post" class="btn btn-primary submit-btn" />
    </form>
  );
}

export default CreatePost;
