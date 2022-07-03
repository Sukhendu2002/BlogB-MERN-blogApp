import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, imgs, des }) => {
  return (
    <div
      className="card m-2"
      style={{
        width: "18rem",
      }}
    >
      <img className="card-img-top" src={imgs} alt="Card image cap"></img>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link to="/" className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
