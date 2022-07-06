import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const Register = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const notify = (message, type) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/auth/signup",
        {
          userName,
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", res.data.token);
      setLoggedIn(true);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      notify(err.response.data.error, "error");
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>Login</h1>
          <form className="mt-5" onSubmit={registerHandler}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
                id="username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <span className="mb-3">
              <Link to="/login"> Already have an account?</Link>
            </span>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Register;
