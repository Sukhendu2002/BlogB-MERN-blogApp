import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        alert("Some thing went wrong");
      }, 3000);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form className="mt-5" onSubmit={loginHandler}>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
