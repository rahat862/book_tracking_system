"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./profilePost.module.css";
import person from "../../../public/person.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import colors from "../../lib/color";
import { AiOutlineLike, AiFillStar, AiOutlineComment } from "react-icons/ai";

const ProfilePost = ({ key, book }) => {
  const [user, setUser] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `http://localhost:3000/api/profile/${book.user}`,
        {
          cache: "no-store",
        }
      );
      const user = await res.json();

      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.person}>
        <div className={classes.personLeft}>
          <Image
            alt="profilPerson"
            src={person}
            width="45"
            height="45"
            className={classes.profilPerson}
          />
          <span>
            <h2>{user.name}</h2>
            <h3>@{user.username}</h3>
          </span>
        </div>
        <div className={classes.personRight}>
          <p>3s</p>
          <BiDotsVerticalRounded />
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.profilePost}>
          <div
            style={{ border: `5px solid ${color}` }}
            className={classes.postImageContainer}
          >
            <Image
              src={book.coverImage}
              width="300"
              height="180"
              className={classes.bookImage}
            />
          </div>
        </div>
        <div className={classes.postInformation}>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <p>{book.description}</p>
          <div className={classes.rateLike}>
            <div className={classes.rate}>
              <AiFillStar className={classes.icon} />
              <span>{book.rating}</span>
            </div>
            <div className={classes.rate}>
              <AiOutlineComment className={classes.icon} />
              <span>12</span>
            </div>
            <div className={classes.rate}>
              <AiOutlineLike className={classes.icon} />
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
