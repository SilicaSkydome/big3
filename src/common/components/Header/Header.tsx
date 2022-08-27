import React from 'react'
import s from './Header.module.css';
import logo from '../../../assets/icons/logo.jpg';
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className={s.head}>
      <Link to='/teams'>
        <img src={logo} alt="Error" className={s.logo} />
      </Link>
      <div className={s.user}>
        <p>UserName</p>
      </div>
    </header>
  )
}
