import React from 'react'
import s from './Header.module.css';
import logo from '../../../assets/icons/logo.jpg';

export default function Header() {
  let user = null;

  return (
    <header className={s.head}>
      <div>
        <img src={logo} alt="Error" className={s.logo} />
      </div>
      <div className={s.user}>
        {user ? <p>username</p> : <a className={s.sign} href='#'>Sign Up/Sign In</a>}
      </div>
    </header>
  )
}
