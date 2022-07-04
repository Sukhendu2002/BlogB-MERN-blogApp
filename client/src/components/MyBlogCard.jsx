import React from "react";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const MyBlogCard = ({ id, title, imgs, des, handleDelete }) => {
  return (
    <div class="col-lg-4 mb-4">
      <div class="card">
        <img src={imgs} alt="" class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{des.substring(0, 100)}</p>
          <Link to={`/blog/${id}`} className="links">
            <GrView />
          </Link>
          <Link to={`/blog/${title}`} className="links">
            <AiFillEdit />
          </Link>
          <a onClick={() => handleDelete(id)} className="links">
            <AiFillDelete />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
