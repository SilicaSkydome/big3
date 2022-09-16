import React from "react";
import s from "./Header.module.css";
import logo from "../../../assets/icons/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/redux";
import NoPicture from "./NoPicture";

export default function Header() {
  let user = useSelector<RootState, { username: string; avatar: string }>(
    (state) => {
      return {
        username: state.authReducer.username,
        avatar: state.authReducer.avatarUrl,
      };
    }
  );
  return (
    <header className={s.head}>
      <Link to="/teams">
        <img src={logo} alt="Error" className={s.logo} />
      </Link>
      <div className={s.user}>
        <p>{user.username}</p>
        {user.avatar ? (
          <img
            src={`http://dev.trainee.dex-it.ru${user.avatar}`}
            alt=""
            width={36}
            height={36}
          />
        ) : (
          <NoPicture />
        )}
      </div>
    </header>
  );
}
