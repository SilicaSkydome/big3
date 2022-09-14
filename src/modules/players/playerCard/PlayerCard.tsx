import React from "react";
import { Link } from "react-router-dom";
import IPlayerCard from "../Interfaces/Interfaces";
import s from "./PlayerCard.module.css";

interface infoProps {
  cardInfo: IPlayerCard;
}

export default function TeamCard({ cardInfo }: infoProps) {
  return (
    <Link className={s.card} to={`/players/${cardInfo.id}`}>
      <div className={s.image}>
        <img
          src={`http://dev.trainee.dex-it.ru${cardInfo.imageUrl}`}
          alt="no data"
          width="150px"
          height="150px"
        />
      </div>
      <div className={s.info}>
        <h2 className={s.title}>
          {cardInfo.name} <span className={s.number}>{cardInfo.number}</span>
        </h2>
        <h3 className={s.team}>{cardInfo.team}</h3>
      </div>
    </Link>
  );
}
