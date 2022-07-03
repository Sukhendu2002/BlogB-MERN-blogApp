import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Blogs from "./screens/Blogs";
import PrivateRoute from "./routing/PrivateRoute";
import MyBlogs from "./screens/MyBlogs";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<MyBlogs />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
