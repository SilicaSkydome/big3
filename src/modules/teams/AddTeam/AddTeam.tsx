import React from 'react'
import s from './AddTeam.module.css';  
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AddTeam() {
    const { register, handleSubmit } = useForm();

  return (
    <div className={s.container}>
        <div className={s.header}></div>
        <form className={s.form}>
            <div className={s.image}>
                <input type="file"/>
            </div>
            <div className={s.inputs}>
                <label htmlFor="Name">Name</label>
                <input type="text" id="Name"/>
                <label htmlFor="Division">Division</label>
                <input type="text" id="Division"/>
                <label htmlFor="Conference">Conference</label>
                <input type="text" id="Conference"/>
                <label htmlFor="Year">Year of foundation</label>
                <input type="text" id="Year"/>
                <button className={`${s.button} ${s.cancel}`}>Cancel</button>
                <button className={`${s.button} ${s.save}`}>Save</button>
            </div>
        </form>
    </div>
  )
}
