import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Blogs from "./screens/Blogs";
import PrivateRoute from "./routing/PrivateRoute";
import AddBlog from "./screens/AddBlog";
import MyWritenBlogs from "./screens/MyWritenBlogs";
import Blog from "./screens/Blog";
import EditBlog from "./screens/EditBlog";

const App = () => {
  //check if the authToken is available in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = localStorage.getItem("authToken");
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }
  , [loggedIn]);

  const setLoggedIn = (state) => {
    setIsLoggedIn(state);
    console.log("logged in");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<AddBlog />} />
            <Route path="/myblogs" element={<MyWritenBlogs />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="/register"
            element={<Register setLoggedIn={setLoggedIn} />}
          />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
