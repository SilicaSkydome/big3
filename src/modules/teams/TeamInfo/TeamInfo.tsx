import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../../api/baseRequest';
import { RootState } from '../../../core/redux';
import { ITeam } from '../Interfaces/Interfaces';
import s from './TeamInfo.module.css';

export default function TeamInfo() {
    const token = useSelector<RootState, string>(state => state.authReducer.token);
    const { id } = useParams();
    const [team, setTeam] = useState<ITeam>();
    useEffect(() => {
        get(`/Team/Get/?id=${id}`, token).then(res => setTeam(res));
    }, [])

  return (
    <>
        <div className={s.container}>
            <div className={s.header}><p><Link to='/teams'>Teams</Link> / <Link to='/teams/'>Add new team</Link></p></div>
            <div className={s.content}>
                <div className={s.image}>
                    <img src={team?.imageUrl} alt="No Img" width={200} height={200}/>
                </div>
                <div className={s.info}>
                    <h1 className={s.name}>{team?.name}</h1>
                    <span className={s.genInfo}>
                        <p><strong>Year of foundation</strong><br />{team?.foundationYear}</p>
                        <p><strong>Division</strong><br />{team?.division}</p>
                        <p><strong>Conference</strong><br />{team?.conference}</p>
                    </span>
                </div>
            </div>
        </div>

        <div className={s.container}>

        </div>
        
    </>
  )
}
