import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import s from './Layout.module.css';

export default function Layout() {
  return (
    <>
        <Header/>
        <Navbar/>
        <div className={s.container}>
            <Outlet/>
        </div>
    </>
  )
}
