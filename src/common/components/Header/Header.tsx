import React from "react";
import s from "./Header.module.css";
import logo from "../../../assets/icons/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/redux";

export default function Header() {
  let userName: string = useSelector<RootState, string>(
    (state): string => state.authReducer.username
  );

  return (
    <header className={s.head}>
      <Link to="/teams">
        <img src={logo} alt="Error" className={s.logo} />
      </Link>
      <div className={s.user}>
        <p>{userName}</p>
      </div>
    </header>
  );
}
