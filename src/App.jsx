import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Post from "./components/post";
import CreatePost from "./components/CreatePost";
import posts from "./data/posts";
import axios from "axios";

function App() {
  return (
    <div>
      <Header />
      <div className="body">
        <div className="site-container">
          <CreatePost />

          {posts.map((post) => {
            return <Post post={post} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
