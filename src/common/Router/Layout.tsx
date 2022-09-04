import React, { MouseEventHandler } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import s from './Layout.module.css';

interface LayoutProps{
  handleLogOut: MouseEventHandler
}

export default function Layout({handleLogOut}:LayoutProps) {
  return (
    <>
        <Header/>
        <Navbar handleLogOut={handleLogOut} />
        <div className={s.container}>
            <Outlet/>
        </div>
    </>
  )
}
