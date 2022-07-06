import React from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

const Card = ({ id, title, imgs, des, author }) => {
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

        {/* <p className="card-text">
          {des.substring(0, 50)}...
        </p> */}
        <p className="card-text">
          <BiUserCircle /> {" " + author}
        </p>
        <Link to={`/blog/${id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
