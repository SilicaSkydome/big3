import React from 'react'
import s from './Header.module.css';
import logo from '../../../assets/icons/logo.jpg';
import { Link } from "react-router-dom";

export default function Header() {
  let user = null;

  return (
    <header className={s.head}>
      <Link to='/teams'>
        <img src={logo} alt="Error" className={s.logo} />
      </Link>
      <div className={s.user}>
        {user ? <p>username</p> : <a className={s.sign} href='#'>Sign In</a>}
      </div>
    </header>
  )
}
