import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Blogs from "./screens/Blogs";
import PrivateRoute from "./routing/PrivateRoute";
import MyBlogs from "./screens/MyBlogs";
import MyWritenBlogs from "./screens/MyWritenBlogs";
import Blog from "./screens/Blog";
import EditBlog from "./screens/EditBlog";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<MyBlogs />} />
            <Route path="/myblogs" element={<MyWritenBlogs />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
