import React from 'react'
import { Link } from 'react-router-dom'
import ITeamCard from '../interfaces/TeamInterfaces'
import s from './TeamCard.module.css'

interface infoProps {
    cardInfo: ITeamCard
}

export default function TeamCard(props: infoProps) {
    const {cardInfo} = props;

  return (
    <Link className={s.card} to={`/teams/${cardInfo.id}`}>
        <img src={cardInfo.imageUrl} alt="no data" />
        <div className={s.info}>
            <h2 className={s.title}>{cardInfo.name}</h2>
            <h3 className={s.year}>Year of foundation: {cardInfo.foundationYear}</h3>
        </div>
    </Link>
  )
}
